import "../../setup";
import { render } from "@testing-library/react";
import { describe, expect, it, mock, afterEach } from "bun:test";
import {
  generatePatientId,
  SIMULATION_LIMITS,
  PREUCI_DIAG,
  RESP_INSUF,
  VENTILATION_TYPE,
  TIME_VARIABLE_LABELS,
} from "@/lib/simulation";

describe("simulation lib — constants", () => {
  it("SIMULATION_LIMITS has expected keys", () => {
    expect(SIMULATION_LIMITS.age).toBeTruthy();
    expect(SIMULATION_LIMITS.apache).toBeTruthy();
    expect(SIMULATION_LIMITS.vamTime).toBeTruthy();
    expect(SIMULATION_LIMITS.utiStay).toBeTruthy();
    expect(SIMULATION_LIMITS.preutiStay).toBeTruthy();
    expect(SIMULATION_LIMITS.simRuns).toBeTruthy();
    expect(SIMULATION_LIMITS.simPercent).toBeTruthy();
  });

  it("age limits are valid", () => {
    expect(SIMULATION_LIMITS.age.min).toBe(14);
    expect(SIMULATION_LIMITS.age.max).toBe(100);
    expect(SIMULATION_LIMITS.age.default).toBeGreaterThanOrEqual(
      SIMULATION_LIMITS.age.min,
    );
    expect(SIMULATION_LIMITS.age.default).toBeLessThanOrEqual(
      SIMULATION_LIMITS.age.max,
    );
  });

  it("PREUCI_DIAG has key 0 as empty option", () => {
    expect(PREUCI_DIAG[0]).toBe("Vacío");
  });

  it("RESP_INSUF has key 0 as empty option", () => {
    expect(RESP_INSUF[0]).toBe("Vacío");
  });

  it("VENTILATION_TYPE has 3 options", () => {
    expect(Object.keys(VENTILATION_TYPE).length).toBe(3);
  });

  it("TIME_VARIABLE_LABELS has labels for all simulation fields", () => {
    const expected = ["pre_vam", "vam", "post_vam", "uci", "post_uci"];
    expected.forEach((k) => {
      expect((TIME_VARIABLE_LABELS as Record<string, string>)[k]).toBeTruthy();
    });
  });
});

describe("simulation lib — generatePatientId", () => {
  it("generates an ID of default length 8", () => {
    const id = generatePatientId();
    expect(id.length).toBe(8);
  });

  it("generates an ID of custom length", () => {
    const id = generatePatientId(5);
    expect(id.length).toBe(5);
  });

  it("generates IDs with only alphanumeric characters", () => {
    const id = generatePatientId(20);
    expect(/^[A-Z0-9]+$/.test(id)).toBe(true);
  });

  it("generates different IDs on successive calls", () => {
    const ids = new Set(Array.from({ length: 10 }, () => generatePatientId()));
    expect(ids.size).toBeGreaterThan(1);
  });
});

// ── Lightweight render smoke-tests ───────────────────────────────────────────

// We import only the sub-components to avoid SSR issues with the full page
import { Select } from "@/components/atoms/Select";
import { Badge } from "@/components/atoms/Badge";
import { Alert } from "@/components/molecules/Alert";

describe("simulacion page — smoke tests", () => {
  it("Select renders PREUCI_DIAG options", () => {
    const { getByText } = render(
      <Select>
        {Object.entries(PREUCI_DIAG).map(([k, v]) => (
          <option key={k} value={k}>
            {v}
          </option>
        ))}
      </Select>,
    );
    expect(getByText("Vacío")).toBeTruthy();
    expect(getByText("Sepsis grave")).toBeTruthy();
  });

  it("Badge shows success status for surviving patient", () => {
    const { getByText } = render(
      <Badge status="success">Paciente no fallece</Badge>,
    );
    const badge = getByText("Paciente no fallece");
    expect(badge).toBeTruthy();
    expect(badge.className.includes("text-primary-700")).toBe(true);
  });

  it("Alert with danger variant renders error message", () => {
    const { getByRole } = render(
      <Alert variant="danger" title="Error en la simulación">
        Seleccione un tipo de Insuficiencia Respiratoria.
      </Alert>,
    );
    const alert = getByRole("alert");
    expect(alert.className.includes("bg-red-50")).toBe(true);
  });
});

