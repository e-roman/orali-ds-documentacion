import { Section } from "@/components/component-page"
import { Anatomy, DoDont, Panel, Purpose, Table, WhenToUse } from "@/components/doc/blocks"
import { Ratio, TokenTable, ratio, val } from "@/components/doc/token-ui"
import Variants from "@/components/doc/variants"
import { Badge, type BadgeVariant } from "@shop/components/ui/badge"

const ITEMS: { v: BadgeVariant; label: string; text: string; caption: string; fg: string; bg: string }[] = [
  { v: "discount", label: "Discount", text: "-15%", caption: "Descuento sobre un producto. Borde y texto en tomato sobre blanco.", fg: "badge-discount-fg", bg: "badge-discount-bg" },
  { v: "dietary", label: "Dietary", text: "Vegano", caption: "Característica del producto: Vegano, Sin TACC, Premium. Fondo sage.", fg: "badge-dietary-fg", bg: "badge-dietary-bg" },
  { v: "counter", label: "Counter", text: "3", caption: "Cantidad sobre un ícono (por ejemplo el carrito). Siempre redondo.", fg: "badge-counter-fg", bg: "badge-counter-bg" },
  { v: "outline", label: "Outline", text: "4 packs", caption: "Contador de packs en títulos (carrito, drawer). Con borde y fondo blanco.", fg: "color-text-brand", bg: "color-surface-default" },
]

export function badgePanels() {
  const design = (
    <>
      <Purpose
        items={[
          { title: "Etiquetar", text: "Marca un producto con una característica corta: descuento, dieta, premium." },
          { title: "Contar", text: "Muestra una cantidad sobre un ícono o junto a un título." },
          { title: "No es una acción", text: "Un badge informa, no se presiona. Para acciones usá un Button." },
        ]}
      />
      <Anatomy
        parts={[
          { n: 1, selector: ".badge" },
          { n: 2, selector: ".badge", only: ["texto", "tipografia"] },
        ]}
        markers={[{ n: 1, side: "left" }, { n: 2, side: "bottom" }]}
        legend={[{ n: 1, label: "Contenedor" }, { n: 2, label: "Label", note: "texto o número" }]}
      >
        <Badge variant="dietary">Sin TACC</Badge>
      </Anatomy>

      <Section title="Configuración">
        <Variants
          title="Variante"
          ariaLabel="Variante del badge"
          description={<>La prop <code>variant</code> define colores, radio y tipografía. Discount y dietary usan radio de 4 px para no competir con los CTA pill; counter es redondo.</>}
          items={ITEMS.map((x) => ({
            value: x.v, label: x.label, caption: x.caption,
            node: <Badge variant={x.v}>{x.text}</Badge>,
          }))}
        />
        <Variants
          title="Contador sobre un ícono"
          ariaLabel="Ejemplo de contador"
          description="El counter se posiciona sobre el ícono que cuenta; la posición la define el componente que lo contiene."
          items={[
            {
              value: "cart", label: "Carrito", caption: "Contador de 16 px con número de 11 px en negrita.",
              node: (
                <span className="badge-anchor">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden><circle cx="9" cy="20" r="1" /><circle cx="18" cy="20" r="1" /><path d="M2 3h3l2.7 12.4a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.5L21 8H6" /></svg>
                  <span className="badge-anchor__count"><Badge variant="counter">{3}</Badge></span>
                </span>
              ),
            },
          ]}
        />
      </Section>

      <Section title="Tokens">
        <p className="muted">Se leen en vivo de <code>@orali/design-tokens</code>.</p>
        <TokenTable prefix="badge-" />
      </Section>
    </>
  )

  const usage = (
    <>
      <WhenToUse
        use={["Para destacar una característica corta de un producto.", "Para mostrar un descuento o una cantidad.", "Con texto breve: una o dos palabras, o un número."]}
        avoid={[<>Para una acción o navegación: usá <b>Button</b> o un link.</>, "Para mensajes largos o importantes: usá un aviso (callout).", "Más de uno o dos badges sobre el mismo producto."]}
      />
      <DoDont
        items={[
          { ok: true, title: "Texto corto", text: "Una o dos palabras se leen de un vistazo.", preview: <Badge variant="dietary">Vegano</Badge> },
          { ok: false, title: "Evitá frases largas", text: "El badge pierde su función de etiqueta.", preview: <Badge variant="dietary">Producto elaborado sin ingredientes de origen animal</Badge> },
          { ok: true, title: "Un badge por característica", text: "Cada etiqueta dice una sola cosa.", preview: <div className="demo-row"><Badge variant="discount">-15%</Badge><Badge variant="dietary">Vegano</Badge></div> },
          { ok: false, title: "No lo uses como botón", text: "Parece clickeable pero no lo es.", preview: <Badge variant="discount">Comprar ahora</Badge> },
        ]}
      />
    </>
  )

  const accessibility = (
    <>
      <Section title="Rol y estructura">
        <ul className="bul">
          <li>Es un <code>&lt;span&gt;</code> sin rol: el texto se lee como contenido normal.</li>
          <li>No transmitas información solo con el color: el texto del badge debe decirlo (por ejemplo &quot;Vegano&quot;, no solo un fondo verde).</li>
          <li>Un counter suelto es solo un número: acompañalo de un texto accesible en el elemento que lo contiene (por ejemplo <code>aria-label=&quot;Carrito, 3 productos&quot;</code>).</li>
        </ul>
      </Section>
      <Section title="Contraste">
        <Table
          head={["Variante", "Texto sobre fondo", "Relación"]}
          rows={ITEMS.map((x) => [<b key="n">{x.label}</b>, `${x.fg} sobre ${x.bg}`, <Ratio key="r" r={ratio(val(x.fg), val(x.bg))} />])}
        />
        <p className="muted">Texto: 4.5:1 (WCAG 1.4.3).</p>
      </Section>
      <Section title="Tamaño">
        <Panel caption="El badge no es interactivo, así que no aplica el tamaño mínimo táctil.">
          <div className="demo-row">{ITEMS.map((x) => <Badge key={x.v} variant={x.v}>{x.text}</Badge>)}</div>
        </Panel>
      </Section>
    </>
  )

  const updates = (
    <Section title="Historial">
      <Table
        head={["Versión de tokens", "Cambio"]}
        rows={[
          ["4.0.0", <><code key="a">badge.discount.padding-y</code> de 2 a 6 px (<code key="b">space.1-5</code>).</>],
          ["3.0.0", <><code key="a">badge.dietary.font-size</code> de 11 a 12 px.</>],
          ["2.0.0", <>Discount y dietary pasan de <code key="a">radius.full</code> a <code key="b">radius.sm</code> (4 px). El counter sigue redondo.</>],
          ["1.1.0", <>Nuevo <code key="a">badge.counter</code>.</>],
        ]}
      />
    </Section>
  )

  return { design, usage, accessibility, updates }
}
