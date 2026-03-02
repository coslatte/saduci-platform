"use client";

import { useRef } from "react";
import { Button } from "@/components/atoms/Buttons";
import { Select } from "@/components/atoms/Select";
import { Alert } from "@/components/molecules/Alert";
import { Card } from "@/components/molecules/Card";
import { Label } from "@/components/atoms/Label";
import { EXPERIMENT_VARIABLE_LABELS } from "@/lib/statistics";
import type { StatisticalTestResult } from "@/lib/statistics";
import {
  STATS_SELECT_COLUMN,
  STATS_INFO_STATISTIC,
  STATS_INFO_P_VALUE,
  STATS_STATISTIC_LABEL,
  STATS_P_VALUE_LABEL,
  STATS_RESULTS_TITLE,
  STATS_PREVIEW_LABEL,
  STATS_EXPERIMENT_LABEL,
  STATS_CLICK_TO_SELECT_FILE,
  STATS_CLICK_TO_SELECT_FILES,
  STATS_TABLE_METRIC_HEADER,
  STATS_TABLE_VALUE_HEADER,
  STATS_LOADING,
} from "@/constants/constants";
import { cn } from "@/lib/utils";

const RESULT_TABLE_HEADER =
  "py-2 pr-4 text-left text-(length:--font-size-sm) font-medium text-zinc-500";
const RESULT_TABLE_VALUE =
  "py-2 pl-4 text-right text-(length:--font-size-sm) tabular-nums font-semibold text-zinc-900";
const FILE_ZONE_BASE =
  "flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-zinc-300 bg-zinc-50 px-4 py-6 text-center transition-colors hover:border-primary-400 cursor-pointer";
const FILE_ZONE_FILLED = "border-primary-300 bg-primary-50";

interface FileUploaderProps {
  label: string;
  file: File | null;
  inputId: string;
  onChange: (file: File | null) => void;
}

function FileUploader({ label, file, inputId, onChange }: FileUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={inputId}>{label}</Label>
      <div
        role="button"
        tabIndex={0}
        aria-label={label}
        className={cn(FILE_ZONE_BASE, file && FILE_ZONE_FILLED)}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") inputRef.current?.click();
        }}
      >
        <input
          ref={inputRef}
          id={inputId}
          type="file"
          accept=".csv"
          className="sr-only"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const selected = e.target.files?.[0] ?? null;
            onChange(selected);
          }}
        />
        {file ? (
          <span className="text-(length:--font-size-sm) font-medium text-primary-700">
            {file.name}
          </span>
        ) : (
          <span className="text-(length:--font-size-sm) text-zinc-400">
            {STATS_CLICK_TO_SELECT_FILE}
          </span>
        )}
      </div>
    </div>
  );
}

interface MultiFileUploaderProps {
  label: string;
  files: File[];
  inputId: string;
  onChange: (files: File[]) => void;
}

function MultiFileUploader({
  label,
  files,
  inputId,
  onChange,
}: MultiFileUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={inputId}>{label}</Label>
      <div
        role="button"
        tabIndex={0}
        aria-label={label}
        className={cn(FILE_ZONE_BASE, files.length > 0 && FILE_ZONE_FILLED)}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") inputRef.current?.click();
        }}
      >
        <input
          ref={inputRef}
          id={inputId}
          type="file"
          accept=".csv"
          multiple
          className="sr-only"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const selected = e.target.files
              ? Array.from(e.target.files)
              : [];
            onChange(selected);
          }}
        />
        {files.length > 0 ? (
          <ul className="w-full text-left">
            {files.map((f, idx) => (
              <li
                key={idx}
                className="text-(length:--font-size-sm) font-medium text-primary-700"
              >
                {STATS_EXPERIMENT_LABEL(idx + 1)}: {f.name}
              </li>
            ))}
          </ul>
        ) : (
          <span className="text-(length:--font-size-sm) text-zinc-400">
            {STATS_CLICK_TO_SELECT_FILES}
          </span>
        )}
      </div>
    </div>
  );
}

interface StatResultTableProps {
  result: StatisticalTestResult;
}

