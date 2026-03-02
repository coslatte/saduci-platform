/**
 * Centralized mock data and demo configurations
 * Used across page examples and demo UI sections
 */

export interface SidebarItemConfig {
  label: string;
  href: string;
  active?: boolean;
  children?: SidebarItemConfig[];
}

export interface SidebarSection {
  title: string;
  items: SidebarItemConfig[];
}

export interface DashboardStat {
  label: string;
  value: string;
  status: "success" | "warning" | "info" | "danger";
}

export interface DemoTeamMember {
  name: string;
  role: string;
  status: "success" | "info" | "warning" | "danger";
}

export interface FormFieldDefinition {
  id: string;
  label: string;
  required?: boolean;
  hint?: string;
  placeholder: string;
  type?: string;
}

export const SIDEBAR_SECTIONS: SidebarSection[] = [
  {
    title: "Principal",
    items: [
      {
        label: "Dashboard",
        href: "/",
      },
      {
        label: "Simulación",
        href: "/simulation",
        children: [
          {
            label: "Pruebas Estadísticas",
            href: "/statistics",
          },
        ],
      },
    ],
  },
];

export const DASHBOARD_STATS: DashboardStat[] = [
  {
    label: "Usuarios activos",
    value: "1,284",
    status: "success",
  },
  {
    label: "Solicitudes pendientes",
    value: "42",
    status: "warning",
  },
  {
    label: "Reportes generados",
    value: "318",
    status: "info",
  },
  {
    label: "Alertas críticas",
    value: "3",
    status: "danger",
  },
];

export const DEMO_TEAM_MEMBERS: DemoTeamMember[] = [
  {
    name: "Ana García",
    role: "Administrador",
    status: "success",
  },
  {
    name: "Carlos López",
    role: "Analista",
    status: "info",
  },
  {
    name: "María Torres",
    role: "Editor",
    status: "warning",
  },
];

export const NEW_REQUEST_FORM_FIELDS: FormFieldDefinition[] = [
  {
    id: "nombre",
    label: "Nombre completo",
    required: true,
    placeholder: "Ej. Juan Pérez",
    type: "text",
  },
  {
    id: "email",
    label: "Correo electrónico",
    required: true,
    placeholder: "correo@ejemplo.com",
    type: "email",
  },
  {
    id: "descripcion",
    label: "Descripción",
    hint: "Máximo 500 caracteres.",
    placeholder: "Describe la solicitud...",
  },
];
