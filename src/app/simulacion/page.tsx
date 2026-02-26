"use client";

import { useState, useEffect } from "react";
import { FiDownload } from "react-icons/fi";
import { Button } from "@/components/atoms/Buttons";
import { Card } from "@/components/molecules/Card";
import { Alert } from "@/components/molecules/Alert";
import { SimulationResultTable } from "@/components/molecules/SimulationResultTable";
import { Badge } from "@/components/atoms/Badge";
// inputs rendered in SimulationInputs component
import SimulationInputs from "./components/SimulationInputs";
import {
  SIMULATION_LIMITS,
  generatePatientId,
  runSimulation,
  type SimulationRequest,
  type SimulationResponse,
} from "@/lib/simulation";
import {
  validateSimulationInput,
  formatErrorForUser,
  downloadSimulationCSV,
} from "./helpers/index";
import {
  SIMULATION_PAGE_TITLE,
  SIMULATION_PAGE_SUBTITLE,
  ERROR_SIMULATION_TITLE,
  DOWNLOAD_CSV,
  VALIDATION_MISSING_DIAG,
  VALIDATION_SELECT_RESP,
} from "@/constants/constants";
import { sileo } from "sileo";

export default function SimulacionPage() {
  const [patientId, setPatientId] = useState<string>("");

  useEffect(() => {
    if (!patientId) setPatientId(generatePatientId());
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

  const [simRuns, setSimRuns] = useState<number>(
    SIMULATION_LIMITS.simRuns.default,
  );

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<SimulationResponse | null>(null);

  function handleNewPatient(): void {
    setPatientId(generatePatientId());
    setResult(null);
    setError(null);
  }

  async function handleSimulate(): Promise<void> {
    setError(null);

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

    const validationErrors = validateSimulationInput(payload);
    if ([diagIng1, diagIng2, diagIng3, diagIng4].every((d) => d === 0)) {
      validationErrors.unshift(VALIDATION_MISSING_DIAG);
    }
    if (respInsuf === 0) {
      validationErrors.unshift(VALIDATION_SELECT_RESP);
    }

    if (validationErrors.length > 0) {
      setError(validationErrors.join(" \n"));
      return;
    }

    setLoading(true);
    setResult(null);
    try {
      const data = await runSimulation(payload);
      setResult(data);
    } catch (err) {
      const message = formatErrorForUser(err);
      setError(message);
      // Log error for debugging
      console.error("Simulación fallida:", err);
      // Try to display the error via sileo if available
      try {
        sileo.error({ title: "Error en la simulación", description: message });
      } catch {
        // ignore if sileo is not available
      }
    } finally {
      setLoading(false);
    }
  }

  function handleDownload(): void {
    if (!result) return;
    downloadSimulationCSV(result, patientId);
  }

  const prediction = result?.prediction;
  const patientSurvives = prediction?.class === 0;

  return (
    <>
      <div className="mb-8">
        <h1 className="text-(length:--font-size-2xl) font-bold tracking-tight text-slate-900 md:text-(length:--font-size-3xl)">
          {SIMULATION_PAGE_TITLE}
        </h1>
        <p className="mt-2 text-(length:--font-size-sm) text-slate-500">
          {SIMULATION_PAGE_SUBTITLE}
        </p>
      </div>

      <div className="flex flex-col gap-6">
        <SimulationInputs
          patientId={patientId}
          setPatientId={setPatientId}
          handleNewPatient={handleNewPatient}
          age={age}
          setAge={setAge}
          apache={apache}
          setApache={setApache}
          preutiStay={preutiStay}
          setPreutiStay={setPreutiStay}
          vamTime={vamTime}
          setVamTime={setVamTime}
          utiStay={utiStay}
          setUtiStay={setUtiStay}
          simPercent={simPercent}
          setSimPercent={setSimPercent}
          diagIng1={diagIng1}
          setDiagIng1={setDiagIng1}
          diagIng2={diagIng2}
          setDiagIng2={setDiagIng2}
          diagIng3={diagIng3}
          setDiagIng3={setDiagIng3}
          diagIng4={diagIng4}
          setDiagIng4={setDiagIng4}
          diagEgreso2={diagEgreso2}
          setDiagEgreso2={setDiagEgreso2}
          respInsuf={respInsuf}
          setRespInsuf={setRespInsuf}
          ventType={ventType}
          setVentType={setVentType}
          simRuns={simRuns}
          setSimRuns={setSimRuns}
          loading={loading}
          onSimulate={handleSimulate}
        />

        {error && (
          <Alert variant="danger" title={ERROR_SIMULATION_TITLE}>
            {error}
          </Alert>
        )}

        {result && (
          <Card
            header={
              <div className="flex items-center justify-between">
                <h2 className="text-(length:--font-size-lg) font-semibold text-slate-800">
                  Resultados de la Simulación
                </h2>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleDownload}
                  aria-label="Descargar resultados en CSV"
                >
                  <FiDownload className="size-4" />
                  {DOWNLOAD_CSV}
                </Button>
              </div>
            }
          >
            <SimulationResultTable result={result.simulation} />
            <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50 p-4">
              <p className="mb-2 text-(length:--font-size-sm) font-semibold uppercase tracking-widest text-slate-400">
                Predicción del modelo
              </p>
              <div className="flex items-center gap-3">
                <Badge status={patientSurvives ? "success" : "danger"}>
                  {patientSurvives ? "Paciente no fallece" : "Paciente fallece"}
                </Badge>
                <span className="text-(length:--font-size-sm) text-slate-600">
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
