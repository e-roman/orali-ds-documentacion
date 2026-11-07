import { ArrowRight, ShoppingCart } from "lucide-react"
import { Section } from "@/components/component-page"
import CopyToken from "@/components/copy-token"
import { Anatomy, Callout, DoDont, Panel, Purpose, Table, WhenToUse } from "@/components/doc/blocks"
import Variants, { type VariantItem } from "@/components/doc/variants"
import { contrast } from "@/lib/contrast"
import { token } from "@/lib/tokens"
import { Button, type ButtonVariant } from "@shop/components/ui/button"

const VARIANTS: { v: ButtonVariant; label: string; caption: string; text: string; dark?: boolean }[] = [
  { v: "primary", label: "Primary", text: "Button CTA", caption: "Acción principal de una sección. Una por bloque. Tamaño habitual: lg." },
  { v: "add-to-cart", label: "Add to cart", text: "Button CTA", caption: "Agregar desde una card o la ficha de producto. Al agregar, lo reemplaza el Stepper. Ocupa todo el ancho." },
  { v: "secondary", label: "Secondary", text: "Button CTA", caption: "Acción secundaria oscura: aplicar cupón, continuar en checkout." },
  { v: "outline", label: "Outline", text: "Button CTA", caption: "Acción de cuenta o alternativa." },
  { v: "neutral", label: "Neutral", text: "Button CTA", caption: "Acción terciaria sobre superficie clara: cancelar, ver más." },
  { v: "inverse", label: "Inverse", text: "Button CTA", dark: true, caption: "Botón blanco sobre foto o superficie oscura (banners). Siempre pill." },
  { v: "outline-inverse", label: "Outline inverse", text: "Button CTA", dark: true, caption: "Botón con borde sobre foto. Alternativa secundaria a Inverse." },
  { v: "link", label: "Link", text: "Button CTA", caption: "Acción con peso de texto, sin fondo: ver detalle, editar dirección." },
]

const CTA = "Button CTA"
const SIZE_LABEL = { sm: "Small", md: "Medium", lg: "Large", xl: "Extra large" } as const
const STATES = ["default", "hover", "active", "focus", "disabled"] as const
const SIZES = ["sm", "md", "lg", "xl"] as const

const val = (name: string) => token(name)?.resolved
const ratio = (a?: string, b?: string) => (a && b ? contrast(a, b) : null)
const Ratio = ({ r }: { r: number | null }) => (r === null ? <span className="muted">—</span> : <span className={r >= 4.5 ? "pass" : "fail"}>{r.toFixed(2)}:1 {r >= 4.5 ? "AA" : "No AA"}</span>)

function Swatch({ name }: { name: string }) {
  const t = token(name)
  if (!t) return <span className="muted">—</span>
  return (
    <span className="sw-cell" title={`--${name}`}>
      <span className={`sw tk-bg-${name}`} />
      <code>{t.resolved}</code>
    </span>
  )
}

