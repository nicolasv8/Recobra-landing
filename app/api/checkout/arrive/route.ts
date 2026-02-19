import { NextResponse } from "next/server"
import { checkRateLimit, getClientIp } from "@/lib/rate-limit"
import { markCheckoutSessionArrived } from "@/lib/supabase-admin"

export const runtime = "nodejs"
const ARRIVAL_LIMIT = 30
const ARRIVAL_WINDOW_MS = 10 * 60 * 1000
const UUID_V4ISH_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

interface ArrivalPayload {
  sessionId?: unknown
}

function getRateLimitResponse(retryAfterSeconds: number) {
  return NextResponse.json(
    {
      ok: false,
      message: "Demasiados intentos. Espera un momento e inténtalo de nuevo.",
    },
    {
      status: 429,
      headers: {
        "Retry-After": String(retryAfterSeconds),
      },
    },
  )
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

  const sessionId = payload.sessionId.trim()

  if (!UUID_V4ISH_REGEX.test(sessionId)) {
    return NextResponse.json(
      {
        ok: false,
        message: "sessionId inválido.",
      },
      { status: 400 },
    )
  }

  const clientIp = getClientIp(request)
  const rateLimitCheck = await checkRateLimit({
    key: `checkout:arrive:${clientIp}`,
    limit: ARRIVAL_LIMIT,
    windowMs: ARRIVAL_WINDOW_MS,
  })

  if (!rateLimitCheck.allowed) {
    return getRateLimitResponse(rateLimitCheck.retryAfterSeconds)
  }

  try {
    await markCheckoutSessionArrived(sessionId)

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