// ── runSimulation API client ──────────────────────────────────────────────────

import { runSimulation, type SimulationRequest } from "@/lib/simulation";

const mockRequest: SimulationRequest = {
  age: 30,
  apache: 12,
  d1: 21,
  d2: 0,
  d3: 0,
  d4: 0,
  diag_egreso2: 0,
  artif_vent: 0,
  vam_time: 24,
  uti_stay: 24,
  preuti_stay: 10,
  resp_insuf: 1,
  percent: 3,
  n_runs: 200,
};

const mockResponse = {
  simulation: {
    pre_vam: { mean: 10.5, std: 2.1, ci_lower: 8.4, ci_upper: 12.6 },
    vam: { mean: 100.2, std: 15.3, ci_lower: 84.9, ci_upper: 115.5 },
    post_vam: { mean: 50.1, std: 8.2, ci_lower: 41.9, ci_upper: 58.3 },
    uci: { mean: 200.5, std: 25.1, ci_lower: 175.4, ci_upper: 225.6 },
    post_uci: { mean: 30.2, std: 5.1, ci_lower: 25.1, ci_upper: 35.3 },
  },
  prediction: { class: 0 as const, probability: 0.25 },
};

describe("runSimulation — API client", () => {
  afterEach(() => {
    globalThis.fetch = undefined as unknown as typeof fetch;
  });

  it("calls fetch with correct URL and method", async () => {
    let capturedUrl = "";
    let capturedInit: RequestInit | undefined;

    globalThis.fetch = mock(async (url: string, init?: RequestInit) => {
      capturedUrl = url;
      capturedInit = init;
      return new Response(JSON.stringify(mockResponse), { status: 200 });
    }) as unknown as typeof fetch;

    await runSimulation(mockRequest);

    expect(capturedUrl).toContain("/simulation");
    expect(capturedInit?.method).toBe("POST");
    expect(capturedInit?.headers).toMatchObject({
      "Content-Type": "application/json",
    });
  });

  it("returns parsed simulation response on success", async () => {
    globalThis.fetch = mock(
      async () => new Response(JSON.stringify(mockResponse), { status: 200 }),
    ) as unknown as typeof fetch;

    const result = await runSimulation(mockRequest);

    expect(result.simulation.vam.mean).toBe(100.2);
    expect(result.prediction.class).toBe(0);
    expect(result.prediction.probability).toBe(0.25);
  });

  it("throws an error when response is not ok", async () => {
    globalThis.fetch = mock(
      async () =>
        new Response("Internal Server Error", {
          status: 500,
          statusText: "Internal Server Error",
        }),
    ) as unknown as typeof fetch;

    let threw = false;
    try {
      await runSimulation(mockRequest);
    } catch (e) {
      threw = true;
      expect(e instanceof Error).toBe(true);
      expect((e as Error).message).toContain("500");
    }
    expect(threw).toBe(true);
  });

  it("sends the request body with all required patient fields", async () => {
    let parsedBody: Record<string, unknown> = {};

    globalThis.fetch = mock(async (_url: string, init?: RequestInit) => {
      parsedBody = JSON.parse(init?.body as string);
      return new Response(JSON.stringify(mockResponse), { status: 200 });
    }) as unknown as typeof fetch;

    await runSimulation(mockRequest);

    expect(parsedBody.age).toBe(30);
    expect(parsedBody.apache).toBe(12);
    expect(parsedBody.d1).toBe(21);
    expect(parsedBody.resp_insuf).toBe(1);
    expect(parsedBody.n_runs).toBe(200);
  });
});
