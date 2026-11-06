import { notFound } from "next/navigation"
import ComponentPage from "@/components/component-page"
import OwnHistory from "@/components/doc/own-history"
import SectionShell from "@/components/section-shell"
import { patternPanels } from "@/content/patterns"
import { history } from "@/content/history"
import { patterns } from "@/lib/nav"
import { sbPatterns } from "@/lib/sb-patterns"
import { SB, docsId, sourceUrl } from "@/lib/storybook"

export function generateStaticParams() {
  return patterns.map((p) => ({ slug: p.slug }))
}

const sbHref = (slug: string) => { const p = sbPatterns.find((x) => x.slug === slug); return p ? `${SB}/?path=/docs/${docsId(p.sb)}` : SB }

export default function Page({ params }: { params: { slug: string } }) {
  const item = patterns.find((p) => p.slug === params.slug)
  const build = patternPanels[params.slug]
  if (!item || !build) notFound()
  return (
    <SectionShell title="Patrones" base="/patterns" items={patterns}>
      <ComponentPage title={item.title} intro={item.description} storybookHref={sbHref(params.slug)} githubHref={sourceUrl("patterns", params.slug)} panels={{ ...build(), updates: history[params.slug]?.length ? <OwnHistory slug={params.slug} /> : undefined }} />
    </SectionShell>
  )
}
