"use client"

export function PhoneMockup() {
  return (
    <div className="relative animate-float">
      <div className="absolute inset-0 bg-[#0bb37a]/30 blur-[80px] rounded-full scale-75 animate-pulse-slow" />
      <div className="absolute inset-0 bg-[#0bb37a]/10 blur-[120px] rounded-full scale-100" />

      {/* Phone frame with hover effect */}
      <div className="relative w-[280px] md:w-[320px] h-[560px] md:h-[640px] bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] rounded-[40px] p-3 shadow-2xl shadow-[#0bb37a]/20 border border-[#2a2a2a] transition-transform hover:scale-[1.02] duration-500">
        {/* Dynamic Island */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-7 bg-black rounded-full z-10" />

        <div className="relative w-full h-full bg-[#0a0a0a] rounded-[32px] overflow-hidden">
          <img
            src="recobra-app-screenshot.png"
            alt="Recobra App - Listo para enfocarte"
            className="w-full h-full object-contain pt-8"
          />
        </div>

        {/* Side buttons */}
        <div className="absolute right-[-2px] top-28 w-1 h-12 bg-[#2a2a2a] rounded-l-sm" />
        <div className="absolute left-[-2px] top-24 w-1 h-8 bg-[#2a2a2a] rounded-r-sm" />
        <div className="absolute left-[-2px] top-36 w-1 h-16 bg-[#2a2a2a] rounded-r-sm" />
        <div className="absolute left-[-2px] top-56 w-1 h-16 bg-[#2a2a2a] rounded-r-sm" />
      </div>
    </div>
  )
}
