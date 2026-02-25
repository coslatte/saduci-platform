import "../../setup";
import { render } from "@testing-library/react";
import { describe, expect, it } from "bun:test";
import { SimulationResultTable } from "@/components/molecules/SimulationResultTable";
import type { SimulationResponse } from "@/lib/simulation";

describe("SimulationResultTable", () => {
  const mockResult: SimulationResponse["simulation"] = {
    pre_vam: {
      mean: 12.5,
      std: 4.2,
      ci_lower: 10.3,
      ci_upper: 14.7,
    },
    vam: {
      mean: 48.2,
      std: 15.8,
      ci_lower: 42.1,
      ci_upper: 54.3,
    },
    post_vam: {
      mean: 72.1,
      std: 22.5,
      ci_lower: 65.5,
      ci_upper: 78.7,
    },
    uci: {
      mean: 95.3,
      std: 18.6,
      ci_lower: 88.2,
      ci_upper: 102.4,
    },
    post_uci: {
      mean: 120.8,
      std: 30.4,
      ci_lower: 110.5,
      ci_upper: 131.1,
    },
  };

  it("renders table with correct aria-label", () => {
    const { getByRole } = render(<SimulationResultTable result={mockResult} />);
    const table = getByRole("table");
    expect(table.getAttribute("aria-label")).toBe("Resultados de simulación");
  });

  it("renders table headers with correct statistic labels", () => {
    const { getByText } = render(<SimulationResultTable result={mockResult} />);
    expect(getByText("Estadístico")).toBeTruthy();
    expect(getByText("Promedio")).toBeTruthy();
    expect(getByText("Desviación Estándar")).toBeTruthy();
    expect(getByText("Límite Inf.")).toBeTruthy();
    expect(getByText("Límite Sup.")).toBeTruthy();
  });

  it("renders all time variable columns with correct headers", () => {
    const { getByText } = render(<SimulationResultTable result={mockResult} />);
    // The headers should be rendered from TIME_VARIABLE_LABELS
    expect(getByText("Tiempo Pre VAM")).toBeTruthy();
    expect(getByText("Tiempo VAM")).toBeTruthy();
    expect(getByText("Tiempo Post VAM")).toBeTruthy();
    expect(getByText("Estadía UCI")).toBeTruthy();
    expect(getByText("Estadía Post UCI")).toBeTruthy();
  });

  it("renders stats rows with correct data values formatted to 2 decimals", () => {
    const { getByText } = render(<SimulationResultTable result={mockResult} />);

    // Check mean values
    expect(getByText("12.50")).toBeTruthy(); // pre_vam mean
    expect(getByText("48.20")).toBeTruthy(); // vam mean
    expect(getByText("72.10")).toBeTruthy(); // post_vam mean
    expect(getByText("95.30")).toBeTruthy(); // uci mean
    expect(getByText("120.80")).toBeTruthy(); // post_uci mean

    // Check std values
    expect(getByText("4.20")).toBeTruthy(); // pre_vam std
    expect(getByText("15.80")).toBeTruthy(); // vam std
    expect(getByText("22.50")).toBeTruthy(); // post_vam std
    expect(getByText("18.60")).toBeTruthy(); // uci std
    expect(getByText("30.40")).toBeTruthy(); // post_uci std

    // Check CI lower bounds
    expect(getByText("10.30")).toBeTruthy(); // pre_vam ci_lower
    expect(getByText("42.10")).toBeTruthy(); // vam ci_lower
    expect(getByText("65.50")).toBeTruthy(); // post_vam ci_lower
    expect(getByText("88.20")).toBeTruthy(); // uci ci_lower
    expect(getByText("110.50")).toBeTruthy(); // post_uci ci_lower

    // Check CI upper bounds
    expect(getByText("14.70")).toBeTruthy(); // pre_vam ci_upper
    expect(getByText("54.30")).toBeTruthy(); // vam ci_upper
    expect(getByText("78.70")).toBeTruthy(); // post_vam ci_upper
    expect(getByText("102.40")).toBeTruthy(); // uci ci_upper
    expect(getByText("131.10")).toBeTruthy(); // post_uci ci_upper
  });

  it("renders correct number of rows for statistics", () => {
    const { container } = render(<SimulationResultTable result={mockResult} />);
    const rows = container.querySelectorAll("tbody tr");
    // Should have 4 stat rows: mean, std, ci_lower, ci_upper
    expect(rows.length).toBe(4);
  });

  it("applies correct CSS classes for table styling", () => {
    const { container } = render(<SimulationResultTable result={mockResult} />);
    const table = container.querySelector("table");
    expect(table?.className.includes("w-full")).toBe(true);
    expect(table?.className.includes("text-sm")).toBe(true);

    const wrapper = container.querySelector(".overflow-x-auto");
    expect(wrapper).toBeTruthy();
  });
});
