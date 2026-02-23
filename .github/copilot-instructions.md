# Copilot instructions for `sadeci-platform`

- Stack principal: Next.js App Router + React 19 + TypeScript + Tailwind v4, ejecutado con Bun.
- Estructura UI: `src/components/atoms`, `molecules`, `organisms`, `layout`.
- Reutiliza utilidades comunes antes de crear patrones nuevos:
  - `cn()` en `src/lib/utils.ts`
  - tipos en `src/lib/types.ts`
- Mantén imports con alias `@/` cuando sea posible.

## Política de uso de componentes

Deben usarse componentes ya existentes siempre que cumplan el propósito, incluso si no son 100% perfectos para el caso. Evita crear nuevos componentes a menos que sea estrictamente necesario para evitar proliferación de componentes similares. Si un componente existente no es adecuado, considera extenderlo o modificarlo antes de crear uno nuevo desde cero.

## Política de estilos (TailwindCSS / CSS)

- Usa Tailwind para estilos, evitando CSS personalizado salvo que sea necesario para casos muy específicos.
- Usa de referencia la última versión de Tailwind (v4) y sus nuevas utilidades (en caso de ser necesario buscar en la web para utilidades en particular, realizarlo).

## Arquitectura y patrones del repo

- Páginas en `src/app/**` (App Router). Usa `"use client"` solo cuando haya estado/efectos/APIs de navegador.
- Sigue composición por capas: atom -> molecule -> organism -> page.
- Para variantes y tamaños, sigue el patrón de mapas de clases (ejemplo: `src/components/atoms/Buttons/constants.ts`).
- Mantén accesibilidad observable en componentes (`role`, `aria-*`, labels).

## Política de testing (obligatoria)

- Todo componente nuevo o modificado debe incluir/actualizar tests en `src/test/components/**`.
- Mantén los tests alineados por dominio (`atoms`, `layout`, `molecules`) dentro de ese directorio central.
- No modifiques tests existentes salvo que sea intrínsecamente necesario por inconsistencia real con el contrato actual del componente.
- Si debes editar un test existente, documenta brevemente el motivo en la PR/commit.
- Prioriza tests deterministas de comportamiento/DOM/clases (evita snapshots frágiles como única cobertura).

## Verificación antes de cerrar cambios

Ejecuta siempre, en este orden:
1. `bun run lint`
2. `bun run test`
3. `bun run build`

No des por finalizado un trabajo si esos comandos no pasan.

## Arquitectura del repo

Sumamente importante para mantener consistencia y escalabilidad a largo plazo. La estructura actual es:

- `src` root.
- `app` para páginas y rutas (App Router).
- `components` para UI, organizado por atomic design.
- `lib` para utilidades y tipos compartidos.
- `test` para tests, organizado por dominio (atoms, molecules, layout).
- `public` para assets estáticos.
- `styles` para estilos globales (Tailwind config, resets, etc).
- `hooks` para custom hooks reutilizables.
- `context` para providers y contextos globales.

## Otros contextos

Aplicación con propósito de hosteo en servidor con propósito de soporte para personal de la salud. Se piensa aplicación sea de uso para personal de la salud, científicos de la misma área y no pacientes naturales.

## Evitar modificar

- `yarn.lock` o `package.json` salvo que sea estrictamente necesario para agregar dependencias o scripts. Siempre se revisará qué dependencias se estarán agregando, y si estas son actualizadas o están en su última versión.