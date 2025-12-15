"use client"

import { useEffect, useRef, useState } from "react"
import { Focus, Zap, Settings, Heart, TrendingUp, Timer } from "lucide-react"
import { Item } from "@radix-ui/react-accordion"

const benefits = [
  {
    icon: Focus,
    title: "Menos distracciones",
    description: "Elimina las interrupciones constantes de apps adictivas",
  },
  {
    icon: Zap,
    title: "Control en 1 toque",
    description: "Activa el bloqueo instantáneamente con tu tarjeta NFC",
  },
  {
    icon: Settings,
    title: "Sin configuración compleja",
    description: "Funciona desde el primer momento, sin tutoriales ni ajustes",
  },
  {
    icon: Heart,
    title: "Mejora tu bienestar",
    description: "Reduce la ansiedad y mejora tu salud mental",
  },
  {
    icon: TrendingUp,
    title: "Ayuda a tu productividad",
    description: "Más tiempo enfocado significa más logros",
  },
  {
    icon: Timer,
    title: "Se adapta a tus horarios",
    description: "Programa sesiones de enfoque automáticamente",
  },
]

export function Benefits() {
  const [visibleCards, setVisibleCards] = useState<boolean[]>(Array(6).fill(false))
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observers = cardsRef.current.map((ref, index) => {
      if (!ref) return null

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisibleCards((prev) => {
                const newState = [...prev]
                newState[index] = true
                return newState
              })
            }
          })
        },
        { threshold: 0.2 },
      )

      observer.observe(ref)
      return observer
    })

    return () => {
      observers.forEach((observer) => observer?.disconnect())
    }
  }, [])

  return (
    <section id="beneficios" className="py-10 md:py-14 relative">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0bb37a]/5 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Beneficios</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Todo lo que necesitas para recuperar el control de tu vida digital
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              ref={(el) => {
                cardsRef.current[index] = el
              }}
              className={`p-6 rounded-2xl bg-[#0a0a0a] border border-[#1a1a1a] hover:border-[#0bb37a]/30 transition-all duration-500 group ${visibleCards[index] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              <div className="w-12 h-12 rounded-xl bg-[#0bb37a]/10 flex items-center justify-center mb-4 group-hover:bg-[#0bb37a]/20 transition-colors">
                <benefit.icon className="w-6 h-6 text-[#0bb37a]" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{benefit.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
