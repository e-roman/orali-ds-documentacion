import { allTokens } from "@/lib/tokens"

export const dynamic = "force-static"

const isColor = (v: string) => /^(#|rgb|transparent)/.test(v)

/**
 * Clases utilitarias generadas desde los tokens y los tamaños de los demos, para no usar estilos inline.
 * tk-bg-{token}: fondo · tk-bc-: color de borde · tk-w-/tk-h-: ancho/alto · tk-r-: radio · tk-sh-: sombra
 * tk-font-/tk-fs-/tk-fw-: tipografía · tk-dur-: transición · tk-bw-: ancho de borde · demo-w-N · mk-x-N / mk-y-N.
 */
export function GET() {
  const css: string[] = []
  for (const t of allTokens()) {
    const n = t.name
    const v = `var(--${n})`
    if (isColor(t.resolved)) css.push(`.tk-bg-${n}{background:${v}}`)
    if (n.startsWith("color-border-")) css.push(`.tk-bc-${n}{border-color:${v}}`)
    if (n.startsWith("space-")) css.push(`.tk-w-${n}{width:${v}}`)
    if (n.startsWith("size-control-")) css.push(`.tk-h-${n}{height:${v}}`)
    if (n.startsWith("radius-")) css.push(`.tk-r-${n}{border-radius:${v}}`)
    if (/^(shadow|elevation)-/.test(n)) css.push(`.tk-sh-${n}{box-shadow:${v}}`)
    if (n.startsWith("typography-")) css.push(`.tk-font-${n}{font:${v}}`)
    if (n.startsWith("font-size-")) css.push(`.tk-fs-${n}{font-size:${v};line-height:1.2}`)
    if (n.startsWith("font-weight-")) css.push(`.tk-fw-${n}{font-weight:${v}}`)
    if (n.startsWith("duration-")) css.push(`.tk-dur-${n}{transition-duration:${v};transition-timing-function:var(--easing-standard)}`)
    if (n.startsWith("border-width-")) css.push(`.tk-bw-${n}{border:${v} solid var(--color-border-default)}`)
  }
  for (let w = 80; w <= 900; w += 4) css.push(`.demo-w-${w}{width:${w}px;max-width:100%}`)
  css.push(".demo-w-full{width:100%}")
  for (let p = 0; p <= 100; p++) css.push(`.mk-x-${p}{left:${p}%}`, `.mk-y-${p}{top:${p}%}`)
  return new Response(css.join("\n"), { headers: { "Content-Type": "text/css; charset=utf-8", "Cache-Control": "public, max-age=3600" } })
}
