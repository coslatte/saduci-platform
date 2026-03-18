import "../../setup";
import { render, within, fireEvent } from "@testing-library/react";
import { describe, expect, it } from "bun:test";
import { PredictionForm } from "@/app/prediction/components/PredictionForm";
import { PREDICTION_LIMITS } from "@/lib/prediction";
import {
  PREDICTION_DIAG_EGR2_OPTIONS,
  PREDICTION_DIAG_ING1_OPTIONS,
  PREDICTION_DIAG_ING2_OPTIONS,
} from "@/lib/predictionDiagnoses";
import {
  HELP_AGE,
  HELP_APACHE,
  HELP_DIAG_ING,
  HELP_VAM_TIME,
  PREDICTION_DIAGNOSIS_OPTION_LABEL,
  PREDICTION_PATIENT_SECTION_TITLE,
  PREDICTION_EDAD_LABEL,
  PREDICTION_DIAG_ING1_LABEL,
  PREDICTION_DIAG_ING2_LABEL,
  PREDICTION_DIAG_EGR2_LABEL,
  PREDICTION_APACHE_LABEL,
  PREDICTION_TIEMPO_VAM_LABEL,
  PREDICTION_PREDICT_BUTTON,
  PREDICTION_PREDICTING_BUTTON,
} from "@/constants/constants";

const DEFAULT_PROPS = {
  edad: PREDICTION_LIMITS.edad.default,
  setEdad: () => {},
  diagIng1: PREDICTION_LIMITS.diagIng1.default,
  setDiagIng1: () => {},
  diagIng2: PREDICTION_LIMITS.diagIng2.default,
  setDiagIng2: () => {},
  diagEgr2: PREDICTION_LIMITS.diagEgr2.default,
  setDiagEgr2: () => {},
  apache: PREDICTION_LIMITS.apache.default,
  setApache: () => {},
  tiempoVam: PREDICTION_LIMITS.tiempoVam.default,
  setTiempoVam: () => {},
  loading: false,
  onPredict: () => {},
};

