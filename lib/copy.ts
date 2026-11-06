/** Copia texto al portapapeles. Usa la API moderna y, si el navegador la bloquea (foco, contexto no seguro), un respaldo. Devuelve si pudo copiar. */
export async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    try {
      const ta = document.createElement("textarea")
      ta.value = text
      ta.className = "sr-only"
      ta.setAttribute("readonly", "")
      document.body.appendChild(ta)
      ta.select()
      const ok = document.execCommand("copy")
      ta.remove()
      return ok
    } catch {
      return false
    }
  }
}
