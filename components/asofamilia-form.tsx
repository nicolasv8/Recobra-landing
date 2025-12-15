"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Script from "next/script"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function AsofamiliaForm() {
    const [isSubmitted, setIsSubmitted] = useState(false)

    useEffect(() => {
        const handleMessage = (e: MessageEvent) => {
            // Tally sends data that might be a string or object.
            // Based on docs, it's safer to check both or stringify.
            if (e?.data) {
                if (typeof e.data === 'string' && e.data.includes('Tally.FormSubmitted')) {
                    setIsSubmitted(true);
                } else if (typeof e.data === 'object' && e.data.event === 'Tally.FormSubmitted') {
                    setIsSubmitted(true);
                }
            }
        }

        window.addEventListener("message", handleMessage)
        return () => window.removeEventListener("message", handleMessage)
    }, [])

    if (isSubmitted) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-8 animate-in fade-in duration-500 max-w-4xl mx-auto px-4">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
                    ¡Gracias por tu interés en{" "}
                    <span className="text-[#0bb37a]">Recobra</span>!
                </h1>

                <p className="text-xl text-muted-foreground w-full max-w-2xl leading-relaxed">
                    Te contactaremos en cuanto Recobra esté disponible. Estimamos hacer las primeras entregas en ~2 semanas.
                </p>

                <Link href="/" passHref>
                    <Button
                        size="lg"
                        className="bg-[#0bb37a] hover:bg-[#0dd98b] text-black font-bold rounded-full px-8 py-7 text-lg shadow-lg shadow-[#0bb37a]/30 hover:shadow-[#0bb37a]/40 transition-all hover:scale-105 group"
                    >
                        Conoce más sobre Recobra
                        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                </Link>
            </div>
        )
    }

    return (
        <div className="w-full h-full relative">
            <iframe
                data-tally-src="https://tally.so/r/0Qd4aj?transparentBackground=1"
                width="100%"
                height="100%"
                frameBorder="0"
                marginHeight={0}
                marginWidth={0}
                title="Acceso Anticipado ASOFAMLIA"
                className="absolute inset-0"
            ></iframe>
            <Script src="https://tally.so/widgets/embed.js" strategy="lazyOnload" />
        </div>
    )
}
