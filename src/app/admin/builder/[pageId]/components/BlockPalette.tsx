"use client";

import { BLOCK_REGISTRY } from "@/lib/blockRegistry";
import type { BlockType } from "@/lib/pageConfigTypes";
import { Card } from "@/components/molecules";
import { FiPlus } from "react-icons/fi";

interface BlockPaletteProps {
  onAdd: (type: BlockType) => void;
}

export function BlockPalette({ onAdd }: BlockPaletteProps) {
  const entries = Object.entries(BLOCK_REGISTRY) as [
    BlockType,
    (typeof BLOCK_REGISTRY)[BlockType],
  ][];

  return (
    <Card>
      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
        Bloques disponibles
      </p>
      <div className="flex flex-col gap-1">
        {entries.map(([type, entry]) => (
          <button
            key={type}
            onClick={() => onAdd(type)}
            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition-colors hover:bg-slate-50"
          >
            <FiPlus
              size={14}
              className="shrink-0 text-slate-400 group-hover:text-primary-600"
            />
            <div className="min-w-0">
              <p className="font-medium text-slate-700">{entry.label}</p>
              <p className="truncate text-xs text-slate-400">
                {entry.description}
              </p>
            </div>
          </button>
        ))}
      </div>
    </Card>
  );
}
