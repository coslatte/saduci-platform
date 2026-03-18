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
export const SIMULATION_PATIENT_SECTION_TITLE = "Datos del Paciente";
export const SIMULATION_METRICS_SECTION_TITLE =
  "Demográficos, tiempos y puntajes clínicos";
export const DEMOGRAPHICS_TITLE = "Demográficos & Tiempos";
export const CLINICAL_SCORES_TITLE = "Puntajes Clínicos";
export const VENTILATION_TITLE = "Ventilación Mecánica";
export const DIAGNOSES_TITLE = "Diagnósticos de Ingreso y Egreso";
export const SIMULATION_CONFIG_TITLE = "Configuración de Simulación";
export const RUNS_LABEL = "Corridas de la Simulación";
export const SIMULATE_BUTTON = "Realizar Simulación";
export const SIMULATION_CANCEL_BUTTON = "Cancelar simulación";
export const SIMULATION_CANCEL_COOLDOWN_LABEL = (seconds: number) =>
  `Enfriamiento activo: ${seconds}s`;
export const SIMULATION_LONG_RUN_WARNING_TITLE = "Simulación extensa detectada";
export const SIMULATION_LONG_RUN_WARNING_DESCRIPTION =
  "Más de 10,000 iteraciones pueden tardar varios minutos. La simulación continuará hasta completar el proceso.";
export const SIMULATION_PROGRESS_TITLE = "Progreso de simulación";
export const SIMULATION_PROGRESS_RUNNING =
  "Ejecutando simulación, por favor espere...";
export const SIMULATION_PROGRESS_ELAPSED_PREFIX = "Transcurrido:";
export const SIMULATION_PROGRESS_ESTIMATED_PREFIX = "Estimado:";
export const SIMULATION_PROGRESS_PERCENT_PREFIX = "Avance estimado:";
export const SIMULATION_CANCELLED_MESSAGE =
  "La simulación fue cancelada por el usuario.";
export const DOWNLOAD_CSV = "Descargar CSV";
export const ERROR_SIMULATION_TITLE = "Error en la simulación";
export const ALERT_ERROR_TITLE = "Error";
export const SIMULATION_RESULTS_TITLE = "Resultados de la Simulación";
export const SIMULATION_RESULTS_RUN_HISTORY = "Historial de ejecuciones";
export const SIMULATION_PAGINATION_PREVIOUS = "Anterior";
export const SIMULATION_PAGINATION_NEXT = "Siguiente";
export const SIMULATION_RESULTS_PAGE_SUMMARY = (
  current: number,
  total: number,
) => `Ejecución ${current} de ${total}`;
export const MODEL_PREDICTION_TITLE = "Predicción del modelo";
export const PATIENT_SURVIVES = "Paciente no fallece";
export const PATIENT_DIES = "Paciente fallece";
export const PROB_DIE_PREFIX = "Probabilidad de fallecer: ";
export const SIMULATION_AGE_LABEL = "Edad";
export const SIMULATION_PREUTI_STAY_LABEL = "Tiempo en Pre-UCI (h)";
export const SIMULATION_APACHE_LABEL = "APACHE";
export const SIMULATION_SIM_PERCENT_LABEL = "Porciento Tiempo UCI";
export const SIMULATION_VAM_TIME_LABEL = "Tiempo en VA (h)";
export const SIMULATION_UTI_STAY_LABEL = "Tiempo en UCI (h)";
export const SIMULATION_DIAG_ING_LABEL = (index: number) =>
  `Diag. Ingreso ${index}`;
export const SIMULATION_RESP_INSUF_LABEL = "Insuf. Respiratoria";
export const SIMULATION_VENT_TYPE_LABEL = "Ventilación Artificial";
export const SIMULATION_DIAG_DISCHARGE_LABEL = "Diagnóstico Egreso 2";

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
  "/prediction": "Predicción",
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
export const SIDEBAR_NAVIGATION_TITLE = "Navegación";
export const SIDEBAR_NAVIGATION_SUBTITLE = "Jerarquía del sistema";
export const SIDEBAR_COLLAPSE_EXPAND = "Expandir barra lateral";
export const SIDEBAR_COLLAPSE_COLLAPSE = "Contraer barra lateral";
export const SIDEBAR_USER_STATUS = "Sesión activa";
export const SIDEBAR_LOGOUT = "Cerrar sesión";
export const SIDEBAR_SECTION_EXPAND = (label: string) =>
  `Expandir sección ${label}`;
