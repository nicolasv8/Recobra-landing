"use client"

import { useEffect, useRef, useState } from "react"
import { Check } from "lucide-react"

const features = [
  "PVC negro mate",
  "Impresión UV de alta calidad",
  "Chip NFC integrado",
  "Tamaño tarjeta bancaria estándar",
]

export function NfcCard() {
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
    <section id="tarjeta" className="py-16 md:py-24 relative" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left - Text Content */}
          <div
            className={`flex flex-col gap-6 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white">La tarjeta NFC</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Compacta, resistente, premium. Diseñada para ser parte de tu estilo.
            </p>

            <ul className="flex flex-col gap-4 mt-4">
              {features.map((feature, index) => (
                <li
                  key={index}
                  className="flex items-center gap-3"
                  style={{
                    transitionDelay: `${index * 100 + 200}ms`,
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? "translateX(0)" : "translateX(-20px)",
                    transition: "all 0.5s ease-out",
                  }}
                >
                  <div className="w-5 h-5 rounded-full bg-[#0bb37a] flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-white">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right - Card Mockup */}
          <div
            className={`flex justify-center lg:justify-end transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
          >
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-[#0bb37a]/15 blur-[40px] rounded-3xl" />

              {/* Card */}
              <div className="relative w-[340px] md:w-[400px] h-[215px] md:h-[252px] bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] rounded-2xl border-2 border-[#0bb37a] shadow-2xl shadow-[#0bb37a]/10 p-6 flex flex-col justify-between">
                {/* Logo */}
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-white">
                    <span className="text-[#0bb37a]">Re</span>cobra
                  </span>
                </div>

                {/* NFC Symbol */}
                <div className="absolute top-6 right-6">
                  <svg
                    className="w-8 h-8 text-[#0bb37a]/60"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M6 18.5a4 4 0 0 0 4 -4v-9a4 4 0 0 1 4 -4" />
                    <path d="M10 5.5a4 4 0 0 1 4 4v9a4 4 0 0 0 4 4" />
                  </svg>
                </div>

                {/* Bottom text */}
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-muted-foreground text-xs mb-1">NFC ENABLED</p>
                    <p className="text-white text-sm font-medium">Control • Tiempo • Bienestar</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-[#0bb37a]/20 flex items-center justify-center">
                    <span className="text-[#0bb37a] font-bold">R</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
