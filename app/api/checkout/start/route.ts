import { randomUUID } from "node:crypto"
import { NextResponse } from "next/server"
import {
  ALLOWED_CHECKOUT_CTA_SOURCES,
  isValidReferralCodeFormat,
  normalizeReferralCode,
  sanitizeCtaSource,
} from "@/lib/referrals"
import { checkRateLimit, getClientIp } from "@/lib/rate-limit"
import {
  createCheckoutSession,
  findActiveReferralCodeByCode,
} from "@/lib/supabase-admin"
import { buildWompiCheckoutUrl, getWompiConfig } from "@/lib/wompi"
import type { CheckoutVariant } from "@/lib/types/referrals"

export const runtime = "nodejs"

const START_CHECKOUT_LIMIT = 30
const START_CHECKOUT_WINDOW_MS = 10 * 60 * 1000
const REFERRAL_ATTEMPT_LIMIT = 10
const REFERRAL_ATTEMPT_WINDOW_MS = 10 * 60 * 1000

const INVALID_REFERRAL_CODE_RESPONSE = {
  ok: false,
  code: "INVALID_REFERRAL_CODE",
  message: "No pudimos validar el código de referido. Inténtalo de nuevo o continúa sin código.",
  canProceedWithoutCode: true,
} as const

interface StartCheckoutRequest {
  ctaSource?: unknown
  referralCode?: unknown
}

function getSiteUrl(): string {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim()

  if (!siteUrl) {
    throw new Error("Missing required environment variable: NEXT_PUBLIC_SITE_URL")
  }

  return siteUrl.replace(/\/$/, "")
}

function createCheckoutReference(sessionId: string, variant: CheckoutVariant): string {
  const compactSessionId = sessionId.replace(/-/g, "").slice(0, 10)
  const timestamp = Date.now()

  return `recobra-${variant === "referral" ? "ref" : "std"}-${timestamp}-${compactSessionId}`
}

function getErrorResponse(message: string, status = 500) {
  return NextResponse.json(
    {
      ok: false,
      code: "CHECKOUT_START_FAILED",
      message,
      canProceedWithoutCode: true,
    },
    { status },
  )
}

function getRateLimitResponse(retryAfterSeconds: number) {
  return NextResponse.json(
    {
      ok: false,
      code: "RATE_LIMITED",
      message: "Demasiados intentos. Espera un momento e inténtalo de nuevo.",
      canProceedWithoutCode: true,
    },
    {
      status: 429,
      headers: {
        "Retry-After": String(retryAfterSeconds),
      },
    },
  )
}

function isRequestOriginAllowed(request: Request): boolean {
  const originHeader = request.headers.get("origin")

  if (!originHeader) {
    return true
  }

  try {
    const requestOrigin = new URL(originHeader).origin
    const allowedOrigin = new URL(getSiteUrl()).origin

    return requestOrigin === allowedOrigin
  } catch {
    return false
  }
}

export async function POST(request: Request) {
  let payload: StartCheckoutRequest

  try {
    payload = (await request.json()) as StartCheckoutRequest
  } catch {
    return NextResponse.json(
      {
        ok: false,
        code: "INVALID_REQUEST",
        message: "No pudimos leer la solicitud de compra.",
      },
      { status: 400 },
    )
  }

  if (typeof payload.ctaSource !== "string" || !payload.ctaSource.trim()) {
    return NextResponse.json(
      {
        ok: false,
        code: "INVALID_REQUEST",
        message: "Falta identificar el botón de compra.",
      },
      { status: 400 },
    )
  }

  if (!isRequestOriginAllowed(request)) {
    return NextResponse.json(
      {
        ok: false,
        code: "FORBIDDEN_ORIGIN",
        message: "Origen de solicitud no permitido.",
      },
      { status: 403 },
    )
  }

  const ctaSource = sanitizeCtaSource(payload.ctaSource)

  if (!ALLOWED_CHECKOUT_CTA_SOURCES.has(ctaSource)) {
    return NextResponse.json(
      {
        ok: false,
        code: "INVALID_REQUEST",
        message: "Botón de compra inválido.",
      },
      { status: 400 },
    )
  }

  const clientIp = getClientIp(request)
  const startLimitCheck = checkRateLimit({
    key: `checkout:start:${clientIp}`,
    limit: START_CHECKOUT_LIMIT,
    windowMs: START_CHECKOUT_WINDOW_MS,
  })

  if (!startLimitCheck.allowed) {
    return getRateLimitResponse(startLimitCheck.retryAfterSeconds)
  }

  const rawReferralCode = typeof payload.referralCode === "string" ? payload.referralCode : ""
  const normalizedReferralCode = rawReferralCode ? normalizeReferralCode(rawReferralCode) : ""

  let checkoutVariant: CheckoutVariant = "standard"
  let referralCodeId: string | null = null
  let referralCodeSnapshot: string | null = null

  if (normalizedReferralCode) {
    const referralAttemptLimitCheck = checkRateLimit({
      key: `checkout:referral:${clientIp}`,
      limit: REFERRAL_ATTEMPT_LIMIT,
      windowMs: REFERRAL_ATTEMPT_WINDOW_MS,
    })

    if (!referralAttemptLimitCheck.allowed) {
      return getRateLimitResponse(referralAttemptLimitCheck.retryAfterSeconds)
    }

    if (!isValidReferralCodeFormat(normalizedReferralCode)) {
      return NextResponse.json(INVALID_REFERRAL_CODE_RESPONSE, { status: 200 })
    }

    try {
      const referralCode = await findActiveReferralCodeByCode(normalizedReferralCode)

      if (!referralCode) {
        return NextResponse.json(INVALID_REFERRAL_CODE_RESPONSE, { status: 200 })
      }

      checkoutVariant = "referral"
      referralCodeId = referralCode.id
      referralCodeSnapshot = referralCode.code
    } catch {
      return getErrorResponse(
        "No pudimos validar el código de referido en este momento. Puedes continuar sin código.",
      )
    }
  }

  const sessionId = randomUUID()
  const reference = createCheckoutReference(sessionId, checkoutVariant)

  try {
    const wompiConfig = getWompiConfig()
    const redirectUrl = new URL("/gracias", getSiteUrl())

    redirectUrl.searchParams.set("sessionId", sessionId)
    redirectUrl.searchParams.set("reference", reference)
    redirectUrl.searchParams.set("variant", checkoutVariant)

    await createCheckoutSession({
      id: sessionId,
      wompiReference: reference,
      ctaSource,
      checkoutVariant,
      referralCodeId,
      referralCodeSnapshot,
    })

    const amountInCents =
      checkoutVariant === "referral"
        ? wompiConfig.referralAmountInCents
        : wompiConfig.normalAmountInCents

    const checkoutUrl = buildWompiCheckoutUrl({
      publicKey: wompiConfig.publicKey,
      amountInCents,
      currency: wompiConfig.currency,
      reference,
      integritySecret: wompiConfig.integritySecret,
      redirectUrl: redirectUrl.toString(),
    })

    return NextResponse.json({
      ok: true,
      checkoutUrl,
      sessionId,
    })
  } catch {
    return getErrorResponse(
      "No pudimos iniciar el checkout de Wompi. Puedes reintentar o continuar sin código.",
    )
  }
}
