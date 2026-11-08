import { SectionIndex } from "ds-docs-theme/docs/blocks"
import { patterns } from "@/lib/nav"

export const metadata = { title: "Patrones · Orali Design System" }

export default function Page() {
  return (
    <SectionIndex
      title="Patrones"
      intro="Composiciones de componentes para flujos completos: carrito, checkout y páginas de contenido."
      base="/patterns"
      group="patrones"
      items={patterns}
    />
  )
}
