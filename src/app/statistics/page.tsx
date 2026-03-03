"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  EXPERIMENT_VARIABLE_LABELS,
  runWilcoxonTest,
  runFriedmanTest,
  type StatisticalTestResult,
} from "@/lib/statistics";
import {
  STATISTICS_PAGE_TITLE,
  STATISTICS_PAGE_SUBTITLE,
  WILCOXON_SECTION_TITLE,
  FRIEDMAN_SECTION_TITLE,
  STATS_RUN_WILCOXON,
  STATS_RUN_FRIEDMAN,
  STATS_ERROR_WILCOXON_EMPTY,
  STATS_ERROR_MIN_SAMPLES_FRIEDMAN,
  STATS_ERROR_PARSE,
  STATS_WARNING_SIZE_ADJUSTED,
  STATS_UPLOAD_EXPERIMENT_1,
  STATS_UPLOAD_EXPERIMENT_2,
  STATS_UPLOAD_EXPERIMENTS,
  STATS_TABLIST_LABEL,
} from "@/constants/constants";
import { WilcoxonSection, FriedmanSection } from "./components/StatTestSection";
import { readCSVFile, extractNumericColumn, adjustArraySizes } from "./helpers";

type ActiveTab = "wilcoxon" | "friedman";

const TAB_BASE =
  "px-4 py-2 text-[length:var(--font-size-sm)] font-medium border-b-2 transition-colors focus:outline-none";
const TAB_ACTIVE = "border-primary-600 text-primary-700";
const TAB_INACTIVE =
  "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300";

