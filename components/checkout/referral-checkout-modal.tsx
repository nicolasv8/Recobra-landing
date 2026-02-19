"use client"

import { useEffect, useState } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type CheckoutStep = "question" | "code"

interface ReferralCheckoutModalProps {
  isOpen: boolean
  ctaSource: string
  onClose: () => void
}

interface CheckoutStartSuccessResponse {
  ok: true
  checkoutUrl: string
  sessionId: string
}

interface CheckoutStartErrorResponse {
  ok: false
  code?: string
  message?: string
  canProceedWithoutCode?: boolean
}

type CheckoutStartResponse = CheckoutStartSuccessResponse | CheckoutStartErrorResponse

export function ReferralCheckoutModal({ isOpen, ctaSource, onClose }: ReferralCheckoutModalProps) {
  const [step, setStep] = useState<CheckoutStep>("question")
  const [referralCode, setReferralCode] = useState("")
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (!isOpen) {
      return
    }

    setStep("question")
    setReferralCode("")
    setErrorMessage(null)
    setIsSubmitting(false)
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) {
      return
    }

    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !isSubmitting) {
        onClose()
      }
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", handleKeydown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener("keydown", handleKeydown)
    }
  }, [isOpen, isSubmitting, onClose])

  if (!isOpen) {
    return null
  }

  const startCheckout = async (options: { referralCode?: string }) => {
    setIsSubmitting(true)
    setErrorMessage(null)

    try {
      const response = await fetch("/api/checkout/start", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ctaSource,
          referralCode: options.referralCode,
        }),
      })

      const rawResponse = await response.text()
      let data: CheckoutStartResponse | null = null

      if (rawResponse) {
        try {
          data = JSON.parse(rawResponse) as CheckoutStartResponse
        } catch {
          data = null
        }
      }

      if (!response.ok) {
        throw new Error(
          data && typeof data === "object" && "message" in data && data.message
            ? data.message
            : "No pudimos iniciar el checkout. Intenta nuevamente.",
        )
      }

      if (!data) {
        throw new Error("No pudimos iniciar el checkout. Intenta nuevamente.")
      }

      if (!data.ok) {
        setErrorMessage(
          data.message ||
            "El código de referido no es válido. Inténtalo de nuevo o continúa sin código.",
        )
        return
      }

      window.location.assign(data.checkoutUrl)
    } catch (error) {
      const fallbackMessage =
        "No fue posible iniciar tu compra en este momento. Puedes reintentar o continuar sin código."
      setErrorMessage(error instanceof Error ? error.message : fallbackMessage)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 px-4"
      role="presentation"
      onClick={() => {
        if (!isSubmitting) {
          onClose()
        }
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="referral-checkout-title"
        className="relative w-full max-w-md rounded-2xl border border-white/10 bg-[#0b0b0b] p-6 text-white shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          aria-label="Cerrar"
          onClick={onClose}
          disabled={isSubmitting}
          className="absolute right-4 top-4 rounded-full p-1 text-gray-400 transition-colors hover:bg-white/10 hover:text-white disabled:cursor-not-allowed"
        >
          <X className="h-4 w-4" />
        </button>

        {step === "question" ? (
          <div className="space-y-6 pt-2">
            <h2 id="referral-checkout-title" className="pr-8 text-2xl font-bold leading-tight">
              ¿Tienes un código de referido?
            </h2>
            <p className="text-sm text-gray-300">
              Si tienes uno, podrás acceder al checkout especial para referidos.
            </p>

            {errorMessage && (
              <div className="rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                {errorMessage}
              </div>
            )}

            <div className="grid grid-cols-2 gap-3">
              <Button
                type="button"
                className="rounded-full bg-[#0bb37a] font-bold text-black hover:bg-[#0dd98b]"
                onClick={() => setStep("code")}
                disabled={isSubmitting}
              >
                Sí
              </Button>
              <Button
                type="button"
                variant="outline"
                className="rounded-full border-white/25 bg-transparent text-white hover:bg-white/10"
                onClick={() => startCheckout({})}
                disabled={isSubmitting}
              >
                No
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4 pt-2">
            <h2 id="referral-checkout-title" className="pr-8 text-2xl font-bold leading-tight">
              Ingresa tu código de referido
            </h2>

            <div className="space-y-2">
              <label htmlFor="referral-code" className="text-sm text-gray-300">
                Código
              </label>
              <input
                id="referral-code"
                value={referralCode}
                onChange={(event) => setReferralCode(event.target.value)}
                placeholder="Ejemplo: SOYREFERIDO"
                disabled={isSubmitting}
                className={cn(
                  "w-full rounded-xl border bg-black px-4 py-3 text-base text-white outline-none transition-colors",
                  errorMessage
                    ? "border-red-500/70 focus:border-red-400"
                    : "border-white/20 focus:border-[#0bb37a]",
                )}
              />
            </div>

            {errorMessage && (
              <div className="rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                {errorMessage}
              </div>
            )}

            <div className="flex flex-col gap-2">
              <Button
                type="button"
                className="rounded-full bg-[#0bb37a] font-bold text-black hover:bg-[#0dd98b]"
                onClick={() => startCheckout({ referralCode })}
                disabled={isSubmitting || !referralCode.trim()}
              >
                {isSubmitting ? "Validando..." : "Validar y continuar"}
              </Button>

              <Button
                type="button"
                variant="outline"
                className="rounded-full border-white/25 bg-transparent text-white hover:bg-white/10"
                onClick={() => {
                  setStep("question")
                  setErrorMessage(null)
                }}
                disabled={isSubmitting}
              >
                Volver
              </Button>

              <Button
                type="button"
                variant="ghost"
                className="rounded-full text-[#0bb37a] hover:bg-[#0bb37a]/10 hover:text-[#0bb37a]"
                onClick={() => startCheckout({})}
                disabled={isSubmitting}
              >
                Continuar sin código
              </Button>

              {errorMessage && (
                <Button
                  type="button"
                  variant="ghost"
                  className="rounded-full text-gray-300 hover:bg-white/10 hover:text-white"
                  onClick={() => {
                    setReferralCode("")
                    setErrorMessage(null)
                  }}
                  disabled={isSubmitting}
                >
                  Reingresar código
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
