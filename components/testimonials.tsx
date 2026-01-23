"use client"

import { useEffect, useRef, useState } from "react"
import { Star, Briefcase, GraduationCap, UserRound, ChevronLeft, ChevronRight, Database } from "lucide-react"

const testimonials = [
  {
    name: "Valeria Noreña",
    role: "Estudiante",
    content:
      "Desde que uso Recobra, recuperé más de 2 horas al día que antes perdía en redes sociales. Me siento más enfocada al estudiar y más tranquila en mi día a día.",
    icon: GraduationCap,
  },
  {
    name: "Esteban Trujillo",
    role: "Analista de datos",
    content:
      "Ayuda muchísimo. El ver la aplicación bloqueada así yo tenga la tarjeta al lado ya es motivo suficiente para volver a poner el celular en la mesa y seguir enfocado en lo que uno estaba.",
    icon: Database,
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
  const [activeIndex, setActiveIndex] = useState(0)
  const [hasInteracted, setHasInteracted] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const carouselRef = useRef<HTMLDivElement>(null)
  const scrollTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined)

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

  const handleScroll = () => {
    if (!carouselRef.current) return

    // Clear existing timeout
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current)
    }

    // Debounce to avoid too many updates
    scrollTimeoutRef.current = setTimeout(() => {
      if (!carouselRef.current) return

      const scrollLeft = carouselRef.current.scrollLeft
      const cardWidth = carouselRef.current.scrollWidth / testimonials.length
      const newIndex = Math.round(scrollLeft / cardWidth)

      setActiveIndex(newIndex)
      setHasInteracted(true)
    }, 100)
  }

  const scrollToIndex = (index: number) => {
    if (!carouselRef.current) return

    const cards = carouselRef.current.children
    if (cards[index]) {
      (cards[index] as HTMLElement).scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest'
      })
      setHasInteracted(true)
    }
  }

  return (
    <section id="testimonios" className="py-10 md:py-16 relative" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-6">
        <div
          className={`text-center mb-8 md:mb-12 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Lo que dicen nuestros usuarios</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Decenas de personas ya están recobrando su tiempo para lo que verdaderamente importa gracias a Recobra
          </p>
        </div>

        {/* MOBILE CAROUSEL (< lg) */}
        <div className="lg:hidden">
          {/* Swipe Hint */}
          {!hasInteracted && (
            <div className="text-center mb-3 animate-pulse">
              <p className="text-[#0bb37a] text-xs font-medium">Desliza para ver más →</p>
            </div>
          )}

          {/* Carousel Container with Edge Fade */}
          <div className="relative">
            {/* Left Edge Fade */}
            {activeIndex > 0 && (
              <div className="absolute left-0 top-0 h-full w-10 bg-gradient-to-r from-black/80 via-black/30 to-transparent z-10 pointer-events-none" />
            )}

            {/* Right Edge Fade */}
            {activeIndex < testimonials.length - 1 && (
              <div className="absolute right-0 top-0 h-full w-10 bg-gradient-to-l from-black/80 via-black/30 to-transparent z-10 pointer-events-none" />
            )}

            {/* Scrollable Carousel */}
            <div
              ref={carouselRef}
              onScroll={handleScroll}
              className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth touch-pan-x scrollbar-hide pb-2"
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
              }}
            >
              {testimonials.map((testimonial, index) => {
                const IconComponent = testimonial.icon
                return (
                  <div
                    key={index}
                    className="flex-shrink-0 w-[85vw] max-w-[380px] snap-center"
                  >
                    <div className="flex flex-col p-8 rounded-2xl bg-gradient-to-b from-[#0a0a0a] to-transparent border border-[#1a1a1a] h-full">
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
                  </div>
                )
              })}
            </div>
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center gap-2 mt-6" role="tablist" aria-label="Testimonial navigation">
            {testimonials.map((_, index) => (
              <button
                key={index}
                role="tab"
                aria-selected={activeIndex === index}
                aria-label={`Go to testimonial ${index + 1}`}
                onClick={() => scrollToIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${activeIndex === index
                  ? "w-8 bg-[#0bb37a]"
                  : "w-2 bg-white/20 hover:bg-white/40"
                  }`}
              />
            ))}
          </div>

          {/* Optional Chevron Navigation */}
          <div className="flex justify-center gap-4 mt-4">
            <button
              onClick={() => scrollToIndex(Math.max(0, activeIndex - 1))}
              disabled={activeIndex === 0}
              aria-label="Previous testimonial"
              className={`p-2 rounded-full border transition-all ${activeIndex === 0
                ? "border-white/10 text-white/20 cursor-not-allowed"
                : "border-white/20 text-white/60 hover:border-[#0bb37a] hover:text-[#0bb37a]"
                }`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scrollToIndex(Math.min(testimonials.length - 1, activeIndex + 1))}
              disabled={activeIndex === testimonials.length - 1}
              aria-label="Next testimonial"
              className={`p-2 rounded-full border transition-all ${activeIndex === testimonials.length - 1
                ? "border-white/10 text-white/20 cursor-not-allowed"
                : "border-white/20 text-white/60 hover:border-[#0bb37a] hover:text-[#0bb37a]"
                }`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* DESKTOP GRID (>= lg) - UNCHANGED */}
        <div className="hidden lg:grid md:grid-cols-3 gap-8">
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

      {/* Hide scrollbar globally for carousel */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  )
}
