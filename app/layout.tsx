import type React from "react"
import type { Metadata } from "next"
import { Nunito } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { ReferralCheckoutProvider } from "@/components/checkout/referral-checkout-provider"
import "./globals.css"

const nunito = Nunito({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"] })

export const metadata: Metadata = {
  metadataBase: new URL("https://recobratutiempo.com"),
  title: "Recobra tu Tiempo - Bloquea Distracciones",
  description: "La solución física para las distracciones digitales.",
  generator: "v0.app",
  icons: {
    icon: "/favicon.ico",
  },
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
      <head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-6E92KV6CLV"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-6E92KV6CLV');
            `,
          }}
        />
      </head>
      <body className={`font-sans antialiased premium-background`}>
        <ReferralCheckoutProvider>{children}</ReferralCheckoutProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
