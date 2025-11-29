"use client"

import { useEffect, useRef, useState } from "react"
import { Star, Briefcase, GraduationCap, Palette } from "lucide-react"

const testimonials = [
  {
    name: "María García",
    role: "Emprendedora",
    content:
      "Desde que uso Recobra, recuperé al menos 2 horas diarias que antes perdía en redes sociales. Ahora ese tiempo lo dedico a mi negocio y mi familia.",
    icon: Briefcase,
  },
  {
    name: "Carlos Mendoza",
    role: "Estudiante de Medicina",
    content:
      "Las apps de bloqueo nunca funcionaron para mí porque siempre encontraba la forma de desactivarlas. Con Recobra es diferente, el bloqueo es real.",
    icon: GraduationCap,
  },
  {
    name: "Ana Rodríguez",
    role: "Diseñadora UX",
    content:
      "Lo que más me gusta es lo táctil que es. Tocar la tarjeta se convirtió en un ritual que me ayuda a entrar en modo concentración instantáneamente.",
    icon: Palette,
  },
]

export function Testimonials() {
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
    <section id="testimonios" className="py-24 md:py-32 relative" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-6">
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Lo que dicen nuestros usuarios</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Miles de personas ya están recuperando su tiempo con Recobra
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => {
            const IconComponent = testimonial.icon
            return (
              <div
                key={index}
                className={`flex flex-col p-8 rounded-2xl bg-gradient-to-b from-[#0a0a0a] to-transparent border border-[#1a1a1a] transition-all duration-700`}
                style={{
                  transitionDelay: `${index * 150 + 200}ms`,
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "translateY(0)" : "translateY(30px)",
                }}
              >
                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-[#0bb37a] text-[#0bb37a]" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-muted-foreground leading-relaxed flex-grow mb-6">"{testimonial.content}"</p>

                <div className="flex items-center gap-4 pt-6 border-t border-[#1a1a1a]">
                  <div className="w-12 h-12 rounded-full bg-[#0bb37a]/10 flex items-center justify-center">
                    <IconComponent className="w-6 h-6 text-[#0bb37a]" />
                  </div>
                  <div>
                    <p className="text-white font-semibold">{testimonial.name}</p>
                    <p className="text-muted-foreground text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
