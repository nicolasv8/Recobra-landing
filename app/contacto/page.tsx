import { Navbar } from "@/components/navbar"
import Script from "next/script"

export const metadata = {
    title: "Contacto | Recobra",
    description: "Contáctanos para soporte o dudas sobre tu pedido.",
}

export default function ContactoPage() {
    return (
        <main className="min-h-screen bg-black text-white selection:bg-[#0BB37A] selection:text-white flex flex-col">
            <Navbar />

            <div className="flex-grow w-full pt-24 pb-10 px-4">
                <div className="w-full h-[80vh] md:h-[90vh]">
                    <iframe
                        data-tally-src="https://tally.so/r/1AXogW?transparentBackground=1"
                        width="100%"
                        height="100%"
                        frameBorder="0"
                        marginHeight={0}
                        marginWidth={0}
                        title="Soporte Recobra"
                    ></iframe>
                </div>
            </div>

            <Script src="https://tally.so/widgets/embed.js" strategy="lazyOnload" />
        </main>
    )
}
