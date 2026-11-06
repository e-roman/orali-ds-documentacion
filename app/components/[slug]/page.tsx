import { notFound } from "next/navigation"
import OwnHistory from "@/components/doc/own-history"
import SectionShell from "@/components/section-shell"
import ComponentPage, { Section } from "@/components/component-page"
import { accordionPanels, breadcrumbPanels, cardPanels, chipPanels, formPartsPanels, iconBadgePanels, iconButtonPanels, linkPanels, pricePanels, progressPanels, ratingScalePanels, skeletonPanels, tabsPanels } from "@/content/components/more"
import { badgePanels } from "@/content/components/badge"
import { buttonPanels } from "@/content/components/button"
import { inputPanels } from "@/content/components/input"
import { stepperPanels } from "@/content/components/stepper"
import { storybookPanel } from "@/content/patterns/storybook"
import { sbPatterns } from "@/lib/sb-patterns"
import { history } from "@/content/history"
import { components } from "@/lib/nav"
import { SB, docsId, sourceUrl } from "@/lib/storybook"

/** Páginas ya escritas. El resto muestra la plantilla vacía hasta migrarlas. */
const content: Record<string, () => Parameters<typeof ComponentPage>[0]["panels"]> = {
  button: buttonPanels,
  accordion: accordionPanels,
  breadcrumb: breadcrumbPanels,
  card: cardPanels,
  chip: chipPanels,
  "form-parts": formPartsPanels,
  "icon-badge": iconBadgePanels,
  "icon-button": iconButtonPanels,
  link: linkPanels,
  price: pricePanels,
  progress: progressPanels,
  "rating-scale": ratingScalePanels,
  skeleton: skeletonPanels,
  tabs: tabsPanels,
  badge: badgePanels,
  stepper: stepperPanels,
  input: inputPanels,
}

export function generateStaticParams() {
  return components.map((c) => ({ slug: c.slug }))
}

export default function Page({ params }: { params: { slug: string } }) {
  const item = components.find((c) => c.slug === params.slug)
  if (!item) notFound()
  const todo = <p className="empty">En redacción.</p>
  const sb = sbPatterns.find((p) => p.slug === params.slug && p.group === "components")
  const panels = content[params.slug]?.() ?? (sb ? (storybookPanel(sb) as ReturnType<(typeof content)[string]>) : null) ?? {
    design: (<><Section title="Propósito">{todo}</Section><Section title="Anatomía">{todo}</Section><Section title="Configuración">{todo}</Section></>),
    usage: <Section title="Uso">{todo}</Section>,
    accessibility: <Section title="Accesibilidad">{todo}</Section>,
    updates: <Section title="Novedades">{todo}</Section>,
  }
  return (
    <SectionShell title="Componentes" base="/components" items={components}>
      <ComponentPage title={item.title} intro={item.description} githubHref={sourceUrl("components", params.slug)} storybookHref={sb ? `${SB}/?path=/docs/${docsId(sb.sb)}` : SB} panels={{ ...panels, updates: history[params.slug]?.length || panels.updates ? <><OwnHistory slug={params.slug} />{panels.updates}</> : undefined }} />
    </SectionShell>
  )
}
