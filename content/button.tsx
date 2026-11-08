import type { ReactNode } from "react"
import { ArrowRight, ShoppingCart } from "lucide-react"
import type { Piece, Story } from "ds-docs-theme/types"
import { Button, type ButtonVariant } from "@shop/components/ui/button"
import { sourceUrl } from "@/lib/storybook"
import { iso, row } from "./iso"

const CTA = "Button CTA"

const VARIANTS: { v: ButtonVariant; label: string; caption: string; dark?: boolean }[] = [
  { v: "primary", label: "Primary", caption: "Acción principal de una sección. Una por bloque. Tamaño habitual: lg." },
  { v: "secondary", label: "Secondary", caption: "Acción secundaria oscura: aplicar cupón, continuar en checkout." },
  { v: "outline", label: "Outline", caption: "Acción de cuenta o alternativa." },
  { v: "neutral", label: "Neutral", caption: "Acción terciaria sobre superficie clara: cancelar, ver más." },
  { v: "inverse", label: "Inverse", dark: true, caption: "Botón blanco sobre foto o superficie oscura (banners). Siempre pill." },
  { v: "outline-inverse", label: "Outline inverse", dark: true, caption: "Botón con borde sobre foto. Alternativa secundaria a Inverse." },
  { v: "link", label: "Link", caption: "Acción con peso de texto, sin fondo: ver detalle, editar dirección." },
]
const SIZES = [
  { s: "sm", label: "Small" }, { s: "md", label: "Medium" }, { s: "lg", label: "Large" }, { s: "xl", label: "Extra large" },
] as const

const story = (id: string, label: string, node: ReactNode, caption?: string, dark?: boolean): Story => ({ id: `button-${id}`, label, caption, dark, node: iso(node) })

/** Pares de tokens del botón, para la tabla de contraste (texto: 4.5:1). */
const contrastRows = VARIANTS.filter((x) => x.v !== "link" && x.v !== "outline-inverse").flatMap((x) => [
  { element: `${x.label} · default`, fg: `button-${x.v}-fg`, bg: `button-${x.v}-bg` },
  { element: `${x.label} · hover`, fg: x.v === "outline" ? "button-outline-fg-hover" : `button-${x.v}-fg`, bg: `button-${x.v}-bg-hover` },
])

