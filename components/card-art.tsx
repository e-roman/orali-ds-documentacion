/** Ilustraciones de las cards de los índices: trazo negro con un acento rojo (public/illustrations). */
const GROUP: Record<string, string> = { "/foundations": "foundations", "/components": "componentes", "/patterns": "patrones" }

/** El slug de la página no siempre coincide con el nombre del archivo. */
const FILE: Record<string, string> = { tokens: "design-tokens", typography: "tipografia", iconography: "iconografia" }

export default function CardArt({ slug, base }: { slug: string; base: string }) {
  const group = GROUP[base] ?? "componentes"
  // eslint-disable-next-line @next/next/no-img-element
  return <img className="card-svg" src={`/illustrations/${group}/${FILE[slug] ?? slug}.svg`} alt="" width={120} height={120} loading="lazy" decoding="async" />
}
