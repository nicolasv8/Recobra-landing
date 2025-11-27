import { HeroSection } from "@/components/hero-section"
import { HowItWorks } from "@/components/how-it-works"
import { NfcCard } from "@/components/nfc-card"
import { Benefits } from "@/components/benefits"
import { FinalCta } from "@/components/final-cta"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <HowItWorks />
      <NfcCard />
      <Benefits />
      <FinalCta />
      <Footer />
    </main>
  )
}
