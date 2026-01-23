"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"

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
    <section className="py-8 md:py-12 relative" ref={sectionRef}>
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div
          className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 text-balance">
            Recobra tu tiempo <span className="text-[#0bb37a]">hoy</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
            Tu tiempo es lo más importante. Reserva tu tarjeta hoy y recobra el control de tu vida digital
          </p>

          <Button
            asChild
            size="lg"
            className="bg-[#0bb37a] hover:bg-[#0bb37a]/90 text-white rounded-full px-10 py-7 text-lg font-semibold shadow-lg shadow-[#0bb37a]/20 group"
          >
            <a href="https://checkout.wompi.co/l/V5u4U0">
              Pruébala hoy
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