export function buttonPanels() {
  const configItems = (fn: (v: (typeof VARIANTS)[number]) => VariantItem): VariantItem[] => VARIANTS.map(fn)

  /* ───── Diseño ───── */
  const design = (
    <>
      <Purpose
        items={[
          { title: "Iniciar una acción", text: "Los botones disparan acciones: agregar al carrito, aplicar un cupón, confirmar una compra." },
          { title: "Mostrar jerarquía", text: "Ocho jerarquías ayudan a identificar la acción principal y las secundarias en cada pantalla." },
          { title: "Cubrir los estados", text: "Hover, active, foco, disabled y loading mantienen el comportamiento predecible." },
        ]}
      />
      <Anatomy
        parts={[
          { n: 1, selector: ".btn" },
          { n: 2, selector: ".btn", only: ["texto", "tipografia"] },
          { n: 3, selector: ".btn > svg:first-child", only: ["texto", "ancho", "alto"] },
          { n: 4, selector: ".btn > svg:last-child", only: ["texto", "ancho", "alto"] },
        ]}
        markers={[{ n: 1, side: "left" }, { n: 2, side: "bottom" }, { n: 3, side: "top", pct: 22 }, { n: 4, side: "top", pct: 86 }]}
        legend={[
          { n: 1, label: "Contenedor" },
          { n: 2, label: "Label" },
          { n: 3, label: "Ícono izquierdo", note: "opcional" },
          { n: 4, label: "Ícono derecho", note: "opcional" },
        ]}
      >
        <Button variant="primary" size="xl"><ShoppingCart className="icon-md" aria-hidden />Button CTA<ArrowRight className="icon-md" aria-hidden /></Button>
      </Anatomy>

      <Section title="Configuración">
        <Variants
          title="Variante"
          ariaLabel="Variante del botón"
          description={<>La prop <code>variant</code> define colores, radio y peso de fuente, y comunica la jerarquía de la acción en la pantalla.</>}
          items={VARIANTS.filter((x) => x.v !== "add-to-cart").map((x) => ({
            value: x.v, label: x.label, caption: x.caption, dark: x.dark,
            node: <Button variant={x.v}>{CTA}</Button>,
          }))}
        />
        <Variants
          title="Tamaño"
          ariaLabel="Tamaño del botón"
          description={<>La prop <code>size</code> define alto, padding, gap, tipografía e ícono. Permite ajustar el peso visual de la acción a la densidad del layout.</>}
          items={SIZES.map((s) => ({
            value: s, label: SIZE_LABEL[s], caption: `${SIZE_LABEL[s]}: ${val(`button-size-${s}-height`)} de alto, tipografía ${val(`button-size-${s}-font-size`)}/${val(`button-size-${s}-line-height`)}.`,
            node: <Button variant="primary" size={s}>{CTA}</Button>,
          }))}
        />
        <Variants
          title="Forma"
          ariaLabel="Forma del botón"
          description={<>La prop <code>shape</code> es <code>default</code> (8 px) para acciones de compra y formularios, y <code>pill</code> solo en marketing.</>}
          items={[
            { value: "default", label: "Default", caption: "Compra, formularios y Stepper.", node: <Button size="lg">{CTA}</Button> },
            { value: "pill", label: "Pill", caption: "Hero, banners, newsletter y filtros.", node: <Button size="lg" shape="pill">{CTA}</Button> },
          ]}
        />
        <Variants
          title="Ícono inicial"
          ariaLabel="Ícono inicial del botón"
          description="Un ícono a la izquierda del texto refuerza el significado de la acción. Los íconos (lucide) heredan el color del texto."
          items={[
            { value: "leading", label: "Con ícono inicial", caption: "Usalo cuando el ícono aporta claridad, por ejemplo un carrito antes de «Agregar».", node: <Button><ShoppingCart className="icon-sm" aria-hidden />{CTA}</Button> },
            { value: "none", label: "Sin ícono inicial", caption: "Opción por defecto.", node: <Button>{CTA}</Button> },
          ]}
        />
        <Variants
          title="Ícono final"
          ariaLabel="Ícono final del botón"
          description="Un ícono a la derecha del texto suele indicar dirección o avance."
          items={[
            { value: "trailing", label: "Con ícono final", caption: "Indica navegación, avance o que se abrirá un menú o panel.", node: <Button>{CTA}<ArrowRight className="icon-sm" aria-hidden /></Button> },
            { value: "none", label: "Sin ícono final", caption: "Opción por defecto.", node: <Button>{CTA}</Button> },
          ]}
        />
        <Variants
          title="Estado"
          ariaLabel="Estado del botón"
          description={<>Hover y foco los resuelve CSS. <code>disabled</code> y <code>loading</code> son props; active se muestra forzado.</>}
          items={[
            { value: "default", label: "Default", caption: "Para acciones disponibles de inmediato. Probá hover, foco con Tab y click.", node: <Button size="lg">{CTA}</Button> },
            { value: "disabled", label: "Disabled", caption: "Usa el set compartido button.disabled.*, sin opacidad. Se muestra con borde.", node: <Button variant="outline" size="lg" disabled>{CTA}</Button> },
            { value: "loading", label: "Loading", caption: "El spinner reemplaza al ícono, mantiene el ancho y bloquea el click (aria-busy).", node: <Button variant="outline" size="lg" loading>{CTA}</Button> },
            { value: "active", label: "Active", caption: "Estado presionado, forzado con una clase solo para mostrarlo.", node: <Button size="lg" className="is-active">{CTA}</Button> },
          ]}
        />
        <Variants
          title="Ancho completo"
          ariaLabel="Ancho del botón"
          description={<>La prop <code>fullWidth</code> estira el botón al ancho de su contenedor, para layouts apilados o angostos.</>}
          items={[
            { value: "auto", label: "Default", caption: "Para acciones en línea: se ajusta al contenido.", node: <Button variant="secondary">{CTA}</Button> },
            { value: "full", label: "Full width", caption: "Mobile y acciones de drawer.", node: <div className="demo-w-280"><Button variant="secondary" fullWidth>{CTA}</Button></div> },
          ]}
        />
      </Section>

      <Section title="Tokens por variante">
        <p className="muted">Se leen en vivo de <code>@orali/design-tokens</code>. Pasá el mouse por un color para ver el token.</p>
        <Table
          head={["Variante", "Fondo", "Hover", "Active", "Texto", "Borde"]}
          rows={VARIANTS.map((x) => [
            <b key="n">{x.label}</b>,
            <Swatch key="a" name={`button-${x.v}-bg`} />,
            <Swatch key="b" name={`button-${x.v}-bg-hover`} />,
            <Swatch key="c" name={`button-${x.v}-bg-active`} />,
            <Swatch key="d" name={`button-${x.v}-fg`} />,
            <Swatch key="e" name={`button-${x.v}-border`} />,
          ])}
        />
        <h3 className="doc-h3">Tokens por tamaño</h3>
        <Table
          head={["Tamaño", "Alto", "Padding (y / x)", "Gap", "Tipografía", "Ícono"]}
          rows={SIZES.map((s) => [
            <b key="s">{SIZE_LABEL[s]}</b>,
            val(`button-size-${s}-height`),
            `${val(`button-size-${s}-padding-y`)} / ${val(`button-size-${s}-padding-x`)}`,
            val(`button-size-${s}-gap`),
            `${val(`button-size-${s}-font-size`)} / ${val(`button-size-${s}-line-height`)}`,
            val(`button-size-${s}-icon-size`),
          ])}
        />
        <p className="muted">Consumo: <CopyToken name="button-primary-bg" /> · <CopyToken name="button-size-md-height" /></p>
      </Section>
      <Section title="Estados">
        <p className="muted">Estados forzados con clases solo para mostrarlos fijos. Los botones reales responden a hover, foco con Tab y click.</p>
        <div className="tablewrap">
          <table className="matrix">
            <thead><tr><th>Variante</th>{STATES.map((s) => <th key={s}>{s}</th>)}</tr></thead>
            <tbody>
              {VARIANTS.map((x) => (
                <tr key={x.v}>
                  <th scope="row">{x.label}</th>
                  {STATES.map((s) => (
                    <td key={s} className={x.dark ? "cell-dark" : undefined}>
                      <Button variant={x.v} size="md" className={s === "default" || s === "disabled" ? undefined : `is-${s}`} disabled={s === "disabled"} tabIndex={-1}>Button CTA</Button>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
      <Section title="Props">
        <Table
          head={["Prop", "Tipo", "Default"]}
          rows={[
            [<code key="1">variant</code>, <code key="1b">&apos;primary&apos; | &apos;add-to-cart&apos; | &apos;secondary&apos; | &apos;outline&apos; | &apos;neutral&apos; | &apos;inverse&apos; | &apos;outline-inverse&apos; | &apos;link&apos;</code>, <code key="1c">&apos;primary&apos;</code>],
            [<code key="2">size</code>, <code key="2b">&apos;sm&apos; | &apos;md&apos; | &apos;lg&apos; | &apos;xl&apos;</code>, "según la variante (primary: lg, add-to-cart: md…)"],
            [<code key="3">shape</code>, <code key="3b">&apos;default&apos; | &apos;pill&apos;</code>, <code key="3c">&apos;default&apos;</code>],
            [<code key="4">fullWidth</code>, <code key="4b">boolean</code>, <code key="4c">false</code>],
            [<code key="5">loading</code>, <code key="5b">boolean</code>, <code key="5c">false</code>],
            [<code key="6">loadingText</code>, <code key="6b">string</code>, "children"],
            [<code key="7">…props</code>, "Atributos nativos de <button>", "type=\"button\""],
          ]}
        />
      </Section>
      <Section title="Uso">
        <pre className="codeblock"><code>{`import { Button, buttonClasses } from "@/components/ui/button"

<Button variant="add-to-cart">Button CTA</Button>
<Button size="lg" shape="pill">Button CTA</Button>
<Button loading loadingText="Procesando…">Button CTA</Button>

// Link con estilo de botón
<Link href="/productos" className={buttonClasses({ variant: "primary", shape: "pill" })}>Ver productos</Link>`}</code></pre>
      </Section>
    </>
  )

  /* ───── Uso ───── */
  const usage = (
    <>
      <WhenToUse
        use={["Para acciones del flujo de compra: agregar, continuar, finalizar.", "Para acciones de formulario y de cuenta.", "Un solo Primary por sección visible."]}
        avoid={[<>Para navegar: usá un link (<code>&lt;a href&gt;</code>), aunque tenga estilo de botón.</>, <>Para mostrar un estado o una etiqueta: eso es un Badge.</>]}
      />
      <Section title="Botón o link">
        <Table
          head={["Elemento", "Cuándo", "Ejemplo"]}
          rows={[
            [<code key="b">&lt;button&gt;</code>, "Ejecuta una acción en la misma pantalla", "Agregar, Aplicar cupón, abrir el carrito"],
            [<code key="a">&lt;a href&gt;</code>, "Lleva a otra URL, aunque se vea como botón", "«Ver productos» en un hero, «Ver todos»"],
          ]}
        />
        <Callout>La jerarquía <b>Link</b> es solo visual: el elemento depende de lo que hace. Para un <code>&lt;a&gt;</code> con estilo de botón usá <code>buttonClasses()</code>.</Callout>
      </Section>
      <Section title="Jerarquías">
        <div className="tablewrap">
          <table>
            <thead><tr><th>Jerarquía</th><th>Cuándo</th></tr></thead>
            <tbody>
              {VARIANTS.map((x) => (
                <tr key={x.v}>
                  <td className={x.dark ? "cell-dark" : undefined}><Button variant={x.v}>{x.text}</Button></td>
                  <td><b>{x.label}.</b> {x.caption}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
      <DoDont
        items={[
          { ok: true, title: "Un solo Primary por sección", text: "Deja clara la acción principal.", preview: <div className="demo-row"><Button variant="neutral" size="lg">Button CTA</Button><Button size="lg">Button CTA</Button></div> },
          { ok: false, title: "No pongas dos Primary juntos", text: "Compiten en peso y confunden el paso siguiente.", preview: <div className="demo-row"><Button size="lg">Button CTA</Button><Button size="lg">Button CTA</Button></div> },
          { ok: true, title: "Pill solo en marketing", text: "Hero, banners y newsletter.", preview: <Button size="lg" shape="pill">Button CTA</Button> },
          { ok: false, title: "No uses pill en la compra", text: "Las acciones de compra y de formulario van con radio por defecto.", preview: <Button size="lg" shape="pill">Button CTA</Button> },
        ]}
      />
    </>
  )

  /* ───── Accesibilidad ───── */
  const rows = VARIANTS.filter((x) => x.v !== "link" && x.v !== "outline-inverse")
  const accessibility = (
    <>
      <Section title="Rol y estructura">
        <ul className="bul">
          <li>Si ejecuta una acción es <code>&lt;button&gt;</code>. Si navega es <code>&lt;a&gt;</code>, también con estilo Link.</li>
          <li>Los botones solo con ícono requieren <code>aria-label</code>.</li>
          <li>Loading: <code>aria-busy=&quot;true&quot;</code>. El label sigue en el DOM y el botón no admite doble click.</li>
          <li>Si abre un menú o popover: <code>aria-expanded</code> + <code>aria-controls</code>.</li>
        </ul>
      </Section>
      <Section title="Teclado">
        <Table
          head={["Tecla", "Acción"]}
          rows={[
            [<><kbd>Tab</kbd> / <kbd>Shift+Tab</kbd></>, <>Mueve el foco. Orden natural, sin <code>tabindex</code> positivo.</>],
            [<><kbd>Enter</kbd> / <kbd>Espacio</kbd></>, <>Activa un <code>&lt;button&gt;</code>. Un <code>&lt;a&gt;</code> solo responde a Enter.</>],
          ]}
        />
      </Section>
      <Section title="Contraste">
        <p className="muted">Calculado desde los tokens reales (texto: mínimo 4.5:1, WCAG 1.4.3). Los botones deshabilitados están exentos.</p>
        <Table
          head={["Variante", "Default", "Hover", "Active"]}
          rows={rows.map((x) => [
            <b key="n">{x.label}</b>,
            <Ratio key="a" r={ratio(val(`button-${x.v}-fg`), val(`button-${x.v}-bg`))} />,
            <Ratio key="b" r={ratio(val(`button-${x.v === "outline" ? "outline-fg-hover" : `${x.v}-fg`}`), val(`button-${x.v}-bg-hover`))} />,
            <Ratio key="c" r={ratio(val(`button-${x.v === "outline" ? "outline-fg-active" : `${x.v}-fg`}`), val(`button-${x.v}-bg-active`))} />,
          ])}
        />
      </Section>
      <Section title="Foco">
        <Panel caption={<>Anillo <code>button.focus-ring</code> de 2 px con offset de 2 px, solo con <code>:focus-visible</code>. Sobre foto u oscuro se usa el foco inverso.</>}>
          <div className="demo-row">
            <Button className="is-focus">Button CTA</Button>
            <Button variant="neutral" className="is-focus">Button CTA</Button>
            <Button variant="link" className="is-focus">Button CTA</Button>
          </div>
        </Panel>
      </Section>
      <Section title="Tamaño del target">
        <Panel caption="La línea punteada marca 44 px, el mínimo táctil recomendado.">
          <div className="demo-row target-row">
            {SIZES.map((s) => <Button key={s} size={s}>Button CTA</Button>)}
          </div>
        </Panel>
        <ul className="bul">
          <li><b>lg</b> y <b>xl</b> cumplen 44 px.</li>
          <li><b>sm</b> y <b>md</b>: úsalos solo en desktop o a ancho completo (por ejemplo Add to cart en una card).</li>
        </ul>
      </Section>
    </>
  )

  /* ───── Novedades / código ───── */
  const updates = (
    <>
      <Section title="Historial">
        <Table
          head={["Versión de tokens", "Cambio"]}
          rows={[
            ["4.1.0", <>Nuevo <code key="a">button.outline-inverse.*</code>: botón con borde sobre foto.</>],
            ["4.0.0", <>Nuevo <code key="a">button.ghost.*</code>. Alto y padding por jerarquía. <code key="b">button.disabled-opacity</code>. <code key="c">button.outline.bg</code> pasa a blanco.</>],
          ]}
        />
      </Section>
    </>
  )

  return { design, usage, accessibility, updates }
}
