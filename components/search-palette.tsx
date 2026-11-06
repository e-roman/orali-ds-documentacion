"use client"
import { useRouter } from "next/navigation"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { matchRange, search, type Hit, type SearchEntry } from "@/lib/search"

export const openSearch = () => window.dispatchEvent(new Event("orali:search"))

const isMac = () => typeof navigator !== "undefined" && /Mac|iPhone|iPad/.test(navigator.platform)

const SearchIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
    <circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" />
  </svg>
)

/** Botón que abre el buscador. `side`: campo del índice lateral. `header`: botón del header. */
export function SearchTrigger({ variant }: { variant: "side" | "header" }) {
  const [mac, setMac] = useState(false)
  useEffect(() => setMac(isMac()), [])
  return (
    <button type="button" className={variant === "side" ? "srch-trigger" : "srch-trigger srch-trigger-hdr"} onClick={openSearch} aria-label="Buscar en la documentación" aria-keyshortcuts="Control+K Meta+K">
      <SearchIcon />
      <span className="srch-trigger-text">Buscar…</span>
      <kbd>{mac ? "⌘" : "Ctrl"} K</kbd>
    </button>
  )
}

const GROUP_ORDER = ["Empezar", "Componentes", "Patrones", "Foundations", "Tokens"]
const PER_GROUP: Record<string, number> = { Tokens: 6 }

const SUGGESTED = [
  { title: "Empezar", crumb: "Instalar y usar los tokens", path: "/get-started" },
  { title: "Button", crumb: "Componentes", path: "/components/button" },
  { title: "Color", crumb: "Foundations", path: "/foundations/color" },
  { title: "Product card", crumb: "Patrones", path: "/patterns/product-card" },
  { title: "Design tokens", crumb: "Foundations", path: "/foundations/tokens" },
]

type Item = { key: string; title: string; crumb: string; path: string; type: "page" | "token"; value?: string; desc?: string }

function Highlight({ text, q }: { text: string; q: string }) {
  const r = matchRange(text, q)
  if (!r) return <>{text}</>
  return <>{text.slice(0, r[0])}<mark>{text.slice(r[0], r[1])}</mark>{text.slice(r[1])}</>
}

