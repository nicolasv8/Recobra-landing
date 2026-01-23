"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"

export function WhyRecobra() {
    const [mode, setMode] = useState<'con' | 'sin'>('con')
    const [hasInteracted, setHasInteracted] = useState(false)
    const [touchStart, setTouchStart] = useState<number | null>(null)
    const [touchEnd, setTouchEnd] = useState<number | null>(null)
    const [dragOffset, setDragOffset] = useState(0)

    // Touch handlers for swipe interaction
    const minSwipeDistance = 50

    const onTouchStart = (e: React.TouchEvent) => {
        setTouchEnd(null)
        setTouchStart(e.targetTouches[0].clientX)
    }

    const onTouchMove = (e: React.TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX)
        if (touchStart !== null) {
            const currentTouch = e.targetTouches[0].clientX
            // Calculate drag offset for visual feedback (limited to +/- 30px)
            const diff = currentTouch - touchStart
            // Damping the drag
            setDragOffset(Math.max(Math.min(diff * 0.4, 30), -30))
        }
    }

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) {
            // Reset if simply a tap or no movement
            setDragOffset(0)
            return
        }

        const distance = touchStart - touchEnd
        const isLeftSwipe = distance > minSwipeDistance
        const isRightSwipe = distance < -minSwipeDistance

        if (isLeftSwipe && mode === 'con') {
            setMode('sin')
            setHasInteracted(true)
        }
        if (isRightSwipe && mode === 'sin') {
            setMode('con')
            setHasInteracted(true)
        }

        // Reset state
        setTouchStart(null)
        setTouchEnd(null)
        setDragOffset(0)
    }

    const handleToggle = (newMode: 'con' | 'sin') => {
        setMode(newMode)
        setHasInteracted(true)
    }

    return (
        <section className="py-6 md:py-32 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">

                {/* Header - Compact on mobile */}
                <div className="text-center mb-4 md:mb-24">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-1.5 md:mb-4">¿Por qué Recobra?</h2>
                    <p className="text-muted-foreground text-sm md:text-xl max-w-2xl mx-auto leading-tight md:leading-normal">
                        Porque tus distracciones no deberían poder saltarse con un click.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                    {/* Left Column: Copy & Context (Common) */}
                    <div className="flex flex-col gap-6 md:gap-8 order-2 lg:order-1 text-center lg:text-left">
                        <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                            Dile adiós al <span className="text-[#0bb37a]">'solo un minuto más'</span> <br /> y al scroll eterno
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

                        {/* 
                            MOBILE VIEW OPTIMIZATION (< lg):
                            - Removed outer gap-1.5, using explicit spacing per element
                            - Hint: no extra mb, sits directly above toggle
                            - Toggle: mb-2 creates tight connection to phone
                            - Phone: h-[50vh] max-h-[440px] for controlled, larger presence
                            - Bullets: -mt-3 pulls them closer to phone (attached feel)
                        */}
                        <div className="flex flex-col items-center w-full max-w-sm lg:hidden">

                            {/* Comparison Hint - Always visible */}
                            <div className="text-[#0bb37a] text-[10px] font-medium tracking-wide flex items-center gap-1 animate-pulse">
                                <span>Desliza para comparar</span>
                                <ArrowRight className="w-2.5 h-2.5" />
                            </div>

                            {/* Toggle Control */}
                            <div className="flex p-0.5 bg-white/5 rounded-full border border-white/10 w-full max-w-[260px] mb-2" role="tablist">
                                <button
                                    role="tab"
                                    aria-selected={mode === 'con'}
                                    onClick={() => handleToggle('con')}
                                    className={`flex-1 py-1 text-xs font-bold rounded-full transition-all duration-300 ${mode === 'con'
                                            ? "bg-[#0bb37a] text-black shadow-lg shadow-[#0bb37a]/20"
                                            : "text-muted-foreground hover:text-white"
                                        }`}
                                >
                                    Con Recobra
                                </button>
                                <button
                                    role="tab"
                                    aria-selected={mode === 'sin'}
                                    onClick={() => handleToggle('sin')}
                                    className={`flex-1 py-1 text-xs font-bold rounded-full transition-all duration-300 ${mode === 'sin'
                                            ? "bg-white text-black shadow-lg"
                                            : "text-muted-foreground hover:text-white"
                                        }`}
                                >
                                    Sin Recobra
                                </button>
                            </div>

                            {/* Single Mockup Viewport (Swipeable) - Fixed height for better control */}
                            <div
                                className="relative w-full h-[50vh] max-h-[440px] flex items-center justify-center touch-pan-y"
                                onTouchStart={onTouchStart}
                                onTouchMove={onTouchMove}
                                onTouchEnd={onTouchEnd}
                            >
                                {/* Swipe container with drag feedback */}
                                <div
                                    className="relative w-full h-full transition-transform duration-75 ease-out"
                                    style={{ transform: `translateX(${dragOffset}px)` }}
                                >
                                    {/* Con Recobra Image */}
                                    <img
                                        src="/mockup-con-recobra.png"
                                        alt="iPhone con Recobra"
                                        draggable="false"
                                        className={`absolute inset-0 w-full h-full object-contain drop-shadow-2xl transition-all duration-500 transform ${mode === 'con' ? "opacity-100 scale-100 translate-x-0" : "opacity-0 scale-95 -translate-x-8 pointer-events-none"
                                            }`}
                                    />

                                    {/* Sin Recobra Image */}
                                    <img
                                        src="/mockup-sin-recobra.png"
                                        alt="iPhone sin Recobra"
                                        draggable="false"
                                        className={`absolute inset-0 w-full h-full object-contain drop-shadow-2xl transition-all duration-500 transform ${mode === 'sin' ? "opacity-100 scale-100 translate-x-0" : "opacity-0 scale-95 translate-x-8 pointer-events-none"
                                            }`}
                                    />
                                </div>

                                {/* Micro-affordance chevrons */}
                                {!hasInteracted && (
                                    <>
                                        {mode === 'sin' && (
                                            <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 text-white/10 animate-pulse">
                                                <ChevronLeft className="w-6 h-6" />
                                            </div>
                                        )}
                                        {mode === 'con' && (
                                            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 text-white/10 animate-pulse">
                                                <ChevronRight className="w-6 h-6" />
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>

                            {/* Dynamic Bullets - Pulled closer to phone */}
                            <div className="w-full min-h-[40px] -mt-3">
                                {mode === 'con' ? (
                                    <div className="space-y-1 animate-in fade-in slide-in-from-left-4 duration-300">
                                        <div className="flex items-start gap-2">
                                            <div className="w-1 h-1 rounded-full bg-[#0bb37a] mt-1.5 flex-shrink-0" />
                                            <p className="text-white text-[11px] font-medium leading-tight">El desbloqueo está protegido por la tarjeta física.</p>
                                        </div>
                                        <div className="flex items-start gap-2">
                                            <div className="w-1 h-1 rounded-full bg-[#0bb37a] mt-1.5 flex-shrink-0" />
                                            <p className="text-white text-[11px] font-medium leading-tight">Desbloquea con intención, no por impulso.</p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="space-y-1 animate-in fade-in slide-in-from-right-4 duration-300">
                                        <div className="flex items-start gap-2">
                                            <div className="w-1 h-1 rounded-full bg-red-500 mt-1.5 flex-shrink-0" />
                                            <p className="text-white text-[11px] font-medium leading-tight">El 'escape' está a un toque: 'solo un minuto más'.</p>
                                        </div>
                                        <div className="flex items-start gap-2">
                                            <div className="w-1 h-1 rounded-full bg-red-500 mt-1.5 flex-shrink-0" />
                                            <p className="text-white text-[11px] font-medium leading-tight">Perfecto para recaer por impulso.</p>
                                        </div>
                                    </div>
                                )}
                            </div>

                        </div>

                        {/* --- DESKTOP VIEW (>= lg) - UNTOUCHED --- */}
                        {/* Note: Kept strictly separate to prevent regression */}
                        <div className="hidden lg:flex flex-col sm:flex-row items-center justify-center gap-12 lg:gap-16 relative w-full max-w-4xl mx-auto">

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

