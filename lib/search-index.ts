import { components, foundations, patterns } from "@/lib/nav"
import { sbPatterns } from "@/lib/sb-patterns"
import type { SearchEntry } from "@/lib/search"
import { allTokens } from "@/lib/tokens"

/** Página donde se documenta un token, según su prefijo. */
function tokenPage(name: string): { path: string; crumb: string } {
  const f = (slug: string, label: string) => ({ path: `/foundations/${slug}`, crumb: `Foundations › ${label}` })
  if (name.startsWith("color-")) return f("color", "Color")
  if (/^(font-|typography-)/.test(name)) return f("typography", "Tipografía")
  if (/^(space-|size-|breakpoint-)/.test(name)) return f("spacing", "Spacing")
  if (name.startsWith("radius-")) return f("radius", "Radius")
  if (/^(shadow-|elevation-)/.test(name)) return f("elevation", "Elevation")
  if (/^(z-index-|layer-)/.test(name)) return f("layer", "Layer")
  if (/^(duration-|easing-|motion-)/.test(name)) return f("motion", "Motion")
  if (/^(border-width-|opacity-)/.test(name)) return f("border", "Border")
  const comp: Record<string, string> = { button: "button", badge: "badge", input: "input", select: "input", stepper: "stepper", chip: "chip", card: "card" }
  const first = name.split("-")[0]
  if (comp[first]) return { path: `/components/${comp[first]}`, crumb: `Componentes › ${comp[first][0].toUpperCase() + comp[first].slice(1)}` }
  return f("tokens", "Design tokens")
}

let cache: SearchEntry[] | null = null

/** Todas las páginas y tokens del sitio, para el buscador. Se genera al construir. */
export function searchIndex(): SearchEntry[] {
  if (cache) return cache
  const out: SearchEntry[] = [
    { id: "p:get-started", type: "page", group: "Empezar", title: "Empezar", path: "/get-started", crumb: "Empezar", desc: "Qué es Orali DS, decisiones clave, enlaces y cómo usarlo en un proyecto.", keywords: "instalar install setup tailwind inicio primeros pasos" },
  ]
  const fKeys: Record<string, string> = {
    color: "paleta escala tomato sage neutral green yellow red blue hex rgb semantico primitivo",
    typography: "tipografia fuente montserrat peso tamaño interlineado heading body",
    spacing: "espaciado espacio base 4 grilla padding gap margen control breakpoint",
    radius: "radio esquinas redondeo",
    elevation: "sombras shadow elevacion",
    layer: "capas z-index orden",
    motion: "animacion duracion easing transicion",
    border: "bordes ancho border-width",
    iconography: "iconos íconos lucide icon icon-sm tamaños currentColor aria-hidden",
    tokens: "arquitectura primitive semantic component nomenclatura css variables",
  }
  for (const f of foundations) out.push({ id: `f:${f.slug}`, type: "page", group: "Foundations", title: f.title, path: `/foundations/${f.slug}`, crumb: `Foundations › ${f.title}`, desc: f.description, keywords: fKeys[f.slug] })
  const sb = new Map(sbPatterns.map((p) => [p.slug, p]))
  for (const c of components) {
    const s = sb.get(c.slug)
    out.push({ id: `c:${c.slug}`, type: "page", group: "Componentes", title: c.title, path: `/components/${c.slug}`, crumb: `Componentes › ${c.title}`, desc: c.description, keywords: s ? `${s.shots.map((x) => x.label).join(" ")} ${s.sb}` : undefined })
  }
  for (const p of patterns) {
    const s = sb.get(p.slug)
    out.push({ id: `pt:${p.slug}`, type: "page", group: "Patrones", title: p.title, path: `/patterns/${p.slug}`, crumb: `Patrones › ${p.title}`, desc: p.description, keywords: s ? `${s.shots.map((x) => x.label).join(" ")} ${s.sb}` : undefined })
  }
  for (const t of allTokens()) {
    const { path, crumb } = tokenPage(t.name)
    out.push({ id: `t:${t.name}`, type: "token", group: "Tokens", title: `--${t.name}`, path, crumb, desc: t.desc, value: t.resolved })
  }
  cache = out
  return out
}
