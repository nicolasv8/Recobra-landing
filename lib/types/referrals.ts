export type CheckoutVariant = "standard" | "referral"

export type CheckoutSessionStatus =
  | "created"
  | "approved"
  | "declined"
  | "voided"
  | "error"

export interface ReferralCodeRecord {
  id: string
  code: string
  is_active: boolean
}

export interface CheckoutSessionRecord {
  id: string
  wompi_reference: string
  cta_source: string
  checkout_variant: CheckoutVariant
  referral_code_id: string | null
  referral_code_snapshot: string | null
  status: CheckoutSessionStatus
  wompi_transaction_id: string | null
  created_at: string
  approved_at: string | null
  arrived_at: string | null
  updated_at: string
}

export interface WompiTransactionPayload {
  id: string | number
  reference: string
  status: string
  amount_in_cents?: number
  currency?: string
}

export interface WompiTransactionApiRecord {
  id: string | number
  reference?: string
  status?: string
  amount_in_cents?: number
  amountInCents?: number
  currency?: string
}

export interface WompiWebhookPayload {
  event?: string
  timestamp?: number
  sent_at?: number
  data?: {
    transaction?: WompiTransactionPayload
    signature?: {
      properties?: string[]
      checksum?: string
    }
    [key: string]: unknown
  }
  signature?: {
    properties?: string[]
    checksum?: string
  }
  [key: string]: unknown
}
