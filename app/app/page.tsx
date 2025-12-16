"use client"

import { useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"

// CONFIGURATION
// Define the App Store URL here for manual switch.
// When the app is approved, change null to the actual URL string.
// Example: const APP_STORE_URL = "https://apps.apple.com/us/app/recobra/id123456789";
const APP_STORE_URL: string | null = null;

export default function AppPage() {

    useEffect(() => {
        if (APP_STORE_URL) {
            // Automatic redirect logic for static export
            // Using replace to avoid history stack issues so user can't click "back" to this redirect page
            window.location.replace(APP_STORE_URL);
        }
    }, [])

    // Case 1: Post-approval (Redirecting state)
    if (APP_STORE_URL) {
        return (
            <main className="min-h-screen bg-black text-white selection:bg-[#0BB37A] selection:text-white flex flex-col">
                <Navbar />

                <div className="flex-grow flex flex-col items-center justify-center pt-24 pb-10 px-4">
                    <div className="text-center space-y-6">
                        <h1 className="text-3xl md:text-5xl font-bold tracking-tight animate-pulse">
                            Redirigiendo a la App Store...
                        </h1>
                        <p className="text-xl text-gray-400 max-w-lg mx-auto">
                            Si no eres redirigido automáticamente, haz clic en el botón.
                        </p>
                        <Button
                            asChild
                            size="lg"
                            className="text-lg px-8 py-6 rounded-full bg-[#0BB37A] hover:bg-[#0aa16d] text-white font-bold transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(11,179,122,0.3)] hover:shadow-[0_0_30px_rgba(11,179,122,0.5)]"
                        >
                            <a href={APP_STORE_URL}>
                                Descargar la App
                            </a>
                        </Button>
                    </div>
                </div>

                <Footer />
            </main>
        )
    }

    // Case 2: Pre-approval (Temporary Page)
    return (
        <main className="min-h-screen bg-black text-white selection:bg-[#0BB37A] selection:text-white flex flex-col">
            <Navbar />

            <div className="flex-grow flex flex-col items-center justify-center pt-24 pb-10 px-4">
                <div className="text-center space-y-6">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                        Recobra tu Tiempo
                    </h1>
                    <p className="text-xl text-gray-400 max-w-lg mx-auto">
                        La solución física para las distracciones digitales.
                    </p>
                    <Button
                        asChild
                        size="lg"
                        className="text-lg px-8 py-6 rounded-full bg-[#0BB37A] hover:bg-[#0aa16d] text-white font-bold transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(11,179,122,0.3)] hover:shadow-[0_0_30px_rgba(11,179,122,0.5)]"
                    >
                        {/* Fallback to Home since App Store link isn't ready */}
                        <Link href="/">
                            Descargar la app
                        </Link>
                    </Button>
                </div>
            </div>

            <Footer />
        </main>
    )
}
