"use client";

import { useState } from "react";
import { FiHome, FiBarChart2, FiUsers, FiSettings } from "react-icons/fi";
import { Button, Badge, Avatar } from "@/components/atoms";
import { Card, FormField } from "@/components/molecules";
import { Navbar, Sidebar, Footer } from "@/components/organisms";
import { routes } from "@/lib/routes";

const sidebarSections = [
  {
    title: "Principal",
    items: [
      {
        label: "Dashboard",
        href: routes.home,
        active: true,
        icon: <FiHome className="size-5" />,
      },
      {
        label: "Reportes",
        href: routes.reportes,
        icon: <FiBarChart2 className="size-5" />,
      },
    ],
  },
  {
    title: "Configuración",
    items: [
      {
        label: "Usuarios",
        href: routes.usuarios,
        icon: <FiUsers className="size-5" />,
      },
      {
        label: "Ajustes",
        href: routes.ajustes,
        icon: <FiSettings className="size-5" />,
      },
    ],
  },
];

export default function Home() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen flex-col bg-zinc-50">
      <Navbar
        userName="Ana García"
        userRole="Administrador"
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed((s: boolean) => !s)}
      />

      <div className="flex flex-1">
        <div className="hidden md:flex">
          <Sidebar sections={sidebarSections} collapsed={sidebarCollapsed} />
        </div>

        <main className="flex-1 overflow-auto p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-semibold text-zinc-900">Dashboard</h1>
            <p className="mt-1 text-sm text-zinc-500">
              Bienvenido a Sadeci Platform
            </p>
          </div>

          {/* Stats row */}
          <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                label: "Usuarios activos",
                value: "1,284",
                status: "success" as const,
              },
              {
                label: "Solicitudes pendientes",
                value: "42",
                status: "warning" as const,
              },
              {
                label: "Reportes generados",
                value: "318",
                status: "info" as const,
              },
              {
                label: "Alertas críticas",
                value: "3",
                status: "danger" as const,
              },
            ].map((stat) => (
              <Card key={stat.label}>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-zinc-500">{stat.label}</p>
                  <Badge status={stat.status}>{stat.status}</Badge>
                </div>
                <p className="mt-2 text-3xl font-bold text-zinc-900">
                  {stat.value}
                </p>
              </Card>
            ))}
          </div>

          {/* Content row */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Team card */}
            <Card
              header={
                <div className="flex items-center justify-between">
                  <h2 className="text-base font-semibold text-zinc-900">
                    Equipo
                  </h2>
                  <Button variant="outline" size="sm">
                    Ver todos
                  </Button>
                </div>
              }
            >
              <ul className="divide-y divide-zinc-100">
                {[
                  {
                    name: "Ana García",
                    role: "Administrador",
                    status: "success" as const,
                  },
                  {
                    name: "Carlos López",
                    role: "Analista",
                    status: "info" as const,
                  },
                  {
                    name: "María Torres",
                    role: "Editor",
                    status: "warning" as const,
                  },
                ].map((member) => (
                  <li
                    key={member.name}
                    className="flex items-center gap-3 py-3"
                  >
                    <Avatar name={member.name} size="sm" />
                    <div className="flex-1 min-w-0">
                      <p className="truncate text-sm font-medium text-zinc-900">
                        {member.name}
                      </p>
                      <p className="truncate text-xs text-zinc-500">
                        {member.role}
                      </p>
                    </div>
                    <Badge status={member.status}>{member.role}</Badge>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Form card */}
            <Card
              header={
                <h2 className="text-base font-semibold text-zinc-900">
                  Nueva solicitud
                </h2>
              }
              footer={
                <div className="flex justify-end gap-3">
                  <Button variant="outline" size="sm">
                    Cancelar
                  </Button>
                  <Button size="sm">Guardar</Button>
                </div>
              }
            >
              <div className="flex flex-col gap-4">
                <FormField
                  id="nombre"
                  label="Nombre completo"
                  required
                  inputProps={{ placeholder: "Ej. Juan Pérez", type: "text" }}
                />
                <FormField
                  id="email"
                  label="Correo electrónico"
                  required
                  inputProps={{
                    placeholder: "correo@ejemplo.com",
                    type: "email",
                  }}
                />
                <FormField
                  id="descripcion"
                  label="Descripción"
                  hint="Máximo 500 caracteres."
                  inputProps={{ placeholder: "Describe la solicitud..." }}
                />
              </div>
            </Card>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}
