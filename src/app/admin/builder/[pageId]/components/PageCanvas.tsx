"use client";

import { useState } from "react";
import { BLOCK_REGISTRY, renderBlock } from "@/lib/blockRegistry";
import type { PageConfig, PageBlock } from "@/lib/pageConfigTypes";
import { Button } from "@/components/atoms";
import {
  FiArrowUp,
  FiArrowDown,
  FiEdit2,
  FiTrash2,
  FiMenu,
} from "react-icons/fi";
import { Fragment } from "react";

interface PageCanvasProps {
  page: PageConfig;
  onRemove: (blockId: string) => void;
  onMove: (blockId: string, direction: "up" | "down") => void;
  onEdit: (block: PageBlock) => void;
  onReorder: (fromIndex: number, toIndex: number) => void;
}

export function PageCanvas({
  page,
  onRemove,
  onMove,
  onEdit,
  onReorder,
}: PageCanvasProps) {
  const sorted = [...page.blocks].sort((a, b) => a.order - b.order);
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  if (sorted.length === 0) {
    return (
      <div className="flex h-48 items-center justify-center rounded-lg border-2 border-dashed border-slate-300 text-sm text-slate-400">
        Agrega bloques desde la paleta de la izquierda
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {sorted.map((block, i) => {
        const entry = BLOCK_REGISTRY[block.type];
        const isDragging = dragIndex === i;
        const isDragOver = dragOverIndex === i && dragIndex !== i;

        return (
          <Fragment key={block.id}>
            <div
              draggable
              onDragStart={() => setDragIndex(i)}
              onDragOver={(e) => {
                e.preventDefault();
                setDragOverIndex(i);
              }}
              onDragEnd={() => {
                setDragIndex(null);
                setDragOverIndex(null);
              }}
              onDrop={() => {
                if (dragIndex !== null && dragIndex !== i) {
                  onReorder(dragIndex, i);
                }
                setDragIndex(null);
                setDragOverIndex(null);
              }}
              className={[
                "group relative rounded-xl border bg-white p-4 shadow-sm transition-all",
                isDragging ? "opacity-40 scale-[0.98]" : "",
                isDragOver
                  ? "border-primary-400 border-2 shadow-md"
                  : "border-slate-200",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <div className="mb-2 flex items-center gap-2">
                <span
                  className="cursor-grab active:cursor-grabbing text-slate-300 hover:text-slate-500 transition-colors"
                  aria-hidden
                >
                  <FiMenu size={14} />
                </span>
                <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-500">
                  {entry?.label ?? block.type}
                </span>
                <div className="ml-auto flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                  <Button
                    variant="ghost"
                    size="xs"
                    onClick={() => onMove(block.id, "up")}
                    disabled={i === 0}
                    aria-label="Mover arriba"
                  >
                    <FiArrowUp size={13} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="xs"
                    onClick={() => onMove(block.id, "down")}
                    disabled={i === sorted.length - 1}
                    aria-label="Mover abajo"
                  >
                    <FiArrowDown size={13} />
                  </Button>
                  {entry?.propSchema && entry.propSchema.length > 0 && (
                    <Button
                      variant="outline"
                      size="xs"
                      onClick={() => onEdit(block)}
                      aria-label="Editar bloque"
                    >
                      <FiEdit2 size={13} />
                    </Button>
                  )}
                  <Button
                    variant="danger"
                    size="xs"
                    onClick={() => onRemove(block.id)}
                    aria-label="Eliminar bloque"
                  >
                    <FiTrash2 size={13} />
                  </Button>
                </div>
              </div>
              <div className="pointer-events-none max-h-60 overflow-y-auto wrap-break-word whitespace-pre-wrap">
                {renderBlock(block)}
              </div>
            </div>
          </Fragment>
        );
      })}
    </div>
  );
}
