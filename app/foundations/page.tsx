import SectionIndex from "@/components/section-index"
import { foundations } from "@/lib/nav"

export default function Page() {
  return (
    <main className="doc-page">
      <SectionIndex
        title="Foundations"
        base="/foundations"
        items={foundations}
        intro="Los fundamentos del sistema Orali: color, tipografía, spacing y tokens que garantizan consistencia entre Figma y el sitio."
      />
    </main>
  )
}
