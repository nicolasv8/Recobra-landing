import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { CheckCircle2, Package, MessageSquare } from "lucide-react"

export const metadata = {
    title: "Gracias por tu compra | Recobra",
    description: "Confirmación de tu pedido de la Tarjeta Recobra.",
}

export default function ThankYouPage() {
    return (
        <main className="min-h-screen bg-black text-white selection:bg-[#0BB37A] selection:text-white">
            <Navbar />

            <div className="container mx-auto px-4 pt-32 pb-20">
                {/* HERO */}
                <section className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16 space-y-6">
                    <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#111111] border border-[#0BB37A] text-[#C8C8C8] text-sm font-medium">
                        Pago recibido
                    </div>

                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
                        ¡Gracias por tu compra!
                    </h1>

                    <div className="text-lg md:text-xl text-[#C8C8C8] leading-relaxed max-w-2xl flex flex-col gap-1">
                        <p>Ya diste el primer paso para recobrar tu tiempo para lo que más importa:</p>
                        <p className="font-semibold text-white text-xl md:text-2xl mt-1">Lo que está fuera de las pantallas</p>
                    </div>
                </section>

                {/* WHAT'S NEXT */}
                <section className="max-w-3xl mx-auto mb-8 bg-[#0a0a0a] rounded-3xl border border-[#2a2a2a] p-8 md:p-10">
                    <h2 className="text-2xl font-bold text-white mb-8 text-center">
                        ¿Qué sigue ahora?
                    </h2>

                    <div className="space-y-8">
                        {/* Step 1 */}
                        <div className="flex gap-4 md:gap-6">
                            <div className="flex-shrink-0 mt-1">
                                <div className="w-8 h-8 rounded-full bg-[#0BB37A]/10 flex items-center justify-center text-[#0BB37A]">
                                    <CheckCircle2 className="w-5 h-5" />
                                </div>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-white mb-2">Paso 1 – Confirmación de tu pedido</h3>
                                <p className="text-[#C8C8C8] leading-relaxed">
                                    Tu pago ha sido procesado correctamente y el pedido quedó registrado con la información que ingresaste durante el pago.
                                </p>
                            </div>
                        </div>

                        {/* Step 2 */}
                        <div className="flex gap-4 md:gap-6">
                            <div className="flex-shrink-0 mt-1">
                                <div className="w-8 h-8 rounded-full bg-[#0BB37A]/10 flex items-center justify-center text-[#0BB37A]">
                                    <Package className="w-5 h-5" />
                                </div>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-white mb-2">Paso 2 – Preparación y envío de tu tarjeta</h3>
                                <p className="text-[#C8C8C8] leading-relaxed">
                                    Ya estamos preparando tu Tarjeta Recobra. La enviaremos al siguiente día hábil a la dirección registrada.
                                </p>
                            </div>
                        </div>

                        {/* Step 3 */}
                        <div className="flex gap-4 md:gap-6">
                            <div className="flex-shrink-0 mt-1">
                                <div className="w-8 h-8 rounded-full bg-[#0BB37A]/10 flex items-center justify-center text-[#0BB37A]">
                                    <MessageSquare className="w-5 h-5" />
                                </div>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-white mb-2">Paso 3 – Te avisaremos si hay novedades</h3>
                                <p className="text-[#C8C8C8] leading-relaxed">
                                    Si es necesario, nos comunicaremos por correo o WhatsApp para actualizarte sobre el envío. También puedes contactarnos directamente a recobratutiempo@gmail.com en cualquier momento.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* PURPOSE SECTION */}
                <section className="max-w-3xl mx-auto mb-16 bg-[#0a0a0a] rounded-3xl border border-[#2a2a2a] p-8 md:p-10 text-center">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6">
                        Recobra tu tiempo, Recobra tu mente
                    </h2>
                    <div className="space-y-4 text-[#C8C8C8] max-w-2xl mx-auto">
                        <p>
                            Nuestros celulares están diseñados para capturar la atención en piloto automático. Gracias por dar este paso activo para reducir tus distracciones digitales.
                        </p>
                        <p className="font-medium text-white pt-2 italic">
                            "Lo que más importa está fuera de tu pantalla. Gracias por confiar en Recobra para acompañarte en este cambio."
                        </p>
                    </div>
                </section>

                {/* CTA */}
                <div className="text-center">
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center px-8 py-3 rounded-full border border-[#0BB37A] text-[#0BB37A] font-semibold bg-black hover:bg-[#0BB37A]/10 transition-colors duration-300"
                    >
                        Volver a la página principal
                    </Link>
                </div>

            </div>

            <Footer />
        </main>
    )
}