export const buttonPiece: Piece = {
  slug: "button", group: "components", title: "Button", file: sourceUrl("components", "button"),
  description: "Ocho jerarquías, cuatro tamaños y estados completos.",
  docsId: "",
  purpose: [
    { title: "Iniciar una acción", text: "Los botones disparan acciones: agregar al carrito, aplicar un cupón, confirmar una compra." },
    { title: "Mostrar jerarquía", text: "Ocho jerarquías ayudan a identificar la acción principal y las secundarias en cada pantalla." },
    { title: "Cubrir los estados", text: "Hover, active, foco, disabled y loading mantienen el comportamiento predecible." },
  ],
  anatomy: {
    story: "button-anatomy", width: 520,
    parts: [
      { n: 1, label: "Contenedor", selector: ".btn", side: "left" },
      { n: 2, label: "Label", selector: ".btn", side: "bottom" },
      { n: 3, label: "Ícono izquierdo", note: "opcional", selector: ".btn > svg:first-child", side: "top", pct: 22 },
      { n: 4, label: "Ícono derecho", note: "opcional", selector: ".btn > svg:last-child", side: "top", pct: 86 },
    ],
    node: iso(<Button variant="primary" size="xl"><ShoppingCart className="icon-md" aria-hidden />{CTA}<ArrowRight className="icon-md" aria-hidden /></Button>),
  },
  stories: [],
  groups: [
    {
      title: "Variante",
      intro: "La prop `variant` define colores, radio y peso de fuente, y comunica la jerarquía de la acción en la pantalla.",
      stories: VARIANTS.map((x) => story(`variant-${x.v}`, x.label, <Button variant={x.v}>{CTA}</Button>, x.caption, x.dark)),
    },
    {
      title: "Tamaño",
      intro: "La prop `size` define alto, padding, gap, tipografía e ícono. Permite ajustar el peso visual de la acción a la densidad del layout.",
      stories: SIZES.map(({ s, label }) => story(`size-${s}`, label, <Button variant="primary" size={s}>{CTA}</Button>)),
    },
    {
      title: "Forma",
      intro: "La prop `shape` es `default` (8 px) para acciones de compra y formularios, y `pill` solo en marketing.",
      stories: [
        story("shape-default", "Default", <Button size="lg">{CTA}</Button>, "Compra, formularios y Stepper."),
        story("shape-pill", "Pill", <Button size="lg" shape="pill">{CTA}</Button>, "Hero, banners, newsletter y filtros."),
      ],
    },
    {
      title: "Íconos",
      intro: "Un ícono (lucide) a la izquierda o a la derecha del texto refuerza el significado de la acción y hereda su color.",
      stories: [
        story("icon-leading", "Ícono inicial", <Button><ShoppingCart className="icon-sm" aria-hidden />{CTA}</Button>, "Cuando el ícono aporta claridad, por ejemplo un carrito antes de «Agregar»."),
        story("icon-trailing", "Ícono final", <Button>{CTA}<ArrowRight className="icon-sm" aria-hidden /></Button>, "Indica navegación, avance o que se abrirá un menú o panel."),
        story("icon-none", "Sin ícono", <Button>{CTA}</Button>, "Opción por defecto."),
      ],
    },
    {
      title: "Estado",
      intro: "Hover y foco los resuelve CSS. `disabled` y `loading` son props; active se muestra forzado.",
      stories: [
        story("state-default", "Default", <Button size="lg">{CTA}</Button>, "Para acciones disponibles de inmediato. Probá hover, foco con Tab y click."),
        story("state-disabled", "Disabled", <Button variant="outline" size="lg" disabled>{CTA}</Button>, "Usa el set compartido button.disabled.*, sin opacidad."),
        story("state-loading", "Loading", <Button variant="outline" size="lg" loading>{CTA}</Button>, "El spinner reemplaza al ícono, mantiene el ancho y bloquea el click (aria-busy)."),
        story("state-active", "Active", <Button size="lg" className="is-active">{CTA}</Button>, "Estado presionado, forzado con una clase solo para mostrarlo."),
      ],
    },
    {
      title: "Ancho completo",
      intro: "La prop `fullWidth` estira el botón al ancho de su contenedor, para layouts apilados o angostos.",
      stories: [
        story("width-auto", "Default", <Button variant="secondary">{CTA}</Button>, "Para acciones en línea: se ajusta al contenido."),
        story("width-full", "Full width", <div className="w-[280px] max-w-full"><Button variant="secondary" fullWidth>{CTA}</Button></div>, "Mobile y acciones de drawer."),
      ],
    },
  ],
  props: [
    ["variant", "\"primary\" | \"add-to-cart\" | \"secondary\" | \"outline\" | \"neutral\" | \"inverse\" | \"outline-inverse\" | \"link\"", "Jerarquía. Por defecto primary."],
    ["size", "\"sm\" | \"md\" | \"lg\" | \"xl\"", "Tamaño. Si falta, el de cada jerarquía."],
    ["shape", "\"default\" | \"pill\"", "pill solo en marketing."],
    ["fullWidth", "boolean", "Ocupa todo el ancho del contenedor."],
    ["loading", "boolean", "Muestra spinner, mantiene el ancho y bloquea el click."],
    ["loadingText", "string", "Texto mientras carga."],
  ],
  tokenPrefixes: ["button-"],
  use: ["Para acciones del flujo de compra: agregar, continuar, finalizar.", "Para acciones de formulario y de cuenta.", "Un solo Primary por sección visible."],
  avoid: ["Para navegar: usá un link (`<a href>`), aunque tenga estilo de botón.", "Para mostrar un estado o una etiqueta: eso es un Badge."],
  practices: [
    { ok: true, title: "Un solo Primary por sección", text: "Deja clara la acción principal.", storyId: "p1", node: iso(row(<Button variant="neutral" size="lg">{CTA}</Button>, <Button size="lg">{CTA}</Button>)) },
    { ok: false, title: "No pongas dos Primary juntos", text: "Compiten en peso y confunden el paso siguiente.", storyId: "p2", node: iso(row(<Button size="lg">{CTA}</Button>, <Button size="lg">{CTA}</Button>)) },
    { ok: true, title: "Pill solo en marketing", text: "Hero, banners y newsletter.", storyId: "p3", node: iso(<Button size="lg" shape="pill">{CTA}</Button>) },
    { ok: false, title: "No uses pill en la compra", text: "Las acciones de compra y de formulario van con radio por defecto.", storyId: "p4", node: iso(<Button size="lg" shape="pill">{CTA}</Button>) },
  ],
  a11y: [
    "Si ejecuta una acción es `<button>`. Si navega es `<a>`, también con estilo Link.",
    "Los botones solo con ícono requieren `aria-label`.",
    "Loading: `aria-busy=\"true\"`. El label sigue en el DOM y el botón no admite doble click.",
    "Si abre un menú o popover: `aria-expanded` + `aria-controls`.",
  ],
  keyboard: [
    { keys: ["Tab", "Shift+Tab"], action: "Mueve el foco. Orden natural, sin `tabindex` positivo." },
    { keys: ["Enter", "Espacio"], action: "Activa un `<button>`. Un `<a>` solo responde a Enter." },
  ],
  contrast: contrastRows,
  historyColumn: "Versión de tokens",
  history: [
    { date: "4.1.0", text: "Nuevo `button.outline-inverse.*`: botón con borde sobre foto." },
    { date: "4.0.0", text: "Nuevo `button.ghost.*`. Alto y padding por jerarquía. `button.disabled-opacity`. `button.outline.bg` pasa a blanco." },
  ],
}
