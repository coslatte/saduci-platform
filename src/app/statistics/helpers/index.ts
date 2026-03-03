/**
 * Parses a CSV file text and returns column data as an object keyed by header.
 */
export function parseCSV(text: string): Record<string, string[]> {
  const lines = text.trim().split(/\r?\n/);
  if (lines.length < 2) return {};

  const headers = lines[0].split(",").map((h) => h.trim());
  const result: Record<string, string[]> = {};

  for (const header of headers) {
    result[header] = [];
  }

  for (let i = 1; i < lines.length; i++) {
    const cells = lines[i].split(",");
    headers.forEach((header, idx) => {
      result[header].push((cells[idx] ?? "").trim());
    });
  }

  return result;
}

const MAX_CSV_SIZE_BYTES = 5 * 1024 * 1024;

/**
 * Reads a File object and returns the parsed CSV columns.
 * Rejects files larger than 5 MB.
 */
export async function readCSVFile(
  file: File,
): Promise<Record<string, string[]>> {
  if (file.size > MAX_CSV_SIZE_BYTES) {
    throw new Error(`El archivo "${file.name}" supera el límite de 5 MB.`);
  }
  const text = await file.text();
  return parseCSV(text);
}

/**
 * Extracts a numeric column from parsed CSV data by its label.
 * Returns an empty array if the column is not found.
 */
export function extractNumericColumn(
  csv: Record<string, string[]>,
  columnLabel: string,
): number[] {
  const rawValues = csv[columnLabel];
  if (!rawValues) return [];
  return rawValues.map((v) => parseFloat(v)).filter((n) => !isNaN(n));
}

/**
 * Adjusts multiple arrays to have the same length (the minimum).
 * Returns the adjusted arrays and the minimum size.
 */
export function adjustArraySizes(arrays: number[][]): {
  adjusted: number[][];
  minSize: number;
} {
  const minSize = Math.min(...arrays.map((a) => a.length));
  return {
    adjusted: arrays.map((a) => a.slice(0, minSize)),
    minSize,
  };
}
