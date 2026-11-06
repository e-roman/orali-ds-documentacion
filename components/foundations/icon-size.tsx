"use client"
import { useEffect, useRef, useState } from "react"

/** Muestra el tamaño real (en px) que da una clase icon-*, medido en el navegador a partir del CSS de la tienda. */
export default function IconSize({ cls }: { cls: string }) {
  const probe = useRef<HTMLSpanElement>(null)
  const [px, setPx] = useState<string>("")
  useEffect(() => {
    if (probe.current) setPx(`${Math.round(probe.current.getBoundingClientRect().width)} px`)
  }, [])
  return (
    <>
      <span ref={probe} className={`${cls} icon-probe`} aria-hidden />
      <code>{px || "…"}</code>
    </>
  )
}
