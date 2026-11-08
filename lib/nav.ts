import type { NavItem, NavSection } from "ds-docs-theme/types"
import { piecesOf } from "@/lib/pieces"

export const topNav = [
  { href: "/get-started", label: "Empezar" },
  { href: "/foundations", label: "Foundations" },
  { href: "/components", label: "Componentes" },
  { href: "/patterns", label: "Patrones" },
]

export const foundations: NavItem[] = [
  { slug: "tokens", title: "Design tokens", description: "Las decisiones de diseño como variables, en tres capas.", image: "/illustrations/foundations/design-tokens.svg" },
  { slug: "color", title: "Color", description: "Paleta de marca y colores con intención: superficie, texto, acción y feedback." },
  { slug: "typography", title: "Tipografía", description: "Una familia, una escala de tamaños y estilos listos para usar.", image: "/illustrations/foundations/tipografia.svg" },
  { slug: "iconography", title: "Iconografía", description: "Íconos de línea de Lucide, en siete tamaños y con color por token.", image: "/illustrations/foundations/iconografia.svg" },
  { slug: "spacing", title: "Spacing", description: "Escala base 4 para espacios, tamaños de control y breakpoints." },
  { slug: "radius", title: "Radius", description: "Esquinas rectas, suaves o totalmente redondeadas." },
  { slug: "elevation", title: "Elevation", description: "Sombras para separar superficies del fondo." },
  { slug: "layer", title: "Layer", description: "El orden en que se apilan header, menús, drawers y modales." },
  { slug: "motion", title: "Motion", description: "Cuánto dura y cómo se mueve cada transición." },
  { slug: "border", title: "Border", description: "Grosores y colores de borde para separar, marcar y enfocar." },
]

export const patternCats = ["Inicio y contenido", "Header y navegación", "Producto", "Carrito", "Checkout", "Overlays"]

const toNav = (group: "components" | "patterns"): NavItem[] =>
  piecesOf(group).map((p) => ({ slug: p.slug, title: p.title, description: p.summary ?? p.description, cat: p.cat }))

export const components = toNav("components")
export const patterns = toNav("patterns").sort((a, b) => patternCats.indexOf(a.cat ?? "") - patternCats.indexOf(b.cat ?? "") || a.title.localeCompare(b.title))

export const sections: NavSection[] = [
  { key: "foundations", label: "Foundations", base: "/foundations", items: foundations },
  { key: "components", label: "Componentes", base: "/components", items: components },
  { key: "patterns", label: "Patrones", base: "/patterns", items: patterns },
]
