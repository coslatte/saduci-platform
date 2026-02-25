"use client";

import { useState, useEffect } from "react";
import { FiRefreshCw, FiDownload, FiPlay } from "react-icons/fi";
import { Button } from "@/components/atoms/Buttons";
import { Card } from "@/components/molecules/Card";
import { Alert } from "@/components/molecules/Alert";
import { SimulationResultTable } from "@/components/molecules/SimulationResultTable";
import { Badge } from "@/components/atoms/Badge";
import { Label } from "@/components/atoms/Label";
import { Input } from "@/components/atoms/Input";
import { Select } from "@/components/atoms/Select";
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

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function SimulacionPage() {
  // Patient fields
  // Avoid generating a random ID during server render (causes hydration
  // mismatches). Initialize empty and generate on the client in an effect.
  const [patientId, setPatientId] = useState<string>("");

  useEffect(() => {
    if (!patientId) setPatientId(generatePatientId());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [age, setAge] = useState<number>(SIMULATION_LIMITS.age.default);
  const [apache, setApache] = useState<number>(
    SIMULATION_LIMITS.apache.default,
  );
  const [preutiStay, setPreutiStay] = useState<number>(
    SIMULATION_LIMITS.preutiStay.default,
  );
  const [vamTime, setVamTime] = useState<number>(
    SIMULATION_LIMITS.vamTime.default,
  );
  const [utiStay, setUtiStay] = useState<number>(
    SIMULATION_LIMITS.utiStay.default,
  );
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
  const [simRuns, setSimRuns] = useState<number>(
    SIMULATION_LIMITS.simRuns.default,
  );

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
    <>
      <div className="mb-8">
        <h1 className="text-[length:var(--font-size-2xl)] font-bold tracking-tight text-slate-900 md:text-[length:var(--font-size-3xl)]">
          Simulación de Paciente UCI
        </h1>
        <p className="mt-2 text-[length:var(--font-size-sm)] text-slate-500">
          Ingrese los datos clínicos del paciente para simular su evolución en
          la Unidad de Cuidados Intensivos.
        </p>
      </div>

      <div className="flex flex-col gap-6">
        {/* Patient data card */}
        <Card
          header={
            <div className="flex items-center justify-between">
              <h2 className="text-[length:var(--font-size-lg)] font-semibold text-slate-800">
                Datos del Paciente
              </h2>
              <span className="font-mono text-[length:var(--font-size-xs)] uppercase text-slate-400">
                ID: {patientId}
              </span>
            </div>
          }
        >
          {/* ID row */}
          <div className="mb-8 flex flex-col items-end gap-4 md:flex-row">
            <div className="w-full md:w-1/3 flex flex-col gap-1.5">
              <Label htmlFor="patient-id">ID Paciente</Label>
              <Input
                id="patient-id"
                value={patientId}
                maxLength={10}
                onChange={(e) => setPatientId(e.target.value)}
                fullWidth
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

          {/* Numeric inputs grouped by clinical section */}
          <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col gap-4">
              <p className="text-[length:var(--font-size-xs)] font-semibold uppercase tracking-wide text-slate-500">
                Demográficos &amp; Tiempos
              </p>
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
            </div>

            <div className="flex flex-col gap-4">
              <p className="text-[length:var(--font-size-xs)] font-semibold uppercase tracking-wide text-slate-500">
                Puntajes Clínicos
              </p>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="apache">Apache II</Label>
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
            </div>

            <div className="flex flex-col gap-4">
              <p className="text-[length:var(--font-size-xs)] font-semibold uppercase tracking-wide text-slate-500">
                Ventilación Mecánica
              </p>
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
          </div>

          <hr className="mb-6 border-slate-100" />

          {/* Diagnoses */}
          <div>
            <p className="mb-4 text-[length:var(--font-size-xs)] font-semibold uppercase tracking-wide text-slate-500">
              Diagnósticos de Ingreso y Egreso
            </p>
            <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div className="flex flex-col gap-1.5">
                <Label
                  htmlFor="diag-ing-1"
                  className="text-[length:var(--font-size-xs)] text-slate-500"
                >
                  Diag. Ingreso 1
                </Label>
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
                <Label
                  htmlFor="diag-ing-2"
                  className="text-[length:var(--font-size-xs)] text-slate-500"
                >
                  Diag. Ingreso 2
                </Label>
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
                <Label
                  htmlFor="diag-ing-3"
                  className="text-[length:var(--font-size-xs)] text-slate-500"
                >
                  Diag. Ingreso 3
                </Label>
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
                <Label
                  htmlFor="diag-ing-4"
                  className="text-[length:var(--font-size-xs)] text-slate-500"
                >
                  Diag. Ingreso 4
                </Label>
                <Select
                  id="diag-ing-4"
                  value={diagIng4}
                  onChange={(e) => setDiagIng4(Number(e.target.value))}
                  fullWidth
                >
                  {diagOptions()}
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col gap-1.5">
                <Label
                  htmlFor="resp-insuf"
                  className="text-[length:var(--font-size-xs)] text-slate-500"
                >
                  Insuf. Respiratoria
                </Label>
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
                <Label
                  htmlFor="vent-type"
                  className="text-[length:var(--font-size-xs)] text-slate-500"
                >
                  Ventilación Artificial
                </Label>
                <Select
                  id="vent-type"
                  value={ventType}
                  onChange={(e) => setVentType(Number(e.target.value))}
                  fullWidth
                >
                  {ventTypeOptions()}
                </Select>
              </div>
              <div className="flex flex-col gap-1.5">
                <Label
                  htmlFor="diag-egreso-2"
                  className="text-[length:var(--font-size-xs)] text-slate-500"
                >
                  Diagnóstico Egreso 2
                </Label>
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
          </div>
        </Card>

        {/* Simulation config card — with accent border */}
        <Card
          className="border-l-4 border-l-primary-600"
          header={
            <h2 className="text-[length:var(--font-size-lg)] font-semibold text-slate-800">
              Configuración de Simulación
            </h2>
          }
        >
          <div className="flex flex-col items-end justify-between gap-6 md:flex-row">
            <div className="w-full md:w-1/2 lg:w-1/3 flex flex-col gap-1.5">
              <Label htmlFor="sim-runs">Corridas de la Simulación</Label>
              <Input
                id="sim-runs"
                type="number"
                min={SIMULATION_LIMITS.simRuns.min}
                max={SIMULATION_LIMITS.simRuns.max}
                step={SIMULATION_LIMITS.simRuns.step}
                value={simRuns}
                onChange={(e) => setSimRuns(Number(e.target.value))}
                fullWidth
              />
              <p className="text-[length:var(--font-size-xs)] text-slate-500">
                Mínimo {SIMULATION_LIMITS.simRuns.min} — máximo{" "}
                {SIMULATION_LIMITS.simRuns.max.toLocaleString()} iteraciones
              </p>
            </div>
            <Button
              onClick={handleSimulate}
              loading={loading}
              size="lg"
              aria-label="Realizar simulación"
            >
              <FiPlay className="size-4" />
              Realizar Simulación
            </Button>
          </div>
        </Card>

        {error && (
          <Alert variant="danger" title="Error en la simulación">
            {error}
          </Alert>
        )}

        {result && (
          <Card
            header={
              <div className="flex items-center justify-between">
                <h2 className="text-[length:var(--font-size-lg)] font-semibold text-slate-800">
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
            <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50 p-4">
              <p className="mb-2 text-[length:var(--font-size-xs)] font-medium uppercase tracking-wide text-slate-500">
                Predicción del modelo
              </p>
              <div className="flex items-center gap-3">
                <Badge status={patientSurvives ? "success" : "danger"}>
                  {patientSurvives ? "Paciente no fallece" : "Paciente fallece"}
                </Badge>
                <span className="text-[length:var(--font-size-sm)] text-slate-600">
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
    </>
  );
}
