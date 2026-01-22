"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Image from "next/image"

export function WhyRecobra() {
    return (
        <section className="py-20 md:py-32 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">

                {/* Header */}
                <div className="text-center mb-16 md:mb-24">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">¿Por qué Recobra?</h2>
                    <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto">
                        Porque tus distracciones no deberían poder saltarse con un click.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                    {/* Left Column: Copy & Context */}
                    <div className="flex flex-col gap-8 order-2 lg:order-1 text-center lg:text-left">
                        <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                            Dile adiós al <span className="text-[#0bb37a]">'solo un minuto más'</span> <br />
                            scroll eterno
                        </h3>

                        <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                            <p>
                                <span className="text-white font-medium">Con Recobra, el desbloqueo está protegido por la tarjeta física</span>, ayudándote a desbloquear con intención y conciencia.
                            </p>
                        </div>

                        <p className="text-sm text-[#0bb37a] font-medium italic">
                            Recobra hace más difícil recaer al quitar el 'escape' de la pantalla.
                        </p>

                        <div className="pt-4 flex justify-center lg:justify-start">
                            <Button
                                asChild
                                size="lg"
                                className="bg-[#0bb37a] hover:bg-[#0dd98b] text-black font-bold rounded-full px-10 py-6 h-auto text-lg shadow-lg shadow-[#0bb37a]/20 hover:shadow-[#0bb37a]/30 transition-all hover:scale-105 group"
                            >
                                <a href="https://checkout.wompi.co/l/V5u4U0">
                                    Compra • $89.900
                                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </a>
                            </Button>
                        </div>
                    </div>

                    {/* Right Column: Comparison Mockups */}
                    <div className="order-1 lg:order-2 flex flex-col items-center">

                        {/* Mobile: Vertical Stack / Desktop: Side by Side (Sort of) */}
                        {/* Design request: 
                Mobile: A -> VS -> B
                Desktop: Side by Side
            */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-12 lg:gap-16 relative w-full max-w-4xl mx-auto">

                            {/* Con Recobra (Left/Top) */}
                            <div className="flex flex-col items-center gap-6 relative z-10 w-full sm:w-1/2 max-w-[320px] group">
                                {/* Glow Effect */}
                                <div className="absolute inset-0 bg-[#0bb37a]/25 blur-[60px] rounded-full scale-110 -z-10 opacity-60 group-hover:opacity-100 transition-opacity duration-700" />

                                {/* Label Pill */}
                                <div className="bg-[#0bb37a] text-black px-6 py-2 rounded-full text-sm font-bold shadow-[0_0_20px_-5px_#0bb37a] transform transition-transform group-hover:scale-105">
                                    Con Recobra
                                </div>

                                {/* Floating Phone Image */}
                                <div className="relative w-full transform transition-transform duration-500 group-hover:-translate-y-2 group-hover:scale-[1.02]">
                                    <img
                                        src="/mockup-con-recobra.png"
                                        alt="iPhone screen con Recobra"
                                        className="w-full h-auto object-contain drop-shadow-2xl rounded-[40px]"
                                    />
                                </div>
                            </div>

                            {/* VS Badge */}
                            <div className="z-20 flex-shrink-0 w-16 h-16 bg-[#0a0a0a] border-2 border-white/10 rounded-full flex items-center justify-center shadow-[0_0_30px_-5px_rgba(0,0,0,0.8)] sm:absolute sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 my-4 sm:my-0">
                                <span className="text-white font-black text-lg italic">VS</span>
                            </div>

                            {/* Sin Recobra (Right/Bottom) */}
                            <div className="flex flex-col items-center gap-6 relative z-10 w-full sm:w-1/2 max-w-[320px] group">
                                {/* Glow Effect */}
                                <div className="absolute inset-0 bg-white/5 blur-[60px] rounded-full scale-110 -z-10 opacity-40 group-hover:opacity-60 transition-opacity duration-700" />

                                {/* Label Pill */}
                                <div className="bg-white/10 border border-white/10 text-gray-200 px-6 py-2 rounded-full text-sm font-medium backdrop-blur-sm">
                                    Sin Recobra
                                </div>

                                {/* Floating Phone Image */}
                                <div className="relative w-full transform transition-transform duration-500 group-hover:-translate-y-2 group-hover:scale-[1.02]">
                                    <img
                                        src="/mockup-sin-recobra.png"
                                        alt="iPhone screen sin Recobra"
                                        className="w-full h-auto object-contain drop-shadow-2xl rounded-[40px] opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                                    />
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}
