import { createHash } from "node:crypto"
import { NextResponse } from "next/server"
import { mapWompiStatusToCheckoutStatus } from "@/lib/referrals"
import {
  findCheckoutSessionByReference,
  hasWebhookEvent,
  storeWebhookEvent,
  updateCheckoutSessionFromWompiTransaction,
} from "@/lib/supabase-admin"
import {
  fetchWompiTransactionById,
  getTransactionAmountInCents,
  getWompiConfig,
  verifyWompiEventSignature,
} from "@/lib/wompi"
import type { WompiWebhookPayload } from "@/lib/types/referrals"

export const runtime = "nodejs"
const MAX_WEBHOOK_BODY_BYTES = 64 * 1024

function normalizeEventType(value: unknown): string {
  if (typeof value !== "string" || !value.trim()) {
    return "unknown"
  }

  return value.trim().toLowerCase()
}

function getStoredPayload(payload: WompiWebhookPayload): WompiWebhookPayload {
  const transaction = payload.data?.transaction

  return {
    event: payload.event,
    timestamp: payload.timestamp,
    sent_at: payload.sent_at,
    data: transaction
      ? {
          transaction: {
            id: transaction.id,
            reference: transaction.reference,
            status: transaction.status,
            amount_in_cents: transaction.amount_in_cents,
            currency: transaction.currency,
          },
        }
      : undefined,
  }
}

export async function POST(request: Request) {
  const contentLengthHeader = request.headers.get("content-length")
  const contentLength = contentLengthHeader ? Number.parseInt(contentLengthHeader, 10) : 0

  if (Number.isFinite(contentLength) && contentLength > MAX_WEBHOOK_BODY_BYTES) {
    return NextResponse.json(
      {
        ok: false,
        message: "Payload too large",
      },
      { status: 413 },
    )
  }

  const rawBody = await request.text()

  if (Buffer.byteLength(rawBody, "utf8") > MAX_WEBHOOK_BODY_BYTES) {
    return NextResponse.json(
      {
        ok: false,
        message: "Payload too large",
      },
      { status: 413 },
    )
  }

  let payload: WompiWebhookPayload

  try {
    payload = JSON.parse(rawBody) as WompiWebhookPayload
  } catch {
    return NextResponse.json(
      {
        ok: false,
        message: "Invalid JSON payload",
      },
      { status: 400 },
    )
  }

  const eventType = normalizeEventType(payload.event)

  try {
    const wompiConfig = getWompiConfig()
    const checksumHeader = request.headers.get("x-event-checksum")
    const signatureValid = verifyWompiEventSignature(payload, wompiConfig.eventsSecret, checksumHeader)

    if (!signatureValid) {
      return NextResponse.json(
        {
          ok: false,
          message: "Invalid event signature",
        },
        { status: 401 },
      )
    }

    const eventId = createHash("sha256").update(rawBody).digest("hex")
    const eventExists = await hasWebhookEvent(eventId)

    if (eventExists) {
      return NextResponse.json({ ok: true, duplicate: true })
    }

    if (eventType !== "transaction.updated") {
      await storeWebhookEvent({
        eventId,
        eventType,
        signatureValid: true,
        payload: getStoredPayload(payload),
      })

      return NextResponse.json({ ok: true, skipped: true })
    }

    const transaction = payload.data?.transaction

    if (!transaction) {
      return NextResponse.json(
        {
          ok: false,
          message: "Missing transaction payload",
        },
        { status: 400 },
      )
    }

    const reference =
      typeof transaction.reference === "string" ? transaction.reference.trim() : ""
    const status = typeof transaction.status === "string" ? transaction.status : ""

    if (!reference || !status) {
      return NextResponse.json(
        {
          ok: false,
          message: "Missing transaction reference or status",
        },
        { status: 400 },
      )
    }

    const localSession = await findCheckoutSessionByReference(reference)

    if (!localSession) {
      await storeWebhookEvent({
        eventId,
        eventType,
        signatureValid: true,
        payload: getStoredPayload(payload),
      })

      return NextResponse.json({ ok: true, skipped: true, reason: "unknown_reference" })
    }

    if (transaction.id === undefined || transaction.id === null) {
      return NextResponse.json(
        {
          ok: false,
          message: "Missing transaction id",
        },
        { status: 400 },
      )
    }

    const verifiedTransaction = await fetchWompiTransactionById(String(transaction.id), wompiConfig.publicKey)
    const verifiedReference =
      typeof verifiedTransaction.reference === "string" ? verifiedTransaction.reference.trim() : ""

    if (!verifiedReference || verifiedReference !== reference) {
      await storeWebhookEvent({
        eventId,
        eventType,
        signatureValid: true,
        payload: getStoredPayload(payload),
      })

      return NextResponse.json(
        {
          ok: false,
          message: "Transaction reference verification failed",
        },
        { status: 409 },
      )
    }

    const expectedCurrency = wompiConfig.currency.trim().toUpperCase()
    const verifiedCurrency =
      typeof verifiedTransaction.currency === "string"
        ? verifiedTransaction.currency.trim().toUpperCase()
        : ""

    if (!verifiedCurrency || verifiedCurrency !== expectedCurrency) {
      await storeWebhookEvent({
        eventId,
        eventType,
        signatureValid: true,
        payload: getStoredPayload(payload),
      })

      return NextResponse.json(
        {
          ok: false,
          message: "Transaction currency verification failed",
        },
        { status: 409 },
      )
    }

    const expectedAmountInCents =
      localSession.checkout_variant === "referral"
        ? wompiConfig.referralAmountInCents
        : wompiConfig.normalAmountInCents
    const verifiedAmountInCents = getTransactionAmountInCents(verifiedTransaction)

    if (verifiedAmountInCents === null || verifiedAmountInCents !== expectedAmountInCents) {
      await storeWebhookEvent({
        eventId,
        eventType,
        signatureValid: true,
        payload: getStoredPayload(payload),
      })

      return NextResponse.json(
        {
          ok: false,
          message: "Transaction amount verification failed",
        },
        { status: 409 },
      )
    }

    const verifiedStatus =
      typeof verifiedTransaction.status === "string" ? verifiedTransaction.status : status
    const normalizedStatus = mapWompiStatusToCheckoutStatus(verifiedStatus)
    const approvedAt = normalizedStatus === "approved" ? new Date().toISOString() : undefined

    await updateCheckoutSessionFromWompiTransaction({
      wompiReference: reference,
      wompiTransactionId: String(verifiedTransaction.id),
      status: normalizedStatus,
      approvedAt,
    })

    await storeWebhookEvent({
      eventId,
      eventType,
      signatureValid: true,
      payload: getStoredPayload(payload),
    })

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json(
      {
        ok: false,
        message: "Failed to process webhook event",
      },
      { status: 500 },
    )
  }
}
