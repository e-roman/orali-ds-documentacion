import { Check, X } from "lucide-react"
import type { ReactNode } from "react"
import { Section } from "@/components/component-page"
import AnatomyStage, { type Legend, type Marker, type Part } from "./anatomy-stage"

/** Propósito: 3 columnas con título y texto corto. */
export function Purpose({ items }: { items: { title: string; text: ReactNode }[] }) {
  return (
    <Section title="Propósito">
      <div className="purpose">
        {items.map((it) => (
          <div key={it.title}><h3 className="doc-h3 purpose-title">{it.title}</h3><p className="muted">{it.text}</p></div>
        ))}
      </div>
    </Section>
  )
}

export type { Marker, Part } from "./anatomy-stage"

/** Anatomía: componente real con marcadores numerados y leyenda. Con `parts`, los números abren el inspector. */
export function Anatomy({ children, markers, legend, parts }: { children: ReactNode; markers: Marker[]; legend: Legend[]; parts?: Part[] }) {
  return (
    <Section title="Anatomía">
      <AnatomyStage markers={markers} legend={legend} parts={parts}>{children}</AnatomyStage>
    </Section>
  )
}

/** Cuándo usar / cuándo no. */
export function WhenToUse({ use, avoid }: { use: ReactNode[]; avoid: ReactNode[] }) {
  return (
    <Section title="Uso">
      <h3 className="doc-h3 h-ok"><span className="ico ok" aria-hidden><Check strokeWidth={3} /></span>Cuándo usarlo</h3>
      <ul className="bul">{use.map((u, i) => <li key={i}>{u}</li>)}</ul>
      <h3 className="doc-h3 h-no"><span className="ico no" aria-hidden><X strokeWidth={3} /></span>Cuándo no usarlo</h3>
      <ul className="bul">{avoid.map((u, i) => <li key={i}>{u}</li>)}</ul>
    </Section>
  )
}

/** Tarjetas Do / Don't en pares. */
export function DoDont({ items }: { items: { ok: boolean; preview: ReactNode; title: string; text?: ReactNode; dark?: boolean }[] }) {
  return (
    <Section title="Buenas prácticas">
      <div className="dd-grid">
        {items.map((it, i) => (
          <figure key={i} className="dd">
            <div className={it.dark ? "dd-box dd-dark" : "dd-box"}>
              <span className={`ico ${it.ok ? "ok" : "no"}`} role="img" aria-label={it.ok ? "Correcto" : "Incorrecto"}>{it.ok ? <Check strokeWidth={3} /> : <X strokeWidth={3} />}</span>
              {it.preview}
            </div>
            <figcaption><b>{it.title}</b>{it.text && <span className="muted">{it.text}</span>}</figcaption>
          </figure>
        ))}
      </div>
    </Section>
  )
}

export function Panel({ children, caption, dark }: { children: ReactNode; caption?: ReactNode; dark?: boolean }) {
  return (
    <div className="panel">
      <div className={dark ? "stage stage-dark" : "stage"}>{children}</div>
      {caption && <p className="caption">{caption}</p>}
    </div>
  )
}

export function Table({ head, rows }: { head: string[]; rows: ReactNode[][] }) {
  return (
    <div className="tablewrap">
      <table>
        <thead><tr>{head.map((h) => <th key={h}>{h}</th>)}</tr></thead>
        <tbody>{rows.map((r, i) => <tr key={i}>{r.map((c, j) => <td key={j}>{c}</td>)}</tr>)}</tbody>
      </table>
    </div>
  )
}

export function Callout({ children }: { children: ReactNode }) {
  return <p className="docnote">{children}</p>
}
