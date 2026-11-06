"use client"
import { useEffect, useState, type ReactNode } from "react"

const ALL = [
  { id: "design", label: "Diseño" },
  { id: "usage", label: "Uso" },
  { id: "accessibility", label: "Accesibilidad" },
  { id: "updates", label: "Historial" },
] as const
type Id = (typeof ALL)[number]["id"]

export default function DocTabs({ panels }: { panels: Partial<Record<Id, ReactNode>> }) {
  const TABS = ALL.filter((t) => panels[t.id] != null)
  const [tab, setTab] = useState<Id>("design")
  useEffect(() => {
    const h = location.hash.slice(1) as Id
    if (ALL.some((t) => t.id === h && panels[t.id] != null)) setTab(h)
  }, [])
  const select = (id: Id) => {
    setTab(id)
    history.replaceState(null, "", `#${id}`)
  }
  return (
    <>
      <div role="tablist" className="doc-tabs" aria-label="Secciones">
        {TABS.map((t) => (
          <button key={t.id} role="tab" id={`tab-${t.id}`} aria-selected={tab === t.id} aria-controls={`panel-${t.id}`} onClick={() => select(t.id)}>
            {t.label}
          </button>
        ))}
      </div>
      {TABS.map((t) => (
        <div key={t.id} role="tabpanel" id={`panel-${t.id}`} aria-labelledby={`tab-${t.id}`} hidden={tab !== t.id}>
          {panels[t.id]}
        </div>
      ))}
    </>
  )
}