const looksColor = (v?: string) => !!v && /^(#|rgb)/.test(v)

export default function SearchPalette() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [q, setQ] = useState("")
  const [active, setActive] = useState(0)
  const [entries, setEntries] = useState<SearchEntry[] | null>(null)
  const input = useRef<HTMLInputElement>(null)
  const list = useRef<HTMLUListElement>(null)
  const returnTo = useRef<HTMLElement | null>(null)

  const close = useCallback(() => {
    setOpen(false)
    returnTo.current?.focus?.()
  }, [])

  // Atajos: Ctrl/⌘ + K, y «/» fuera de un campo de texto.
  useEffect(() => {
    const onOpen = () => { returnTo.current = document.activeElement as HTMLElement; setOpen(true) }
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault()
        setOpen((o) => { if (!o) returnTo.current = document.activeElement as HTMLElement; return !o })
      } else if (e.key === "/" && !/^(INPUT|TEXTAREA|SELECT)$/.test((e.target as HTMLElement).tagName) && !(e.target as HTMLElement).isContentEditable) {
        e.preventDefault()
        onOpen()
      }
    }
    window.addEventListener("orali:search", onOpen)
    window.addEventListener("keydown", onKey)
    return () => { window.removeEventListener("orali:search", onOpen); window.removeEventListener("keydown", onKey) }
  }, [])

  // Al abrir: carga el índice (una vez), enfoca el campo y bloquea el scroll.
  useEffect(() => {
    if (!open) return
    if (!entries) fetch("/api/search").then((r) => r.json()).then(setEntries).catch(() => setEntries([]))
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    setQ("")
    setActive(0)
    setTimeout(() => input.current?.focus(), 0)
    return () => { document.body.style.overflow = prev }
  }, [open, entries])

  const items: Item[] = useMemo(() => {
    if (!q.trim()) return SUGGESTED.map((s) => ({ key: s.path, type: "page" as const, ...s }))
    if (!entries) return []
    const hits: Hit[] = search(entries, q, 120)
    const byGroup = new Map<string, Item[]>()
    for (const h of hits) {
      const g = h.entry.group
      const arr = byGroup.get(g) ?? []
      if (arr.length >= (PER_GROUP[g] ?? 8)) continue
      arr.push({ key: h.entry.id, title: h.entry.title, crumb: h.entry.crumb, path: h.entry.path, type: h.entry.type, value: h.entry.value, desc: h.entry.desc })
      byGroup.set(g, arr)
    }
    // Los grupos se ordenan por su mejor resultado; los tokens siempre al final.
    const best = (g: string) => hits.find((h) => h.entry.group === g)?.score ?? 0
    const order = [...GROUP_ORDER].filter((g) => byGroup.has(g)).sort((a, b) => (a === "Tokens" ? 1 : b === "Tokens" ? -1 : best(b) - best(a)))
    return order.flatMap((g) => (byGroup.get(g) ?? []).map((i) => ({ ...i, group: g })) as Item[])
  }, [q, entries])

  useEffect(() => setActive(0), [q])
  useEffect(() => { list.current?.querySelector('[aria-selected="true"]')?.scrollIntoView({ block: "nearest" }) }, [active])

  const go = (it: Item) => {
    setOpen(false)
    router.push(it.path)
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") { e.preventDefault(); setActive((a) => Math.min(a + 1, items.length - 1)) }
    else if (e.key === "ArrowUp") { e.preventDefault(); setActive((a) => Math.max(a - 1, 0)) }
    else if (e.key === "Enter" && items[active]) { e.preventDefault(); go(items[active]) }
    else if (e.key === "Escape") { e.preventDefault(); close() }
  }

  if (!open) return null

  // Encabezados de grupo: se muestran cuando cambia el grupo respecto al ítem anterior.
  const groupOf = (it: Item) => (q.trim() ? (it as Item & { group?: string }).group ?? "" : "Sugerencias")
  const loading = q.trim() && !entries

  return (
    <div className="srch-overlay" onMouseDown={(e) => e.target === e.currentTarget && close()}>
      <div className="srch-dialog" role="dialog" aria-modal="true" aria-label="Buscar en la documentación" onKeyDown={onKeyDown}>
        <div className="srch-input">
          <SearchIcon />
          <input
            ref={input}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar componentes, patrones, tokens…"
            role="combobox"
            aria-expanded
            aria-controls="srch-list"
            aria-activedescendant={items[active] ? `srch-${active}` : undefined}
            aria-autocomplete="list"
            autoComplete="off"
            spellCheck={false}
          />
          <button type="button" className="srch-x" aria-label="Cerrar búsqueda" onClick={close}>×</button>
        </div>
        <ul id="srch-list" ref={list} role="listbox" className="srch-list">
          {loading && <li className="srch-empty">Cargando…</li>}
          {!loading && q.trim() && items.length === 0 && (
            <li className="srch-empty">Sin resultados para «{q}». Probá con otro término, por ejemplo «boton», «color» o «tomato-500».</li>
          )}
          {items.map((it, i) => {
            const g = groupOf(it)
            const showHead = i === 0 || groupOf(items[i - 1]) !== g
            return (
              <li key={it.key} role="presentation">
                {showHead && <div className="srch-group">{g}</div>}
                <div id={`srch-${i}`} role="option" aria-selected={i === active} className="srch-item" onMouseMove={() => active !== i && setActive(i)} onClick={() => go(it)}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                  {it.type === "token" && looksColor(it.value) && <span className={`srch-sw tk-bg-${it.title.replace(/^--/, "")}`} />}
                  <span className="srch-title"><Highlight text={it.title} q={q} /></span>
                  {it.type === "token" && <code className="srch-val">{it.value}</code>}
                  <span className="srch-crumb">{it.crumb}</span>
                </div>
              </li>
            )
          })}
        </ul>
        <div className="srch-foot">
          <span><kbd>↑</kbd><kbd>↓</kbd> navegar</span>
          <span><kbd>↵</kbd> abrir</span>
          <span><kbd>esc</kbd> cerrar</span>
        </div>
      </div>
    </div>
  )
}
