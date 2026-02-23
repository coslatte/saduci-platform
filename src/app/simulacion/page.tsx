"use client";

import { useState } from "react";
import {
  FiHome,
  FiBarChart2,
  FiUsers,
  FiSettings,
  FiActivity,
  FiRefreshCw,
  FiDownload,
} from "react-icons/fi";
import { Button } from "@/components/atoms/Buttons";
import { Card } from "@/components/molecules/Card";
import { Alert } from "@/components/molecules/Alert";
import { Badge } from "@/components/atoms/Badge";
import { Label } from "@/components/atoms/Label";
import { Input } from "@/components/atoms/Input";
import { Select } from "@/components/atoms/Select";
import { Navbar } from "@/components/organisms/Navbar";
import { Sidebar } from "@/components/organisms/Sidebar";
import { Footer } from "@/components/organisms/Footer";
import {
  SIMULATION_LIMITS,
  PREUCI_DIAG,
  RESP_INSUF,
  VENTILATION_TYPE,
  TIME_VARIABLE_LABELS,
  generatePatientId,
  runSimulation,
  type SimulationRequest,
  type SimulationResponse,
} from "@/lib/simulation";

// ─── Sidebar config ────────────────────────────────────────────────────────────

const sidebarSections = [
  {
    title: "Principal",
    items: [
      {
        label: "Dashboard",
        href: "/",
        icon: <FiHome className="size-5" />,
      },
      {
        label: "Simulación",
        href: "/simulacion",
        active: true,
        icon: <FiActivity className="size-5" />,
      },
      {
        label: "Reportes",
        href: "/reportes",
        icon: <FiBarChart2 className="size-5" />,
      },
    ],
  },
  {
    title: "Configuración",
    items: [
      {
        label: "Usuarios",
        href: "/usuarios",
        icon: <FiUsers className="size-5" />,
      },
      {
        label: "Ajustes",
        href: "/ajustes",
        icon: <FiSettings className="size-5" />,
      },
    ],
  },
];

// ─── Select options helpers ────────────────────────────────────────────────────

function diagOptions() {
  return Object.entries(PREUCI_DIAG).map(([k, v]) => (
    <option key={k} value={k}>
      {v}
    </option>
  ));
}

function respInsufOptions() {
  return Object.entries(RESP_INSUF).map(([k, v]) => (
    <option key={k} value={k}>
      {v}
    </option>
  ));
}

function ventTypeOptions() {
  return Object.entries(VENTILATION_TYPE).map(([k, v]) => (
    <option key={k} value={k}>
      {v}
    </option>
  ));
}

// ─── Result table ──────────────────────────────────────────────────────────────

