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
            <a href="#" className="text-muted-foreground hover:text-white transition-colors">
              Privacidad
            </a>
            <a href="#" className="text-muted-foreground hover:text-white transition-colors">
              Términos
            </a>
            <a href="#" className="text-muted-foreground hover:text-white transition-colors">
              Contacto
            </a>
          </div>

          {/* Copyright */}
          <p className="text-muted-foreground text-sm">© 2025 Recobra. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
