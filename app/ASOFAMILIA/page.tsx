import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { AsofamiliaForm } from "@/components/asofamilia-form"

export const metadata = {
    title: "Acceso Anticipado ASOFAMLIA",
    description: "Herramienta de ayuda parental para que tus hijos tengan un uso más consciente del celular.",
}

export default function AsofamiliaPage() {
    return (
        <main className="min-h-screen bg-black text-white selection:bg-[#0BB37A] selection:text-white flex flex-col">
            <Navbar />

            <div className="flex-grow w-full pt-24 pb-10 px-4">
                <div className="w-full h-[80vh] md:h-[90vh]">
                    <AsofamiliaForm />
                </div>
            </div>

            <Footer />
        </main>
    )
}
