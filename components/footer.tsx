import { Instagram } from "lucide-react"

export function Footer() {
  return (
    <footer className="py-12 border-t border-[#1a1a1a]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <a href="#" className="text-xl font-bold text-white">
            <span className="text-[#0bb37a]">Re</span>cobra
          </a>

          {/* Links */}
          <div className="flex items-center gap-6 text-sm">
            <a href="/privacidad" className="text-muted-foreground hover:text-white transition-colors">
              Privacidad
            </a>
            <a href="mailto:recobratutiempo@gmail.com" className="text-muted-foreground hover:text-white transition-colors">
              Contacto
            </a>
          </div>

          {/* Socials */}
          <div className="flex items-center gap-4">
            <a
              href="https://www.instagram.com/recobratutiempo/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-white transition-colors"
            >
              <Instagram size={20} />
            </a>
            <a
              href="https://www.tiktok.com/@recobratutiempo"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-white transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
              </svg>
            </a>
          </div>

          {/* Copyright */}
          <p className="text-muted-foreground text-sm">© 2025 Recobra. Hecho por Nico y Damián para tu bienestar.</p>
        </div>
      </div>
    </footer>
  )
}
