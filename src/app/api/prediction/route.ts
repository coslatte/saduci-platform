import { NextRequest, NextResponse } from "next/server";

function resolveCoreApiUrl(): string {
  const raw =
    process.env.API_URL ??
    process.env.NEXT_PUBLIC_API_URL ??
    "http://localhost:8000";

  return raw.replace(/\/+$/, "").replace(/\/api$/, "");
}

const CORE_API_URL = resolveCoreApiUrl();
const CORE_PREDICTION_PATH = "/prediccion";

function getUpstreamErrorMessage(data: unknown): string | null {
  if (typeof data === "string" && data.trim().length > 0) return data;
  if (!data || typeof data !== "object") return null;

  if (
    "error" in data &&
    typeof data.error === "string" &&
    data.error.trim().length > 0
  ) {
    return data.error;
  }

  if (
    "detail" in data &&
    typeof data.detail === "string" &&
    data.detail.trim().length > 0
  ) {
    return data.detail;
  }

  if (
    "message" in data &&
    typeof data.message === "string" &&
    data.message.trim().length > 0
  ) {
    return data.message;
  }

  return null;
}

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

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15_000);

  try {
    const upstream = await fetch(`${CORE_API_URL}${CORE_PREDICTION_PATH}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: controller.signal,
    });

    const contentType = upstream.headers.get("content-type") ?? "";
    const data: unknown = contentType.includes("application/json")
      ? await upstream.json()
      : { error: await upstream.text() };

    if (upstream.status === 404) {
      return NextResponse.json(
        {
          error:
            "El backend activo no expone el endpoint /prediccion. Verifica que saduci-core esté actualizado y desplegado con la versión compatible para predicción.",
          upstream_status: upstream.status,
          upstream_url: `${CORE_API_URL}${CORE_PREDICTION_PATH}`,
          upstream_error: getUpstreamErrorMessage(data),
        },
        { status: 502 },
      );
    }

    return NextResponse.json(data, { status: upstream.status });
  } catch (err) {
    const isTimeout = err instanceof Error && err.name === "AbortError";
    return NextResponse.json(
      {
        error: isTimeout
          ? "El servidor de predicción tardó demasiado en responder."
          : "No se pudo conectar con el servidor de predicción.",
      },
      { status: isTimeout ? 504 : 502 },
    );
  } finally {
    clearTimeout(timeout);
  }
}
