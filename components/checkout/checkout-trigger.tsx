"use client"

import { forwardRef, type ButtonHTMLAttributes } from "react"
import { useReferralCheckout } from "@/components/checkout/referral-checkout-provider"

interface CheckoutTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  ctaSource: string
}

export const CheckoutTrigger = forwardRef<HTMLButtonElement, CheckoutTriggerProps>(
  ({ ctaSource, onClick, type = "button", ...props }, ref) => {
    const { openCheckout } = useReferralCheckout()

    return (
      <button
        {...props}
        ref={ref}
        type={type}
        onClick={(event) => {
          onClick?.(event)

          if (event.defaultPrevented) {
            return
          }

          openCheckout(ctaSource)
        }}
      />
    )
  },
)

CheckoutTrigger.displayName = "CheckoutTrigger"
