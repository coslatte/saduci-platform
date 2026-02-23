export const routes = {
  home: "/",
  reportes: "/reportes",
  usuarios: "/usuarios",
  ajustes: "/ajustes",
  test: "/test",
} as const;

export type Route = (typeof routes)[keyof typeof routes];