export const SIDEBAR_SECTION_COLLAPSE = (label: string) =>
  `Contraer sección ${label}`;
export const NAVBAR_PROFILE_SETTINGS = "Ir a ajustes de perfil";
export const NAVBAR_USER_STATUS = "Sesión activa";
export const NAVBAR_LOGOUT = "Cerrar sesión";
export const NAVBAR_MENU_SETTINGS = "Configuraciones";
export const NAVBAR_MENU_LOGOUT = "Cerrar Sesión";
export const FIELD_HELP_ARIA_LABEL = "Información de ayuda del campo";

// Simulation validation messages
export const VALIDATION_MISSING_DIAG =
  "Todos los diagnósticos de ingreso están vacíos. Incluya al menos uno para la simulación.";
export const VALIDATION_SELECT_RESP =
  "Seleccione un tipo de Insuficiencia Respiratoria.";

// Home / Dashboard
export const HOME_DEFAULT_GREETING = "Bienvenido";
export const HOME_WELCOME_SUBTITLE =
  "Panel principal de Saduci Platform - sistema de simulación y análisis clínico para Unidades de Cuidados Intensivos.";
export const HOME_PRESENTATION_SECTION_TITLE = "Presentación";
export const HOME_DOCUMENTATION_SECTION_TITLE = "Documentación";
export const HOME_DOCUMENTATION_SECTION_DESCRIPTION =
  "En esta sección se encuentran los recursos oficiales del proyecto. Los enlaces se ubican al final del bloque para mantener una jerarquía visual estable en el dashboard.";

export const ABOUT_TITLE = "Acerca de la Plataforma";

export const ABOUT_DESC: React.ReactNode = (
  <>
    <strong>SADUCI</strong> es una plataforma para el apoyo en la unidad clínica
    la evolución de pacientes en la Unidad de Cuidados Intensivos (UCI).{" "}
    {
      '"Saduci" significa "Sistema de Apoyo en la Decisión en la Unidad de Cuidado Intensivo".'
    }
  </>
);

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

