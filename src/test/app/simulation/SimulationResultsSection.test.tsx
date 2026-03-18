import "../../setup";
import { fireEvent, render, within } from "@testing-library/react";
import { describe, expect, it } from "bun:test";
import { SimulationResultsSection } from "@/app/simulation/components/SimulationResultsSection";
import {
  SIMULATION_PAGINATION_NEXT,
  SIMULATION_PAGINATION_PREVIOUS,
  SIMULATION_RESULTS_PAGE_SUMMARY,
  SIMULATION_RESULTS_RUN_HISTORY,
} from "@/constants/constants";
import type { SimulationResponse } from "@/lib/simulation";

function createResult(probability: number): SimulationResponse {
  return {
    simulation: {
      pre_vam: { mean: 10, std: 1, ci_lower: 9, ci_upper: 11 },
      vam: { mean: 20, std: 2, ci_lower: 18, ci_upper: 22 },
      post_vam: { mean: 30, std: 3, ci_lower: 27, ci_upper: 33 },
      uci: { mean: 40, std: 4, ci_lower: 36, ci_upper: 44 },
      post_uci: { mean: 50, std: 5, ci_lower: 45, ci_upper: 55 },
    },
    prediction: {
      class: probability >= 0.5 ? 1 : 0,
      probability,
    },
  };
}

describe("SimulationResultsSection", () => {
  const results = [createResult(0.2), createResult(0.9)];

  it("shows current page summary and history label", () => {
    const { container } = render(
      <SimulationResultsSection
        results={results}
        activeIndex={1}
        onActiveIndexChange={() => {}}
        onDownload={() => {}}
      />,
    );

    expect(
      within(container).getByText(SIMULATION_RESULTS_RUN_HISTORY),
    ).toBeTruthy();
    expect(
      within(container).getByText(SIMULATION_RESULTS_PAGE_SUMMARY(2, 2)),
    ).toBeTruthy();
  });

  it("calls onActiveIndexChange for next and previous buttons", () => {
    const calls: number[] = [];

    const { container } = render(
      <SimulationResultsSection
        results={results}
        activeIndex={0}
        onActiveIndexChange={(index) => {
          calls.push(index);
        }}
        onDownload={() => {}}
      />,
    );

    const nextButton = within(container).getByRole("button", {
      name: SIMULATION_PAGINATION_NEXT,
    });
    fireEvent.click(nextButton);

    expect(calls.length).toBe(1);
    expect(calls[0]).toBe(1);

    const previousButton = within(container).getByRole("button", {
      name: SIMULATION_PAGINATION_PREVIOUS,
    });

    expect(previousButton.hasAttribute("disabled")).toBe(true);
  });

  it("calls onDownload when download button is pressed", () => {
    let downloaded = false;

    const { container } = render(
      <SimulationResultsSection
        results={results}
        activeIndex={0}
        onActiveIndexChange={() => {}}
        onDownload={() => {
          downloaded = true;
        }}
      />,
    );

    const button = within(container).getByRole("button", {
      name: /Descargar resultados en CSV/i,
    });

    fireEvent.click(button);
    expect(downloaded).toBe(true);
  });

  it("keeps the section mounted and shows skeletons while loading", () => {
    const { container } = render(
      <SimulationResultsSection
        results={results}
        activeIndex={1}
        loading
        onActiveIndexChange={() => {}}
        onDownload={() => {}}
      />,
    );

    const section = container.querySelector("section");
    expect(section?.getAttribute("aria-busy")).toBe("true");
    expect(container.querySelectorAll(".animate-pulse").length).toBeGreaterThan(
      0,
    );
    expect(
      within(container).queryByText(SIMULATION_RESULTS_RUN_HISTORY),
    ).toBeNull();
    expect(within(container).queryByRole("table")).toBeNull();
  });
});
