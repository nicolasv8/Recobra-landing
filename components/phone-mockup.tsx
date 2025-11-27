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

        {/* Screen */}
        <div className="w-full h-full bg-[#0a0a0a] rounded-[32px] overflow-hidden flex items-center justify-center">
          <div className="w-full h-full bg-gradient-to-b from-[#111] to-[#0a0a0a] flex flex-col items-center justify-center p-6 gap-6 relative overflow-hidden">
            {/* Animated background circles */}
            <div className="absolute top-10 right-10 w-32 h-32 bg-[#0bb37a]/10 rounded-full blur-2xl animate-pulse-slow" />
            <div className="absolute bottom-20 left-5 w-24 h-24 bg-[#0bb37a]/5 rounded-full blur-xl animate-pulse-slow delay-1000" />

            {/* App icon with glow */}
            <div className="relative">
              <div className="absolute inset-0 bg-[#0bb37a]/40 blur-xl rounded-2xl" />
              <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-[#0bb37a] to-[#089d68] flex items-center justify-center shadow-lg">
                <span className="text-black text-3xl font-extrabold">R</span>
              </div>
            </div>

            <div className="text-center z-10">
              <p className="text-white font-bold text-lg">Recobra App</p>
              <p className="text-muted-foreground text-sm mt-1">Retoma el control</p>
            </div>

            {/* Animated stats preview */}
            <div className="w-full max-w-[220px] space-y-3 z-10">
              <div className="bg-[#1a1a1a] rounded-xl p-4 border border-[#2a2a2a]">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-muted-foreground">Tiempo ahorrado hoy</span>
                  <span className="text-[#0bb37a] text-sm font-bold">2h 15m</span>
                </div>
                <div className="h-2 bg-[#0a0a0a] rounded-full overflow-hidden">
                  <div className="h-full w-3/4 bg-gradient-to-r from-[#0bb37a] to-[#0dd98b] rounded-full animate-pulse-slow" />
                </div>
              </div>
              <div className="bg-[#1a1a1a] rounded-xl p-3 border border-[#2a2a2a] flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Apps bloqueadas</span>
                <span className="text-white text-sm font-semibold">5 activas</span>
              </div>
            </div>
          </div>
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
