import type { ReactElement } from "react"
import { notFound } from "next/navigation"
import Sidebar from "@/components/sidebar"
import { foundations } from "@/lib/nav"
import {
  BorderView, ColorView, ElevationView, IconographyView, LayerView, MotionView, RadiusView, SpacingView, TokensView, TypographyView,
} from "@/components/foundations/views"

const views: Record<string, () => ReactElement> = {
  tokens: TokensView,
  color: ColorView,
  typography: TypographyView,
  spacing: SpacingView,
  radius: RadiusView,
  elevation: ElevationView,
  layer: LayerView,
  motion: MotionView,
  border: BorderView,
  iconography: IconographyView,
}

export function generateStaticParams() {
  return foundations.map((f) => ({ slug: f.slug }))
}

export default function Page({ params }: { params: { slug: string } }) {
  const item = foundations.find((f) => f.slug === params.slug)
  const View = views[params.slug]
  if (!item || !View) notFound()
  return (
    <div className="shell">
      <Sidebar title="Foundations" base="/foundations" items={foundations} />
      <main className="doc-page">
        <article>
          <h1 className="doc-h1">{item.title}</h1>
          <p className="lead">{item.description}</p>
          <View />
        </article>
      </main>
    </div>
  )
}
