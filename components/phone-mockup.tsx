"use client"

export function PhoneMockup() {
  return (
    <div className="relative animate-float flex justify-center items-center">
      <div className="absolute inset-0 bg-[#0bb37a]/30 blur-[80px] rounded-full scale-75 animate-pulse-slow" />
      <div className="absolute inset-0 bg-[#0bb37a]/10 blur-[120px] rounded-full scale-100" />

      {/* 3D Phone Render */}
      <img
        src="/new-app-mockup.png"
        alt="Recobra App - Listo para enfocarte"
        className="relative z-10 w-full max-w-[300px] md:max-w-[340px] h-auto object-contain drop-shadow-2xl transition-transform hover:scale-[1.02] duration-500"
      />
    </div>
  )
}
