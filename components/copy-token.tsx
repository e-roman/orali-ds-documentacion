"use client"
import { useState } from "react"
import { copyText } from "@/lib/copy"

/** Muestra el nombre del token como variable CSS. Al pasar el mouse dice «Copiar»; al hacer clic la copia y dice «Copiado». */
export default function CopyToken({ name }: { name: string }) {
  const [ok, setOk] = useState(false)
  return (
    <button
      type="button"
      className={ok ? "tk is-copied" : "tk"}
      data-tip={ok ? "Copiado" : "Copiar"}
      onClick={async () => {
        if (await copyText(`var(--${name})`)) {
          setOk(true)
          setTimeout(() => setOk(false), 1400)
        }
      }}
    >
      <code>--{name}</code>
      <span className="sr-only" aria-live="polite">{ok ? "Copiado" : ""}</span>
    </button>
  )
}
