"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import type { NavItem } from "@/lib/nav"
import { SearchTrigger } from "@/components/search-palette"

/** Columna lateral en desktop. En móvil: botón «Explorar {sección}» que abre un drawer por la izquierda. */
export default function Sidebar({ title, base, items }: { title: string; base: string; items: NavItem[] }) {
  const path = usePathname()
  const [open, setOpen] = useState(false)
  const toggle = useRef<HTMLButtonElement>(null)

  // Con categorías (Patrones) el índice se agrupa en secciones plegables; sin ellas, lista plana.
  const groups: { cat?: string; items: NavItem[] }[] = []
  for (const i of items) {
    const last = groups[groups.length - 1]
    if (last && last.cat === i.cat) last.items.push(i)
    else groups.push({ cat: i.cat, items: [i] })
  }
  const currentCat = items.find((i) => `${base}/${i.slug}` === path)?.cat
  const [openCats, setOpenCats] = useState<Record<string, boolean>>(currentCat ? { [currentCat]: true } : {})
  useEffect(() => {
    if (currentCat) setOpenCats((o) => (o[currentCat] ? o : { ...o, [currentCat]: true }))
  }, [currentCat])

  useEffect(() => setOpen(false), [path])
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false)
        toggle.current?.focus()
      }
    }
    document.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = prev
      document.removeEventListener("keydown", onKey)
    }
  }, [open])

  return (
    <aside className="side" aria-label={title}>
      <button ref={toggle} type="button" className="side-toggle" aria-expanded={open} aria-controls="side-panel" onClick={() => setOpen(true)}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden><path d="M4 7h16M4 12h16M4 17h16" /></svg>
        <span>Explorar <b>{title}</b></span>
      </button>
      <button type="button" className={open ? "side-scrim open" : "side-scrim"} aria-label="Cerrar menú" tabIndex={-1} onClick={() => setOpen(false)} />
      <div id="side-panel" className={open ? "side-panel open" : "side-panel"}>
        <button type="button" className="side-close" aria-label="Cerrar menú" onClick={() => setOpen(false)}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden><path d="M6 6l12 12M18 6L6 18" /></svg>
        </button>
        <SearchTrigger variant="side" />
        <h2 className="doc-h2">{title}</h2>
        {groups.map((g, gi) => {
          const link = (i: NavItem) => {
            const href = `${base}/${i.slug}`
            return <li key={i.slug}><Link href={href} aria-current={path === href ? "page" : undefined}>{i.title}</Link></li>
          }
          if (!g.cat) return <ul key={gi}>{g.items.map(link)}</ul>
          const open = !!openCats[g.cat]
          const id = `side-cat-${gi}`
          return (
            <div key={g.cat} className="side-group">
              <button type="button" className="side-cat-btn" aria-expanded={open} aria-controls={id} onClick={() => setOpenCats({ ...openCats, [g.cat!]: !open })}>
                <span>{g.cat}</span>
                <svg className="side-chev" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M9 6l6 6-6 6" /></svg>
              </button>
              <ul id={id} hidden={!open}>{g.items.map(link)}</ul>
            </div>
          )
        })}
      </div>
    </aside>
  )
}
