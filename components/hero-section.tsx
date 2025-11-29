"use client"

import { Button } from "@/components/ui/button"
import { PhoneMockup } from "@/components/phone-mockup"
import { WaitlistModal } from "@/components/waitlist-modal"
import { ArrowRight, Focus, Heart, Users } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative min-h-screen pt-24 pb-16 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0bb37a]/8 via-transparent to-transparent" />
      <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-[#0bb37a]/5 blur-[150px] rounded-full -translate-x-1/2" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#0bb37a]/10 blur-[120px] rounded-full translate-x-1/3 translate-y-1/3" />

      {/* Subtle grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center min-h-[calc(100vh-6rem)]">
          {/* Left Content */}
          <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-left-8 duration-700">
            <div className="inline-flex items-center gap-2 bg-[#0bb37a]/10 border border-[#0bb37a]/20 rounded-full px-4 py-2 w-fit">
              <span className="w-2 h-2 bg-[#0bb37a] rounded-full animate-pulse" />
              <span className="text-sm text-[#0bb37a] font-medium">Próximamente disponible</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold text-white leading-[1.05] tracking-tight">
              Recobra tu{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0bb37a] to-[#0dd98b]">tiempo</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-xl leading-relaxed">
              Una solución física para una vida digital saludable.
              <span className="text-white font-medium"> Tarjeta + App para eliminar tus distracciones.</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-2">
              <WaitlistModal>
                <Button
                  size="lg"
                  className="bg-[#0bb37a] hover:bg-[#0dd98b] text-black font-bold rounded-full px-8 py-7 text-lg shadow-lg shadow-[#0bb37a]/30 hover:shadow-[#0bb37a]/40 transition-all hover:scale-105 group"
                >
                  Reservar tarjeta
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </WaitlistModal>
              <Button
                variant="outline"
                size="lg"
                className="rounded-full px-8 py-7 text-lg border-white/20 text-white hover:bg-white/10 hover:text-white bg-transparent hover:border-white/30 transition-all"
                onClick={() => {
                  const element = document.getElementById("como-funciona");
                  element?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
              >
                Ver cómo funciona
              </Button>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 sm:gap-10 mt-6 pt-6 border-t border-white/10">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#0bb37a]/10 flex items-center justify-center flex-shrink-0">
                  <Focus className="w-5 h-5 text-[#0bb37a]" />
                </div>
                <div className="flex flex-col">
                  <span className="text-white font-bold">Concentración</span>
                  <span className="text-sm text-muted-foreground">
                    Toca la tarjeta y bloquea apps distractivas,{" "}
                    <span className="text-[#0bb37a] font-semibold">de verdad</span>
                  </span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#0bb37a]/10 flex items-center justify-center flex-shrink-0">
                  <Users className="w-5 h-5 text-[#0bb37a]" />
                </div>
                <div className="flex flex-col">
                  <span className="text-white font-bold">Conexión</span>
                  <span className="text-sm text-muted-foreground">
                    Con lo que más importa, <span className="text-[#0bb37a] font-semibold">fuera de tu celular</span>
                  </span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#0bb37a]/10 flex items-center justify-center flex-shrink-0">
                  <Heart className="w-5 h-5 text-[#0bb37a]" />
                </div>
                <div className="flex flex-col">
                  <span className="text-white font-bold">Bienestar</span>
                  <span className="text-sm text-muted-foreground">
                    Vuelve a sentirte bien.{" "}
                    <span className="text-[#0bb37a] font-semibold">Menos ansiedad, más presencia</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Phone Mockup */}
          <div className="flex justify-center lg:justify-end animate-in fade-in slide-in-from-right-8 duration-700 delay-200">
            <PhoneMockup />
          </div>
        </div>
      </div>
    </section>
  )
}
