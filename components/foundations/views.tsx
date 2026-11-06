import Link from "next/link"
import { Heart, ShoppingCart } from "lucide-react"
import type { ReactNode } from "react"
import CopyToken from "@/components/copy-token"
import IconSize from "@/components/foundations/icon-size"
import { Section } from "@/components/component-page"
import { colorGroups, countsByFamily, rest, withPrefix, type Token } from "@/lib/tokens"

/** Escalones de spacing que no se muestran en la documentación. */
const HIDDEN_SPACE = ["space-0-5", "space-1-5", "space-2-5"]

const label = (s: string) => s.replace(/-/g, " ")

function Table({ head, children }: { head: string[]; children: ReactNode }) {
  return (
    <div className="tablewrap">
      <table>
        <thead><tr>{head.map((h) => <th key={h}>{h}</th>)}</tr></thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  )
}

/** Fila genérica: [muestra] token · valor · descripción */
function Row({ t, sample }: { t: Token; sample?: ReactNode }) {
  return (
    <tr>
      {sample !== undefined && <td className="td-sample">{sample}</td>}
      <td><CopyToken name={t.name} /></td>
      <td><code>{t.resolved}</code></td>
      <td className="muted">{t.desc ?? ""}</td>
    </tr>
  )
}

/* ───────────── Color ───────────── */
export function ColorView() {
  const { primitive, semantic } = colorGroups()
  return (
    <>
      <Section title="Primitivos">
        <p className="muted">Las escalas de la paleta, de 50 a 950. Son la materia prima: solo las usa la capa semántica.</p>
        {[...primitive].map(([group, tokens]) => (
          <div key={group} className="scale-block">
            <h3 className="doc-h3">{label(group)}</h3>
            <div className="scale">
              {tokens.map((t) => (
                <div key={t.name} className="chip-sw">
                  <div className={`chip-color tk-bg-${t.name}`} />
                  <b>{rest(t, `color-${group}-`)}</b>
                  <code>{t.resolved}</code>
                </div>
              ))}
            </div>
          </div>
        ))}
      </Section>
      <Section title="Semánticos">
        <p className="muted">Colores con intención. Son los que usan los componentes. Hacé clic en un nombre para copiar la variable.</p>
        {[...semantic].map(([group, tokens]) => (
          <div key={group} className="scale-block">
            <h3 className="doc-h3">{group}</h3>
            <Table head={["", "Token", "Valor", "Uso"]}>
              {tokens.map((t) => (
                <Row key={t.name} t={t} sample={<span className={`sw tk-bg-${t.name}`} />} />
              ))}
            </Table>
          </div>
        ))}
      </Section>
    </>
  )
}

/* ───────────── Tipografía ───────────── */
export function TypographyView() {
  const sizes = withPrefix("font-size-")
  const lh = withPrefix("font-line-height-")
  return (
    <>
      <Section title="Familia y pesos">
        <p className="muted">Montserrat para todo el sitio, en cuatro pesos.</p>
        <div className="specimen">
          <span className="specimen-aa">Aa</span>
          <div>
            <b>Montserrat</b>
            <p className="muted">Una sola familia para todo el sitio.</p>
          </div>
        </div>
        <Table head={["Peso", "Token", "Valor"]}>
          {withPrefix("font-weight-").map((t) => (
            <tr key={t.name}>
              <td className={`tk-fw-${t.name}`}>Productos de calidad</td>
              <td><CopyToken name={t.name} /></td>
              <td><code>{t.resolved}</code></td>
            </tr>
          ))}
        </Table>
      </Section>
      <Section title="Estilos de texto">
        <p className="muted">Combinan peso, tamaño, interlineado y familia. Usalos en lugar de armar cada valor a mano.</p>
        <Table head={["Muestra", "Token", "Uso"]}>
          {withPrefix("typography-").map((t) => (
            <tr key={t.name}>
              <td className={`tk-font-${t.name}`}>La calidad que vos te merecés</td>
              <td><CopyToken name={t.name} /><div className="hint">{t.resolved}</div></td>
              <td className="muted">{t.desc}</td>
            </tr>
          ))}
        </Table>
      </Section>
      <Section title="Escala de tamaños">
        <p className="muted">Los tamaños base. Cada uno tiene su interlineado.</p>
        <Table head={["Muestra", "Token", "Valor"]}>
          {sizes.map((t) => (
            <tr key={t.name}>
              <td className={`tk-fs-${t.name}`}>Ravioles</td>
              <td><CopyToken name={t.name} /></td>
              <td><code>{t.resolved}</code></td>
            </tr>
          ))}
        </Table>
      </Section>
      <Section title="Interlineado">
        <p className="muted">Alto de línea que acompaña a cada tamaño.</p>
        <Table head={["Token", "Valor"]}>
          {lh.map((t) => (
            <tr key={t.name}><td><CopyToken name={t.name} /></td><td><code>{t.resolved}</code></td></tr>
          ))}
        </Table>
      </Section>
    </>
  )
}

