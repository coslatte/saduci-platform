interface Column {
  key: string;
  label: string;
}

interface TableBlockProps {
  title?: string;
  columnsJson?: string;
  rowsJson?: string;
}

function parseJson<T>(raw: string | undefined, fallback: T): T {
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

const SAMPLE_COLUMNS: Column[] = [
  { key: "nombre", label: "Nombre" },
  { key: "valor", label: "Valor" },
  { key: "estado", label: "Estado" },
];

const SAMPLE_ROWS = [
  { nombre: "Paciente A", valor: 42, estado: "Activo" },
  { nombre: "Paciente B", valor: 87, estado: "Inactivo" },
  { nombre: "Paciente C", valor: 65, estado: "Activo" },
];

export function TableBlock({ title, columnsJson, rowsJson }: TableBlockProps) {
  const columns = parseJson<Column[]>(columnsJson, SAMPLE_COLUMNS);
  const rows = parseJson<Record<string, unknown>[]>(rowsJson, SAMPLE_ROWS);

  return (
    <div className="w-full overflow-x-auto">
      {title && <p className="mb-3 font-semibold text-slate-700">{title}</p>}
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b border-slate-200 bg-slate-50 text-left">
            {columns.map((col) => (
              <th
                key={col.key}
                className="px-4 py-2 font-semibold text-slate-600"
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-slate-100 hover:bg-slate-50">
              {columns.map((col) => (
                <td key={col.key} className="px-4 py-2 text-slate-700">
                  {String(row[col.key] ?? "")}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
