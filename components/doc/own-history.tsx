import { Section } from "@/components/component-page"
import { Table } from "@/components/doc/blocks"
import { history } from "@/content/history"

const fmt = (s: string) => s.split("`").map((p, i) => (i % 2 ? <code key={i}>{p}</code> : p))

/** Cambios propios del componente (content/history.ts). No muestra nada si no hay entradas. */
export default function OwnHistory({ slug }: { slug: string }) {
  const entries = history[slug]
  if (!entries?.length) return null
  return (
    <Section title="Cambios del componente">
      <Table head={["Fecha", "Cambio"]} rows={[...entries].sort((a, b) => b.date.localeCompare(a.date)).map((e) => [e.date, fmt(e.text)])} />
    </Section>
  )
}
