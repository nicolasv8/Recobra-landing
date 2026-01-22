"use client"

import { Button } from "@/components/ui/button"
import { PhoneMockup } from "@/components/phone-mockup"
import { ArrowRight, Focus, Heart, Users } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative min-h-screen pt-32 pb-8 overflow-hidden flex flex-col items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0bb37a]/8 via-transparent to-transparent" />
      <div className="absolute top-0 left-1/2 w-[800px] h-[800px] bg-[#0bb37a]/5 blur-[150px] rounded-full -translate-x-1/2" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#0bb37a]/10 blur-[120px] rounded-full translate-x-1/3 translate-y-1/3" />

      {/* Subtle grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />

      <div className="relative max-w-7xl mx-auto px-6 w-full">
        <div className="flex flex-col items-center text-center gap-8">
          {/* Content */}
          <div className="flex flex-col items-center gap-6 md:gap-8 animate-in fade-in slide-in-from-bottom-8 duration-700 max-w-4xl mx-auto w-full">

            {/* Shipping Banner */}
            <div className="inline-flex flex-wrap justify-center items-center gap-x-4 gap-y-2 text-sm md:text-base font-medium text-white bg-white/5 border border-white/10 rounded-full px-5 py-1.5 md:px-6 md:py-2 backdrop-blur-sm">
              <span>Envío gratis en todo Colombia</span>
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-[#0bb37a] rounded-full animate-pulse" />
                Disponible para iPhone
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold text-white leading-[1.05] tracking-tight">
              <span className="text-[#0bb37a]">Re</span>cobra tu{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0bb37a] to-[#0dd98b]">tiempo</span>
            </h1>

            <div className="flex flex-col gap-2 text-center">
              <p className="text-xl md:text-2xl text-white font-medium leading-tight">
                La solución física para una vida digital saludable
              </p>
              <p className="text-lg md:text-xl text-muted-foreground">
                Bloquea tus apps distractoras con una tarjeta física
              </p>
            </div>

            <div className="flex flex-col items-center gap-4 w-full sm:w-auto mt-2">
              {/* Buy-line */}
              <div className="text-center space-y-1.5 text-sm md:text-base">
                <p className="text-gray-200 font-medium">
                  $89.900 COP <span className="text-gray-500">·</span> Acceso de por vida <span className="text-gray-500">·</span> Envío gratis
                </p>
                <p className="text-muted-foreground text-xs md:text-sm">
                  Entrega: 1 día Medellín/Bogotá <span className="text-gray-600">·</span> 3 días resto
                </p>
              </div>

              {/* CTA Button */}
              <Button
                asChild
                size="lg"
                className="bg-[#0bb37a] hover:bg-[#0dd98b] text-black font-bold rounded-full px-10 py-6 h-auto text-lg md:text-xl shadow-[0_0_20px_-5px_rgba(11,179,122,0.3)] hover:shadow-[0_0_25px_-5px_rgba(11,179,122,0.4)] transition-all hover:scale-105 group w-full sm:w-auto"
              >
                <a href="https://checkout.wompi.co/l/V5u4U0" className="flex items-center justify-center">
                  Compra ahora
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>

              {/* Microcopy */}
              <div className="text-center space-y-1.5 pt-1">
                <p className="text-gray-300 text-sm font-medium">
                  Pruébala 30 días sin riesgo.
                </p>
                <p className="text-muted-foreground text-xs md:text-sm">
                  ⭐️ 26 usuarios ya están recobrando concentración y presencia.
                </p>
              </div>
            </div>

            {/* Horizontal Chips */}
            <div className="flex flex-wrap justify-center gap-3 mt-4 w-full">
              {[
                "Más concentración",
                "Más presencia",
                "Menos ansiedad",
              ].map((text, i) => (
                <div key={i} className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm shadow-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#0bb37a] shadow-[0_0_8px_rgba(11,179,122,0.6)]" />
                  <span className="text-sm font-medium text-gray-200">{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Phone Mockup - Centered */}
          <div className="flex justify-center w-full max-w-[300px] sm:max-w-[350px] md:max-w-[400px] lg:max-w-none animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-200">
            <PhoneMockup />
          </div>
        </div>
      </div>
    </section>
  )
}