export default function StatisticsPage() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("wilcoxon");

  const defaultColumn = EXPERIMENT_VARIABLE_LABELS[0];

  // ─── Wilcoxon state ──────────────────────────────────────────────────────────
  const [wxFile1, setWxFile1] = useState<File | null>(null);
  const [wxFile2, setWxFile2] = useState<File | null>(null);
  const [wxColumn, setWxColumn] = useState<string>(defaultColumn);
  const [wxLoading, setWxLoading] = useState(false);
  const [wxResult, setWxResult] = useState<StatisticalTestResult | null>(null);
  const [wxError, setWxError] = useState<string | null>(null);
  const [wxWarning, setWxWarning] = useState<string | null>(null);

  // ─── Friedman state ──────────────────────────────────────────────────────────
  const [fmFiles, setFmFiles] = useState<File[]>([]);
  const [fmColumn, setFmColumn] = useState<string>(defaultColumn);
  const [fmLoading, setFmLoading] = useState(false);
  const [fmResult, setFmResult] = useState<StatisticalTestResult | null>(null);
  const [fmError, setFmError] = useState<string | null>(null);
  const [fmWarning, setFmWarning] = useState<string | null>(null);

  // ─── Wilcoxon handler ────────────────────────────────────────────────────────

  async function handleRunWilcoxon(): Promise<void> {
    setWxError(null);
    setWxWarning(null);
    setWxResult(null);

    if (!wxFile1 || !wxFile2) {
      setWxError(STATS_ERROR_WILCOXON_EMPTY);
      return;
    }

    setWxLoading(true);
    try {
      const [csv1, csv2] = await Promise.all([
        readCSVFile(wxFile1),
        readCSVFile(wxFile2),
      ]);

      const col1 = extractNumericColumn(csv1, wxColumn);
      const col2 = extractNumericColumn(csv2, wxColumn);

      if (col1.length === 0 || col2.length === 0) {
        setWxError(STATS_ERROR_PARSE);
        return;
      }

      let x = col1;
      let y = col2;

      if (col1.length !== col2.length) {
        const { adjusted, minSize } = adjustArraySizes([col1, col2]);
        x = adjusted[0];
        y = adjusted[1];
        setWxWarning(`${STATS_WARNING_SIZE_ADJUSTED} (${minSize} filas)`);
      }

      const result = await runWilcoxonTest({ x, y });
      setWxResult(result);
    } catch (err: unknown) {
      setWxError(err instanceof Error ? err.message : STATS_ERROR_PARSE);
    } finally {
      setWxLoading(false);
    }
  }

  // ─── Friedman handler ────────────────────────────────────────────────────────

  async function handleRunFriedman(): Promise<void> {
    setFmError(null);
    setFmWarning(null);
    setFmResult(null);

    if (fmFiles.length < 3) {
      setFmError(STATS_ERROR_MIN_SAMPLES_FRIEDMAN);
      return;
    }

    setFmLoading(true);
    try {
      const csvData = await Promise.all(fmFiles.map(readCSVFile));
      const columns = csvData.map((csv) => extractNumericColumn(csv, fmColumn));

      const validColumns = columns.filter((col) => col.length > 0);
      if (validColumns.length < 3) {
        setFmError(STATS_ERROR_PARSE);
        return;
      }

      const { adjusted, minSize } = adjustArraySizes(validColumns);

      const originalMin = Math.min(...validColumns.map((c) => c.length));
      if (originalMin !== minSize || validColumns.length < columns.length) {
        setFmWarning(`${STATS_WARNING_SIZE_ADJUSTED} (${minSize} filas)`);
      }

      const result = await runFriedmanTest({ samples: adjusted });
      setFmResult(result);
    } catch (err: unknown) {
      setFmError(err instanceof Error ? err.message : STATS_ERROR_PARSE);
    } finally {
      setFmLoading(false);
    }
  }

  return (
    <>
      <div className="mb-8">
        <h1 className="text-(length:--font-size-2xl) font-bold tracking-tight text-slate-900 md:text-(length:--font-size-3xl)">
          {STATISTICS_PAGE_TITLE}
        </h1>
        <p className="mt-2 text-(length:--font-size-sm) text-slate-500">
          {STATISTICS_PAGE_SUBTITLE}
        </p>
      </div>

      <div className="flex flex-col gap-6">
        <div
          className="flex border-b border-slate-200"
          role="tablist"
          aria-label={STATS_TABLIST_LABEL}
        >
          <button
            role="tab"
            aria-selected={activeTab === "wilcoxon"}
            aria-controls="panel-wilcoxon"
            id="tab-wilcoxon"
            type="button"
            className={cn(
              TAB_BASE,
              activeTab === "wilcoxon" ? TAB_ACTIVE : TAB_INACTIVE,
            )}
            onClick={() => setActiveTab("wilcoxon")}
          >
            {WILCOXON_SECTION_TITLE}
          </button>
          <button
            role="tab"
            aria-selected={activeTab === "friedman"}
            aria-controls="panel-friedman"
            id="tab-friedman"
            type="button"
            className={cn(
              TAB_BASE,
              activeTab === "friedman" ? TAB_ACTIVE : TAB_INACTIVE,
            )}
            onClick={() => setActiveTab("friedman")}
          >
            {FRIEDMAN_SECTION_TITLE}
          </button>
        </div>

        <div
          role="tabpanel"
          id="panel-wilcoxon"
          aria-labelledby="tab-wilcoxon"
          hidden={activeTab !== "wilcoxon"}
        >
          <WilcoxonSection
            file1={wxFile1}
            file2={wxFile2}
            selectedColumn={wxColumn}
            loading={wxLoading}
            result={wxResult}
            error={wxError}
            warning={wxWarning}
            onFile1Change={setWxFile1}
            onFile2Change={setWxFile2}
            onColumnChange={setWxColumn}
            onRun={handleRunWilcoxon}
            runLabel={STATS_RUN_WILCOXON}
            uploadLabel1={STATS_UPLOAD_EXPERIMENT_1}
            uploadLabel2={STATS_UPLOAD_EXPERIMENT_2}
          />
        </div>

        <div
          role="tabpanel"
          id="panel-friedman"
          aria-labelledby="tab-friedman"
          hidden={activeTab !== "friedman"}
        >
          <FriedmanSection
            files={fmFiles}
            selectedColumn={fmColumn}
            loading={fmLoading}
            result={fmResult}
            error={fmError}
            warning={fmWarning}
            onFilesChange={setFmFiles}
            onColumnChange={setFmColumn}
            onRun={handleRunFriedman}
            runLabel={STATS_RUN_FRIEDMAN}
            uploadLabel={STATS_UPLOAD_EXPERIMENTS}
          />
        </div>
      </div>
    </>
  );
}
