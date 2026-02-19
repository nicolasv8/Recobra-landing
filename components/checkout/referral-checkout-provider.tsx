"use client"

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react"
import { ReferralCheckoutModal } from "@/components/checkout/referral-checkout-modal"

interface ReferralCheckoutContextValue {
  openCheckout: (ctaSource: string) => void
}

const ReferralCheckoutContext = createContext<ReferralCheckoutContextValue | null>(null)

export function ReferralCheckoutProvider({ children }: { children: ReactNode }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [ctaSource, setCtaSource] = useState("unknown")

  const openCheckout = useCallback((source: string) => {
    setCtaSource(source)
    setIsModalOpen(true)
  }, [])

  const closeCheckout = useCallback(() => {
    setIsModalOpen(false)
  }, [])

  const contextValue = useMemo(
    () => ({
      openCheckout,
    }),
    [openCheckout],
  )

  return (
    <ReferralCheckoutContext.Provider value={contextValue}>
      {children}
      <ReferralCheckoutModal isOpen={isModalOpen} ctaSource={ctaSource} onClose={closeCheckout} />
    </ReferralCheckoutContext.Provider>
  )
}

export function useReferralCheckout() {
  const context = useContext(ReferralCheckoutContext)

  if (!context) {
    throw new Error("useReferralCheckout must be used within ReferralCheckoutProvider")
  }

  return context
}
