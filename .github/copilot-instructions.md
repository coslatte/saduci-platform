# Copilot instructions for `sadeci-platform`

- Stack principal: Next.js App Router + React 19 + TypeScript + Tailwind v4, ejecutado con Bun.
- Estructura UI: `src/components/atoms`, `molecules`, `organisms`, `layout`.
- Reutiliza utilidades comunes antes de crear patrones nuevos:
  - `cn()` en `src/lib/utils.ts`
  - tipos en `src/lib/types.ts`
- Mantén imports con alias `@/` cuando sea posible.

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

## Archivos de referencia útiles

- `src/components/atoms/Buttons/*`
- `src/components/molecules/FormField.tsx`
- `src/components/organisms/Navbar.tsx`
- `src/app/test/page.tsx`
- `src/test/setup.ts`
