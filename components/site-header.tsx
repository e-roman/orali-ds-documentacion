"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { topNav } from "@/lib/nav"
import { SearchTrigger } from "@/components/search-palette"

export default function SiteHeader() {
  const path = usePathname()
  const [open, setOpen] = useState(false)

  // Cierra el menú al navegar y con Escape; bloquea el scroll mientras está abierto.
  useEffect(() => setOpen(false), [path])
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false)
    document.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = prev
      document.removeEventListener("keydown", onKey)
    }
  }, [open])

  return (
    <>
      <header className="hdr">
        <Link href="/" className="hdr-brand">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="hdr-logo" src="/logo-orali.webp" alt="Orali" width={92} height={34} />
          <small>Design System</small>
        </Link>
        <nav aria-label="Principal" className="hdr-nav">
          {topNav.map((i) => (
            <Link key={i.href} href={i.href} aria-current={path.startsWith(i.href) ? "page" : undefined}>{i.label}</Link>
          ))}
        </nav>
        <SearchTrigger variant="header" />
        <button type="button" className="hdr-burger" aria-expanded={open} aria-controls="mobile-nav" aria-label={open ? "Cerrar menú" : "Abrir menú"} onClick={() => setOpen(!open)}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </header>
      <nav id="mobile-nav" aria-label="Principal (móvil)" className={open ? "mnav open" : "mnav"} aria-hidden={!open}>
        {topNav.map((i) => (
          <Link key={i.href} href={i.href} tabIndex={open ? 0 : -1} aria-current={path.startsWith(i.href) ? "page" : undefined}>{i.label}</Link>
        ))}
      </nav>
    </>
  )
}
