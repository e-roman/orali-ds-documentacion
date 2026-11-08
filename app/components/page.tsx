import { SectionIndex } from "ds-docs-theme/docs/blocks"
import { components } from "@/lib/nav"

export const metadata = { title: "Componentes · Orali Design System" }

export default function Page() {
  return (
    <SectionIndex
      title="Componentes"
      intro="Bloques de interfaz reutilizables de Tienda Orali, con sus variantes, estados y reglas de uso."
      base="/components"
      group="componentes"
      items={components}
    />
  )
}
