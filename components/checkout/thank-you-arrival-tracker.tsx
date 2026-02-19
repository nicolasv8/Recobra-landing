"use client"

import { useEffect } from "react"
import { useSearchParams } from "next/navigation"

export function ThankYouArrivalTracker() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get("sessionId")

  useEffect(() => {
    if (!sessionId) {
      return
    }

    const storageKey = `recobra-checkout-arrive:${sessionId}`

    if (window.sessionStorage.getItem(storageKey)) {
      return
    }

    const sendArrival = async () => {
      try {
        await fetch("/api/checkout/arrive", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ sessionId }),
        })
      } finally {
        window.sessionStorage.setItem(storageKey, "1")
      }
    }

    void sendArrival()
  }, [sessionId])

  return null
}
