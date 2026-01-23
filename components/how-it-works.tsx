"use client"

import { useRef, useState } from "react"
import { Smartphone, Zap, Lock, CreditCard, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const steps = [
  {
    icon: Smartphone,
    title: "Elige las apps a bloquear",
    description: "Selecciona Instagram, TikTok y todas las apps que te distraigan.",
  },
  {
    icon: Zap,
    title: "Inicia una sesión de enfoque",
    description: "Actívala manualmente o con horarios.",
  },
  {
    icon: Lock,
    title: "Recobra tu tiempo",
    description: "Tus distracciones están bloqueadas para que inviertas tu tiempo en lo más importante.",
  },
  {
    icon: CreditCard,
    title: "Para terminar, toca tu tarjeta",
    description: "Para desbloquear y terminar la sesión, necesitas tu tarjeta Recobra.",
    isDifferentiator: true,
  },
]

export function HowItWorks() {
  const [activeIndex, setActiveIndex] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)

  const handleScroll = () => {
    if (carouselRef.current) {
      const scrollPosition = carouselRef.current.scrollLeft
      const cardWidth = carouselRef.current.firstElementChild?.clientWidth || 0
      const newIndex = Math.round(scrollPosition / cardWidth)
      setActiveIndex(Math.min(newIndex, 2))
    }
  }

  return (
    <section id="como-funciona" className="py-12 md:py-20 relative bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Cómo funciona</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Cuatro pasos para recuperar el control de tu tiempo.
          </p>
        </div>

        {/* Mobile Helper Text */}
        <div className="md:hidden text-center mb-4 text-sm text-[#0bb37a] font-medium animate-pulse">
          Desliza para ver los pasos →
        </div>

        {/* Steps Layout */}
        <div className="flex flex-col md:grid md:grid-cols-4 gap-6">

          {/* Steps 1-3: Mobile Carousel / Desktop Grid Items */}
          <div
            ref={carouselRef}
            onScroll={handleScroll}
            className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 md:pb-0 md:contents scrollbar-hide -mx-6 px-6 md:mx-0 md:px-0"
          >
            {steps.slice(0, 3).map((step, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-[85vw] sm:w-[350px] md:w-auto snap-center flex flex-col items-center text-center p-8 rounded-2xl bg-gradient-to-b from-[#0a0a0a] to-[#050505] border border-[#1a1a1a] md:h-full"
              >
                <div className="w-14 h-14 rounded-xl bg-[#1a1a1a] flex items-center justify-center mb-6">
                  <step.icon className="w-7 h-7 text-[#0bb37a]" />
                </div>
                <div className="text-[#0bb37a] text-xs font-bold uppercase tracking-wider mb-3">Paso {index + 1}</div>
                <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm md:text-base">{step.description}</p>
              </div>
            ))}
          </div>

          {/* Mobile Dots */}
          <div className="flex justify-center gap-2 md:hidden mb-2">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full transition-all ${activeIndex === i ? "bg-[#0bb37a] w-6" : "bg-[#1a1a1a]"
                  }`}
              />
            ))}
          </div>

          {/* Step 4: Differentiator (Fixed below on mobile, 4th col on desktop) */}
          <div className="relative flex flex-col items-center text-center p-8 rounded-2xl bg-[#0a0a0a] border border-[#0bb37a] shadow-[0_0_30px_-10px_rgba(11,179,122,0.15)] md:h-full overflow-hidden group">
            <div className="absolute top-3 right-3 bg-[#0bb37a]/10 text-[#0bb37a] text-[10px] font-bold px-2 py-1 rounded-full border border-[#0bb37a]/20">
              DIFERENCIAL
            </div>

            <div className="w-14 h-14 rounded-xl bg-[#0bb37a]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
              <CreditCard className="w-7 h-7 text-[#0bb37a]" />
            </div>
            <div className="text-[#0bb37a] text-xs font-bold uppercase tracking-wider mb-3">Paso 4</div>
            <h3 className="text-xl font-bold text-white mb-3">Para desbloquear, usa la tarjeta Recobra</h3>
            <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
              Para terminar una sesisón de enfoque, necesitas tu tarjeta Recobra.
            </p>
          </div>

        </div>

        {/* Section CTA */}
        <div className="mt-12 flex justify-center">
          <Button
            asChild
            size="lg"
            className="bg-[#0bb37a] hover:bg-[#0dd98b] text-black font-bold rounded-full px-8 py-6 h-auto text-lg shadow-lg shadow-[#0bb37a]/20 hover:shadow-[#0bb37a]/30 transition-all hover:scale-105"
          >
            <a href="https://checkout.wompi.co/l/V5u4U0">
              Compra • $89.900
            </a>
          </Button>
        </div>

      </div>
    </section>
  )
}
