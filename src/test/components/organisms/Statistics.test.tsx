import "../../setup";
import { describe, expect, it, mock, afterEach } from "bun:test";
import {
  EXPERIMENT_VARIABLE_LABELS,
  runWilcoxonTest,
  runFriedmanTest,
  type WilcoxonRequest,
  type FriedmanRequest,
} from "@/lib/statistics";

// ─── Constants ─────────────────────────────────────────────────────────────────

describe("statistics lib — EXPERIMENT_VARIABLE_LABELS", () => {
  it("contains 5 expected variable labels", () => {
    expect(EXPERIMENT_VARIABLE_LABELS.length).toBe(5);
  });

  it("includes all expected time variable labels", () => {
    const expected = [
      "Tiempo Pre VAM",
      "Tiempo VAM",
      "Tiempo Post VAM",
      "Estadia UCI",
      "Estadia Post UCI",
    ];
    expected.forEach((label) => {
      expect(EXPERIMENT_VARIABLE_LABELS).toContain(label);
    });
  });
});

// ─── Wilcoxon ──────────────────────────────────────────────────────────────────

const wilcoxonRequest: WilcoxonRequest = {
  x: [1.2, 2.3, 3.1, 4.5, 5.6],
  y: [1.1, 2.5, 3.0, 4.8, 5.2],
};

const wilcoxonResponse = { statistic: 4.0, p_value: 0.8125 };

describe("runWilcoxonTest — API client", () => {
  afterEach(() => {
    globalThis.fetch = undefined as unknown as typeof fetch;
  });

  it("calls fetch with correct URL and POST method", async () => {
    let capturedUrl = "";
    let capturedInit: RequestInit | undefined;

    globalThis.fetch = mock(async (url: string, init?: RequestInit) => {
      capturedUrl = url;
      capturedInit = init;
      return new Response(JSON.stringify(wilcoxonResponse), { status: 200 });
    }) as unknown as typeof fetch;

    await runWilcoxonTest(wilcoxonRequest);

    expect(capturedUrl).toContain("/statistics/wilcoxon");
    expect(capturedInit?.method).toBe("POST");
    expect(capturedInit?.headers).toMatchObject({
      "Content-Type": "application/json",
    });
  });

  it("sends x and y arrays in the request body", async () => {
    let parsedBody: Record<string, unknown> = {};

    globalThis.fetch = mock(async (_url: string, init?: RequestInit) => {
      parsedBody = JSON.parse(init?.body as string);
      return new Response(JSON.stringify(wilcoxonResponse), { status: 200 });
    }) as unknown as typeof fetch;

    await runWilcoxonTest(wilcoxonRequest);

    expect(parsedBody.x).toEqual([1.2, 2.3, 3.1, 4.5, 5.6]);
    expect(parsedBody.y).toEqual([1.1, 2.5, 3.0, 4.8, 5.2]);
  });

  it("returns parsed statistic and p_value on success", async () => {
    globalThis.fetch = mock(
      async () => new Response(JSON.stringify(wilcoxonResponse), { status: 200 }),
    ) as unknown as typeof fetch;

    const result = await runWilcoxonTest(wilcoxonRequest);

    expect(result.statistic).toBe(4.0);
    expect(result.p_value).toBe(0.8125);
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
      await runWilcoxonTest(wilcoxonRequest);
    } catch (e) {
      threw = true;
      expect(e instanceof Error).toBe(true);
      expect((e as Error).message).toContain("500");
    }
    expect(threw).toBe(true);
  });

  it("throws a timeout error when request is aborted", async () => {
    globalThis.fetch = mock(async () => {
      const err = new Error("The operation was aborted.");
      err.name = "AbortError";
      throw err;
    }) as unknown as typeof fetch;

    let threw = false;
    try {
      await runWilcoxonTest(wilcoxonRequest);
    } catch (e) {
      threw = true;
      expect((e as Error).message).toContain("tiempo de espera");
    }
    expect(threw).toBe(true);
  });
});

// ─── Friedman ──────────────────────────────────────────────────────────────────

const friedmanRequest: FriedmanRequest = {
  samples: [
    [1.2, 2.3, 3.1, 4.5, 5.6],
    [1.5, 2.1, 3.4, 4.2, 5.8],
    [1.0, 2.7, 3.2, 4.9, 5.1],
  ],
};

const friedmanResponse = { statistic: 0.4, p_value: 0.819 };

describe("runFriedmanTest — API client", () => {
  afterEach(() => {
    globalThis.fetch = undefined as unknown as typeof fetch;
  });

  it("calls fetch with correct URL and POST method", async () => {
    let capturedUrl = "";
    let capturedInit: RequestInit | undefined;

    globalThis.fetch = mock(async (url: string, init?: RequestInit) => {
      capturedUrl = url;
      capturedInit = init;
      return new Response(JSON.stringify(friedmanResponse), { status: 200 });
    }) as unknown as typeof fetch;

    await runFriedmanTest(friedmanRequest);

    expect(capturedUrl).toContain("/statistics/friedman");
    expect(capturedInit?.method).toBe("POST");
    expect(capturedInit?.headers).toMatchObject({
      "Content-Type": "application/json",
    });
  });

  it("sends samples array in the request body", async () => {
    let parsedBody: Record<string, unknown> = {};

    globalThis.fetch = mock(async (_url: string, init?: RequestInit) => {
      parsedBody = JSON.parse(init?.body as string);
      return new Response(JSON.stringify(friedmanResponse), { status: 200 });
    }) as unknown as typeof fetch;

    await runFriedmanTest(friedmanRequest);

    expect(parsedBody.samples).toEqual(friedmanRequest.samples);
  });

  it("returns parsed statistic and p_value on success", async () => {
    globalThis.fetch = mock(
      async () => new Response(JSON.stringify(friedmanResponse), { status: 200 }),
    ) as unknown as typeof fetch;

    const result = await runFriedmanTest(friedmanRequest);

    expect(result.statistic).toBe(0.4);
    expect(result.p_value).toBe(0.819);
  });

  it("throws an error when response is not ok", async () => {
    globalThis.fetch = mock(
      async () =>
        new Response("Bad Request", {
          status: 400,
          statusText: "Bad Request",
        }),
    ) as unknown as typeof fetch;

    let threw = false;
    try {
      await runFriedmanTest(friedmanRequest);
    } catch (e) {
      threw = true;
      expect(e instanceof Error).toBe(true);
      expect((e as Error).message).toContain("400");
    }
    expect(threw).toBe(true);
  });

  it("throws a timeout error when request is aborted", async () => {
    globalThis.fetch = mock(async () => {
      const err = new Error("The operation was aborted.");
      err.name = "AbortError";
      throw err;
    }) as unknown as typeof fetch;

    let threw = false;
    try {
      await runFriedmanTest(friedmanRequest);
    } catch (e) {
      threw = true;
      expect((e as Error).message).toContain("tiempo de espera");
    }
    expect(threw).toBe(true);
  });

  it("handles a request with exactly 3 samples (minimum for Friedman)", async () => {
    const minRequest: FriedmanRequest = {
      samples: [[1, 2, 3], [4, 5, 6], [7, 8, 9]],
    };

    globalThis.fetch = mock(
      async () => new Response(JSON.stringify(friedmanResponse), { status: 200 }),
    ) as unknown as typeof fetch;

    const result = await runFriedmanTest(minRequest);

    expect(result.statistic).toBeDefined();
    expect(result.p_value).toBeDefined();
  });
});
