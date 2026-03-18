import "../../../setup";
import { describe, expect, it } from "bun:test";
import { handlePredictionRequest } from "@/app/api/prediction/route";

type FetchHandler = (
  input: RequestInfo | URL,
  init?: RequestInit,
) => Promise<Response>;

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

describe("prediction route handler", () => {
  it("returns the upstream probability when the platform endpoint succeeds", async () => {
    const fetchStub: FetchHandler = (input) => {
      expect(String(input)).toContain("/prediccion");
      return Promise.resolve(jsonResponse({ probability: 0.81 }));
    };

    const response = await handlePredictionRequest(
      new Request("http://localhost/api/prediction", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          edad: 20,
          diag_ing1: 5,
          diag_ing2: 60,
          diag_egr2: 30,
          apache: 25,
          tiempo_vam: 24,
        }),
      }) as never,
      fetchStub,
    );

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({ probability: 0.81 });
  });

  it("falls back to the legacy prediction service when the platform endpoint is missing", async () => {
    let calls = 0;
    const fetchStub: FetchHandler = (input) => {
      calls += 1;
      const url = String(input);

      if (url.includes("/prediccion")) {
        return Promise.resolve(jsonResponse({ detail: "Not Found" }, 404));
      }

      expect(url).toContain("/predictions");
      return Promise.resolve(
        jsonResponse({ prediction: { risk_score: 0.73 } }),
      );
    };

    const response = await handlePredictionRequest(
      new Request("http://localhost/api/prediction", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          edad: 20,
          diag_ing1: 5,
          diag_ing2: 60,
          diag_egr2: 30,
          apache: 25,
          tiempo_vam: 24,
        }),
      }) as never,
      fetchStub,
    );

    expect(calls).toBe(2);
    expect(response.status).toBe(200);
    expect(response.headers.get("content-type")).toContain("application/json");
  });
});