/* ───────────── Spacing ───────────── */
export function SpacingView() {
  return (
    <>
      <Section title="Escala">
        <p className="muted">Base de 4 px. Se usa para padding, gap y márgenes.</p>
        <Table head={["Token", "Valor", ""]}>
          {withPrefix("space-").filter((t) => !HIDDEN_SPACE.includes(t.name)).map((t) => (
            <tr key={t.name}>
              <td><CopyToken name={t.name} /></td>
              <td><code>{t.resolved}</code></td>
              <td><span className={`bar tk-w-${t.name}`} /></td>
            </tr>
          ))}
        </Table>
      </Section>
      <Section title="Tamaño de controles">
        <p className="muted">Alto de botones, inputs y selects. El mínimo táctil es 44 px.</p>
        <Table head={["Token", "Valor", "Uso", ""]}>
          {withPrefix("size-control-").map((t) => (
            <tr key={t.name}>
              <td><CopyToken name={t.name} /></td>
              <td><code>{t.resolved}</code></td>
              <td className="muted">{t.desc}</td>
              <td><span className={`bar bar-h tk-h-${t.name}`} /></td>
            </tr>
          ))}
        </Table>
      </Section>
      <Section title="Contenedor y breakpoints">
        <p className="muted">Ancho máximo del contenido y puntos donde cambia el layout.</p>
        <Table head={["Token", "Valor"]}>
          {[...withPrefix("size-container"), ...withPrefix("breakpoint-")].map((t) => (
            <tr key={t.name}><td><CopyToken name={t.name} /></td><td><code>{t.resolved}</code></td></tr>
          ))}
        </Table>
      </Section>
    </>
  )
}

/* ───────────── Radius ───────────── */
export function RadiusView() {
  return (
    <Section title="Escala">
      <p className="muted">Cuanto más grande el elemento, más grande el radio. Los botones usan <code>md</code>; las cards, <code>lg</code> o <code>xl</code>; chips e íconos, <code>full</code>.</p>
      <div className="demo-grid">
        {withPrefix("radius-").map((t) => (
          <div key={t.name} className="demo-cell">
            <div className={`demo-box tk-r-${t.name}`} />
            <CopyToken name={t.name} />
            <code>{t.resolved}</code>
          </div>
        ))}
      </div>
    </Section>
  )
}

/* ───────────── Elevation ───────────── */
export function ElevationView() {
  return (
    <>
      <Section title="Elevación (semántico)">
        <p className="muted">Usá estos en los componentes. Cada uno apunta a una sombra primitiva.</p>
        <div className="demo-grid">
          {withPrefix("elevation-").map((t) => (
            <div key={t.name} className="demo-cell">
              <div className={`demo-box white tk-sh-${t.name}`} />
              <CopyToken name={t.name} />
              <span className="hint">{t.desc}</span>
            </div>
          ))}
        </div>
      </Section>
      <Section title="Sombras (primitivo)">
        <p className="muted">Valores crudos. Solo los usa la capa semántica.</p>
        <Table head={["Token", "Valor"]}>
          {withPrefix("shadow-").map((t) => (
            <tr key={t.name}><td><CopyToken name={t.name} /></td><td><code>{t.resolved}</code></td></tr>
          ))}
        </Table>
      </Section>
    </>
  )
}

/* ───────────── Layer ───────────── */
export function LayerView() {
  return (
    <Section title="Orden de capas">
      <p className="muted">De la capa más baja a la más alta. Usá siempre el token, nunca un z-index suelto: así un modal nunca queda detrás del header.</p>
      <Table head={["Capa", "Token", "z-index"]}>
        {withPrefix("layer-").map((t) => (
          <tr key={t.name}>
            <td><b>{rest(t, "layer-")}</b></td>
            <td><CopyToken name={t.name} /></td>
            <td><code>{t.resolved}</code></td>
          </tr>
        ))}
      </Table>
    </Section>
  )
}

