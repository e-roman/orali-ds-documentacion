import type { ReactNode } from "react"
import DocTabs from "./doc-tabs"
import { REPO, SB } from "@/lib/storybook"

export default function ComponentPage({ title, intro, panels, storybookHref = SB, githubHref = REPO }: { title: string; intro: string; panels: Parameters<typeof DocTabs>[0]["panels"]; storybookHref?: string; githubHref?: string }) {
  return (
    <article>
      <h1 className="doc-h1">{title}</h1>
      <p className="lead">{intro}</p>
      <ul className="doc-links" aria-label="Enlaces externos">
        <li><a href={githubHref} target="_blank" rel="noopener noreferrer"><img src="/github.svg" alt="" width={16} height={16} />GitHub</a></li>
        <li><a href={storybookHref} target="_blank" rel="noopener noreferrer"><img src="/storybook.svg" alt="" width={16} height={16} />Storybook</a></li>
      </ul>
      <DocTabs panels={panels} />
    </article>
  )
}

export function Section({ title, children }: { title: string; children: ReactNode }) {
  const id = title.toLowerCase().replace(/[^a-z0-9]+/g, "-")
  return (
    <section id={id}>
      <h2 className="doc-h2">{title}</h2>
      {children}
    </section>
  )
}
