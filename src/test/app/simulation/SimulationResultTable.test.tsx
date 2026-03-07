import "../../setup";
import { render, within } from "@testing-library/react";
import { describe, expect, it } from "bun:test";
import { SimulationResultTable } from "@/app/simulation/components/SimulationResultTable";
import {
  TIME_VARIABLE_LABELS,
  type SimulationResponse,
} from "@/lib/simulation";

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
    Object.values(TIME_VARIABLE_LABELS).forEach((label) => {
      expect(within(container).getByText(label)).toBeTruthy();
    });
  });

  it("renders stats rows with correct data values formatted to 2 decimals", () => {
    const { container } = render(<SimulationResultTable result={mockResult} />);

    expect(within(container).getByText("12.50")).toBeTruthy();
    expect(within(container).getByText("48.20")).toBeTruthy();
    expect(within(container).getByText("72.10")).toBeTruthy();
    expect(within(container).getByText("95.30")).toBeTruthy();
    expect(within(container).getByText("120.80")).toBeTruthy();

    expect(within(container).getByText("4.20")).toBeTruthy();
    expect(within(container).getByText("15.80")).toBeTruthy();
    expect(within(container).getByText("22.50")).toBeTruthy();
    expect(within(container).getByText("18.60")).toBeTruthy();
    expect(within(container).getByText("30.40")).toBeTruthy();

    expect(within(container).getByText("10.30")).toBeTruthy();
    expect(within(container).getByText("42.10")).toBeTruthy();
    expect(within(container).getByText("65.50")).toBeTruthy();
    expect(within(container).getByText("88.20")).toBeTruthy();
    expect(within(container).getByText("110.50")).toBeTruthy();

    expect(within(container).getByText("14.70")).toBeTruthy();
    expect(within(container).getByText("54.30")).toBeTruthy();
    expect(within(container).getByText("78.70")).toBeTruthy();
    expect(within(container).getByText("102.40")).toBeTruthy();
    expect(within(container).getByText("131.10")).toBeTruthy();
  });

  it("renders correct number of rows for statistics", () => {
    const { container } = render(<SimulationResultTable result={mockResult} />);
    const rows = container.querySelectorAll("tbody tr");
    expect(rows.length).toBe(4);
  });

  it("applies correct CSS classes for table styling", () => {
    const { container } = render(<SimulationResultTable result={mockResult} />);
    const table = container.querySelector("table");
    expect(table?.className.includes("w-full")).toBe(true);
    expect(table?.className.includes("text-(length:--font-size-sm)")).toBe(
      true,
    );

    const wrapper = container.querySelector(".overflow-x-auto");
    expect(wrapper).toBeTruthy();
  });
});
