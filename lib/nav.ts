export type NavItem = { slug: string; title: string; description: string; /** Categoría para agrupar en el sidebar y el índice. */ cat?: string }

export const topNav = [
  { href: "/get-started", label: "Empezar" },
  { href: "/foundations", label: "Foundations" },
  { href: "/components", label: "Componentes" },
  { href: "/patterns", label: "Patrones" },
]

export const foundations: NavItem[] = [
  { slug: "tokens", title: "Design tokens", description: "Las decisiones de diseño como variables, en tres capas." },
  { slug: "color", title: "Color", description: "Paleta de marca y colores con intención: superficie, texto, acción y feedback." },
  { slug: "typography", title: "Tipografía", description: "Una familia, una escala de tamaños y estilos listos para usar." },
  { slug: "iconography", title: "Iconografía", description: "Íconos de línea de Lucide, en siete tamaños y con color por token." },
  { slug: "spacing", title: "Spacing", description: "Escala base 4 para espacios, tamaños de control y breakpoints." },
  { slug: "radius", title: "Radius", description: "Esquinas rectas, suaves o totalmente redondeadas." },
  { slug: "elevation", title: "Elevation", description: "Sombras para separar superficies del fondo." },
  { slug: "layer", title: "Layer", description: "El orden en que se apilan header, menús, drawers y modales." },
  { slug: "motion", title: "Motion", description: "Cuánto dura y cómo se mueve cada transición." },
  { slug: "border", title: "Border", description: "Grosores y colores de borde para separar, marcar y enfocar." },
]

const ownComponents: NavItem[] = [
  { slug: "accordion", title: "Accordion", description: "Expande y contrae secciones de contenido." },
  { slug: "badge", title: "Badge", description: "Etiquetas de descuento, dieta y contador." },
  { slug: "breadcrumb", title: "Breadcrumb", description: "Ubica al usuario en la jerarquía del sitio." },
  { slug: "button", title: "Button", description: "Ocho jerarquías, cuatro tamaños y estados completos." },
  { slug: "card", title: "Card", description: "Superficie para agrupar contenido." },
  { slug: "chip", title: "Chip", description: "Opciones de filtro que se activan y desactivan." },
  { slug: "form-parts", title: "Form parts", description: "Encabezado, separador y nota de formulario." },
  { slug: "icon-badge", title: "Icon badge", description: "Ícono dentro de un círculo o tile." },
  { slug: "icon-button", title: "Icon button", description: "Botón solo con ícono, siempre redondo." },
  { slug: "input", title: "Input", description: "Campos de formulario, Field y Select." },
  { slug: "link", title: "Link", description: "Navegación con peso de texto." },
  { slug: "price", title: "Price", description: "Precio con descuento y precio por unidad." },
  { slug: "progress", title: "Progress", description: "Barra de avance con estados." },
  { slug: "rating-scale", title: "Rating scale", description: "Escala numérica de puntaje." },
  { slug: "skeleton", title: "Skeleton", description: "Bloques de carga que anticipan el layout." },
  { slug: "stepper", title: "Stepper", description: "Control de cantidad." },
  { slug: "tabs", title: "Tabs", description: "Alterna vistas dentro del mismo contexto." },
]

/** Componentes propios + los que se muestran desde Storybook, ordenados. */
export const components: NavItem[] = [...ownComponents, ...sbNavComponents].sort((a, b) => a.title.localeCompare(b.title))


import { sbNav, sbNavComponents } from "@/lib/sb-patterns"

const ownPatterns: NavItem[] = [
  { slug: "checkout-cta", title: "Checkout CTA", description: "Finalizar compra con leyenda de pedido mínimo.", cat: "Carrito" },
  { slug: "coupon-field", title: "Coupon field", description: "Código de descuento.", cat: "Carrito" },
  { slug: "drawer", title: "Drawer", description: "Panel lateral derecho.", cat: "Overlays" },
  { slug: "empty-state", title: "Empty state", description: "Cuando no hay contenido para mostrar.", cat: "Inicio y contenido" },
  { slug: "feature-row", title: "Feature row", description: "Ícono, título y texto.", cat: "Inicio y contenido" },
  { slug: "how-it-works", title: "How it works", description: "Pasos numerados de un proceso.", cat: "Inicio y contenido" },
  { slug: "info-panel", title: "Info panel", description: "Panel informativo con título y texto.", cat: "Inicio y contenido" },
  { slug: "modal", title: "Modal", description: "Diálogo sobre un fondo atenuado.", cat: "Overlays" },
  { slug: "page-header", title: "Page header", description: "Etiqueta, título y bajada de página.", cat: "Inicio y contenido" },
  { slug: "payment-panel", title: "Payment panel", description: "Paso de pago con total.", cat: "Checkout" },
  { slug: "section-header", title: "Section header", description: "Título de sección con link Ver todo.", cat: "Inicio y contenido" },
  { slug: "shipping-check", title: "Shipping check", description: "Verificación de zona por código postal.", cat: "Checkout" },
  { slug: "step-indicator", title: "Step indicator", description: "Pasos del checkout.", cat: "Checkout" },
  { slug: "trust-strip", title: "Trust strip", description: "Franja de beneficios.", cat: "Inicio y contenido" },
]

export const patternCats = ["Inicio y contenido", "Header y navegación", "Producto", "Carrito", "Checkout", "Overlays"]

/** Patrones propios + los que se muestran desde Storybook, agrupados por categoría y ordenados. */
export const patterns: NavItem[] = [...ownPatterns, ...sbNav].sort((a, b) => patternCats.indexOf(a.cat ?? "") - patternCats.indexOf(b.cat ?? "") || a.title.localeCompare(b.title))

