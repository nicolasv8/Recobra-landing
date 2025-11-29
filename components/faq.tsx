"use client"

import { useEffect, useRef, useState } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: "¿Cómo funciona el bloqueo con la tarjeta NFC?",
    answer:
      "Cuando acercas la tarjeta Recobra a tu celular, la app detecta el chip NFC y activa inmediatamente el bloqueo de las aplicaciones que hayas seleccionado. El bloqueo es real y no se puede desactivar fácilmente como otras apps.",
  },
  {
    question: "¿Es compatible con mi celular?",
    answer:
      "Recobra es compatible con la mayoría de smartphones Android con NFC (Android 8.0 o superior) y iPhones (iPhone 7 o superior con iOS 13+). Puedes verificar si tu celular tiene NFC en la configuración.",
  },
  {
    question: "¿Puedo elegir qué apps bloquear?",
    answer:
      "Sí, tienes control total. Puedes seleccionar exactamente qué aplicaciones quieres bloquear durante tus sesiones de enfoque. Puedes crear diferentes perfiles para trabajo, estudio o tiempo personal.",
  },
  {
    question: "¿Qué pasa si pierdo mi tarjeta?",
    answer:
      "No te preocupes. Puedes desactivar tu tarjeta perdida desde la app y solicitar una tarjeta de reemplazo. También puedes configurar un código de emergencia para casos excepcionales.",
  },
  {
    question: "¿Cuánto dura una sesión de bloqueo?",
    answer:
      "Tú decides la duración. Puedes configurar sesiones desde 15 minutos hasta varias horas. También puedes programar bloqueos automáticos en horarios específicos.",
  },
  {
    question: "¿Puedo usar Recobra sin la tarjeta física?",
    answer:
      "La tarjeta NFC es parte esencial de la experiencia Recobra. El acto físico de tocar la tarjeta crea un ritual que refuerza tu intención de enfocarte. Sin embargo, también puedes iniciar sesiones desde la app.",
  },
]

export function FAQ() {
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
    <section id="faq" className="py-16 md:py-24 relative" ref={sectionRef}>
      <div className="max-w-3xl mx-auto px-6">
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Preguntas frecuentes</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Todo lo que necesitas saber sobre Recobra</p>
        </div>

        <div
          className={`transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border border-[#1a1a1a] rounded-xl px-6 bg-gradient-to-b from-[#0a0a0a] to-transparent data-[state=open]:border-[#0bb37a]/30"
              >
                <AccordionTrigger className="text-white text-left font-semibold hover:text-[#0bb37a] hover:no-underline py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-6 leading-relaxed">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
