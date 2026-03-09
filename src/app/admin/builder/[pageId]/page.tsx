"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { isAdmin } from "@/lib/adminGuard";
import { usePageBuilder, PageBuilderProvider } from "@/context/pageBuilder";
import { Button } from "@/components/atoms";
import { BlockPalette } from "./components/BlockPalette";
import { PageCanvas } from "./components/PageCanvas";
import { BlockPropsEditor } from "./components/BlockPropsEditor";
import type { PageBlock } from "@/lib/pageConfigTypes";
import Link from "next/link";
import { FiArrowLeft, FiExternalLink } from "react-icons/fi";

function BuilderContent() {
  const { user } = useAuth();
  const router = useRouter();
  const params = useParams();
  const pageId = typeof params?.pageId === "string" ? params.pageId : "";

  const {
    getPage,
    addBlock,
    removeBlock,
    moveBlock,
    updateBlock,
    reorderBlocks,
  } = usePageBuilder();

  const [editingBlock, setEditingBlock] = useState<PageBlock | null>(null);

  if (!isAdmin(user)) {
    router.replace("/");
    return null;
  }

  const page = getPage(pageId);

  if (!page) {
    return (
      <p className="text-slate-500">
        Pagina no encontrada.{" "}
        <Link href="/admin" className="text-blue-600 underline">
          Volver
        </Link>
      </p>
    );
  }

  function handleEditSave(blockId: string, props: Record<string, unknown>) {
    void updateBlock(pageId, blockId, props);
    setEditingBlock(null);
  }

  return (
    <div className="flex h-full flex-col gap-0">
      <div className="mb-4 flex items-center gap-3">
        <Link href="/admin">
          <Button variant="ghost" size="sm">
            <FiArrowLeft className="mr-1" />
            Admin
          </Button>
        </Link>
        <h1 className="flex-1 text-xl font-semibold text-slate-800">
          Builder: {page.title}
        </h1>
        <Link href={`/pages/${page.slug}`} target="_blank">
          <Button variant="outline" size="sm">
            <FiExternalLink className="mr-1" />
            Ver pagina
          </Button>
        </Link>
      </div>

      <div className="flex flex-1 gap-4 overflow-hidden">
        <aside className="w-56 shrink-0">
          <BlockPalette onAdd={(type) => void addBlock(pageId, type)} />
        </aside>

        <main className="flex-1 overflow-y-auto rounded-xl border border-slate-200 bg-slate-50 p-4">
          <PageCanvas
            page={page}
            onRemove={(blockId) => void removeBlock(pageId, blockId)}
            onMove={(blockId, dir) => void moveBlock(pageId, blockId, dir)}
            onEdit={(block) => setEditingBlock(block)}
            onReorder={(from, to) => void reorderBlocks(pageId, from, to)}
          />
        </main>

        {editingBlock && (
          <aside className="w-72 shrink-0">
            <BlockPropsEditor
              block={editingBlock}
              onSave={(props) => handleEditSave(editingBlock.id, props)}
              onCancel={() => setEditingBlock(null)}
            />
          </aside>
        )}
      </div>
    </div>
  );
}

export default function BuilderPage() {
  return (
    <PageBuilderProvider>
      <BuilderContent />
    </PageBuilderProvider>
  );
}
