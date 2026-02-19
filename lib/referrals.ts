import type { CheckoutSessionStatus } from "@/lib/types/referrals"

export const ALLOWED_CHECKOUT_CTA_SOURCES = new Set([
  "hero_compra",
  "navbar_desktop_compra",
  "navbar_mobile_compra",
  "how_it_works_pruebala_hoy",
  "why_recobra_compra",
  "final_cta_pruebala_hoy",
])

export function normalizeReferralCode(rawCode: string): string {
  return rawCode.trim().toUpperCase()
}

export function isValidReferralCodeFormat(code: string): boolean {
  return /^[A-Z0-9_-]{3,32}$/.test(code)
}

export function mapWompiStatusToCheckoutStatus(status: string): CheckoutSessionStatus {
  const normalizedStatus = status.trim().toUpperCase()

  if (normalizedStatus === "APPROVED") {
    return "approved"
  }

  if (normalizedStatus === "DECLINED") {
    return "declined"
  }

  if (normalizedStatus === "VOIDED") {
    return "voided"
  }

  if (normalizedStatus === "ERROR") {
    return "error"
  }

  return "created"
}

export function sanitizeCtaSource(ctaSource: string): string {
  return ctaSource.trim().toLowerCase().replace(/[^a-z0-9-_]/g, "_").slice(0, 64)
}
