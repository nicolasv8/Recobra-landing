"use client"

import { useEffect, useRef, useState } from "react"
import { Star, Briefcase, GraduationCap, UserRound } from "lucide-react"

const testimonials = [
  {
    name: "Valeria Noreña",
    role: "Estudiante",
    content:
      "Desde que uso Recobra, recuperé más de 2 horas al día que antes perdía en redes sociales. Me siento más enfocada al estudiar y más tranquila en mi día a día.",
    icon: GraduationCap,
  },
  {
    name: "Nicolás Velasco",
    role: "Emprendedor",
    content:
      "Me encanta la opción de poder programar bloqueos. Me ayuda a mantenerme enfocado durante las horas más intensas de trabajo.",
    icon: Briefcase,
  },
  {
    name: "Mónica Corrales",
    role: "Padre de Familia",
    content:
      "Recobra nos ayuda a cuidar a nuestro hijo, limitando su uso de redes y juegos de forma efectiva. Probamos otras apps, pero eran muy fáciles de saltar. La tarjeta física es una excelente idea.",
    icon: UserRound,
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
    <section id="testimonios" className="py-16 md:py-24 relative" ref={sectionRef}>
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
