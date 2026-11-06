/** Storybook publicado (Chromatic, rama main). Si cambia la URL, se cambia acá. */
export const SB = "https://main--6aebc4bc846f78549b6852b0.chromatic.com"

/** Repositorio de la tienda (código de los componentes y sus stories). */
export const REPO = "https://github.com/e-roman/tienda-orali"

const BLOB = `${REPO}/blob/main/components`

/** Componentes de components/ui cuyo archivo no es .tsx. */
const UI_EXT: Record<string, string> = { "icon-button": "ts", link: "ts" }
/** Patrones que viven fuera de components/patterns. */
const PATTERN_PATH: Record<string, string> = {
  nav: "nav.tsx", footer: "footer.tsx", hero: "hero.tsx", "newsletter-banner": "newsletter-banner.tsx", "cart-drawer": "cart-drawer.tsx",
  "product-detail": "patterns/product-info.tsx",
}

/** Link al código fuente en GitHub. Sin archivo propio (p. ej. Accordion) lleva a la carpeta. */
export function sourceUrl(kind: "components" | "patterns", slug: string) {
  if (kind === "patterns") return `${BLOB}/${PATTERN_PATH[slug] ?? `patterns/${slug}.tsx`}`
  if (slug === "accordion") return `${REPO}/tree/main/components/ui`
  return `${BLOB}/ui/${slug}.${UI_EXT[slug] ?? "tsx"}`
}

/** Archivo de Figma del sistema (Orali SIPA - Design System v1). Privado: abre solo a quien tenga acceso. */
export const FIGMA = "https://www.figma.com/design/7OfwzfLMT0TSHvzb6bFxpG/Orali-SIPA---Design-System-.-v1?node-id=1480-0"

/** Repositorio de los design tokens (fuente de las foundations). */
export const TOKENS_REPO = "https://github.com/e-roman/orali-design-tokens"

export const kebab = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")

/** id de story: "Patterns/Header/Mega menu" + "Open" → patterns-header-mega-menu--open */
export const storyId = (title: string, name: string) => `${kebab(title)}--${kebab(name)}`
export const docsId = (title: string) => `${kebab(title)}--docs`

export const storyUrl = (id: string) => `${SB}/iframe.html?id=${id}&viewMode=story`
export const docsUrl = (id: string) => `${SB}/?path=/docs/${id}`
