import { HeroSection } from "@/components/hero-section"
import { HowItWorks } from "@/components/how-it-works"
import { Comparison } from "@/components/comparison"
import { Testimonials } from "@/components/testimonials"
import { Benefits } from "@/components/benefits"
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
      <Benefits />
      <Comparison />
      <Testimonials />
      <FinalCta />
      <FAQ />
      <Footer />
    </main>
  )
}
