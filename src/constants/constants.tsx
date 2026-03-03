import React from "react";

// Centralized UI strings, labels and defaults
export const APP_NAME = "Saduci Platform";

// Login
export const LOGIN_DEFAULT_EMAIL = "ana@saduci.com";
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
export const NAV_BRAND_SHORT = "Saduci";
export const SEARCH_PLACEHOLDER = "Buscar...";

export const ROUTE_NAMES_MAP: Record<string, string> = {
  "/": "Dashboard",
  "/simulation": "Simulación",
  "/statistics": "Pruebas Estadísticas",
  "/usuarios": "Usuarios",
  "/settings": "Ajustes",
};

export const ROUTE_BREADCRUMB_SEGMENTS: Record<
  string,
  { label: string; href: string }[]
> = {
  "/statistics": [{ label: "Simulación", href: "/simulation" }],
};

export const SIDEBAR_BRAND_FULL = APP_NAME;
export const SIDEBAR_COLLAPSE_EXPAND = "Expandir barra lateral";
export const SIDEBAR_COLLAPSE_COLLAPSE = "Contraer barra lateral";

// Simulation validation messages
export const VALIDATION_MISSING_DIAG =
  "Todos los diagnósticos de ingreso están vacíos. Incluya al menos uno para la simulación.";
export const VALIDATION_SELECT_RESP =
  "Seleccione un tipo de Insuficiencia Respiratoria.";

// Home / Dashboard
export const HOME_DEFAULT_GREETING = "Bienvenido";
export const HOME_WELCOME_SUBTITLE =
  "Panel principal de Saduci Platform — sistema de simulación y análisis clínico para Unidades de Cuidados Intensivos.";

export const ABOUT_TITLE = "Acerca de la Plataforma";
// Export as JSX to allow inline formatting (strong/italic) while keeping centralized text
export const ABOUT_DESC: React.ReactNode = (
  <>
    <strong>Saduci Platform</strong> es una herramienta de simulación clínica
    diseñada para modelar la evolución de pacientes en la Unidad de Cuidados
    Intensivos (UCI). Permite ejecutar simulaciones
    <em> Monte Carlo</em> con parámetros clínicos reales y obtener predicciones
    de mortalidad. "Saduci" significa "Sistema de Apoyo en la Decisión en la
    Unidad de Cuidado Intensivo".
  </>
);

export const ABOUT_TAG_MC = "Simulación Monte Carlo";
export const ABOUT_VERSION = "v0.1.0";

export const PROJECT_LINKS = [
  {
    label: "Repositorio GitHub",
    href: "https://github.com/coslatte/sadeci-platform",
    description: "Código fuente y contribuciones",
  },
  {
    label: "Documentación",
    href: "https://github.com/coslatte/sadeci-platform#readme",
    description: "Guía de uso y referencia técnica",
  },
];

// User Settings
export const SETTINGS_PAGE_TITLE = "Ajustes de usuario";
export const SETTINGS_PAGE_SUBTITLE =
  "Gestiona tu perfil y configuración de seguridad.";
export const SETTINGS_PROFILE_SECTION = "Perfil";
export const SETTINGS_SECURITY_SECTION = "Seguridad de la cuenta";
export const SETTINGS_CURRENT_PWD_LABEL = "Contraseña actual";
export const SETTINGS_NEW_PWD_LABEL = "Nueva contraseña";
export const SETTINGS_CONFIRM_PWD_LABEL = "Confirmar nueva contraseña";
export const SETTINGS_SAVE_BTN = "Guardar cambios";
export const SETTINGS_SAVING_BTN = "Guardando...";
export const SETTINGS_MOCK_LABEL = "Usar datos mock";
export const SETTINGS_PWD_MIN_HINT = "Mínimo 8 caracteres";
export const SETTINGS_PWD_EMPTY = "Este campo es requerido.";
export const SETTINGS_PWD_TOO_SHORT =
  "La contraseña debe tener al menos 8 caracteres.";
export const SETTINGS_PWD_MISMATCH = "Las contraseñas no coinciden.";
export const SETTINGS_PWD_SUCCESS = "Contraseña actualizada correctamente.";
export const SETTINGS_PWD_ERROR = "Error al actualizar la contraseña.";
export const SETTINGS_NET_ERROR = "Error de red al cambiar la contraseña.";

// Statistics
export const STATISTICS_PAGE_TITLE = "Pruebas Estadísticas";
export const STATISTICS_PAGE_SUBTITLE =
  "Ejecute pruebas estadísticas no paramétricas sobre los datos de experimentos de pacientes UCI.";
export const WILCOXON_SECTION_TITLE = "Test de Wilcoxon";
export const FRIEDMAN_SECTION_TITLE = "Test de Friedman";
export const STATS_STATISTIC_LABEL = "Estadístico";
export const STATS_P_VALUE_LABEL = "Valor de P";
export const STATS_RUN_WILCOXON = "Realizar prueba de Wilcoxon";
export const STATS_RUN_FRIEDMAN = "Realizar prueba de Friedman";
export const STATS_INFO_STATISTIC =
  "**Statistic**: Indica cuánto difieren los datos entre sí basándose en el orden de las diferencias; un valor más pequeño sugiere mayores diferencias entre los grupos comparados.";
export const STATS_INFO_P_VALUE =
  "**Valor de P**: Indica qué tan probable es que las diferencias observadas se deban al azar; si es menor a 0.05, es probable que las diferencias sean estadísticamente significativas.";
export const STATS_ERROR_MIN_SAMPLES_FRIEDMAN =
  "Debe proporcionar al menos 3 muestras para realizar el test de Friedman.";
export const STATS_ERROR_WILCOXON_EMPTY =
  "Debe proporcionar dos muestras con datos para realizar el test de Wilcoxon.";
export const STATS_SELECT_COLUMN = "Seleccione una columna para comparar";

export const STATS_UPLOAD_EXPERIMENT_1 = "Experimento 1 (CSV)";
export const STATS_UPLOAD_EXPERIMENT_2 = "Experimento 2 (CSV)";
export const STATS_UPLOAD_EXPERIMENTS = "Experimentos (CSV)";
export const STATS_PREVIEW_LABEL = "Vista previa";
export const STATS_NO_FILES = "No se han cargado archivos.";
export const STATS_RESULTS_TITLE = "Resultados";
export const STATS_WARNING_SIZE_ADJUSTED =
  "Para realizar correctamente la prueba se ajustaron los tamaños de muestra. Todas las columnas quedaron con el mismo número de filas.";
export const STATS_ERROR_PARSE = "Error al procesar los archivos CSV.";
export const STATS_EXPERIMENT_LABEL = (n: number) => `Experimento ${n}`;
export const STATS_CLICK_TO_SELECT_FILE =
  "Haz clic para seleccionar un archivo CSV";
export const STATS_CLICK_TO_SELECT_FILES =
  "Haz clic para seleccionar archivos CSV (mínimo 3)";
export const STATS_TABLE_METRIC_HEADER = "Métrica";
export const STATS_TABLE_VALUE_HEADER = "Valor";
export const STATS_LOADING = "Ejecutando...";
export const STATS_TABLIST_LABEL = "Pruebas estadísticas";

// Notifications
export const NOTIFICATIONS_TITLE = "Notificaciones";
export const NOTIFICATIONS_MARK_ALL = "Marcar todo";
export const NOTIFICATIONS_MARK_READ = "Marcar leída";
export const NOTIFICATIONS_EMPTY = "No hay notificaciones";
export const NOTIFICATIONS_EMPTY_SUBTITLE =
  "No hay notificaciones recientes. Te avisaremos cuando haya novedades.";
