import { type ReactElement } from "react";
import { PREUCI_DIAG, RESP_INSUF, VENTILATION_TYPE } from "@/lib/simulation";

export function diagOptions(): ReactElement[] {
  return Object.entries(PREUCI_DIAG).map(([k, v]) => (
    <option key={k} value={k}>
      {v}
    </option>
  ));
}

export function respInsufOptions(): ReactElement[] {
  return Object.entries(RESP_INSUF).map(([k, v]) => (
    <option key={k} value={k}>
      {v}
    </option>
  ));
}

export function ventTypeOptions(): ReactElement[] {
  return Object.entries(VENTILATION_TYPE).map(([k, v]) => (
    <option key={k} value={k}>
      {v}
    </option>
  ));
}
