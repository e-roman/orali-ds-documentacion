"use client"
import { useEffect, useId, useRef, useState, type ReactNode } from "react"
import { useInspector } from "./inspector"

export type VariantItem = { value: string; label: string; caption: ReactNode; node: ReactNode; dark?: boolean }

/** Control segmentado + preview en vivo + frase explicativa (equivale a "Configuration" de SGDS), con modo «Inspeccionar». */
export default function Variants({ title, description, items, ariaLabel }: { title: string; description?: ReactNode; items: VariantItem[]; ariaLabel: string }) {
  const [i, setI] = useState(0)
  const [inspecting, setInspecting] = useState(false)
  const [canInspect, setCanInspect] = useState(true)
  const stage = useRef<HTMLDivElement>(null)
  const insp = useInspector()
  const id = useId()
  const cur = items[i]

  // Las capturas de Storybook no se pueden inspeccionar.
  useEffect(() => {
    setCanInspect(!stage.current?.querySelector("iframe, .sb-shot"))
    if (stage.current?.querySelector("iframe, .sb-shot")) setInspecting(false)
  }, [i])

  const onKey = (e: React.KeyboardEvent, idx: number) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return
    e.preventDefault()
    const n = (idx + (e.key === "ArrowRight" ? 1 : -1) + items.length) % items.length
    setI(n)
    document.getElementById(`${id}-${n}`)?.focus()
  }

  const onStageClick = (e: React.MouseEvent) => {
    if (!inspecting) return
    const t = e.target as Element
    if (t === stage.current) return
    e.preventDefault()
    e.stopPropagation()
    insp.open(t)
  }

  return (
    <div className="variants">
      <h3 className="doc-h3 variants-title">{title}</h3>
      {description && <p className="muted">{description}</p>}
      <div className="panel">
        <div className="panel-head">
          <div role="tablist" aria-label={ariaLabel} className="seg">
            {items.map((it, idx) => (
              <button key={it.value} id={`${id}-${idx}`} role="tab" aria-selected={i === idx} tabIndex={i === idx ? 0 : -1}
                onClick={() => { setI(idx); insp.close() }} onKeyDown={(e) => onKey(e, idx)}>{it.label}</button>
            ))}
          </div>
          {canInspect && (
            <button type="button" className="insp-toggle" aria-pressed={inspecting} onClick={() => { setInspecting(!inspecting); insp.close() }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M3 3l7 17 2.5-7.5L20 10z" /></svg>
              Inspeccionar
            </button>
          )}
        </div>
        <div
          ref={stage}
          className={[cur.dark ? "stage stage-dark" : "stage", inspecting ? "inspecting" : ""].join(" ").trim()}
          role="tabpanel"
          onClickCapture={onStageClick}
        >
          {cur.node}
        </div>
        <p className="caption">{inspecting ? "Hacé clic en una parte del componente para ver sus propiedades y tokens." : cur.caption}</p>
      </div>
    </div>
  )
}
