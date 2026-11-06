"use client"
import { useCallback, useEffect, useState, useSyncExternalStore } from "react"
import { copyText } from "@/lib/copy"
import { inspect, loadTokens, type GroupKey, type Inspection, type Row } from "@/lib/inspect"

/* ── Store global: una sola inspección abierta en toda la página ── */
type State = { data: Inspection | null; key: string | null }
let state: State = { data: null, key: null }
const listeners = new Set<() => void>()
const set = (s: State) => {
  state = s
  listeners.forEach((l) => l())
}
const subscribe = (l: () => void) => {
  listeners.add(l)
  return () => listeners.delete(l)
}
const getState = () => state
const serverState: State = { data: null, key: null }

/** Abre (o cambia) la inspección. `key` identifica la fuente (por ejemplo un número de la anatomía) para resaltarla. */
export async function openInspection(el: Element, only?: GroupKey[], title?: string, key?: string) {
  const tokens = await loadTokens()
  set({ data: inspect(el, tokens, only, title), key: key ?? null })
}
export const closeInspection = () => set({ data: null, key: null })

/** Hook para quien dispara inspecciones. */
export function useInspector() {
  const open = useCallback((el: Element, only?: GroupKey[], title?: string, key?: string) => openInspection(el, only, title, key), [])
  const activeKey = useSyncExternalStore(subscribe, () => state.key, () => null)
  return { open, close: closeInspection, activeKey }
}

const SECTIONS: { title: string; keys: GroupKey[] }[] = [
  { title: "Apariencia", keys: ["fondo", "texto", "borde", "radio"] },
  { title: "Espaciado", keys: ["padding", "gap"] },
  { title: "Tamaño", keys: ["alto", "ancho"] },
  { title: "Tipografía", keys: ["tipografia"] },
]

function Chip({ name }: { name: string }) {
  const [ok, setOk] = useState(false)
  return (
    <button
      type="button"
      className={ok ? "insp-chip is-copied" : "insp-chip"}
      data-tip={ok ? "Copiado" : "Copiar"}
      onClick={async () => { if (await copyText(`var(--${name})`)) { setOk(true); setTimeout(() => setOk(false), 1400) } }}
    >
      {name}
      <span className="sr-only" aria-live="polite">{ok ? "Copiado" : ""}</span>
    </button>
  )
}

function RowView({ r, onHover }: { r: Row; onHover: (k: GroupKey | null) => void }) {
  return (
    <div className="insp-row" onMouseEnter={() => onHover(r.key)} onMouseLeave={() => onHover(null)}>
      <span className="insp-label">{r.label}</span>
      <span className="insp-val">{r.value}</span>
      <div className="insp-tokens">
        {r.chains.length === 0 ? (
          <span className="insp-none">{r.inherited ? "heredado del contenedor" : "valor fijo, sin token"}</span>
        ) : (
          r.chains.map((c, i) => (
            <span key={i} className="insp-chain">
              {c.map((n, j) => (
                <span key={n}>
                  {j > 0 && <i aria-hidden> → </i>}
                  <Chip name={n} />
                </span>
              ))}
            </span>
          ))
        )}
      </div>
    </div>
  )
}

/** Drawer lateral (no modal): el componente queda visible y se puede seguir haciendo clic en otras partes. Se monta una sola vez en el layout. */
export default function InspectDrawer() {
  const { data } = useSyncExternalStore(subscribe, getState, () => serverState)
  const [hl, setHl] = useState<GroupKey | null>(null)
  const [rect, setRect] = useState<DOMRect | null>(null)
  const el = data?.el

  // Empuja el contenido de la página mientras el drawer está abierto.
  useEffect(() => {
    document.body.classList.toggle("insp-open", !!data)
    return () => document.body.classList.remove("insp-open")
  }, [data])

  useEffect(() => {
    if (!el) return setRect(null)
    const upd = () => setRect(el.isConnected ? el.getBoundingClientRect() : null)
    upd()
    window.addEventListener("scroll", upd, true)
    window.addEventListener("resize", upd)
    const key = (e: KeyboardEvent) => e.key === "Escape" && closeInspection()
    document.addEventListener("keydown", key)
    // Mientras está abierto se vuelve a medir en cada cuadro: el recuadro sigue al elemento aunque la página se mueva.
    let raf = 0
    const loop = () => {
      if (el.isConnected) {
        const r = el.getBoundingClientRect()
        setRect((p) => (p && p.left === r.left && p.top === r.top && p.width === r.width && p.height === r.height ? p : r))
      }
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("scroll", upd, true)
      window.removeEventListener("resize", upd)
      document.removeEventListener("keydown", key)
    }
  }, [el])

  // Si el elemento deja de existir (por ejemplo, al cambiar de pestaña), se cierra.
  useEffect(() => {
    if (!el) return
    const iv = setInterval(() => { if (!el.isConnected) closeInspection() }, 400)
    return () => clearInterval(iv)
  }, [el])

  if (!data || !el) return null
  const cs = getComputedStyle(el)
  const [pt, pr, pb, pl] = [cs.paddingTop, cs.paddingRight, cs.paddingBottom, cs.paddingLeft].map(parseFloat)
  const w = rect?.width ?? 0
  const h = rect?.height ?? 0
  const x = rect?.left ?? 0
  const y = rect?.top ?? 0
  const iw = Math.max(0, w - pl - pr)
  const ih = Math.max(0, h - pt - pb)

  return (
    <>
      {rect && (
        <svg className="insp-svg" aria-hidden>
          <rect className="insp-rect" x={x} y={y} width={w} height={h} />
          {hl === "padding" && (
            <>
              <path className="insp-pad" fillRule="evenodd" d={`M${x} ${y}h${w}v${h}h${-w}Z M${x + pl} ${y + pt}h${iw}v${ih}h${-iw}Z`} />
              <rect className="insp-rect" x={x + pl} y={y + pt} width={iw} height={ih} />
            </>
          )}
        </svg>
      )}
      <aside className="insp-drawer" role="complementary" aria-label="Propiedades del componente">
        <div className="insp-dhead">
          <div>
            <h2 className="doc-h2">{data.title}</h2>
            <p>Propiedades y tokens de la parte seleccionada</p>
          </div>
          <button type="button" className="insp-x" aria-label="Cerrar" onClick={closeInspection}>×</button>
        </div>
        <div className="insp-body">
          {data.rows.length === 0 && <p className="muted">Sin propiedades para mostrar.</p>}
          {SECTIONS.map((s) => {
            const rows = data.rows.filter((r) => s.keys.includes(r.key))
            if (rows.length === 0) return null
            return (
              <section key={s.title} className="insp-sec">
                <h3 className="doc-h3">{s.title}</h3>
                {rows.map((r) => <RowView key={r.key} r={r} onHover={setHl} />)}
              </section>
            )
          })}
          <p className="insp-hint">Seguí haciendo clic en otras partes para cambiar el contenido. Clic en un token para copiar su variable CSS.</p>
        </div>
      </aside>
    </>
  )
}
