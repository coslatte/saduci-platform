# Arquitectura para `sadeci-platform`

- Stack principal: Next.js (App Router) + React 19 + TypeScript + Tailwind v4, ejecutado con Bun.
- Estructura de UI: `src/components/atoms`, `molecules`, `organisms`, `layout`.
- Reutiliza utilidades comunes antes de crear nuevos patrones:
  - `cn()` en `src/lib/utils.ts`
  - Tipos en `src/lib/types.ts`
- Mantén los imports con el alias `@/` cuando sea posible.

## Arquitectura del repo

Sumamente importante para mantener consistencia y escalabilidad a largo plazo. La estructura actual es:

- `src` root.
- `app` para páginas y rutas (App Router).
- `components` para la UI, organizado por atomic design.
- `lib` para utilidades y tipos compartidos.
- `test` para pruebas, organizado por dominio (`atoms`, `molecules`, `layout`).
- `public` para assets estáticos.
- `styles` para estilos globales (configuración de Tailwind, resets, etc.).
- `hooks` para custom hooks reutilizables.
- `context` para providers y contextos globales.

## Arquitectura y patrones del repo

- Páginas en `src/app/**` (App Router). Usa `"use client"` solo cuando haya estado/efectos/APIs de navegador.
- Sigue composición por capas: atom -> molecule -> organism -> page.

## Nomenclatura de archivos de páginas

- Notas rápidas:
  - Los entry points de rutas en Next.js App Router deben seguir llamándose `page.tsx` (Next lo requiere) y deben localizarse en `src/app/<ruta>/page.tsx`.
  - Para evitar una masa de archivos genéricos con el mismo nombre, NUNCA usar `page.tsx` o `index.tsx` como nombre para componentes reutilizables o páginas que no sean entry points de ruta.
  - Para componentes de tipo "página" que NO son entry points (por ejemplo: páginas reutilizables, vistas para pruebas, helpers de UI), use nombres descriptivos en PascalCase y, si procede, añada el sufijo `Page`: `DashboardPage.tsx`, `SimulacionPage.tsx`.
  - Evite `index.tsx` dentro de carpetas de componentes; prefiera `ComponentName.tsx` para facilitar búsquedas y evitar ambigüedad.
  - Mantenga las rutas descriptivas: nombre claro de la carpeta + un único `page.tsx` por ruta. Ej: `src/app/dashboard/page.tsx` en vez de múltiples `page.tsx` repartidos sin estructura.
  - En `src/test/` o entornos de ejemplo, también usar nombres explícitos: `TestingBoardPage.tsx`, `SimulacionTestPage.tsx`.
- Para variantes y tamaños, sigue el patrón de mapas de clases (ejemplo: `src/components/atoms/Buttons/constants.ts`).
- Mantén accesibilidad observable en componentes (`role`, `aria-*`, labels).

## Contexto teórico del proyecto

Aplicación con propósito de hosteo en servidor con propósito de soporte para personal de la salud. Se piensa aplicación sea de uso para personal de la salud, científicos de la misma área y no pacientes naturales.

## Evitar modificar

Salvo que sea realmente necesario, evitar modificar:

- `yarn.lock` o `package.json` salvo que sea estrictamente necesario para agregar dependencias o scripts. Siempre se revisará qué dependencias se estarán agregando, y si estas son actualizadas o están en su última versión.
- Modificar archivos de dependencias

## Política de estilos (TailwindCSS / CSS)

- Usa Tailwind para estilos, evitando CSS personalizado salvo que sea necesario para casos muy específicos.
- Usa de referencia la última versión de Tailwind (v4) y sus nuevas utilidades (en caso de ser necesario buscar en la web para utilidades en particular, realizarlo).

## Política de instrucciones de usuario

Cuando el usuario solicite instrucciones básicas genéricas como:

- Procede
- Hazlo
- Continúa
- Haz lo que tú creas / consideres
- Revisa

Si no le anteceden tareas a realizar o un plan anterior, se quiere que se corran los tests a partir de las políticas de testing.

## Política de testing

- Todo componente nuevo o modificado debe incluir/actualizar tests en `src/test/components/**`.
- Mantén los tests alineados por dominio (`atoms`, `layout`, `molecules`, `organisms`) dentro de ese directorio central.
- No modifiques tests existentes salvo que sea intrínsecamente necesario por inconsistencia real con el contrato actual del componente.
- Si debes editar un test existente, documenta brevemente el motivo en la PR/commit.
- Prioriza tests deterministas de comportamiento/DOM/clases (evita snapshots frágiles como única cobertura).

## Política de uso de componentes

Deben usarse componentes ya existentes siempre que cumplan el propósito, incluso si no son 100% perfectos para el caso. Evita crear nuevos componentes a menos que sea estrictamente necesario para evitar proliferación de componentes similares. Si un componente existente no es adecuado, considera extenderlo o modificarlo antes de crear uno nuevo desde cero.

## Políticas con los MCP

- Evita usar MCPs a menos que sea necesario para casos muy específicos.
- Si se usan, documenta claramente el motivo y la lógica detrás de su uso en la PR/commit.

## Verificación antes de cerrar cambios

Ejecutar siempre que se concluya una tarea o cambio importante los siguientes comandos para verificar que no se rompa nada:

```bash
bun run lint ; bun run test ; bun run build
```

No des por finalizado un trabajo si esos comandos no pasan.

## Comentarios en código

Evitar comentarios que sobreexpliquen el código. Siempre que se pueda, evitarlos. Evitar código que utilice emojis u caracteres especiales.
