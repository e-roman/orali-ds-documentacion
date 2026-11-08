import Link from "next/link"
import { PageContainer, PageHeader, Section } from "ds-docs-theme/docs/blocks"
import { FIGMA, SB, TOKENS_REPO } from "@/lib/storybook"

export const metadata = { title: "Empezar · Orali Design System" }

const code = "overflow-x-auto rounded-lg border bg-muted p-4 font-mono text-xs"
const link = "underline underline-offset-4"
const h3 = "mt-8 text-base font-semibold"

export default function Page() {
  return (
    <PageContainer>
      <PageHeader
        title="Empezar"
        description="Orali DS es el sistema de diseño de Tienda Orali, un e-commerce de compra por packs. Reúne tokens, componentes y patrones con una sola fuente de verdad, de Figma al código."
        links={{ github: TOKENS_REPO, storybook: SB, figma: FIGMA }}
      />

      <Section title="Qué mirar primero">
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { href: "/components/button", title: "Button", text: "Ocho jerarquías, estados y tokens leídos en vivo. La página más completa." },
            { href: "/foundations/tokens", title: "Design tokens", text: "La arquitectura en tres capas que sostiene todo lo demás." },
            { href: "/patterns/product-card", title: "Product card", text: "Un patrón real, compuesto con Button, Price y Stepper." },
          ].map((c) => (
            <Link key={c.href} href={c.href} className="rounded-2xl bg-muted p-6 transition-colors hover:bg-muted/60">
              <b className="block">{c.title}</b>
              <span className="mt-1 block text-sm text-muted-foreground">{c.text}</span>
            </Link>
          ))}
        </div>
      </Section>

      <Section title="Decisiones clave">
        <ul className="list-disc space-y-2 pl-5 text-sm">
          <li><b>Tokens primero.</b> Primitive → semantic → component. Un componente nunca usa un valor suelto ni un primitivo de color.</li>
          <li><b>Accesibilidad como mínimo.</b> Texto 4.5:1 y elementos gráficos 3:1 (WCAG AA). El contraste de cada componente se calcula desde los tokens reales.</li>
          <li><b>Una sola fuente de verdad.</b> Tokens Studio (Figma) → GitHub → Style Dictionary → sitio. Los componentes se ven y se prueban también en Storybook.</li>
          <li><b>Documentación conectada al código.</b> Los componentes de estas páginas son los de la tienda, y sus tokens se leen del paquete real.</li>
        </ul>
      </Section>

      <Section title="Enlaces">
        <ul className="list-disc space-y-2 pl-5 text-sm">
          <li><a className={link} href={SB} target="_blank" rel="noopener noreferrer">Storybook de Orali ↗</a>: componentes y patrones, interactivos.</li>
          <li><a className={link} href={TOKENS_REPO} target="_blank" rel="noopener noreferrer">orali-design-tokens ↗</a>: el repo de tokens, con su CHANGELOG.</li>
        </ul>
      </Section>

      <Section title="Para desarrolladores">
        <p className="text-sm">Cuatro repos: <code>orali-design-tokens</code> (tokens), <code>tienda-orali</code> (sitio en Next.js + Tailwind), <code>ds-docs-theme</code> (el theme de esta documentación) y <code>sytem-docs-orali</code> (los datos de Orali).</p>

        <h3 className={h3}>1. Instalar los tokens</h3>
        <p className="text-sm">Desde GitHub, fijando un tag. La tienda usa la <b>v4.1.0</b>.</p>
        <pre className={code}><code>{`"dependencies": {
  "@orali/design-tokens": "github:e-roman/orali-design-tokens#v4.1.0"
}`}</code></pre>
        <p className="rounded-lg border-l-4 border-brand bg-muted p-3 text-sm">Fijá siempre un tag: si apuntás a una rama, un cambio de tokens puede llegar sin aviso.</p>

        <h3 className={h3}>2. Cargar estilos y Tailwind</h3>
        <pre className={code}><code>{`// app/layout.tsx
import "@orali/design-tokens/tokens.css"

// tailwind.config.ts
import oraliTokens from "@orali/design-tokens/tailwind"
export default { presets: [oraliTokens] }`}</code></pre>
        <p className="text-sm">El preset trae colores, radios y tipografía con nombres semánticos. Si falta un valor, se crea el token; no se agrega en <code>tailwind.config.ts</code>.</p>

        <h3 className={h3}>3. Usar los componentes</h3>
        <pre className={code}><code>{`import { Button } from "@/components/ui/button"

<Button variant="add-to-cart">Agregar</Button>`}</code></pre>
        <p className="text-sm">Cada página de <Link className={link} href="/components">Componentes</Link> documenta props, estados, tokens y reglas de uso.</p>

        <h3 className={h3}>Reglas</h3>
        <ul className="list-disc space-y-2 pl-5 text-sm">
          <li>Nomenclatura en kebab-case: <code>{"{categoría}-{grupo}-{rol}-{estado}"}</code>, por ejemplo <code>color-action-primary-bg-hover</code>.</li>
          <li>Los cambios de tokens se hacen en Tokens Studio, en una rama, y el sitio sube de versión por tag.</li>
        </ul>

        <h3 className={h3}>Correr esta documentación</h3>
        <pre className={code}><code>{`npm install
npm run dev     # http://localhost:3200`}</code></pre>
        <p className="text-sm text-muted-foreground">Necesita <code>tienda-orali</code> y <code>ds-docs-theme</code> en la carpeta vecina: copia sus componentes y estilos a una carpeta local (<code>shop/</code>) antes de arrancar.</p>
      </Section>
    </PageContainer>
  )
}
