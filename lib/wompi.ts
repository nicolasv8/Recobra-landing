import { createHash, timingSafeEqual } from "node:crypto"
import type { WompiTransactionApiRecord, WompiWebhookPayload } from "@/lib/types/referrals"

interface WompiConfig {
  publicKey: string
  integritySecret: string
  eventsSecret: string
  currency: string
  normalAmountInCents: number
  referralAmountInCents: number
}

interface BuildCheckoutUrlInput {
  publicKey: string
  amountInCents: number
  currency: string
  reference: string
  integritySecret: string
  redirectUrl: string
  expirationTime?: string
}

interface WompiTransactionApiResponse {
  data?: WompiTransactionApiRecord
}

function getRequiredEnv(name: string): string {
  const value = process.env[name]

  if (!value || !value.trim()) {
    throw new Error(`Missing required environment variable: ${name}`)
  }

  return value.trim()
}

function parseAmount(name: string): number {
  const rawValue = getRequiredEnv(name)
  const parsedValue = Number.parseInt(rawValue, 10)

  if (!Number.isFinite(parsedValue) || parsedValue <= 0) {
    throw new Error(`Invalid amount in environment variable ${name}: ${rawValue}`)
  }

  return parsedValue
}

function getWompiApiBaseUrl(): string {
  return (process.env.WOMPI_API_BASE_URL?.trim() || "https://production.wompi.co").replace(/\/$/, "")
}

export function getWompiConfig(): WompiConfig {
  return {
    publicKey: getRequiredEnv("WOMPI_PUBLIC_KEY"),
    integritySecret: getRequiredEnv("WOMPI_INTEGRITY_SECRET"),
    eventsSecret: getRequiredEnv("WOMPI_EVENTS_SECRET"),
    currency: process.env.WOMPI_CURRENCY?.trim() || "COP",
    normalAmountInCents: parseAmount("WOMPI_NORMAL_AMOUNT_IN_CENTS"),
    referralAmountInCents: parseAmount("WOMPI_REFERRAL_AMOUNT_IN_CENTS"),
  }
}

export function createWompiIntegritySignature(
  reference: string,
  amountInCents: number,
  currency: string,
  integritySecret: string,
  expirationTime?: string,
): string {
  const signatureInput = expirationTime
    ? `${reference}${amountInCents}${currency}${expirationTime}${integritySecret}`
    : `${reference}${amountInCents}${currency}${integritySecret}`

  return createHash("sha256").update(signatureInput).digest("hex")
}

export function buildWompiCheckoutUrl(input: BuildCheckoutUrlInput): string {
  const signature = createWompiIntegritySignature(
    input.reference,
    input.amountInCents,
    input.currency,
    input.integritySecret,
    input.expirationTime,
  )

  const params = new URLSearchParams({
    "public-key": input.publicKey,
    currency: input.currency,
    "amount-in-cents": String(input.amountInCents),
    reference: input.reference,
    "signature:integrity": signature,
    "redirect-url": input.redirectUrl,
  })

  if (input.expirationTime) {
    params.set("expiration-time", input.expirationTime)
  }

  return `https://checkout.wompi.co/p/?${params.toString()}`
}

export async function fetchWompiTransactionById(
  transactionId: string,
  publicKey: string,
): Promise<WompiTransactionApiRecord> {
  const endpoint = `${getWompiApiBaseUrl()}/v1/transactions/${encodeURIComponent(transactionId)}`
  const response = await fetch(endpoint, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${publicKey}`,
      "Content-Type": "application/json",
    },
    cache: "no-store",
  })

  if (!response.ok) {
    const error = new Error(`Wompi transaction query failed with ${response.status}`) as Error & {
      status?: number
    }
    error.status = response.status
    throw error
  }

  const payload = (await response.json()) as WompiTransactionApiResponse
  const transaction = payload.data

  if (!transaction || transaction.id === undefined || transaction.id === null) {
    throw new Error("Invalid transaction response from Wompi API")
  }

  return transaction
}

export function getTransactionAmountInCents(transaction: WompiTransactionApiRecord): number | null {
  const rawValue =
    typeof transaction.amount_in_cents === "number"
      ? transaction.amount_in_cents
      : transaction.amountInCents

  if (typeof rawValue !== "number" || !Number.isFinite(rawValue)) {
    return null
  }

  return rawValue
}

function toSnakeCase(key: string): string {
  return key.replace(/([a-z0-9])([A-Z])/g, "$1_$2").toLowerCase()
}

function toCamelCase(key: string): string {
  return key.replace(/_([a-z])/g, (_, letter: string) => letter.toUpperCase())
}

function resolvePathValue(root: unknown, path: string): string {
  const segments = path.split(".")
  let cursor: unknown = root

  for (const segment of segments) {
    if (!cursor || typeof cursor !== "object") {
      return ""
    }

    const record = cursor as Record<string, unknown>
    const candidates = [segment, toSnakeCase(segment), toCamelCase(segment)]
    const foundKey = candidates.find((candidate) => candidate in record)

    if (!foundKey) {
      return ""
    }

    cursor = record[foundKey]
  }

  if (cursor === null || cursor === undefined) {
    return ""
  }

  if (typeof cursor === "object") {
    return JSON.stringify(cursor)
  }

  return String(cursor)
}

function getSignatureMetadata(payload: WompiWebhookPayload) {
  const topLevelSignature = payload.signature
  const nestedSignature = payload.data?.signature
  const signature = topLevelSignature ?? nestedSignature

  return {
    properties: signature?.properties ?? [],
    checksum: signature?.checksum ?? "",
    timestamp: payload.timestamp ?? payload.sent_at,
  }
}

export function computeWompiEventChecksum(payload: WompiWebhookPayload, eventsSecret: string): string | null {
  const metadata = getSignatureMetadata(payload)

  if (!metadata.properties.length || !metadata.timestamp) {
    return null
  }

  const concatenatedProperties = metadata.properties
    .map((propertyPath) => resolvePathValue(payload.data, propertyPath))
    .join("")

  const signatureInput = `${concatenatedProperties}${metadata.timestamp}${eventsSecret}`

  return createHash("sha256").update(signatureInput).digest("hex")
}

export function verifyWompiEventSignature(
  payload: WompiWebhookPayload,
  eventsSecret: string,
  checksumFromHeader?: string | null,
): boolean {
  const expectedChecksum = computeWompiEventChecksum(payload, eventsSecret)

  if (!expectedChecksum) {
    return false
  }

  const metadata = getSignatureMetadata(payload)
  const providedChecksum =
    checksumFromHeader?.trim().toLowerCase() || metadata.checksum.trim().toLowerCase()

  if (!providedChecksum) {
    return false
  }

  const expectedChecksumLower = expectedChecksum.toLowerCase()

  if (providedChecksum.length !== expectedChecksumLower.length) {
    return false
  }

  return timingSafeEqual(
    Buffer.from(providedChecksum, "utf8"),
    Buffer.from(expectedChecksumLower, "utf8"),
  )
}
