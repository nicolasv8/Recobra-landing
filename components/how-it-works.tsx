"use client"

import { useEffect, useRef, useState } from "react"
import { Smartphone, CreditCard, Sparkles, Focus } from "lucide-react"

const steps = [
  {
    icon: Smartphone,
    title: "Escoge las apps a bloquear",
    description: "Abre la app de Recobra y selecciona las aplicaciones que deseas bloquear.",
  },
  {
    icon: Focus,
    title: "Inicia una sesión de enfoque",
    description: "A través de un horario pre-programado o de forma manual.",
  },
  {
    icon: Sparkles,
    title: "Recobra tu tiempo",
    description: "Para lo que realmente importa, por fuera de las pantallas.",
  },
]

export function HowItWorks() {
  const [visibleSteps, setVisibleSteps] = useState<boolean[]>([false, false, false])
  const stepsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observers = stepsRef.current.map((ref, index) => {
      if (!ref) return null

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisibleSteps((prev) => {
                const newState = [...prev]
                newState[index] = true
                return newState
              })
            }
          })
        },
        { threshold: 0.3 },
      )

      observer.observe(ref)
      return observer
    })

    return () => {
      observers.forEach((observer) => observer?.disconnect())
    }
  }, [])

  return (
    <section id="como-funciona" className="py-10 md:py-14 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Cómo funciona</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Tres simples pasos para recuperar el control de tu tiempo
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {steps.map((step, index) => (
            <div
              key={index}
              ref={(el) => {
                stepsRef.current[index] = el
              }}
              className={`flex flex-col items-center text-center p-8 rounded-2xl bg-gradient-to-b from-[#0a0a0a] to-transparent border border-[#1a1a1a] transition-all duration-700 ${visibleSteps[index] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="w-16 h-16 rounded-2xl bg-[#0bb37a]/10 flex items-center justify-center mb-6">
                <step.icon className="w-8 h-8 text-[#0bb37a]" />
              </div>
              <span className="text-[#0bb37a] text-sm font-semibold mb-2">Paso {index + 1}</span>
              <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
