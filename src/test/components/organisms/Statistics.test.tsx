import "../../setup";
import { render } from "@testing-library/react";
import { describe, expect, it, mock, afterEach } from "bun:test";
import {
  EXPERIMENT_VARIABLE_LABELS,
  runWilcoxonTest,
  runFriedmanTest,
  type WilcoxonRequest,
  type FriedmanRequest,
} from "@/lib/statistics";
import {
  parseCSV,
  extractNumericColumn,
  adjustArraySizes,
} from "@/app/statistics/helpers";

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

// ─── CSV helper functions ───────────────────────────────────────────────────────

describe("parseCSV", () => {
  it("parses headers and rows correctly", () => {
    const csv = "Tiempo VAM,Estadia UCI\n10.5,20.0\n12.3,18.5";
    const result = parseCSV(csv);
    expect(result["Tiempo VAM"]).toEqual(["10.5", "12.3"]);
    expect(result["Estadia UCI"]).toEqual(["20.0", "18.5"]);
  });

  it("returns empty object for single-line input", () => {
    const result = parseCSV("only header");
    expect(Object.keys(result).length).toBe(0);
  });

  it("trims whitespace from headers and values", () => {
    const csv = " Tiempo VAM , Estadia UCI \n 10.5 , 20.0 ";
    const result = parseCSV(csv);
    expect(result["Tiempo VAM"]).toEqual(["10.5"]);
    expect(result["Estadia UCI"]).toEqual(["20.0"]);
  });

  it("handles CRLF line endings", () => {
    const csv = "Col1,Col2\r\n1,2\r\n3,4";
    const result = parseCSV(csv);
    expect(result["Col1"]).toEqual(["1", "3"]);
    expect(result["Col2"]).toEqual(["2", "4"]);
  });
});

describe("extractNumericColumn", () => {
  it("returns numeric values for a valid column", () => {
    const csv = { "Tiempo VAM": ["10.5", "12.3", "9.8"] };
    expect(extractNumericColumn(csv, "Tiempo VAM")).toEqual([10.5, 12.3, 9.8]);
  });

  it("filters out non-numeric values", () => {
    const csv = { "Tiempo VAM": ["10.5", "NaN", "abc", "12.3"] };
    const result = extractNumericColumn(csv, "Tiempo VAM");
    expect(result).toEqual([10.5, 12.3]);
  });

  it("returns empty array for missing column", () => {
    const csv = { "Other": ["10.5"] };
    expect(extractNumericColumn(csv, "Tiempo VAM")).toEqual([]);
  });
});

describe("adjustArraySizes", () => {
  it("returns arrays trimmed to the minimum length", () => {
    const { adjusted, minSize } = adjustArraySizes([[1, 2, 3], [4, 5], [6, 7, 8, 9]]);
    expect(minSize).toBe(2);
    expect(adjusted[0]).toEqual([1, 2]);
    expect(adjusted[1]).toEqual([4, 5]);
    expect(adjusted[2]).toEqual([6, 7]);
  });

  it("returns unchanged arrays when all have equal length", () => {
    const { adjusted, minSize } = adjustArraySizes([[1, 2], [3, 4], [5, 6]]);
    expect(minSize).toBe(2);
    adjusted.forEach((a) => expect(a.length).toBe(2));
  });
});

// ─── Statistics page — smoke tests ────────────────────────────────────────────

import StatisticsPage from "@/app/statistics/page";
import { fireEvent, within } from "@testing-library/react";
import {
  STATISTICS_PAGE_TITLE,
  WILCOXON_SECTION_TITLE,
  FRIEDMAN_SECTION_TITLE,
  STATS_RUN_WILCOXON,
  STATS_RUN_FRIEDMAN,
} from "@/constants/constants";

describe("StatisticsPage — smoke tests", () => {
  it("renders the page title", () => {
    const { container } = render(<StatisticsPage />);
    expect(container.textContent?.includes(STATISTICS_PAGE_TITLE)).toBe(true);
  });

  it("renders Wilcoxon tab button", () => {
    const { container } = render(<StatisticsPage />);
    const tab = within(container).getByRole("tab", { name: WILCOXON_SECTION_TITLE });
    expect(tab).toBeTruthy();
  });

  it("renders Friedman tab button", () => {
    const { container } = render(<StatisticsPage />);
    const tab = within(container).getByRole("tab", { name: FRIEDMAN_SECTION_TITLE });
    expect(tab).toBeTruthy();
  });

  it("wilcoxon panel is visible by default", () => {
    const { container } = render(<StatisticsPage />);
    const panel = within(container).getByRole("tabpanel", { name: WILCOXON_SECTION_TITLE });
    expect(panel.hidden).toBe(false);
  });

  it("friedman panel is hidden by default", () => {
    const { container } = render(<StatisticsPage />);
    const panel = container.querySelector("#panel-friedman");
    expect(panel).toBeTruthy();
    expect((panel as HTMLElement).hidden).toBe(true);
  });

  it("renders run Wilcoxon button", () => {
    const { container } = render(<StatisticsPage />);
    const btn = within(container).getByRole("button", { name: STATS_RUN_WILCOXON });
    expect(btn).toBeTruthy();
  });

  it("switching to Friedman tab shows friedman panel", () => {
    const { container } = render(<StatisticsPage />);
    const friedmanTab = within(container).getByRole("tab", { name: FRIEDMAN_SECTION_TITLE });
    fireEvent.click(friedmanTab);
    const panel = container.querySelector("#panel-friedman");
    expect((panel as HTMLElement).hidden).toBe(false);
  });

  it("wilcoxon tab is marked as selected by default", () => {
    const { container } = render(<StatisticsPage />);
    const tab = within(container).getByRole("tab", { name: WILCOXON_SECTION_TITLE });
    expect(tab.getAttribute("aria-selected")).toBe("true");
  });

  it("renders run Friedman button in friedman panel", () => {
    const { container } = render(<StatisticsPage />);
    within(container).getByRole("tab", { name: FRIEDMAN_SECTION_TITLE });
    fireEvent.click(within(container).getByRole("tab", { name: FRIEDMAN_SECTION_TITLE }));
    const btn = within(container).getByRole("button", { name: STATS_RUN_FRIEDMAN });
    expect(btn).toBeTruthy();
  });
});

