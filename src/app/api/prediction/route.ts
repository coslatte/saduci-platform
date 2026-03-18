import { NextRequest, NextResponse } from "next/server";

type FetchLike = (
  input: RequestInfo | URL,
  init?: RequestInit,
) => Promise<Response>;

function resolveCoreApiUrl(): string {
  const raw =
    process.env.API_URL ??
    process.env.NEXT_PUBLIC_API_URL ??
    "http://localhost:8000";

  return raw.replace(/\/+$/, "").replace(/\/api$/, "");
}

const CORE_API_URL = resolveCoreApiUrl();
const CORE_PREDICTION_PATH = "/prediccion";
const FALLBACK_PREDICTION_SERVICE_URL =
  process.env.PREDICTION_SERVICE_URL ??
  deriveFallbackPredictionServiceUrl(CORE_API_URL);

interface LegacyPredictionRequest {
  patient_id: string;
  model_name: "mortality_risk";
  features: {
    age: number;
    severity_score: number;
  };
}

interface LegacyPredictionResponse {
  prediction?: {
    risk_score?: number;
  };
  risk_score?: number;
  probability?: number;
}

function deriveFallbackPredictionServiceUrl(coreApiUrl: string): string {
  try {
    const url = new URL(coreApiUrl);
    if (url.port === "8000") {
      url.port = "8002";
      return url.toString().replace(/\/$/, "");
    }
  } catch {
    // Fall back to the original URL when it is not a valid absolute URL.
  }

  return coreApiUrl;
}

function buildLegacyPredictionRequest(
  body: unknown,
): LegacyPredictionRequest | null {
  if (!body || typeof body !== "object") return null;

  const payload = body as Record<string, unknown>;
  if (typeof payload.edad !== "number" || typeof payload.apache !== "number") {
    return null;
  }

  return {
    patient_id: "saduci-platform",
    model_name: "mortality_risk",
    features: {
      age: payload.edad,
      severity_score: payload.apache,
    },
  };
}

function extractProbability(payload: unknown): number | null {
  if (!payload || typeof payload !== "object") return null;

  const data = payload as LegacyPredictionResponse;
  if (typeof data.probability === "number") return data.probability;
  if (typeof data.risk_score === "number") return data.risk_score;
  if (typeof data.prediction?.risk_score === "number") {
    return data.prediction.risk_score;
  }

  return null;
}

async function postJson(
  url: string,
  body: unknown,
  timeoutMs: number,
  fetchImpl: FetchLike = fetch,
): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    return await fetchImpl(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timeoutId);
  }
}

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

export async function handlePredictionRequest(
  req: NextRequest,
  fetchImpl: FetchLike = fetch,
) {
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
    const upstream = await postJson(
      `${CORE_API_URL}${CORE_PREDICTION_PATH}`,
      body,
      15_000,
      fetchImpl,
    );

    const contentType = upstream.headers.get("content-type") ?? "";
    const data: unknown = contentType.includes("application/json")
      ? await upstream.json()
      : { error: await upstream.text() };

    const probability = extractProbability(data);
    if (upstream.ok && probability !== null) {
      return NextResponse.json({ probability }, { status: 200 });
    }

    if (upstream.status === 404) {
      const fallbackRequest = buildLegacyPredictionRequest(body);
      if (!fallbackRequest) {
        return NextResponse.json(
          {
            error:
              "El backend activo no expone el endpoint /prediccion y no fue posible adaptar la solicitud al servicio alterno.",
            upstream_status: upstream.status,
            upstream_url: `${CORE_API_URL}${CORE_PREDICTION_PATH}`,
            upstream_error: getUpstreamErrorMessage(data),
          },
          { status: 502 },
        );
      }

      try {
        const fallback = await postJson(
          `${FALLBACK_PREDICTION_SERVICE_URL}/predictions`,
          fallbackRequest,
          15_000,
          fetchImpl,
        );

        const fallbackContentType = fallback.headers.get("content-type") ?? "";
        const fallbackData: unknown = fallbackContentType.includes(
          "application/json",
        )
          ? await fallback.json()
          : { error: await fallback.text() };

        const fallbackProbability = extractProbability(fallbackData);
        if (fallback.ok && fallbackProbability !== null) {
          return NextResponse.json(
            { probability: fallbackProbability },
            { status: 200 },
          );
        }

        return NextResponse.json(
          {
            error:
              "El backend activo no expone el endpoint /prediccion y el servicio alterno no pudo completar la predicción.",
            upstream_status: upstream.status,
            upstream_url: `${CORE_API_URL}${CORE_PREDICTION_PATH}`,
            upstream_error: getUpstreamErrorMessage(data),
            fallback_status: fallback.status,
            fallback_url: `${FALLBACK_PREDICTION_SERVICE_URL}/predictions`,
            fallback_error: getUpstreamErrorMessage(fallbackData),
          },
          { status: 502 },
        );
      } catch {
        return NextResponse.json(
          {
            error:
              "El backend activo no expone el endpoint /prediccion y el servicio alterno de predicción no respondió.",
            upstream_status: upstream.status,
            upstream_url: `${CORE_API_URL}${CORE_PREDICTION_PATH}`,
            upstream_error: getUpstreamErrorMessage(data),
            fallback_url: `${FALLBACK_PREDICTION_SERVICE_URL}/predictions`,
          },
          { status: 502 },
        );
      }
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
  }
}

export async function POST(req: NextRequest) {
  return handlePredictionRequest(req);
}
