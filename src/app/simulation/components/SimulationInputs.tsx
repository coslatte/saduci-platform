"use client";

import { Button } from "@/components/atoms/Buttons";
import { Label } from "@/components/atoms/Label";
import { Input } from "@/components/atoms/Input";
import { FiRefreshCw, FiPlay } from "react-icons/fi";
import { SIMULATION_LIMITS } from "@/lib/simulation";
import {
  ID_PATIENT_LABEL,
  NEW_PATIENT_BUTTON,
  DEMOGRAPHICS_TITLE,
  CLINICAL_SCORES_TITLE,
  VENTILATION_TITLE,
  DIAGNOSES_TITLE,
  SIMULATION_CONFIG_TITLE,
  RUNS_LABEL,
  SIMULATE_BUTTON,
} from "@/constants/constants";
import { diagData, respInsufData, ventTypeData } from "../helpers";
import AccessibleSelect from "@/components/atoms/AccessibleSelect";
import type React from "react";

interface Props {
  patientId: string;
  setPatientId: (v: string) => void;
  handleNewPatient: () => void;

  age: number;
  setAge: (n: number) => void;
  apache: number;
  setApache: (n: number) => void;
  preutiStay: number;
  setPreutiStay: (n: number) => void;
  vamTime: number;
  setVamTime: (n: number) => void;
  utiStay: number;
  setUtiStay: (n: number) => void;
  simPercent: number;
  setSimPercent: (n: number) => void;

  diagIng1: number;
  setDiagIng1: (n: number) => void;
  diagIng2: number;
  setDiagIng2: (n: number) => void;
  diagIng3: number;
  setDiagIng3: (n: number) => void;
  diagIng4: number;
  setDiagIng4: (n: number) => void;
  diagEgreso2: number;
  setDiagEgreso2: (n: number) => void;

  respInsuf: number;
  setRespInsuf: (n: number) => void;
  ventType: number;
  setVentType: (n: number) => void;

  simRuns: number;
  setSimRuns: (n: number) => void;

  loading?: boolean;
  onSimulate: () => void;
}

