"use client"
import { useId, useRef, type ReactNode } from "react"
import type { GroupKey } from "@/lib/inspect"
import { useInspector } from "./inspector"

export type Marker = { n: number; side: "top" | "bottom" | "left" | "right"; pct?: number }
export type Legend = { n: number; label: string; note?: string }
/** Parte inspeccionable: el selector se busca dentro del componente. `only` limita las propiedades que se muestran. */
export type Part = { n: number; selector: string; only?: GroupKey[] }

/** Anatomía interactiva: los números (y la leyenda) abren el globo con las propiedades de esa parte. */
export default function AnatomyStage({ children, markers, legend, parts }: { children: ReactNode; markers: Marker[]; legend: Legend[]; parts?: Part[] }) {
  const target = useRef<HTMLDivElement>(null)
  const insp = useInspector()
  const uid = useId()

  const part = (n: number) => parts?.find((p) => p.n === n)
  const inspectPart = (n: number) => {
    const p = part(n)
    const el = p && target.current?.querySelector(p.selector)
    if (!p || !el) return
    insp.open(el, p.only, legend.find((l) => l.n === n)?.label, `${uid}:${n}`)
  }

  return (
    <>
      <div className="panel anatomy">
        <div className="anat-target" ref={target}>
          {children}
          {markers.map((m) => {
            const pos = `${m.side === "top" || m.side === "bottom" ? "mk-x" : "mk-y"}-${Math.round(m.pct ?? 50)}`
            return (
              <span key={m.n} className={`mk mk-${m.side} ${pos}`}>
                {part(m.n) ? (
                  <button type="button" className={insp.activeKey === `${uid}:${m.n}` ? "mk-btn on" : "mk-btn"} aria-label={`Ver propiedades: ${legend.find((l) => l.n === m.n)?.label ?? m.n}`} onClick={() => inspectPart(m.n)}>{m.n}</button>
                ) : (
                  <i>{m.n}</i>
                )}
              </span>
            )
          })}
        </div>
        {parts && <p className="caption">Hacé clic en un número para ver las propiedades y los tokens del elemento.</p>}
      </div>
      <ol className="legend">
        {legend.map((l) => (
          <li key={l.n}>
            {part(l.n) ? (
              <button type="button" className="legend-btn" onClick={() => inspectPart(l.n)}>
                <b>{l.n}</b>
                <span>{l.label}{l.note && <span className="muted"> ({l.note})</span>}</span>
              </button>
            ) : (
              <>
                <b>{l.n}</b>
                <span>{l.label}{l.note && <span className="muted"> ({l.note})</span>}</span>
              </>
            )}
          </li>
        ))}
      </ol>
    </>
  )
}
