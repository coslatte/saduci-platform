import { Button, IconButton } from "@/components/atoms/Buttons";
import { FiPlus, FiTrash2, FiRefreshCw } from "react-icons/fi";

export default function ButtonsSandboxPage() {
  return (
    <main className="min-h-screen bg-zinc-50 p-8">
      <div className="mx-auto max-w-5xl space-y-8">
        <header className="space-y-1">
          <h1 className="text-2xl font-semibold text-zinc-900">
            Component Sandbox: Buttons
          </h1>
          <p className="text-sm text-zinc-600">
            Ruta de pruebas visuales para componentes, sin lógica de negocio.
          </p>
        </header>

        <section className="space-y-4 rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-medium text-zinc-900">Button variants</h2>
          <div className="flex flex-wrap gap-3">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="danger">Danger</Button>
          </div>
        </section>

        <section className="space-y-4 rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-medium text-zinc-900">Button sizes</h2>
          <div className="flex flex-wrap items-center gap-3">
            <Button size="xs">XS</Button>
            <Button size="sm">SM</Button>
            <Button size="md">MD</Button>
            <Button size="lg">LG</Button>
            <Button size="xl">XL</Button>
          </div>
        </section>

        <section className="space-y-4 rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-medium text-zinc-900">Icon buttons</h2>
          <div className="flex flex-wrap items-center gap-3">
            <IconButton aria-label="Agregar" icon={<FiPlus />} />
            <IconButton
              aria-label="Agregar exitoso"
              variant="success"
              icon={<FiPlus />}
            />
            <IconButton
              aria-label="Recargar"
              variant="outline"
              icon={<FiRefreshCw />}
            />
            <IconButton
              aria-label="Eliminar"
              variant="danger"
              icon={<FiTrash2 />}
            />
          </div>
        </section>

        <section className="space-y-4 rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-medium text-zinc-900">Loading state</h2>
          <div className="flex flex-wrap items-center gap-3">
            <Button loading>Guardando</Button>
            <Button variant="danger" loading>
              Eliminando
            </Button>
            <IconButton aria-label="Cargando" icon={<FiRefreshCw />} loading />
          </div>
        </section>
      </div>
    </main>
  );
}
