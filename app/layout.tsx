import type React from "react"
import type { Metadata } from "next"
import { Nunito } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const nunito = Nunito({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"] })

export const metadata: Metadata = {
  title: "Recobra tu Tiempo - Bloquea Distracciones",
  description: "Una tarjeta NFC + app que te ayuda a recuperar el control limitando el uso adictivo del celular.",
  generator: "v0.app",
  // icons: {
  //   icon: "/icon-32x32.png",
  //   apple: "/apple-icon.png",
  // },
  openGraph: {
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Recobra",
      },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