/* ───────────── Motion ───────────── */
export function MotionView() {
  return (
    <>
      <Section title="Duración">
        <p className="muted">Pasá el mouse por la barra para ver el tiempo real.</p>
        <Table head={["Token", "Valor", "Demo"]}>
          {withPrefix("duration-").map((t) => (
            <tr key={t.name}>
              <td><CopyToken name={t.name} /></td>
              <td><code>{t.resolved}</code></td>
              <td>
                <div className="track">
                  <span className={`dot tk-dur-${t.name}`} />
                </div>
              </td>
            </tr>
          ))}
        </Table>
      </Section>
      <Section title="Easing">
        <p className="muted">La curva con la que acelera y frena el movimiento.</p>
        <Table head={["Token", "Valor"]}>
          {withPrefix("easing-").map((t) => (
            <tr key={t.name}><td><CopyToken name={t.name} /></td><td><code>{t.resolved}</code></td></tr>
          ))}
        </Table>
      </Section>
      <Section title="Transiciones">
        <p className="muted">Combinaciones de duración y easing para los casos más comunes.</p>
        <Table head={["Token", "Valor", "Uso"]}>
          {withPrefix("motion-").map((t) => <Row key={t.name} t={t} />)}
        </Table>
      </Section>
    </>
  )
}

/* ───────────── Border ───────────── */
export function BorderView() {
  const borders = [...withPrefix("color-border-")]
  return (
    <>
      <Section title="Ancho">
        <p className="muted">Del borde fino al de foco.</p>
        <div className="demo-grid">
          {withPrefix("border-width-").map((t) => (
            <div key={t.name} className="demo-cell">
              <div className={`demo-box white tk-bw-${t.name}`} />
              <CopyToken name={t.name} />
              <code>{t.resolved}</code>
            </div>
          ))}
        </div>
      </Section>
      <Section title="Color">
        <p className="muted">Un color por función: separar, marcar un campo y enfocar.</p>
        <Table head={["", "Token", "Valor", "Uso"]}>
          {borders.map((t) => (
            <Row key={t.name} t={t} sample={<span className={`sw sw-outline tk-bc-${t.name}`} />} />
          ))}
        </Table>
      </Section>
    </>
  )
}

/* ───────────── Design tokens ───────────── */
export function TokensView() {
  const counts = countsByFamily()
  return (
    <>
      <Section title="Arquitectura en 3 capas">
        <p className="muted">Los tokens van de lo general a lo específico. Cada capa solo lee de la anterior, así un cambio de marca se hace en un lugar y llega a todos los componentes.</p>
        <Table head={["Capa", "Qué contiene", "Quién la consume"]}>
          <tr><td><b>Primitive</b></td><td>Valores crudos: escalas de color 50–950, spacing, radios, tipografía</td><td>Solo la capa semántica</td></tr>
          <tr><td><b>Semantic</b></td><td>Intención: <code>text-secondary</code>, <code>surface-subtle</code>, <code>action-primary-bg</code></td><td>Componentes y layouts</td></tr>
          <tr><td><b>Component</b></td><td>Decisiones por componente: <code>button-primary-height</code></td><td>Un componente específico</td></tr>
        </Table>
        <p className="muted">Un componente nunca usa un primitivo de color directo. Si falta un semántico, se crea.</p>
        <pre className="codeblock"><code>{`--color-tomato-500: #e30613;                          /* primitive */
--color-action-primary-bg: var(--color-tomato-500);   /* semantic  */
--button-add-to-cart-bg: var(--color-action-primary-bg); /* component */`}</code></pre>
      </Section>
      <Section title="Nomenclatura">
        <p>
          <code>{"{categoría}-{grupo}-{rol}-{estado}"}</code> → <code>color-action-primary-bg-hover</code>. Todo en kebab-case y minúsculas, sin prefijos repetidos.
        </p>
      </Section>
      <Section title="Cómo usar">
        <p>La instalación está explicada en <Link href="/get-started">Empezar</Link>.</p>
      </Section>
      <Section title="Tokens por familia">
        <p className="muted">Cuántas variables hay en cada familia. {counts.reduce((a, [, n]) => a + n, 0)} en total.</p>
        <Table head={["Familia", "Cantidad"]}>
          {counts.map(([f, n]) => (<tr key={f}><td><code>--{f}-*</code></td><td>{n}</td></tr>))}
        </Table>
      </Section>
    </>
  )
}

