"use client"

import { Button } from "@/components/ui/button"
import { PhoneMockup } from "@/components/phone-mockup"
import { ArrowRight, Focus, Heart, Users } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative min-h-screen pt-32 pb-12 overflow-hidden flex flex-col items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0bb37a]/8 via-transparent to-transparent" />
      <div className="absolute top-0 left-1/2 w-[800px] h-[800px] bg-[#0bb37a]/5 blur-[150px] rounded-full -translate-x-1/2" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#0bb37a]/10 blur-[120px] rounded-full translate-x-1/3 translate-y-1/3" />

      {/* Subtle grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />

      <div className="relative max-w-7xl mx-auto px-6 w-full">
        <div className="flex flex-col items-center text-center gap-12">
          {/* Content */}
          <div className="flex flex-col items-center gap-8 animate-in fade-in slide-in-from-bottom-8 duration-700 max-w-4xl mx-auto">

            {/* Shipping Banner */}
            <div className="inline-flex flex-wrap justify-center items-center gap-x-4 gap-y-2 text-sm md:text-base font-medium text-white bg-white/5 border border-white/10 rounded-full px-6 py-2 backdrop-blur-sm">
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

            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl leading-relaxed">
              <span className="text-white block mb-1">Una tarjeta que bloquea tus distracciones de verdad</span>
              <span className="text-white block mb-1">Bloquea Instagram, TikTok y  </span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-2 w-full sm:w-auto">
              <Button
                asChild
                size="lg"
                className="bg-[#0bb37a] hover:bg-[#0dd98b] text-black font-bold rounded-full px-12 py-8 text-xl shadow-lg shadow-[#0bb37a]/30 hover:shadow-[#0bb37a]/40 transition-all hover:scale-105 group"
              >
                <a href="https://checkout.wompi.co/l/V5u4U0">
                  Compra ahora
                  <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-10 mt-6 pt-6 border-t border-white/10 w-full max-w-3xl">
              <div className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#0bb37a]/10 flex items-center justify-center flex-shrink-0">
                  <Focus className="w-6 h-6 text-[#0bb37a]" />
                </div>
                <div className="flex flex-col">
                  <span className="text-white font-bold">Concentración</span>
                  <span className="text-sm text-muted-foreground">Bloquea apps distractivas</span>
                </div>
              </div>
              <div className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#0bb37a]/10 flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-[#0bb37a]" />
                </div>
                <div className="flex flex-col">
                  <span className="text-white font-bold">Conexión</span>
                  <span className="text-sm text-muted-foreground">Con lo que más importa</span>
                </div>
              </div>
              <div className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#0bb37a]/10 flex items-center justify-center flex-shrink-0">
                  <Heart className="w-6 h-6 text-[#0bb37a]" />
                </div>
                <div className="flex flex-col">
                  <span className="text-white font-bold">Bienestar</span>
                  <span className="text-sm text-muted-foreground">Menos ansiedad, más vida</span>
                </div>
              </div>
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
