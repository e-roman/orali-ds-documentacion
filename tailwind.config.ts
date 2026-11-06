import type { Config } from "tailwindcss"
import oraliTokens from "@orali/design-tokens/tailwind"

/**
 * Misma configuración que tienda-orali: los patrones reales usan utilidades de Tailwind.
 * - Sin preflight: no resetea los estilos de esta documentación (los previews llevan su propio reset mínimo).
 * - content incluye los archivos de la tienda para conservar las clases que usan sus componentes.
 */
const config: Config = {
  presets: [oraliTokens],
  corePlugins: { preflight: false },
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx,mdx}",
    "./content/**/*.{ts,tsx,mdx}",
    "../tienda-orali/app/**/*.{ts,tsx}",
    "../tienda-orali/components/**/*.{ts,tsx}",
  ],
  plugins: [],
}
export default config
