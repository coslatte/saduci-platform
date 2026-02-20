"use client";

import { useState } from "react";
import { Button } from "@/components/atoms/Buttons";
import { Badge } from "@/components/atoms/Badge";
import { Spinner } from "@/components/atoms/Spinner";
import { TestingBoard } from "./components/TestingBoard";

export default function TestIndexPage() {
  const [loadingDemo, setLoadingDemo] = useState(false);

  function triggerLoadingDemo() {
    setLoadingDemo(true);
    setTimeout(() => setLoadingDemo(false), 2000);
  }

  return (
    <main className="min-h-screen bg-zinc-50 p-8">
      <div className="mx-auto max-w-5xl space-y-8">
        <header className="space-y-1">
          <h1 className="text-2xl font-semibold text-zinc-900">Test area</h1>
          <p className="text-sm text-zinc-600">
            Aquí hay una porción de la página con todos los botones y ejemplos
            extraídos de la home.
          </p>
        </header>

        {/* tablero de prueba */}
        <section className="space-y-4 rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-medium text-zinc-900">Board examples</h2>
          <TestingBoard>
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="danger">Danger</Button>
            <Button
              variant="primary"
              loading={loadingDemo}
              onClick={triggerLoadingDemo}
            >
              Enviar
            </Button>
            <Button variant="primary" disabled>
              Desactivado
            </Button>
          </TestingBoard>
          <h3 className="text-lg font-medium text-zinc-900">
            Vertical example
          </h3>
          <TestingBoard direction="vertical">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="danger">Danger</Button>
          </TestingBoard>
        </section>
        {/* tarjeta con todos los botones */}
        <section className="space-y-4 rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-medium text-zinc-900">
            Variants y estados
          </h2>
          <div className="flex flex-wrap gap-3"></div>
          <TestingBoard>
            <Badge status="default">Default</Badge>
            <Badge status="info">Info</Badge>
            <Badge status="success">Success</Badge>
            <Badge status="warning">Warning</Badge>
            <Badge status="danger">Danger</Badge>
          </TestingBoard>
          <TestingBoard>
            <Spinner size="xs" />
            <Spinner size="sm" />
          </TestingBoard>
        </section>
      </div>
    </main>
  );
}
