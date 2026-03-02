export const routes = {
  home: "/",
  simulation: "/simulation",
  statistics: "/statistics",
  usuarios: "/usuarios",
  ajustes: "/ajustes",
} as const;

export type Route = (typeof routes)[keyof typeof routes];
