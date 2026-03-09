"use client";

import { useState } from "react";
import { BLOCK_REGISTRY } from "@/lib/blockRegistry";
import type { PageBlock } from "@/lib/pageConfigTypes";
import type { PropFieldSchema } from "@/lib/blockRegistry";
import { Card } from "@/components/molecules";
import { Button, Input, Label } from "@/components/atoms";
import { TagListEditor } from "./TagListEditor";

interface BlockPropsEditorProps {
  block: PageBlock;
  onSave: (props: Record<string, unknown>) => void;
  onCancel: () => void;
}

function FieldInput({
  schema,
  value,
  onChange,
}: {
  schema: PropFieldSchema;
  value: unknown;
  onChange: (val: unknown) => void;
}) {
  if (schema.type === "select" && schema.options) {
    return (
      <select
        value={String(value ?? "")}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
          onChange(e.target.value)
        }
        className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-primary-400 focus:outline-none focus:ring-1 focus:ring-primary-400"
        aria-label={schema.label}
      >
        {schema.options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    );
  }

  if (schema.type === "boolean") {
    return (
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id={schema.key}
          checked={Boolean(value)}
          onChange={(e) => onChange(e.target.checked)}
          className="h-4 w-4 rounded border-slate-300"
        />
        <Label htmlFor={schema.key}>{schema.label}</Label>
      </div>
    );
  }

  if (schema.type === "textarea") {
    return (
      <textarea
        value={String(value ?? "")}
        onChange={(e) => onChange(e.target.value)}
        rows={4}
        className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-primary-400 focus:outline-none focus:ring-1 focus:ring-primary-400"
      />
    );
  }

  if (schema.type === "taglist") {
    return (
      <TagListEditor
        value={value as unknown as { label: string; color: string }[]}
        onChange={(v) => onChange(v)}
      />
    );
  }

  if (schema.type === "number") {
    return (
      <Input
        type="number"
        value={String(value ?? "")}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    );
  }

  return (
    <Input
      type="text"
      value={String(value ?? "")}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

export function BlockPropsEditor({
  block,
  onSave,
  onCancel,
}: BlockPropsEditorProps) {
  const entry = BLOCK_REGISTRY[block.type];
  const [localProps, setLocalProps] = useState<Record<string, unknown>>(
    block.props ?? {},
  );

  if (!entry) {
    return (
      <Card>
        <p className="text-sm text-slate-500">
          No hay propiedades para este bloque.
        </p>
      </Card>
    );
  }

  function setField(key: string, val: unknown) {
    setLocalProps((prev) => ({ ...prev, [key]: val }));
  }

  return (
    <Card
      header={
        <span className="text-sm font-semibold text-slate-700">
          Editar: {entry.label}
        </span>
      }
    >
      <div className="flex flex-col gap-4">
        {entry.propSchema.map((schema) => {
          const value =
            localProps[schema.key] ?? entry.defaultProps[schema.key];
          return (
            <div key={schema.key}>
              {schema.type !== "boolean" && (
                <Label htmlFor={schema.key}>{schema.label}</Label>
              )}
              <FieldInput
                schema={schema}
                value={value}
                onChange={(val) => setField(schema.key, val)}
              />

              {schema.type === "textarea" &&
                schema.key === "content" &&
                (() => {
                  // decide limit based on heading vs paragraph
                  const asVal = String(
                    localProps["as"] ?? entry.defaultProps["as"] ?? "p",
                  );
                  const max = ["h1", "h2", "h3", "h4"].includes(asVal)
                    ? 128
                    : 512;
                  const count = String(value ?? "").length;
                  return (
                    <div
                      className={`mt-1 text-xs ${
                        count > max ? "text-red-600" : "text-slate-400"
                      }`}
                    >
                      {count}/{max}
                    </div>
                  );
                })()}
            </div>
          );
        })}
        <div className="flex gap-2 pt-2">
          <Button
            variant="primary"
            size="sm"
            onClick={() => onSave(localProps)}
          >
            Guardar
          </Button>
          <Button variant="ghost" size="sm" onClick={onCancel}>
            Cancelar
          </Button>
        </div>
      </div>
    </Card>
  );
}