export default function SimulationInputs({
  patientId,
  setPatientId,
  handleNewPatient,
  age,
  setAge,
  apache,
  setApache,
  preutiStay,
  setPreutiStay,
  vamTime,
  setVamTime,
  utiStay,
  setUtiStay,
  simPercent,
  setSimPercent,
  diagIng1,
  setDiagIng1,
  diagIng2,
  setDiagIng2,
  diagIng3,
  setDiagIng3,
  diagIng4,
  setDiagIng4,
  diagEgreso2,
  setDiagEgreso2,
  respInsuf,
  setRespInsuf,
  ventType,
  setVentType,
  simRuns,
  setSimRuns,
  loading = false,
  onSimulate,
}: Props) {
  return (
    <>
      <section className="flex flex-col gap-6 pb-8">
        <div className="flex items-center justify-between">
          <h2 className="text-(length:--font-size-lg) font-semibold text-zinc-900">
            Datos del Paciente
          </h2>
          <span className="font-mono text-(length:--font-size-xs) uppercase text-slate-400">
            ID: {patientId}
          </span>
        </div>
        <div className="flex flex-col items-end gap-4 mb-8 md:flex-row">
          <div className="w-full md:w-1/3 flex flex-col gap-1.5">
            <Label htmlFor="patient-id">{ID_PATIENT_LABEL}</Label>
            <Input
              id="patient-id"
              value={patientId}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPatientId(e.target.value)
              }
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
            {NEW_PATIENT_BUTTON}
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col gap-4">
            <p className="text-(length:--font-size-sm) font-semibold uppercase tracking-widest text-slate-400">
              {DEMOGRAPHICS_TITLE}
            </p>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="age">Edad</Label>
              <Input
                id="age"
                type="number"
                min={SIMULATION_LIMITS.age.min}
                max={SIMULATION_LIMITS.age.max}
                value={age}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setAge(Number(e.target.value))
                }
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
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setPreutiStay(Number(e.target.value))
                }
                fullWidth
              />
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <p className="text-(length:--font-size-sm) font-semibold uppercase tracking-widest text-slate-400">
              {CLINICAL_SCORES_TITLE}
            </p>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="apache">Apache II</Label>
              <Input
                id="apache"
                type="number"
                min={SIMULATION_LIMITS.apache.min}
                max={SIMULATION_LIMITS.apache.max}
                value={apache}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setApache(Number(e.target.value))
                }
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
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setSimPercent(Number(e.target.value))
                }
                fullWidth
              />
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <p className="text-(length:--font-size-sm) font-semibold uppercase tracking-widest text-slate-400">
              {VENTILATION_TITLE}
            </p>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="vam-time">Tiempo VA (h)</Label>
              <Input
                id="vam-time"
                type="number"
                min={SIMULATION_LIMITS.vamTime.min}
                max={SIMULATION_LIMITS.vamTime.max}
                value={vamTime}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setVamTime(Number(e.target.value))
                }
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
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setUtiStay(Number(e.target.value))
                }
                fullWidth
              />
            </div>
          </div>
        </div>

        <div>
          <p className="mb-4 text-(length:--font-size-sm) font-semibold uppercase tracking-widest text-slate-400">
            {DIAGNOSES_TITLE}
          </p>
          <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="diag-ing-1" className="text-slate-500">
                Diag. Ingreso 1
              </Label>
              <AccessibleSelect
                id="diag-ing-1"
                value={String(diagIng1)}
                onChange={(v) => setDiagIng1(Number(v))}
                options={diagData()}
                fullWidth
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="diag-ing-2" className="text-slate-500">
                Diag. Ingreso 2
              </Label>
              <AccessibleSelect
                id="diag-ing-2"
                value={String(diagIng2)}
                onChange={(v) => setDiagIng2(Number(v))}
                options={diagData()}
                fullWidth
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="diag-ing-3" className="text-slate-500">
                Diag. Ingreso 3
              </Label>
              <AccessibleSelect
                id="diag-ing-3"
                value={String(diagIng3)}
                onChange={(v) => setDiagIng3(Number(v))}
                options={diagData()}
                fullWidth
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="diag-ing-4" className="text-slate-500">
                Diag. Ingreso 4
              </Label>
              <AccessibleSelect
                id="diag-ing-4"
                value={String(diagIng4)}
                onChange={(v) => setDiagIng4(Number(v))}
                options={diagData()}
                fullWidth
              />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="resp-insuf" className="text-slate-500">
                Insuf. Respiratoria
              </Label>
              <AccessibleSelect
                id="resp-insuf"
                value={String(respInsuf)}
                onChange={(v) => setRespInsuf(Number(v))}
                options={respInsufData()}
                fullWidth
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="vent-type" className="text-slate-500">
                Ventilación Artificial
              </Label>
              <AccessibleSelect
                id="vent-type"
                value={String(ventType)}
                onChange={(v) => setVentType(Number(v))}
                options={ventTypeData()}
                fullWidth
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="diag-egreso-2" className="text-slate-500">
                Diagnóstico Egreso 2
              </Label>
              <AccessibleSelect
                id="diag-egreso-2"
                value={String(diagEgreso2)}
                onChange={(v) => setDiagEgreso2(Number(v))}
                options={diagData()}
                fullWidth
              />
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-6 pb-8">
        <h2 className="text-(length:--font-size-lg) font-semibold text-zinc-900">
          {SIMULATION_CONFIG_TITLE}
        </h2>
        <div className="flex flex-col items-center justify-between gap-6">
          <div className="w-full md:w-1/3 flex flex-col gap-1.5">
            <Label htmlFor="sim-runs" className="text-center md:text-left">
              {RUNS_LABEL}
            </Label>
            <Input
              id="sim-runs"
              type="number"
              min={SIMULATION_LIMITS.simRuns.min}
              max={SIMULATION_LIMITS.simRuns.max}
              step={SIMULATION_LIMITS.simRuns.step}
              value={simRuns}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSimRuns(Number(e.target.value))
              }
              fullWidth
            />
            <p className="text-(length:--font-size-xs) text-slate-500 text-center md:text-left">
              Mínimo {SIMULATION_LIMITS.simRuns.min} — máximo{" "}
              {SIMULATION_LIMITS.simRuns.max.toLocaleString()} iteraciones
            </p>
          </div>
          <Button
            onClick={onSimulate}
            loading={loading}
            size="lg"
            aria-label="Realizar simulación"
            className="w-full md:w-1/3"
          >
            <FiPlay className="size-4" />
            {SIMULATE_BUTTON}
          </Button>
        </div>
      </section>
    </>
  );
}
