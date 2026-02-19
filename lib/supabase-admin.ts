import "server-only"
import type {
  CheckoutSessionRecord,
  CheckoutSessionStatus,
  CheckoutVariant,
  ReferralCodeRecord,
  WompiWebhookPayload,
} from "@/lib/types/referrals"

interface SupabaseConfig {
  url: string
  adminKey: string
}

interface CreateCheckoutSessionInput {
  id: string
  wompiReference: string
  ctaSource: string
  checkoutVariant: CheckoutVariant
  referralCodeId?: string | null
  referralCodeSnapshot?: string | null
}

interface UpdateCheckoutSessionFromWompiInput {
  wompiReference: string
  wompiTransactionId?: string
  status: CheckoutSessionStatus
  approvedAt?: string
}

function getRequiredEnv(name: string): string {
  const value = process.env[name]

  if (!value || !value.trim()) {
    throw new Error(`Missing required environment variable: ${name}`)
  }

  return value.trim()
}

function getSupabaseConfig(): SupabaseConfig {
  return {
    url: getRequiredEnv("SUPABASE_URL").replace(/\/$/, ""),
    adminKey: getRequiredEnv("SUPABASE_SECRET_KEY"),
  }
}

function buildSupabaseUrl(path: string, query?: Record<string, string>): string {
  const { url } = getSupabaseConfig()
  const endpoint = new URL(`/rest/v1/${path}`, url)

  if (query) {
    for (const [key, value] of Object.entries(query)) {
      endpoint.searchParams.set(key, value)
    }
  }

  return endpoint.toString()
}

interface SupabaseRequestOptions {
  method?: "GET" | "POST" | "PATCH"
  query?: Record<string, string>
  body?: unknown
  prefer?: string
}

interface SupabaseErrorShape {
  message?: string
  details?: string
  hint?: string
  code?: string
}

async function supabaseRequest<T = unknown>(
  path: string,
  { method = "GET", query, body, prefer }: SupabaseRequestOptions = {},
): Promise<T> {
  const { adminKey } = getSupabaseConfig()
  const url = buildSupabaseUrl(path, query)

  const headers: Record<string, string> = {
    apikey: adminKey,
    "Content-Type": "application/json",
  }

  if (prefer) {
    headers.Prefer = prefer
  }

  const response = await fetch(url, {
    method,
    headers,
    body: body === undefined ? undefined : JSON.stringify(body),
    cache: "no-store",
  })

  if (!response.ok) {
    let errorPayload: SupabaseErrorShape | null = null

    try {
      errorPayload = (await response.json()) as SupabaseErrorShape
    } catch {
      errorPayload = null
    }

    const error = new Error(errorPayload?.message || `Supabase request failed with ${response.status}`) as Error & {
      status?: number
      code?: string
      details?: string
    }

    error.status = response.status
    error.code = errorPayload?.code
    error.details = errorPayload?.details

    throw error
  }

  const rawText = await response.text()

  if (!rawText) {
    return undefined as T
  }

  return JSON.parse(rawText) as T
}

export async function findActiveReferralCodeByCode(code: string): Promise<ReferralCodeRecord | null> {
  const rows = await supabaseRequest<ReferralCodeRecord[]>("referral_codes", {
    query: {
      select: "id,code,is_active",
      code: `eq.${code}`,
      is_active: "eq.true",
      limit: "1",
    },
  })

  return rows[0] ?? null
}

export async function createCheckoutSession(
  input: CreateCheckoutSessionInput,
): Promise<CheckoutSessionRecord> {
  const rows = await supabaseRequest<CheckoutSessionRecord[]>("checkout_sessions", {
    method: "POST",
    body: [
      {
        id: input.id,
        wompi_reference: input.wompiReference,
        cta_source: input.ctaSource,
        checkout_variant: input.checkoutVariant,
        referral_code_id: input.referralCodeId ?? null,
        referral_code_snapshot: input.referralCodeSnapshot ?? null,
        status: "created",
      },
    ],
    prefer: "return=representation",
  })

  if (!rows[0]) {
    throw new Error("Unable to create checkout session")
  }

  return rows[0]
}

export async function findCheckoutSessionByReference(
  wompiReference: string,
): Promise<CheckoutSessionRecord | null> {
  const rows = await supabaseRequest<CheckoutSessionRecord[]>("checkout_sessions", {
    query: {
      select:
        "id,wompi_reference,cta_source,checkout_variant,referral_code_id,referral_code_snapshot,status,wompi_transaction_id,created_at,approved_at,arrived_at,updated_at",
      wompi_reference: `eq.${wompiReference}`,
      limit: "1",
    },
  })

  return rows[0] ?? null
}

export async function markCheckoutSessionArrived(sessionId: string): Promise<void> {
  await supabaseRequest("checkout_sessions", {
    method: "PATCH",
    query: {
      id: `eq.${sessionId}`,
      arrived_at: "is.null",
    },
    body: {
      arrived_at: new Date().toISOString(),
    },
    prefer: "return=minimal",
  })
}

export async function hasWebhookEvent(eventId: string): Promise<boolean> {
  const rows = await supabaseRequest<Array<{ event_id: string }>>("wompi_webhook_events", {
    query: {
      select: "event_id",
      event_id: `eq.${eventId}`,
      limit: "1",
    },
  })

  return Boolean(rows[0])
}

export async function storeWebhookEvent(params: {
  eventId: string
  eventType: string
  signatureValid: boolean
  payload: WompiWebhookPayload
}): Promise<void> {
  try {
    await supabaseRequest("wompi_webhook_events", {
      method: "POST",
      body: [
        {
          event_id: params.eventId,
          event_type: params.eventType,
          signature_valid: params.signatureValid,
          payload: params.payload,
        },
      ],
      prefer: "return=minimal",
    })
  } catch (error) {
    const typedError = error as { status?: number; code?: string }

    if (typedError.status === 409 || typedError.code === "23505") {
      return
    }

    throw error
  }
}

export async function updateCheckoutSessionFromWompiTransaction(
  input: UpdateCheckoutSessionFromWompiInput,
): Promise<CheckoutSessionRecord | null> {
  const updates: Record<string, string> = {
    status: input.status,
  }

  if (input.wompiTransactionId) {
    updates.wompi_transaction_id = input.wompiTransactionId
  }

  if (input.approvedAt) {
    updates.approved_at = input.approvedAt
  }

  const rows = await supabaseRequest<CheckoutSessionRecord[]>("checkout_sessions", {
    method: "PATCH",
    query: {
      wompi_reference: `eq.${input.wompiReference}`,
      select:
        "id,wompi_reference,cta_source,checkout_variant,referral_code_id,referral_code_snapshot,status,wompi_transaction_id,created_at,approved_at,arrived_at,updated_at",
    },
    body: updates,
    prefer: "return=representation",
  })

  return rows[0] ?? null
}