// Predefined tag color palette for page builder tags
export const TAG_COLOR_PALETTE = [
  { name: "Azul", value: "#3b82f6" },
  { name: "Verde", value: "#22c55e" },
  { name: "Amarillo", value: "#eab308" },
  { name: "Rojo", value: "#ef4444" },
  { name: "Morado", value: "#a855f7" },
  { name: "Gris", value: "#6b7280" },
  { name: "Rosa", value: "#ec4899" },
  { name: "Naranja", value: "#f97316" },
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

// Not-found / Error pages
export const NOT_FOUND_CODE = "404";
export const NOT_FOUND_TITLE = "Página no encontrada";
export const NOT_FOUND_SUBTITLE =
  "La ruta que intentas acceder no existe o no está disponible.";
export const NOT_FOUND_BACK_BUTTON = "Volver al inicio";

export const ERROR_PAGE_TITLE = "Ocurrió un error inesperado";
export const ERROR_PAGE_SUBTITLE =
  "Algo salió mal al cargar esta sección. Puedes intentar de nuevo o volver al inicio.";
export const ERROR_PAGE_RETRY_BUTTON = "Reintentar";
export const ERROR_PAGE_BACK_BUTTON = "Volver al inicio";

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
export const STATS_DRAG_DROP_SINGLE_HINT = "o arrastra un CSV aquí";
export const STATS_DRAG_DROP_MULTI_HINT = "o arrastra CSV aquí";
export const STATS_DRAG_DROP_ACTIVE_SINGLE = "Suelta el archivo CSV aquí";
export const STATS_DRAG_DROP_ACTIVE_MULTI = "Suelta los archivos CSV aquí";
export const STATS_DROP_INVALID_FILES =
  "Solo se aceptan archivos con extensión .csv";
export const STATS_ERROR_COLUMN_NOT_FOUND_IN_FILE = (
  column: string,
  fileName: string,
  availableColumns: string,
) =>
  `La columna "${column}" no existe en "${fileName}". Columnas detectadas: ${availableColumns}.`;
export const STATS_ERROR_COLUMN_NOT_FOUND_IN_FILES = (
  column: string,
  availableColumns: string,
) =>
  `La columna "${column}" no se encontró en suficientes archivos CSV. Columnas detectadas: ${availableColumns}.`;
export const STATS_TABLE_METRIC_HEADER = "Métrica";
export const STATS_TABLE_VALUE_HEADER = "Valor";
export const STATS_LOADING = "Ejecutando...";
export const STATS_TABLIST_LABEL = "Pruebas estadísticas";

// Prediction (ML Prediction & Explainability)
export const PREDICTION_PAGE_TITLE = "Predicción de No Supervivencia";
export const PREDICTION_PAGE_SUBTITLE =
  "Herramienta de apoyo en la predicción de no supervivencia de pacientes en UCI.";
export const PREDICTION_PATIENT_SECTION_TITLE = "Características del Paciente";
export const PREDICTION_EDAD_LABEL = "Edad";
export const PREDICTION_DIAG_ING1_LABEL = "Diag.Ing1";
export const PREDICTION_DIAG_ING2_LABEL = "Diag.Ing2";
export const PREDICTION_DIAG_EGR2_LABEL = "Diag.Egr2";
export const PREDICTION_APACHE_LABEL = "APACHE II";
export const PREDICTION_TIEMPO_VAM_LABEL = "TiempoVAM";
export const PREDICTION_DIAGNOSIS_OPTION_LABEL = (
  code: number,
  diagnosisLabel?: string,
) => (diagnosisLabel ? `${code} — ${diagnosisLabel}` : `Código ${code}`);
export const PREDICTION_PREDICT_BUTTON = "Predecir";
export const PREDICTION_PREDICTING_BUTTON = "Prediciendo...";
export const PREDICTION_RESULT_TITLE = "Probabilidad de No Supervivencia";
export const PREDICTION_RESULT_EMPTY_STATE =
  "Realice una predicción para visualizar el resultado del modelo.";
export const PREDICTION_PATIENT_SURVIVES = "Paciente no fallece";
export const PREDICTION_PATIENT_DIES = "Paciente fallece";
export const PREDICTION_EXPLAIN_SECTION_TITLE = "Explicabilidad";
export const PREDICTION_METHOD_LABEL = "Método de Explicabilidad";
export const PREDICTION_EXPLAIN_BUTTON = "Explicar";
export const PREDICTION_EXPLAINING_BUTTON = "Generando...";
export const PREDICTION_EXPLAIN_TITLE = (method: string) =>
  `Explicación de ${method}`;
export const PREDICTION_WARN_NO_PREDICTION =
  "Realice una predicción antes de solicitar la explicación.";
export const PREDICTION_ERROR_TITLE = "Error en la predicción";
export const PREDICTION_FEATURE_IMPORTANCE_TITLE =
  "Relevancia de las Características";
export const PREDICTION_POSITIVE = "Positiva (aumenta probabilidad)";
export const PREDICTION_NEGATIVE = "Negativa (disminuye probabilidad)";

// Backwards compatibility aliases (Spanish identifiers)
export const PREDICCION_PAGE_TITLE = PREDICTION_PAGE_TITLE;
export const PREDICCION_PAGE_SUBTITLE = PREDICTION_PAGE_SUBTITLE;
export const PREDICCION_PATIENT_SECTION_TITLE =
  PREDICTION_PATIENT_SECTION_TITLE;
export const PREDICCION_EDAD_LABEL = PREDICTION_EDAD_LABEL;
export const PREDICCION_DIAG_ING1_LABEL = PREDICTION_DIAG_ING1_LABEL;
export const PREDICCION_DIAG_ING2_LABEL = PREDICTION_DIAG_ING2_LABEL;
export const PREDICCION_DIAG_EGR2_LABEL = PREDICTION_DIAG_EGR2_LABEL;
export const PREDICCION_APACHE_LABEL = PREDICTION_APACHE_LABEL;
export const PREDICCION_TIEMPO_VAM_LABEL = PREDICTION_TIEMPO_VAM_LABEL;
export const PREDICCION_PREDICT_BUTTON = PREDICTION_PREDICT_BUTTON;
export const PREDICCION_PREDICTING_BUTTON = PREDICTION_PREDICTING_BUTTON;
export const PREDICCION_RESULT_TITLE = PREDICTION_RESULT_TITLE;
export const PREDICCION_PATIENT_SURVIVES = PREDICTION_PATIENT_SURVIVES;
export const PREDICCION_PATIENT_DIES = PREDICTION_PATIENT_DIES;
export const PREDICCION_EXPLAIN_SECTION_TITLE =
  PREDICTION_EXPLAIN_SECTION_TITLE;
export const PREDICCION_METHOD_LABEL = PREDICTION_METHOD_LABEL;
export const PREDICCION_EXPLAIN_BUTTON = PREDICTION_EXPLAIN_BUTTON;
export const PREDICCION_EXPLAINING_BUTTON = PREDICTION_EXPLAINING_BUTTON;
export const PREDICCION_EXPLAIN_TITLE = PREDICTION_EXPLAIN_TITLE;
export const PREDICCION_WARN_NO_PREDICTION = PREDICTION_WARN_NO_PREDICTION;
export const PREDICCION_ERROR_TITLE = PREDICTION_ERROR_TITLE;
export const PREDICCION_FEATURE_IMPORTANCE_TITLE =
  PREDICTION_FEATURE_IMPORTANCE_TITLE;
export const PREDICCION_POSITIVE = PREDICTION_POSITIVE;
export const PREDICCION_NEGATIVE = PREDICTION_NEGATIVE;

// Notifications
export const NOTIFICATIONS_TITLE = "Notificaciones";
export const NOTIFICATIONS_MARK_ALL = "Marcar todo";
export const NOTIFICATIONS_MARK_READ = "Marcar leída";
export const NOTIFICATIONS_EMPTY = "No hay notificaciones";
export const NOTIFICATIONS_EMPTY_SUBTITLE =
  "No hay notificaciones recientes. Te avisaremos cuando haya novedades.";

// Input field help messages (adapted from Streamlit reference constants/messages.py)
export const HELP_ID_PATIENT =
  "Identificador del Paciente en el sistema. Utilizado en la simulación para numerar experimentos.";
export const HELP_APACHE =
  "Valor del APACHE (Acute Physiology and Chronic Health Evaluation): puntaje clínico para cuidados intensivos que mide la gravedad del paciente crítico y estima su riesgo de mortalidad. Un riesgo bajo sería 0 y un riesgo alto sería 36.";
export const HELP_UTI_STAY =
  "Tiempo de estadía en Unidad de Terapia Intensiva (UTI) en horas.";
export const HELP_PREUTI_STAY =
  "Tiempo de estadía pre Unidad de Terapia Intensiva (UTI) antes de ingresar a la unidad, en horas.";
export const HELP_SIM_RUNS =
  "Cantidad de corridas de la simulación. Un número mayor mejora la precisión pero incrementa el tiempo de procesamiento. Se recomienda 200 corridas como punto de partida.";
export const HELP_SIM_PERCENT =
  "Proporción de tiempo dentro de la estancia UCI que se espera antes de entrar en Ventilación.";
export const HELP_PREDICTION_METRIC =
  "La predicción se realiza mediante un modelo de Inteligencia Artificial entrenado con datos de pacientes UCI. Intervienen variables como Diagnóstico Ingreso 1, Diagnóstico Ingreso 2, Diagnóstico Egreso 2, Tiempo en VAM, Apache y Edad.";
export const HELP_VAM_TIME =
  "Tiempo en Ventilación Asistida Mecánica (VAM) en horas.";
export const HELP_AGE =
  "Edad del paciente en años cumplidos al momento de la evaluación clínica.";
export const HELP_DIAG_ING =
  "Diagnóstico principal de ingreso del paciente a la unidad. Seleccione la categoría clínica que mejor describe el estado inicial.";
export const HELP_RESP_INSUF =
  "Clasificación del tipo de insuficiencia respiratoria presente en el paciente.";
export const HELP_VENT_TYPE =
  "Tipo de soporte de ventilación mecánica aplicado durante la atención del paciente.";
export const HELP_DIAG_DISCHARGE =
  "Diagnóstico clínico al egreso del paciente. Se usa para contextualizar la evolución y el desenlace.";
