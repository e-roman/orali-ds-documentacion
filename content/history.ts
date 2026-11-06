export type HistoryEntry = {
  /** AAAA-MM-DD */
  date: string
  /** Qué cambió. Lo que va entre `backticks` se muestra como código. */
  text: string
}

/**
 * Historial propio de cada componente o patrón (pestaña «Novedades»), para cambios que no son de tokens:
 * variantes nuevas, cambios de props, correcciones de CSS, etc. Se muestra ARRIBA del historial de tokens.
 *
 * Cómo agregar una entrada: sumá una línea a la lista del slug de la página (el de la URL), la más nueva primero.
 *
 *   button: [
 *     { date: "2026-12-01", text: "Nueva variante `ghost`." },
 *   ],
 */
export const history: Record<string, HistoryEntry[]> = {
  nav: [
    {
      date: "2026-11-05",
      text: "Resultados de búsqueda: se quitó `top: 100%` de `.dropdown__panel--results` (tienda-orali, `styles/patterns/header.css`) porque el panel aparecía demasiado abajo. Hay que republicar Storybook para que se vea en sus stories.",
    },
  ],
}