/* ───────────── Iconografía ───────────── */
const ICON_SIZES = [
  { cls: "icon-xs", use: "Junto a texto chico, como avisos y badges" },
  { cls: "icon-sm", use: "Dentro de botones y links" },
  { cls: "icon-md", use: "Tamaño base: listas, features, botones grandes" },
  { cls: "icon-lg", use: "Íconos de acción: cerrar, buscar, carrito" },
  { cls: "icon-xl", use: "Íconos de apoyo en cards" },
  { cls: "icon-2xl", use: "Íconos dentro de Icon badge" },
  { cls: "icon-3xl", use: "Estados vacíos y pantallas de confirmación" },
]
const ICON_COLORS = [
  { name: "color-icon-default", use: "Íconos de interfaz" },
  { name: "color-icon-subtle", use: "Íconos secundarios o deshabilitados" },
  { name: "color-icon-brand", use: "Íconos de marca y de énfasis" },
  { name: "color-icon-inverse", use: "Íconos sobre fondos oscuros o foto" },
]

export function IconographyView() {
  return (
    <>
      <Section title="Qué es">
        <p>
          Orali usa la librería <b>Lucide</b> (<code>lucide-react</code>): íconos de línea, de trazo uniforme y esquinas redondeadas, que combinan con Montserrat. No hay íconos propios salvo el logotipo.
        </p>
      </Section>
      <Section title="Tamaños">
        <p className="muted">Se eligen con una clase, nunca con utilidades de Tailwind (<code>w-</code> / <code>h-</code>). Cada tamaño sale de la escala de spacing.</p>
        <Table head={["Muestra", "Clase", "Tamaño", "Dónde se usa"]}>
          {ICON_SIZES.map((x) => (
            <tr key={x.cls}>
              <td><ShoppingCart className={x.cls} aria-hidden /></td>
              <td><code>{x.cls}</code></td>
              <td><IconSize cls={x.cls} /></td>
              <td className="muted">{x.use}</td>
            </tr>
          ))}
        </Table>
      </Section>
      <Section title="Color">
        <p className="muted">Los íconos heredan el color del texto (<code>currentColor</code>). Cuando necesitan uno propio, usan estos tokens:</p>
        <Table head={["", "Token", "Valor", "Para qué"]}>
          {ICON_COLORS.map((c) => {
            const t = withPrefix(c.name).find((x) => x.name === c.name)
            return (
              <tr key={c.name}>
                <td className="td-sample"><span className={c.name === "color-icon-inverse" ? "sw sw-icon sw-dark" : "sw sw-icon"}><Heart className={`icon-md ${c.name}`} aria-hidden /></span></td>
                <td><CopyToken name={c.name} /></td>
                <td><code>{t?.resolved}</code></td>
                <td className="muted">{c.use}</td>
              </tr>
            )
          })}
        </Table>
      </Section>
      <Section title="Reglas">
        <ul className="bul">
          <li><b>Decorativo por defecto.</b> Un ícono que acompaña a un texto lleva <code>aria-hidden</code>: el significado lo da el texto.</li>
          <li><b>Solo ícono, con nombre.</b> Si no hay texto, el botón necesita <code>aria-label</code> (ver <Link href="/components/icon-button">Icon button</Link>).</li>
          <li><b>Un ícono, un significado.</b> Usá el mismo ícono para la misma acción en todo el sitio.</li>
          <li><b>No los uses solos para comunicar estado.</b> Sumá texto o color con contraste suficiente.</li>
          <li><b>Área táctil.</b> Un ícono clickeable tiene al menos 44 px de área, aunque se dibuje más chico.</li>
        </ul>
      </Section>
      <Section title="Ejemplo">
        <pre className="codeblock"><code>{`import { ShoppingCart } from "lucide-react"

<Button><ShoppingCart className="icon-sm" aria-hidden />Agregar</Button>`}</code></pre>
      </Section>
      <Section title="Relacionados">
        <p><Link href="/components/button">Button</Link> · <Link href="/components/icon-button">Icon button</Link> · <Link href="/components/icon-badge">Icon badge</Link></p>
      </Section>
    </>
  )
}
