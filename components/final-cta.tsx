"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { WaitlistModal } from "@/components/waitlist-modal"
import { ArrowRight } from "lucide-react"

export function FinalCta() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
          }
        })
      },
      { threshold: 0.3 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section className="py-16 md:py-24 relative" ref={sectionRef}>
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div
          className={`transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 text-balance">
            Recobra tu tiempo hoy.
          </h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
            Únete a miles de personas que ya recuperaron el control de su vida digital con Recobra.
          </p>

          <WaitlistModal>
            <Button
              size="lg"
              className="bg-[#0bb37a] hover:bg-[#0bb37a]/90 text-white rounded-full px-10 py-7 text-lg font-semibold shadow-lg shadow-[#0bb37a]/20 group"
            >
              Reservar tarjeta
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </WaitlistModal>
        </div>
      </div>
    </section>
  )
}
