"use client"

import { useEffect, useRef, useState } from "react"
import { Check, X } from "lucide-react"

const features = [
  {
    name: "Bloqueo real y difícil de saltar",
    recobra: true,
    apps: false,
    willpower: false,
  },
  {
    name: "Activación instantánea NFC",
    recobra: true,
    apps: false,
    willpower: false,
  },
  {
    name: "Elige qué apps bloquear",
    recobra: true,
    apps: true,
    willpower: false,
  },
  {
    name: "Bloqueos programados",
    recobra: true,
    apps: true,
    willpower: false,
  },
  {
    name: "Físico y tangible",
    recobra: true,
    apps: false,
    willpower: false,
  },
]

export function Comparison() {
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
      { threshold: 0.2 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section id="comparacion" className="py-16 md:py-24 relative" ref={sectionRef}>
      <div className="max-w-5xl mx-auto px-6">
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            ¿Por qué <span className="text-[#0bb37a]">Recobra</span>?
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Comparado con otras alternativas, Recobra es la única solución que realmente funciona
          </p>
        </div>

        <div
          className={`overflow-hidden rounded-2xl border border-[#1a1a1a] bg-gradient-to-b from-[#0a0a0a] to-transparent transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Header */}
          <div className="grid grid-cols-4 gap-4 p-6 border-b border-[#1a1a1a] bg-[#0a0a0a]">
            <div className="text-muted-foreground font-medium">Característica</div>
            <div className="text-center">
              <span className="text-[#0bb37a] font-bold text-lg">Recobra</span>
            </div>
            <div className="text-center">
              <span className="text-muted-foreground font-medium">Apps de bloqueo</span>
            </div>
            <div className="text-center">
              <span className="text-muted-foreground font-medium">Fuerza de voluntad</span>
            </div>
          </div>

          {/* Rows */}
          {features.map((feature, index) => (
            <div
              key={index}
              className={`grid grid-cols-4 gap-4 p-6 border-b border-[#1a1a1a] last:border-b-0 transition-all duration-500`}
              style={{
                transitionDelay: `${index * 100 + 300}ms`,
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateX(0)" : "translateX(-20px)",
              }}
            >
              <div className="text-white font-medium flex items-center">{feature.name}</div>
              <div className="flex justify-center">
                {feature.recobra ? (
                  <div className="w-8 h-8 rounded-full bg-[#0bb37a] flex items-center justify-center">
                    <Check className="w-5 h-5 text-black" />
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center">
                    <X className="w-5 h-5 text-red-500" />
                  </div>
                )}
              </div>
              <div className="flex justify-center">
                {feature.apps ? (
                  <div className="w-8 h-8 rounded-full bg-[#0bb37a]/20 flex items-center justify-center">
                    <Check className="w-5 h-5 text-[#0bb37a]" />
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center">
                    <X className="w-5 h-5 text-red-500" />
                  </div>
                )}
              </div>
              <div className="flex justify-center">
                {feature.willpower ? (
                  <div className="w-8 h-8 rounded-full bg-[#0bb37a]/20 flex items-center justify-center">
                    <Check className="w-5 h-5 text-[#0bb37a]" />
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center">
                    <X className="w-5 h-5 text-red-500" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
