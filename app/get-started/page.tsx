import Link from "next/link"
import { Section } from "@/components/component-page"
import { Callout } from "@/components/doc/blocks"
import { SB } from "@/lib/storybook"

export const metadata = { title: "Empezar · Orali Design System" }

const code = (s: string) => <pre className="codeblock"><code>{s}</code></pre>

export default function Page() {
  return (
    <main className="doc-page">
      <article>
        <h1 className="doc-h1">Empezar</h1>
        <p className="lead">
          Orali DS es el sistema de diseño de Tienda Orali, un e-commerce de compra por packs. Reúne tokens, componentes y patrones con una sola fuente de verdad, de Figma al código.
        </p>

        <Section title="Qué mirar primero">
          <div className="start-grid">
            <Link href="/components/button"><b>Button</b><span className="muted">Ocho jerarquías, estados y tokens leídos en vivo. La página más completa.</span></Link>
            <Link href="/foundations/tokens"><b>Design tokens</b><span className="muted">La arquitectura en tres capas que sostiene todo lo demás.</span></Link>
            <Link href="/patterns/product-card"><b>Product card</b><span className="muted">Un patrón real, compuesto con Button, Price y Stepper.</span></Link>
          </div>
        </Section>

        <Section title="Decisiones clave">
          <ul className="bul">
            <li><b>Tokens primero.</b> Primitive → semantic → component. Un componente nunca usa un valor suelto ni un primitivo de color.</li>
            <li><b>Accesibilidad como mínimo.</b> Texto 4.5:1 y elementos gráficos 3:1 (WCAG AA). El contraste de cada componente se calcula desde los tokens reales.</li>
            <li><b>Una sola fuente de verdad.</b> Tokens Studio (Figma) → GitHub → Style Dictionary → sitio. Los componentes se ven y se prueban también en Storybook.</li>
            <li><b>Documentación conectada al código.</b> Los componentes de estas páginas son los de la tienda, y sus tokens se leen del paquete real.</li>
          </ul>
        </Section>

        <Section title="Enlaces">
          <ul className="bul">
            <li><a href={SB} target="_blank" rel="noopener noreferrer">Storybook de Orali ↗</a>: componentes y patrones, interactivos.</li>
            <li><a href="https://github.com/e-roman/orali-design-tokens" target="_blank" rel="noopener noreferrer">orali-design-tokens ↗</a>: el repo de tokens, con su CHANGELOG.</li>
          </ul>
        </Section>

        <Section title="Para desarrolladores">
          <p>
            Tres repos: <code>orali-design-tokens</code> (tokens), <code>tienda-orali</code> (sitio en Next.js + Tailwind) y <code>sytem-docs-orali</code> (esta documentación).
          </p>
          <h3 className="doc-h3">1. Instalar los tokens</h3>
          <p>Desde GitHub, fijando un tag. La tienda usa la <b>v4.1.0</b>.</p>
          {code(`"dependencies": {
  "@orali/design-tokens": "github:e-roman/orali-design-tokens#v4.1.0"
}`)}
          <Callout>Fijá siempre un tag: si apuntás a una rama, un cambio de tokens puede llegar sin aviso.</Callout>
          <h3 className="doc-h3">2. Cargar estilos y Tailwind</h3>
          {code(`// app/layout.tsx
import "@orali/design-tokens/tokens.css"

// tailwind.config.ts
import oraliTokens from "@orali/design-tokens/tailwind"
export default { presets: [oraliTokens] }`)}
          <p>El preset trae colores, radios y tipografía con nombres semánticos. Si falta un valor, se crea el token; no se agrega en <code>tailwind.config.ts</code>.</p>
          <h3 className="doc-h3">3. Usar los componentes</h3>
          {code(`import { Button } from "@/components/ui/button"

<Button variant="add-to-cart">Agregar</Button>`)}
          <p>Cada página de <Link href="/components">Componentes</Link> documenta props, estados, tokens y reglas de uso.</p>
          <h3 className="doc-h3">Reglas</h3>
          <ul className="bul">
            <li>Nomenclatura en kebab-case: <code>{"{categoría}-{grupo}-{rol}-{estado}"}</code>, por ejemplo <code>color-action-primary-bg-hover</code>.</li>
            <li>Los cambios de tokens se hacen en Tokens Studio, en una rama, y el sitio sube de versión por tag.</li>
          </ul>
          <h3 className="doc-h3">Correr esta documentación</h3>
          {code(`npm install
npm run dev     # http://localhost:3200`)}
          <p className="muted">Necesita <code>tienda-orali</code> en la carpeta vecina: importa sus componentes y estilos en modo lectura.</p>
        </Section>
      </article>
    </main>
  )
}