function SimulationResultTable({
  result,
}: {
  result: SimulationResponse["simulation"];
}) {
  const keys = Object.keys(result) as (keyof typeof result)[];
  const rows = [
    { label: "Promedio", key: "mean" as const },
    { label: "Desviación Estándar", key: "std" as const },
    { label: "Límite Inf.", key: "ci_lower" as const },
    { label: "Límite Sup.", key: "ci_upper" as const },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm" aria-label="Resultados de simulación">
        <thead>
          <tr className="border-b border-zinc-200">
            <th className="py-2 pr-4 text-left font-medium text-zinc-500">
              Estadístico
            </th>
            {keys.map((k) => (
              <th
                key={k}
                className="py-2 px-3 text-right font-medium text-zinc-700"
              >
                {TIME_VARIABLE_LABELS[k]}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map(({ label, key }) => (
            <tr key={key} className="border-b border-zinc-100 last:border-0">
              <td className="py-2 pr-4 text-zinc-500">{label}</td>
              {keys.map((k) => (
                <td key={k} className="py-2 px-3 text-right tabular-nums">
                  {result[k][key].toFixed(2)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function SimulacionPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Patient fields
  const [patientId, setPatientId] = useState(() => generatePatientId());
  const [age, setAge] = useState<number>(SIMULATION_LIMITS.age.default);
  const [apache, setApache] = useState<number>(SIMULATION_LIMITS.apache.default);
  const [preutiStay, setPreutiStay] = useState<number>(
    SIMULATION_LIMITS.preutiStay.default,
  );
  const [vamTime, setVamTime] = useState<number>(SIMULATION_LIMITS.vamTime.default);
  const [utiStay, setUtiStay] = useState<number>(SIMULATION_LIMITS.utiStay.default);
  const [simPercent, setSimPercent] = useState<number>(
    SIMULATION_LIMITS.simPercent.default,
  );
  const [diagIng1, setDiagIng1] = useState<number>(0);
  const [diagIng2, setDiagIng2] = useState<number>(0);
  const [diagIng3, setDiagIng3] = useState<number>(0);
  const [diagIng4, setDiagIng4] = useState<number>(0);
  const [diagEgreso2, setDiagEgreso2] = useState<number>(0);
  const [respInsuf, setRespInsuf] = useState<number>(0);
  const [ventType, setVentType] = useState<number>(0);

  // Simulation config
  const [simRuns, setSimRuns] = useState<number>(SIMULATION_LIMITS.simRuns.default);

  // Async state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<SimulationResponse | null>(null);

  // ── Handlers ────────────────────────────────────────────────────────────────

  function handleNewPatient() {
    setPatientId(generatePatientId());
    setResult(null);
    setError(null);
  }

  async function handleSimulate() {
    setError(null);

    if ([diagIng1, diagIng2, diagIng3, diagIng4].every((d) => d === 0)) {
      setError(
        "Todos los diagnósticos de ingreso están vacíos. Debe incluir al menos uno para realizar la simulación.",
      );
      return;
    }
    if (respInsuf === 0) {
      setError("Seleccione un tipo de Insuficiencia Respiratoria.");
      return;
    }

    const payload: SimulationRequest = {
      age,
      apache,
      d1: diagIng1,
      d2: diagIng2,
      d3: diagIng3,
      d4: diagIng4,
      diag_egreso2: diagEgreso2,
      artif_vent: ventType,
      vam_time: vamTime,
      uti_stay: utiStay,
      preuti_stay: preutiStay,
      resp_insuf: respInsuf,
      percent: simPercent,
      n_runs: simRuns,
    };

    setLoading(true);
    try {
      const data = await runSimulation(payload);
      setResult(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "No se pudo ejecutar la simulación.",
      );
    } finally {
      setLoading(false);
    }
  }

  function handleDownload() {
    if (!result) return;

    const sim = result.simulation;
    const keys = Object.keys(sim) as (keyof typeof sim)[];
    const header = ["Estadístico", ...keys.map((k) => TIME_VARIABLE_LABELS[k])];
    const statsRows = [
      ["Promedio", ...keys.map((k) => sim[k].mean.toFixed(2))],
      ["Desviación Estándar", ...keys.map((k) => sim[k].std.toFixed(2))],
      ["Límite Inf.", ...keys.map((k) => sim[k].ci_lower.toFixed(2))],
      ["Límite Sup.", ...keys.map((k) => sim[k].ci_upper.toFixed(2))],
    ];

    const csv = [header, ...statsRows].map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `simulacion-paciente-${patientId}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  // ── Prediction display helpers ───────────────────────────────────────────────

  const prediction = result?.prediction;
  const patientSurvives = prediction?.class === 0;

  // ── Render ───────────────────────────────────────────────────────────────────

  return (
    <div className="flex min-h-screen flex-col bg-zinc-50">
      <Navbar
        userName="Ana García"
        userRole="Administrador"
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed((s) => !s)}
      />

      <div className="flex flex-1">
        <div className="hidden md:flex">
          <Sidebar sections={sidebarSections} collapsed={sidebarCollapsed} />
        </div>

        <main className="flex-1 overflow-auto p-6">
          {/* ── Page header ── */}
          <div className="mb-6">
            <h1 className="text-2xl font-semibold text-zinc-900">
              Simulación de Paciente UCI
            </h1>
            <p className="mt-1 text-sm text-zinc-500">
              Ingrese los datos clínicos del paciente para simular su evolución
              en la Unidad de Cuidados Intensivos.
            </p>
          </div>

          <div className="flex flex-col gap-6">
            {/* ── Patient data ── */}
            <Card
              header={
                <div className="flex items-center justify-between">
                  <h2 className="text-base font-semibold text-zinc-900">
                    Datos del Paciente
                  </h2>
                  <Badge status="info">ID: {patientId}</Badge>
                </div>
              }
            >
              {/* ID row */}
              <div className="mb-4 flex items-end gap-3">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="patient-id">ID Paciente</Label>
                  <Input
                    id="patient-id"
                    value={patientId}
                    maxLength={10}
                    onChange={(e) => setPatientId(e.target.value)}
                    className="w-40"
                    aria-label="ID del paciente"
                  />
                </div>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleNewPatient}
                  aria-label="Generar nuevo ID de paciente"
                >
                  <FiRefreshCw className="size-4" />
                  Nuevo paciente
                </Button>
              </div>

              {/* Numeric row */}
              <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="age">Edad</Label>
                  <Input
                    id="age"
                    type="number"
                    min={SIMULATION_LIMITS.age.min}
                    max={SIMULATION_LIMITS.age.max}
                    value={age}
                    onChange={(e) => setAge(Number(e.target.value))}
                    fullWidth
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="sim-percent">% Tiempo UCI</Label>
                  <Input
                    id="sim-percent"
                    type="number"
                    min={SIMULATION_LIMITS.simPercent.min}
                    max={SIMULATION_LIMITS.simPercent.max}
                    value={simPercent}
                    onChange={(e) => setSimPercent(Number(e.target.value))}
                    fullWidth
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="apache">Apache</Label>
                  <Input
                    id="apache"
                    type="number"
                    min={SIMULATION_LIMITS.apache.min}
                    max={SIMULATION_LIMITS.apache.max}
                    value={apache}
                    onChange={(e) => setApache(Number(e.target.value))}
                    fullWidth
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="preuti-stay">Tiempo Pre-UCI (h)</Label>
                  <Input
                    id="preuti-stay"
                    type="number"
                    min={SIMULATION_LIMITS.preutiStay.min}
                    max={SIMULATION_LIMITS.preutiStay.max}
                    value={preutiStay}
                    onChange={(e) => setPreutiStay(Number(e.target.value))}
                    fullWidth
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="vam-time">Tiempo VA (h)</Label>
                  <Input
                    id="vam-time"
                    type="number"
                    min={SIMULATION_LIMITS.vamTime.min}
                    max={SIMULATION_LIMITS.vamTime.max}
                    value={vamTime}
                    onChange={(e) => setVamTime(Number(e.target.value))}
                    fullWidth
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="uti-stay">Tiempo UCI (h)</Label>
                  <Input
                    id="uti-stay"
                    type="number"
                    min={SIMULATION_LIMITS.utiStay.min}
                    max={SIMULATION_LIMITS.utiStay.max}
                    value={utiStay}
                    onChange={(e) => setUtiStay(Number(e.target.value))}
                    fullWidth
                  />
                </div>
              </div>

              {/* Select row: diagnoses, resp insuf, vent type */}
              <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="diag-ing-1">Diag. Ingreso 1</Label>
                  <Select
                    id="diag-ing-1"
                    value={diagIng1}
                    onChange={(e) => setDiagIng1(Number(e.target.value))}
                    fullWidth
                  >
                    {diagOptions()}
                  </Select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="diag-ing-2">Diag. Ingreso 2</Label>
                  <Select
                    id="diag-ing-2"
                    value={diagIng2}
                    onChange={(e) => setDiagIng2(Number(e.target.value))}
                    fullWidth
                  >
                    {diagOptions()}
                  </Select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="diag-ing-3">Diag. Ingreso 3</Label>
                  <Select
                    id="diag-ing-3"
                    value={diagIng3}
                    onChange={(e) => setDiagIng3(Number(e.target.value))}
                    fullWidth
                  >
                    {diagOptions()}
                  </Select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="diag-ing-4">Diag. Ingreso 4</Label>
                  <Select
                    id="diag-ing-4"
                    value={diagIng4}
                    onChange={(e) => setDiagIng4(Number(e.target.value))}
                    fullWidth
                  >
                    {diagOptions()}
                  </Select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="resp-insuf">Insuf. Respiratoria</Label>
                  <Select
                    id="resp-insuf"
                    value={respInsuf}
                    onChange={(e) => setRespInsuf(Number(e.target.value))}
                    fullWidth
                  >
                    {respInsufOptions()}
                  </Select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="vent-type">Ventilación Artificial</Label>
                  <Select
                    id="vent-type"
                    value={ventType}
                    onChange={(e) => setVentType(Number(e.target.value))}
                    fullWidth
                  >
                    {ventTypeOptions()}
                  </Select>
                </div>
              </div>

              {/* Discharge diagnosis */}
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
                <div className="flex flex-col gap-1.5 lg:col-span-2">
                  <Label htmlFor="diag-egreso-2">Diagnóstico Egreso 2</Label>
                  <Select
                    id="diag-egreso-2"
                    value={diagEgreso2}
                    onChange={(e) => setDiagEgreso2(Number(e.target.value))}
                    fullWidth
                  >
                    {diagOptions()}
                  </Select>
                </div>
              </div>
            </Card>

            {/* ── Simulation config ── */}
            <Card
              header={
                <h2 className="text-base font-semibold text-zinc-900">
                  Configuración de Simulación
                </h2>
              }
              footer={
                <div className="flex justify-end">
                  <Button
                    onClick={handleSimulate}
                    loading={loading}
                    size="md"
                    aria-label="Realizar simulación"
                  >
                    Realizar Simulación
                  </Button>
                </div>
              }
            >
              <div className="flex flex-col gap-1.5 max-w-xs">
                <Label htmlFor="sim-runs">Corridas de la Simulación</Label>
                <Input
                  id="sim-runs"
                  type="number"
                  min={SIMULATION_LIMITS.simRuns.min}
                  max={SIMULATION_LIMITS.simRuns.max}
                  step={SIMULATION_LIMITS.simRuns.step}
                  value={simRuns}
                  onChange={(e) => setSimRuns(Number(e.target.value))}
                />
                <p className="text-xs text-zinc-500">
                  Mínimo {SIMULATION_LIMITS.simRuns.min} — máximo{" "}
                  {SIMULATION_LIMITS.simRuns.max.toLocaleString()}
                </p>
              </div>
            </Card>

            {/* ── Validation errors ── */}
            {error && (
              <Alert variant="danger" title="Error en la simulación">
                {error}
              </Alert>
            )}

            {/* ── Results ── */}
            {result && (
              <Card
                header={
                  <div className="flex items-center justify-between">
                    <h2 className="text-base font-semibold text-zinc-900">
                      Resultados de la Simulación
                    </h2>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleDownload}
                      aria-label="Descargar resultados en CSV"
                    >
                      <FiDownload className="size-4" />
                      Descargar CSV
                    </Button>
                  </div>
                }
              >
                <SimulationResultTable result={result.simulation} />

                {/* Prediction metric */}
                <div className="mt-4 rounded-lg border border-zinc-200 bg-zinc-50 p-4">
                  <p className="mb-1 text-xs font-medium uppercase tracking-wide text-zinc-500">
                    Predicción del modelo
                  </p>
                  <div className="flex items-center gap-3">
                    <Badge
                      status={patientSurvives ? "success" : "danger"}
                      className="text-sm px-3 py-1"
                    >
                      {patientSurvives
                        ? "Paciente no fallece"
                        : "Paciente fallece"}
                    </Badge>
                    <span className="text-sm text-zinc-600">
                      Probabilidad de fallecer:{" "}
                      <strong>
                        {(result.prediction.probability * 100).toFixed(0)}%
                      </strong>
                    </span>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}
