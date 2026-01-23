import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Descargar App | Recobra",
    description: "Descarga la aplicación de Recobra y recupera tu tiempo.",
}

export default function AppLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
