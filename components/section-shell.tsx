import type { ReactNode } from "react"
import Sidebar from "@/components/sidebar"
import type { NavItem } from "@/lib/nav"

/** Páginas internas de una sección: índice lateral + contenido. (Los índices de sección van sin menú lateral.) */
export default function SectionShell({ title, base, items, children }: { title: string; base: string; items: NavItem[]; children: ReactNode }) {
  return (
    <div className="shell">
      <Sidebar title={title} base={base} items={items} />
      <main className="doc-page">{children}</main>
    </div>
  )
}
