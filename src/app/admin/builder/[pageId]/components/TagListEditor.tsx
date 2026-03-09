"use client";

import { useState } from "react";
import { TAG_COLOR_PALETTE } from "@/constants/constants";
import { Button } from "@/components/atoms";

interface TagItem {
  label: string;
  color: string;
}

interface TagListEditorProps {
  value?: TagItem[];
  onChange: (tags: TagItem[]) => void;
}

export function TagListEditor({ value = [], onChange }: TagListEditorProps) {
  const [local, setLocal] = useState<TagItem[]>([...value]);

  function update(idx: number, patch: Partial<TagItem>) {
    const next = local.map((t, i) => (i === idx ? { ...t, ...patch } : t));
    setLocal(next);
    onChange(next);
  }

  function addTag() {
    const next = [
      ...local,
      { label: "Etiqueta", color: TAG_COLOR_PALETTE[0].value },
    ];
    setLocal(next);
    onChange(next);
  }

  function removeTag(idx: number) {
    const next = local.filter((_, i) => i !== idx);
    setLocal(next);
    onChange(next);
  }

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {local.map((t, i) => (
          <div key={i} className="flex items-center gap-2">
            <input
              value={t.label}
              onChange={(e) => update(i, { label: e.target.value })}
              className="rounded-md border border-slate-200 px-2 py-1 text-sm"
            />
            <input
              type="color"
              value={t.color}
              onChange={(e) => update(i, { color: e.target.value })}
              title="Color"
              className="w-8 h-8 p-0 rounded"
            />
            <button
              type="button"
              onClick={() => removeTag(i)}
              className="text-red-500 hover:text-red-700"
              aria-label="Eliminar tag"
            >
              ×
            </button>
          </div>
        ))}
      </div>

      <div className="mt-2 flex items-center gap-3">
        <div className="flex items-center gap-1">
          {TAG_COLOR_PALETTE.map((c) => (
            <button
              key={c.value}
              type="button"
              onClick={() => {
                // apply selected color to last tag if exists
                if (local.length === 0) return;
                const idx = local.length - 1;
                update(idx, { color: c.value });
              }}
              title={c.name}
              className="w-6 h-6 rounded-full border"
              style={{ backgroundColor: c.value }}
            />
          ))}
        </div>

        <Button variant="outline" size="sm" onClick={addTag}>
          Añadir tag
        </Button>
      </div>
    </div>
  );
}