function StatResultTable({ result }: StatResultTableProps) {
  return (
    <div className="overflow-x-auto">
      <table
        className="w-full text-(length:--font-size-sm)"
        aria-label={STATS_RESULTS_TITLE}
      >
        <thead>
          <tr className="border-b border-zinc-200">
            <th className={RESULT_TABLE_HEADER}>{STATS_TABLE_METRIC_HEADER}</th>
            <th
              className={cn(
                RESULT_TABLE_HEADER,
                "pl-4 text-right text-zinc-700",
              )}
            >
              {STATS_TABLE_VALUE_HEADER}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-zinc-100">
            <td className={RESULT_TABLE_HEADER}>{STATS_STATISTIC_LABEL}</td>
            <td className={RESULT_TABLE_VALUE}>
              {result.statistic.toFixed(4)}
            </td>
          </tr>
          <tr>
            <td className={RESULT_TABLE_HEADER}>{STATS_P_VALUE_LABEL}</td>
            <td className={RESULT_TABLE_VALUE}>{result.p_value.toFixed(4)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export interface WilcoxonSectionProps {
  file1: File | null;
  file2: File | null;
  selectedColumn: string;
  loading: boolean;
  result: StatisticalTestResult | null;
  error: string | null;
  warning: string | null;
  onFile1Change: (file: File | null) => void;
  onFile2Change: (file: File | null) => void;
  onColumnChange: (col: string) => void;
  onRun: () => void;
  runLabel: string;
  uploadLabel1: string;
  uploadLabel2: string;
}

export function WilcoxonSection({
  file1,
  file2,
  selectedColumn,
  loading,
  result,
  error,
  warning,
  onFile1Change,
  onFile2Change,
  onColumnChange,
  onRun,
  runLabel,
  uploadLabel1,
  uploadLabel2,
}: WilcoxonSectionProps) {
  return (
    <div className="flex flex-col gap-4">
      <Card>
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FileUploader
              label={uploadLabel1}
              file={file1}
              inputId="wilcoxon-file-1"
              onChange={onFile1Change}
            />
            <FileUploader
              label={uploadLabel2}
              file={file2}
              inputId="wilcoxon-file-2"
              onChange={onFile2Change}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="wilcoxon-col-select">{STATS_SELECT_COLUMN}</Label>
            <Select
              id="wilcoxon-col-select"
              value={selectedColumn}
              fullWidth
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                onColumnChange(e.target.value)
              }
            >
              {EXPERIMENT_VARIABLE_LABELS.map((label) => (
                <option key={label} value={label}>
                  {label}
                </option>
              ))}
            </Select>
          </div>

          {file1 && file2 && (
            <details className="text-(length:--font-size-sm) text-zinc-500">
              <summary className="cursor-pointer font-medium text-zinc-700">
                {STATS_PREVIEW_LABEL}
              </summary>
              <ul className="mt-2 list-inside list-disc">
                <li>{STATS_EXPERIMENT_LABEL(1)}: {file1.name}</li>
                <li>{STATS_EXPERIMENT_LABEL(2)}: {file2.name}</li>
              </ul>
            </details>
          )}
        </div>
      </Card>

      <Button
        variant="primary"
        fullWidth
        onClick={onRun}
        disabled={loading}
        aria-label={runLabel}
      >
        {loading ? STATS_LOADING : runLabel}
      </Button>

      {warning && <Alert variant="warning">{warning}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}

      {result && (
        <Card
          header={
            <h3 className="text-(length:--font-size-base) font-semibold text-slate-800">
              {STATS_RESULTS_TITLE}
            </h3>
          }
        >
          <div className="flex flex-col gap-4">
            <StatResultTable result={result} />
            <div className="flex flex-col gap-1 rounded-lg border border-zinc-100 bg-zinc-50 p-3 text-(length:--font-size-sm) text-zinc-600">
              <p>{STATS_INFO_STATISTIC}</p>
              <p>{STATS_INFO_P_VALUE}</p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}

export interface FriedmanSectionProps {
  files: File[];
  selectedColumn: string;
  loading: boolean;
  result: StatisticalTestResult | null;
  error: string | null;
  warning: string | null;
  onFilesChange: (files: File[]) => void;
  onColumnChange: (col: string) => void;
  onRun: () => void;
  runLabel: string;
  uploadLabel: string;
}

export function FriedmanSection({
  files,
  selectedColumn,
  loading,
  result,
  error,
  warning,
  onFilesChange,
  onColumnChange,
  onRun,
  runLabel,
  uploadLabel,
}: FriedmanSectionProps) {
  return (
    <div className="flex flex-col gap-4">
      <Card>
        <div className="flex flex-col gap-4">
          <MultiFileUploader
            label={uploadLabel}
            files={files}
            inputId="friedman-files"
            onChange={onFilesChange}
          />

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="friedman-col-select">{STATS_SELECT_COLUMN}</Label>
            <Select
              id="friedman-col-select"
              value={selectedColumn}
              fullWidth
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                onColumnChange(e.target.value)
              }
            >
              {EXPERIMENT_VARIABLE_LABELS.map((label) => (
                <option key={label} value={label}>
                  {label}
                </option>
              ))}
            </Select>
          </div>

          {files.length > 0 && (
            <details className="text-(length:--font-size-sm) text-zinc-500">
              <summary className="cursor-pointer font-medium text-zinc-700">
                {STATS_PREVIEW_LABEL}
              </summary>
              <ul className="mt-2 list-inside list-disc">
                {files.map((f, idx) => (
                  <li key={idx}>
                    {STATS_EXPERIMENT_LABEL(idx + 1)}: {f.name}
                  </li>
                ))}
              </ul>
            </details>
          )}
        </div>
      </Card>

      <Button
        variant="primary"
        fullWidth
        onClick={onRun}
        disabled={loading}
        aria-label={runLabel}
      >
        {loading ? STATS_LOADING : runLabel}
      </Button>

      {warning && <Alert variant="warning">{warning}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}

      {result && (
        <Card
          header={
            <h3 className="text-(length:--font-size-base) font-semibold text-slate-800">
              {STATS_RESULTS_TITLE}
            </h3>
          }
        >
          <div className="flex flex-col gap-4">
            <StatResultTable result={result} />
            <div className="flex flex-col gap-1 rounded-lg border border-zinc-100 bg-zinc-50 p-3 text-(length:--font-size-sm) text-zinc-600">
              <p>{STATS_INFO_STATISTIC}</p>
              <p>{STATS_INFO_P_VALUE}</p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
