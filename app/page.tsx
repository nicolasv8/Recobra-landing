import { HeroSection } from "@/components/hero-section"
import { HowItWorks } from "@/components/how-it-works"
import { WhyRecobra } from "@/components/why-recobra"
import { Testimonials } from "@/components/testimonials"
import { FAQ } from "@/components/faq"
import { FinalCta } from "@/components/final-cta"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <HowItWorks />
      <WhyRecobra />

      <Testimonials />
      <FinalCta />
      <FAQ />
      <Footer />
    </main>
  )
}
