import { NextResponse } from "next/server"
import { markCheckoutSessionArrived } from "@/lib/supabase-admin"

export const runtime = "nodejs"

interface ArrivalPayload {
  sessionId?: unknown
}

export async function POST(request: Request) {
  let payload: ArrivalPayload

  try {
    payload = (await request.json()) as ArrivalPayload
  } catch {
    return NextResponse.json(
      {
        ok: false,
        message: "Solicitud inválida.",
      },
      { status: 400 },
    )
  }

  if (typeof payload.sessionId !== "string" || !payload.sessionId.trim()) {
    return NextResponse.json(
      {
        ok: false,
        message: "sessionId es obligatorio.",
      },
      { status: 400 },
    )
  }

  try {
    await markCheckoutSessionArrived(payload.sessionId.trim())

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json(
      {
        ok: false,
        message: "No fue posible registrar la llegada a /gracias.",
      },
      { status: 500 },
    )
  }
}
