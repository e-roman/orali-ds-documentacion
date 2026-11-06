import SectionIndex from "@/components/section-index"
import { patterns } from "@/lib/nav"

export default function Page() {
  return (
    <main className="doc-page">
      <SectionIndex
        title="Patrones"
        base="/patterns"
        items={patterns}
        intro="Composiciones de componentes para flujos completos: carrito, checkout y páginas de contenido."
      />
    </main>
  )
}
