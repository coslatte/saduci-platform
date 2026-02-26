// Centralized UI strings, labels and defaults
export const APP_NAME = "Sadeci Platform";

// Login
export const LOGIN_DEFAULT_EMAIL = "ana@sadeci.com";
// WARNING: Do not set any real default password here. This constant must not be
// used for authentication in production; prefer environment variables or config.
export const LOGIN_DEFAULT_PASSWORD = "";

export const LOGIN_PROMPT = "Inicie sesión para continuar";
export const LOGIN_BUTTON = "Iniciar Sesión";
export const LOGIN_ERROR_MSG = "No se pudo iniciar sesión. Intente de nuevo.";

// Simulation page
export const SIMULATION_PAGE_TITLE = "Simulación de Paciente UCI";
export const SIMULATION_PAGE_SUBTITLE =
  "Ingrese los datos clínicos del paciente para simular su evolución en la Unidad de Cuidados Intensivos.";

export const ID_PATIENT_LABEL = "ID Paciente";
export const NEW_PATIENT_BUTTON = "Nuevo paciente";
export const DEMOGRAPHICS_TITLE = "Demográficos & Tiempos";
export const CLINICAL_SCORES_TITLE = "Puntajes Clínicos";
export const VENTILATION_TITLE = "Ventilación Mecánica";
export const DIAGNOSES_TITLE = "Diagnósticos de Ingreso y Egreso";
export const SIMULATION_CONFIG_TITLE = "Configuración de Simulación";
export const RUNS_LABEL = "Corridas de la Simulación";
export const SIMULATE_BUTTON = "Realizar Simulación";
export const DOWNLOAD_CSV = "Descargar CSV";
export const ERROR_SIMULATION_TITLE = "Error en la simulación";
export const ALERT_ERROR_TITLE = "Error";
export const MODEL_PREDICTION_TITLE = "Predicción del modelo";
export const PATIENT_SURVIVES = "Paciente no fallece";
export const PATIENT_DIES = "Paciente fallece";
export const PROB_DIE_PREFIX = "Probabilidad de fallecer: ";

// Helper for formatted runs text
export function runsRangeText(min: number, max: number) {
  return `Mínimo ${min} — máximo ${max.toLocaleString()} iteraciones`;
}

// Navigation & UI
export const NAV_BRAND_SHORT = "Sadeci";
export const SEARCH_PLACEHOLDER = "Buscar...";

export const ROUTE_NAMES_MAP: Record<string, string> = {
  "/": "Dashboard",
  "/simulacion": "Simulación",
  "/reportes": "Reportes",
  "/usuarios": "Usuarios",
  "/ajustes": "Ajustes",
};

export const SIDEBAR_BRAND_FULL = APP_NAME;
export const SIDEBAR_COLLAPSE_EXPAND = "Expandir barra lateral";
export const SIDEBAR_COLLAPSE_COLLAPSE = "Contraer barra lateral";

// Simulation validation messages
export const VALIDATION_MISSING_DIAG =
  "Todos los diagnósticos de ingreso están vacíos. Incluya al menos uno para la simulación.";
export const VALIDATION_SELECT_RESP =
  "Seleccione un tipo de Insuficiencia Respiratoria.";
