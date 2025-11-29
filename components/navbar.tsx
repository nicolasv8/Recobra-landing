"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { WaitlistModal } from "@/components/waitlist-modal"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <a href="#" className="flex items-center gap-2">
            <img src="recobra-logo.png" alt="Recobra" className="w-9 h-9" />
            <span className="text-2xl font-bold text-white">Recobra</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a 
              href="#como-funciona" 
              className="text-muted-foreground hover:text-white transition-colors"
              onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById("como-funciona");
                element?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
            >
              Cómo funciona
            </a>
            <a 
              href="#beneficios" 
              className="text-muted-foreground hover:text-white transition-colors"
              onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById("beneficios");
                element?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
            >
              Beneficios
            </a>
            <a 
              href="#faq" 
              className="text-muted-foreground hover:text-white transition-colors"
              onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById("faq");
                element?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
            >
              Preguntas frecuentes
            </a>
            <WaitlistModal>
              <Button className="bg-[#0bb37a] hover:bg-[#0bb37a]/90 text-white rounded-full px-6">
                Reservar tarjeta
              </Button>
            </WaitlistModal>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 flex flex-col gap-4 animate-in fade-in slide-in-from-top-2 duration-200">
            <a
              href="#como-funciona"
              className="text-muted-foreground hover:text-white transition-colors py-2"
              onClick={(e) => {
                e.preventDefault();
                setIsOpen(false);
                const element = document.getElementById("como-funciona");
                element?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
            >
              Cómo funciona
            </a>
            <a
              href="#beneficios"
              className="text-muted-foreground hover:text-white transition-colors py-2"
              onClick={(e) => {
                e.preventDefault();
                setIsOpen(false);
                const element = document.getElementById("beneficios");
                element?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
            >
              Beneficios
            </a>
            <a
              href="#faq"
              className="text-muted-foreground hover:text-white transition-colors py-2"
              onClick={(e) => {
                e.preventDefault();
                setIsOpen(false);
                const element = document.getElementById("faq");
                element?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
            >
              Preguntas frecuentes
            </a>
            <WaitlistModal>
              <Button 
                className="bg-[#0bb37a] hover:bg-[#0bb37a]/90 text-white rounded-full w-full mt-2"
                onClick={() => setIsOpen(false)}
              >
                Reservar tarjeta
              </Button>
            </WaitlistModal>
          </div>
        )}
      </div>
    </nav>
  )
}
