import SectionIndex from "@/components/section-index"
import { components } from "@/lib/nav"

export default function Page() {
  return (
    <main className="doc-page">
      <SectionIndex
        title="Componentes"
        base="/components"
        items={components}
        intro="Bloques de interfaz reutilizables de Tienda Orali, con sus variantes, estados y reglas de uso."
      />
    </main>
  )
}
