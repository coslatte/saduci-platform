import { NextRequest, NextResponse } from "next/server";

const CORE_API_URL =
  process.env.API_URL ??
  process.env.NEXT_PUBLIC_API_URL ??
  "http://localhost:8000";

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Cuerpo de la solicitud inválido." },
      { status: 400 },
    );
  }

  try {
    const upstream = await fetch(`${CORE_API_URL}/simulation`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data: unknown = await upstream.json();

    return NextResponse.json(data, { status: upstream.status });
  } catch {
    return NextResponse.json(
      { error: "No se pudo conectar con el servidor de simulación." },
      { status: 502 },
    );
  }
}
