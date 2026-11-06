import { Section } from "@/components/component-page"
import { Table, WhenToUse } from "@/components/doc/blocks"
import Variants from "@/components/doc/variants"
import { sbPatterns, type SbPattern } from "@/lib/sb-patterns"
import { LIVE } from "@/lib/live-stories"
import { resolveShot } from "@/lib/shot-file"
import LiveStory from "./live"
import { SB, docsId } from "@/lib/storybook"

export { sbPatterns }

/** Patrones armados con datos o fotos de la tienda: se muestran con capturas de Storybook (cargan rápido). El link a Storybook va en el encabezado de la página. */
export function storybookPanel(p: SbPattern) {
  const items = p.shots.map((s, i) => {
    const { src, w, h } = resolveShot(p.slug, i, s.w)
    return {
      value: `${i}`,
      label: s.label,
      caption: <>{s.label}{LIVE[p.slug]?.[i] ? " (componente real)" : ""}.</>,
      node: LIVE[p.slug]?.[i]
        ? <LiveStory slug={p.slug} index={i} />
        : <img className="sb-shot" src={src} width={w} height={h} alt={`${p.title}: ${s.label}`} loading="lazy" decoding="async" />,
    }
  })
  return {
    design: (
      <>
        <Section title="Descripción">
          <p>{p.desc}</p>
          <p className="muted">
            {LIVE[p.slug]?.some(Boolean)
              ? <>Las vistas marcadas «componente real» se renderizan con el código de la tienda y se pueden inspeccionar con el botón «Inspeccionar»; las demás son capturas de <a href={`${SB}/?path=/docs/${docsId(p.sb)}`} target="_blank" rel="noopener noreferrer">Storybook</a>.</>
              : <>Capturas de <a href={`${SB}/?path=/docs/${docsId(p.sb)}`} target="_blank" rel="noopener noreferrer">Storybook</a>, con datos de ejemplo. Cada una enlaza a la story interactiva.</>}
          </p>
        </Section>
        <Section title="Vistas">
          <Variants title="Estados" ariaLabel={`Vistas de ${p.title}`} items={items} />
        </Section>
        {p.props.length > 0 && (
          <Section title="Props">
            <Table
              head={["Prop", "Tipo", "Descripción"]}
              rows={p.props.map(([n, t, d, r]) => [<code key="n">{n}{r ? "*" : ""}</code>, <code key="t">{t}</code>, d ?? ""])}
            />
            <p className="muted">* obligatoria.</p>
          </Section>
        )}
      </>
    ),
    usage: <WhenToUse use={p.use} avoid={p.avoid} />,
    accessibility: p.a11y ? <Section title="Rol y estructura"><ul className="bul">{p.a11y.map((x, i) => <li key={i}>{x}</li>)}</ul></Section> : undefined,
    updates: undefined,
  }
}