describe("PredictionForm", () => {
  it("renders all 6 input labels", () => {
    const { container } = render(<PredictionForm {...DEFAULT_PROPS} />);
    expect(within(container).getByText(PREDICTION_EDAD_LABEL)).toBeTruthy();
    expect(
      within(container).getByText(PREDICTION_DIAG_ING1_LABEL),
    ).toBeTruthy();
    expect(
      within(container).getByText(PREDICTION_DIAG_ING2_LABEL),
    ).toBeTruthy();
    expect(
      within(container).getByText(PREDICTION_DIAG_EGR2_LABEL),
    ).toBeTruthy();
    expect(within(container).getByText(PREDICTION_APACHE_LABEL)).toBeTruthy();
    expect(
      within(container).getByText(PREDICTION_TIEMPO_VAM_LABEL),
    ).toBeTruthy();
  });

  it("renders diagnosis selectors with the expected default indices", () => {
    const { container } = render(<PredictionForm {...DEFAULT_PROPS} />);

    expect(
      container
        .querySelector("button[aria-labelledby='pred-diag-ing1']")
        ?.textContent?.includes(
          PREDICTION_DIAGNOSIS_OPTION_LABEL(
            PREDICTION_LIMITS.diagIng1.default,
            "Intoxicación exógena",
          ),
        ),
    ).toBe(true);
    expect(
      container
        .querySelector("button[aria-labelledby='pred-diag-ing2']")
        ?.textContent?.includes(
          PREDICTION_DIAGNOSIS_OPTION_LABEL(PREDICTION_LIMITS.diagIng2.default),
        ),
    ).toBe(true);
    expect(
      container
        .querySelector("button[aria-labelledby='pred-diag-egr2']")
        ?.textContent?.includes(
          PREDICTION_DIAGNOSIS_OPTION_LABEL(
            PREDICTION_LIMITS.diagEgr2.default,
            "Status asmático",
          ),
        ),
    ).toBe(true);

    expect(
      container.querySelectorAll("select#pred-diag-ing1 option").length,
    ).toBe(PREDICTION_DIAG_ING1_OPTIONS.length);
    expect(
      container.querySelectorAll("select#pred-diag-ing2 option").length,
    ).toBe(PREDICTION_DIAG_ING2_OPTIONS.length);
    expect(
      container.querySelectorAll("select#pred-diag-egr2 option").length,
    ).toBe(PREDICTION_DIAG_EGR2_OPTIONS.length);
  });

  it("renders the desktop form order with age, APACHE II and VAM time first", () => {
    const { container } = render(<PredictionForm {...DEFAULT_PROPS} />);
    const ageInput = container.querySelector("#pred-edad");
    const apacheInput = container.querySelector("#pred-apache");
    const vamInput = container.querySelector("#pred-tiempo-vam");
    const diagInput = container.querySelector("#pred-diag-ing1");

    expect(ageInput).toBeTruthy();
    expect(apacheInput).toBeTruthy();
    expect(vamInput).toBeTruthy();
    expect(diagInput).toBeTruthy();

    if (!ageInput || !apacheInput || !vamInput || !diagInput) return;

    expect(
      ageInput.compareDocumentPosition(apacheInput) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
    expect(
      apacheInput.compareDocumentPosition(vamInput) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
    expect(
      vamInput.compareDocumentPosition(diagInput) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
  });

  it("renders contextual help for all prediction inputs", () => {
    const { container } = render(<PredictionForm {...DEFAULT_PROPS} />);

    expect(
      within(container).getAllByLabelText("Información de ayuda del campo")
        .length,
    ).toBe(6);
    expect(container.textContent?.includes(HELP_AGE)).toBe(true);
    expect(container.textContent?.includes(HELP_DIAG_ING)).toBe(true);
    expect(container.textContent?.includes(HELP_APACHE)).toBe(true);
    expect(container.textContent?.includes(HELP_VAM_TIME)).toBe(true);
  });

  it("renders section header", () => {
    const { container } = render(<PredictionForm {...DEFAULT_PROPS} />);
    expect(
      within(container).getByText(PREDICTION_PATIENT_SECTION_TITLE),
    ).toBeTruthy();
  });

  it("renders predict button with default label", () => {
    const { container } = render(<PredictionForm {...DEFAULT_PROPS} />);
    expect(within(container).getByText(PREDICTION_PREDICT_BUTTON)).toBeTruthy();
  });

  it("renders predicting label when loading", () => {
    const { container } = render(
      <PredictionForm {...DEFAULT_PROPS} loading={true} />,
    );
    expect(
      within(container).getByText(PREDICTION_PREDICTING_BUTTON),
    ).toBeTruthy();
  });

  it("button is disabled when loading", () => {
    const { container } = render(
      <PredictionForm {...DEFAULT_PROPS} loading={true} />,
    );
    const btn = within(container)
      .getByText(PREDICTION_PREDICTING_BUTTON)
      .closest("button");
    expect(btn).toBeTruthy();
    expect(btn.hasAttribute("disabled")).toBe(true);
  });

  it("calls onPredict when button is clicked", () => {
    let called = false;
    const { container } = render(
      <PredictionForm
        {...DEFAULT_PROPS}
        onPredict={() => {
          called = true;
        }}
      />,
    );
    const button = within(container)
      .getByText(PREDICTION_PREDICT_BUTTON)
      .closest("button");
    expect(button).toBeTruthy();
    fireEvent.click(button);
    expect(called).toBe(true);
  });

  it("displays default value for edad input", () => {
    const { container } = render(<PredictionForm {...DEFAULT_PROPS} />);
    const input = within(container).getByDisplayValue(
      String(PREDICTION_LIMITS.edad.default),
    );
    expect(input).toBeTruthy();
  });

  it("input min/max constraints match PREDICTION_LIMITS for edad", () => {
    const { container } = render(<PredictionForm {...DEFAULT_PROPS} />);
    const input = within(container).getByDisplayValue(
      String(PREDICTION_LIMITS.edad.default),
    );
    expect(input.getAttribute("min")).toBe(String(PREDICTION_LIMITS.edad.min));
    expect(input.getAttribute("max")).toBe(String(PREDICTION_LIMITS.edad.max));
  });

  it("calls setEdad with the new numeric value on change", () => {
    let updated = 0;
    const { container } = render(
      <PredictionForm
        {...DEFAULT_PROPS}
        setEdad={(v) => {
          updated = v;
        }}
      />,
    );
    const input = within(container).getByDisplayValue(
      String(PREDICTION_LIMITS.edad.default),
    );
    fireEvent.input(input, { target: { value: "35" } });
    expect(updated).toBe(35);
  });

  it("calls diagnosis setters with numeric values from the selectors", () => {
    let diagIng1Updated = 0;
    let diagIng2Updated = 0;
    let diagEgr2Updated = 0;

    const { container } = render(
      <PredictionForm
        {...DEFAULT_PROPS}
        setDiagIng1={(v) => {
          diagIng1Updated = v;
        }}
        setDiagIng2={(v) => {
          diagIng2Updated = v;
        }}
        setDiagEgr2={(v) => {
          diagEgr2Updated = v;
        }}
      />,
    );

    fireEvent.change(container.querySelector("#pred-diag-ing1")!, {
      target: { value: "5" },
    });
    fireEvent.change(container.querySelector("#pred-diag-ing2")!, {
      target: { value: "61" },
    });
    fireEvent.change(container.querySelector("#pred-diag-egr2")!, {
      target: { value: "39" },
    });

    expect(diagIng1Updated).toBe(5);
    expect(diagIng2Updated).toBe(61);
    expect(diagEgr2Updated).toBe(39);
  });

  it("renders integrated into the page without card shadow", () => {
    const { container } = render(<PredictionForm {...DEFAULT_PROPS} />);
    expect(container.querySelector(".shadow-sm")).toBeNull();
  });
});
