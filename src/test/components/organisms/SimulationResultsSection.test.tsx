import "../../setup";
import { fireEvent, render, within } from "@testing-library/react";
import { describe, expect, it, mock } from "bun:test";
import { SimulationResultsSection } from "@/app/simulation/components/SimulationResultsSection";
import type { SimulationResponse } from "@/lib/simulation";

const simulationResponse: SimulationResponse = {
  simulation: {
    pre_vam: { mean: 10.5, std: 2.1, ci_lower: 8.4, ci_upper: 12.6 },
    vam: { mean: 100.2, std: 15.3, ci_lower: 84.9, ci_upper: 115.5 },
    post_vam: { mean: 50.1, std: 8.2, ci_lower: 41.9, ci_upper: 58.3 },
    uci: { mean: 200.5, std: 25.1, ci_lower: 175.4, ci_upper: 225.6 },
    post_uci: { mean: 30.2, std: 5.1, ci_lower: 25.1, ci_upper: 35.3 },
  },
  prediction: { class: 0, probability: 0.25 },
};

describe("SimulationResultsSection", () => {
  it("renders simulation metrics and prediction summary", () => {
    const { container, getByText } = render(
      <SimulationResultsSection
        results={[simulationResponse]}
        activeIndex={0}
        onActiveIndexChange={() => undefined}
        onDownload={() => undefined}
      />,
    );

    expect(getByText("Resultados de la Simulación")).toBeTruthy();
    expect(getByText("Predicción del modelo")).toBeTruthy();
    expect(getByText("Paciente no fallece")).toBeTruthy();
    expect(container.textContent?.includes("25%")).toBe(true);

    const table = within(container).getByRole("table", {
      name: "Resultados de simulación",
    });
    expect(table).toBeTruthy();
  });

  it("calls download handler when CSV button is clicked", () => {
    const onDownload = mock(() => undefined);
    const { container } = render(
      <SimulationResultsSection
        results={[simulationResponse]}
        activeIndex={0}
        onActiveIndexChange={() => undefined}
        onDownload={onDownload}
      />,
    );

    fireEvent.click(
      within(container).getByRole("button", {
        name: /Descargar resultados en CSV/i,
      }),
    );

    expect(onDownload).toHaveBeenCalledTimes(1);
  });

  it("shows a loading skeleton without remounting the panel", () => {
    const { container } = render(
      <SimulationResultsSection
        results={[simulationResponse]}
        activeIndex={0}
        loading
        onActiveIndexChange={() => undefined}
        onDownload={() => undefined}
      />,
    );

    const section = container.querySelector("section");
    expect(section?.getAttribute("aria-busy")).toBe("true");
    expect(container.querySelectorAll(".animate-pulse").length).toBeGreaterThan(
      0,
    );
    expect(container.querySelector("table")).toBeNull();
    expect(within(container).queryByText("Predicción del modelo")).toBeNull();
  });
});
