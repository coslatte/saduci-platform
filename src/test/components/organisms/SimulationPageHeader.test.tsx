import "../../setup";
import { render } from "@testing-library/react";
import { describe, expect, it } from "bun:test";
import { SimulationPageHeader } from "@/app/simulation/components/SimulationPageHeader";

describe("SimulationPageHeader", () => {
  it("renders the simulation title with shared Text sizing", () => {
    const { container, getByText } = render(<SimulationPageHeader />);

    expect(getByText("Simulación de Paciente UCI")).toBeTruthy();
    expect(
      getByText(
        "Ingrese los datos clínicos del paciente para simular su evolución en la Unidad de Cuidados Intensivos.",
      ),
    ).toBeTruthy();

    const titleClassName = container.querySelector("h1")?.className ?? "";
    expect(titleClassName).toContain("text-(length:--font-size-xl)");
    expect(titleClassName).toContain("md:text-3xl");

    expect(container.querySelector("p")?.className ?? "").toContain(
      "text-(length:--font-size-sm)",
    );
  });
});
