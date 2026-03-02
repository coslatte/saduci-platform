import "../../setup";
import { render, within } from "@testing-library/react";
import { describe, expect, it } from "bun:test";
import { SimulationResultTable } from "@/components/molecules/SimulationResultTable";
import type { SimulationResponse } from "@/lib/simulation";
import { TIME_VARIABLE_LABELS } from "@/lib/simulation";

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
    const { container } = render(<SimulationResultTable result={mockResult} />);
    const table = within(container).getByRole("table");
    expect(table.getAttribute("aria-label")).toBe("Resultados de simulación");
  });

  it("renders table headers with correct statistic labels", () => {
    const { container } = render(<SimulationResultTable result={mockResult} />);
    expect(within(container).getByText("Estadístico")).toBeTruthy();
    expect(within(container).getByText("Promedio")).toBeTruthy();
    expect(within(container).getByText("Desviación Estándar")).toBeTruthy();
    expect(within(container).getByText("Límite Inf.")).toBeTruthy();
    expect(within(container).getByText("Límite Sup.")).toBeTruthy();
  });

  it("renders all time variable columns with correct headers", () => {
    const { container } = render(<SimulationResultTable result={mockResult} />);
    // The headers should be rendered from TIME_VARIABLE_LABELS
    Object.values(TIME_VARIABLE_LABELS).forEach((label) => {
      expect(within(container).getByText(label)).toBeTruthy();
    });
  });

  it("renders stats rows with correct data values formatted to 2 decimals", () => {
    const { container } = render(<SimulationResultTable result={mockResult} />);

    // Check mean values
    expect(within(container).getByText("12.50")).toBeTruthy(); // pre_vam mean
    expect(within(container).getByText("48.20")).toBeTruthy(); // vam mean
    expect(within(container).getByText("72.10")).toBeTruthy(); // post_vam mean
    expect(within(container).getByText("95.30")).toBeTruthy(); // uci mean
    expect(within(container).getByText("120.80")).toBeTruthy(); // post_uci mean

    // Check std values
    expect(within(container).getByText("4.20")).toBeTruthy(); // pre_vam std
    expect(within(container).getByText("15.80")).toBeTruthy(); // vam std
    expect(within(container).getByText("22.50")).toBeTruthy(); // post_vam std
    expect(within(container).getByText("18.60")).toBeTruthy(); // uci std
    expect(within(container).getByText("30.40")).toBeTruthy(); // post_uci std

    // Check CI lower bounds
    expect(within(container).getByText("10.30")).toBeTruthy(); // pre_vam ci_lower
    expect(within(container).getByText("42.10")).toBeTruthy(); // vam ci_lower
    expect(within(container).getByText("65.50")).toBeTruthy(); // post_vam ci_lower
    expect(within(container).getByText("88.20")).toBeTruthy(); // uci ci_lower
    expect(within(container).getByText("110.50")).toBeTruthy(); // post_uci ci_lower

    // Check CI upper bounds
    expect(within(container).getByText("14.70")).toBeTruthy(); // pre_vam ci_upper
    expect(within(container).getByText("54.30")).toBeTruthy(); // vam ci_upper
    expect(within(container).getByText("78.70")).toBeTruthy(); // post_vam ci_upper
    expect(within(container).getByText("102.40")).toBeTruthy(); // uci ci_upper
    expect(within(container).getByText("131.10")).toBeTruthy(); // post_uci ci_upper
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
