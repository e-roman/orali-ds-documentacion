/** Patrones y componentes que se muestran con capturas de Storybook (sin JSX ni fs: los usa también la navegación). */

export type Prop = [name: string, type: string, desc?: string, required?: boolean]

/** Una captura: story de Storybook (título + nombre) y ancho del viewport con que se toma. */
export type Shot = { label: string; story: [sb: string, name: string]; w: number; /** alto de viewport si la story es un overlay fijo */ vh?: number }

export type SbPattern = {
  slug: string
  /** Dónde aparece en la navegación (por defecto, Patrones). */
  group?: "patterns" | "components"
  /** Categoría del sidebar de patrones. */
  cat?: string
  /** Título en Storybook de la pieza principal (para el link a la documentación). */
  sb: string
  title: string
  nav: string
  desc: string
  shots: Shot[]
  props: Prop[]
  use: string[]
  avoid: string[]
  /** Solo se escribe lo verificado en el código; si falta, la pestaña Accesibilidad no se muestra. */
  a11y?: string[]
}

const P = "Patterns/"
const C = "Components/"

export const sbPatterns: SbPattern[] = [
  {
    slug: "nav", cat: "Header y navegación", sb: C + "Nav", title: "Header", nav: "Header del sitio, desktop y mobile.",
    desc: "Header del sitio: logo, buscador, menús de categoría, cuenta y carrito. Orquesta el estado (búsqueda, menús, acceso) y compone sus piezas: barra superior, menú desplegable, buscador y resultados, menú mobile y la versión simplificada del checkout.",
    shots: [
      { label: "Desktop", story: [C + "Nav", "Desktop"], w: 1280 },
      { label: "Mobile", story: [C + "Nav", "Mobile"], w: 390 },
      { label: "Menú abierto", story: [P + "Header/Mega menu", "Open"], w: 480 },
      { label: "Menú mobile", story: [P + "Header/Mobile menu", "Default"], w: 390, vh: 760 },
      { label: "Checkout", story: [P + "Header/Checkout header", "Default"], w: 1280 },
    ],
    props: [],
    use: ["En todas las páginas de la tienda.", "Con la versión simplificada (Checkout) durante el pago, para no distraer."],
    avoid: ["Para navegación secundaria dentro de una página: usá Tabs o Breadcrumb."],
    a11y: [
      "Los botones de ícono llevan nombre accesible: «Abrir carrito», «Menú», «Ingresar o registrarse».",
      "El disparador del menú desplegable expone aria-expanded.",
      "El buscador tiene aria-label «Buscar productos»; limpiar y buscar tienen su propio nombre.",
    ],
  },
  {
    slug: "footer", cat: "Header y navegación", sb: C + "Footer", title: "Footer", nav: "Pie del sitio.",
    desc: "Pie del sitio con enlaces, contacto y redes. Tiene una versión reducida para el checkout (en Storybook, story Checkout).",
    shots: [{ label: "Default", story: [C + "Footer", "Default"], w: 1280 }],
    props: [],
    use: ["Al final de cada página.", "Con la versión reducida en el flujo de pago."],
    avoid: ["Para acciones principales de la página."],
    a11y: ["Los enlaces a redes tienen aria-label («Orali en Instagram», «Orali en Facebook»)."],
  },
  {
    slug: "hero", cat: "Inicio y contenido", sb: C + "Hero", title: "Hero", nav: "Portada de la home.",
    desc: "Portada de la home: carrusel de tres fotos que cambia cada 5 segundos, con etiqueta, título, texto y botones sobre la imagen.",
    shots: [{ label: "Default", story: [C + "Hero", "Default"], w: 1280 }],
    props: [],
    use: ["Una vez, arriba de la home."],
    avoid: ["En páginas internas: usá Page header.", "Con más de un mensaje principal por slide."],
    a11y: ["Los puntos del carrusel tienen aria-label «Ver slide N» y marcan el activo con aria-current."],
  },
  {
    slug: "promo-banner", cat: "Inicio y contenido", sb: P + "Promo banner", title: "Promo banner", nav: "Banner promocional sobre foto.",
    desc: "Banner promocional sobre foto, con ícono, título, texto y botón.",
    shots: [{ label: "Default", story: [P + "Promo banner", "Default"], w: 1280 }, { label: "CTA propio", story: [P + "Promo banner", "Custom Cta"], w: 1280 }],
    props: [["image", "string", undefined, true], ["imageAlt", "string", undefined, true], ["icon", "ReactNode", undefined, true], ["title", "string", undefined, true], ["text", "string", undefined, true], ["href", "string", undefined, true], ["cta", "string", "Texto del botón. Por defecto «Ver productos»."]],
    use: ["Para destacar una promoción o categoría en la home."],
    avoid: ["Con textos largos: se leen sobre la foto.", "Más de uno por pantalla."],
  },
  {
    slug: "newsletter-banner", cat: "Inicio y contenido", sb: C + "Newsletter banner", title: "Newsletter banner", nav: "Suscripción por email.",
    desc: "Banner de suscripción: etiqueta, título, campo de email y botón «Suscribirme».",
    shots: [{ label: "Default", story: [C + "Newsletter banner", "Default"], w: 1280 }],
    props: [],
    use: ["Al final de la home, antes del footer."],
    avoid: ["En el checkout: distrae del pago."],
    a11y: ["El campo de email tiene aria-label «Tu email»."],
  },
  {
    slug: "product-card", cat: "Producto", sb: P + "Product card", title: "Product card", nav: "Card de producto.",
    desc: "Card de producto. Muestra el botón Agregar o el Stepper según el producto esté en el carrito. Incluye su versión skeleton.",
    shots: [
      { label: "Default", story: [P + "Product card", "Default"], w: 420 },
      { label: "En oferta", story: [P + "Product card", "On Sale"], w: 420 },
      { label: "En el carrito", story: [P + "Product card", "In Cart"], w: 420 },
      { label: "Grilla", story: [P + "Product card", "Grid"], w: 1100 },
    ],
    props: [["product", "Product", undefined, true], ["titleAs", "\"h2\" | \"h3\"", "h3 bajo un h2 de sección (home, relacionados); h2 en listados cuyo único título previo es el h1."]],
    use: ["En grillas y carruseles de productos: listados, home, relacionados."],
    avoid: ["Para mostrar un producto en el carrito: usá Cart item."],
    a11y: ["El botón Agregar lleva el nombre del producto en su aria-label.", "El nivel del título (titleAs) se elige según la jerarquía de la página."],
  },
  {
    slug: "product-detail", cat: "Producto", sb: P + "Product info", title: "Product detail", nav: "Ficha de producto: galería, info, compra y datos.",
    desc: "Las piezas de la ficha de producto: galería, columna de información (badges, título, buy box y verificación de zona) y paneles de especificaciones, descripción y tabla nutricional, con el sello de advertencia de la Ley 27.642 de Etiquetado Frontal.",
    shots: [
      { label: "Info", story: [P + "Product info", "Default"], w: 1280 },
      { label: "Galería", story: [P + "Product gallery", "Default"], w: 700 },
      { label: "Buy box", story: [P + "Buy box", "Default"], w: 480 },
      { label: "Especificaciones", story: [P + "Product specs", "Specs"], w: 1000 },
    ],
    props: [["product", "Product", "Producto a mostrar (todas las piezas).", true], ["sku", "string", "Solo ProductSpecs.", true], ["onViewSpecs", "(e: MouseEvent) => void", "Solo ProductInfo: lleva a la pestaña de especificaciones.", true]],
    use: ["En la página de producto, en este orden: galería, info y datos."],
    avoid: ["Fuera de la ficha: en listados usá Product card."],
    a11y: ["Descripción y Especificaciones son paneles con role=\"tabpanel\" y aria-labelledby.", "El sello de advertencia es role=\"img\" con aria-label que dice el exceso."],
  },
  {
    slug: "cart-item", cat: "Carrito", sb: P + "Cart item", title: "Cart item", nav: "Fila de producto en carrito y drawer.",
    desc: "Ítem de carrito con Stepper, Price e Icon button. Tiene variante para la página y para el drawer.",
    shots: [{ label: "Página", story: [P + "Cart item", "Page"], w: 800 }, { label: "Drawer", story: [P + "Cart item", "Drawer"], w: 440 }],
    props: [["product", "Product", undefined, true], ["quantity", "number", undefined, true], ["variant", "keyof typeof VARIANT"], ["loading", "\"inc\" | \"dec\" | null", "Muestra el spinner en el botón que se presionó."], ["onIncrement", "() => void", undefined, true], ["onDecrement", "() => void", undefined, true], ["onRemove", "() => void", undefined, true], ["onNavigate", "() => void", "Se llama al navegar a la ficha (por ejemplo, para cerrar el drawer)."]],
    use: ["En la página del carrito y en el drawer."],
    avoid: ["Para productos en un listado: usá Product card."],
    a11y: ["El botón de quitar tiene aria-label «Eliminar»."],
  },
  {
    slug: "cart-drawer", cat: "Carrito", sb: C + "Cart drawer", title: "Cart drawer", nav: "Drawer del carrito.",
    desc: "Drawer del carrito. Combina Drawer, Cart item, Min order progress, Empty state y un pie con subtotal, pedido mínimo y acción de finalizar. Toma su estado del carrito global.",
    shots: [
      { label: "Vacío", story: [C + "Cart drawer", "Empty"], w: 520, vh: 760 },
      { label: "Bajo el mínimo", story: [C + "Cart drawer", "Below Minimum"], w: 520, vh: 760 },
      { label: "Mínimo alcanzado", story: [C + "Cart drawer", "Minimum Met"], w: 520, vh: 760 },
    ],
    props: [],
    use: ["Para ver y ajustar el carrito sin salir de la página."],
    avoid: ["Para el resumen final del pedido: usá Order summary."],
    a11y: ["Hereda de Drawer: role=\"dialog\", aria-modal y el título como nombre."],
  },
  {
    slug: "min-order-progress", cat: "Carrito", sb: P + "Min order progress", title: "Min order progress", nav: "Progreso hacia el pedido mínimo.",
    desc: "Progreso hacia el pedido mínimo. Variante «card» (carrito): alerta con borde, porcentaje y detalle en unidades. Variante «compact» (drawer): una fila. La barra flotante de la tienda usa el mismo dato.",
    shots: [
      { label: "En progreso", story: [P + "Min order progress", "In Progress"], w: 640 },
      { label: "Mínimo alcanzado", story: [P + "Min order progress", "Minimum Met"], w: 640 },
      { label: "Compact", story: [P + "Min order progress", "Compact In Progress"], w: 440 },
    ],
    props: [["variant", "keyof typeof VARIANT", "card o compact."], ["className", "string"]],
    use: ["Mientras el pedido no alcanza el mínimo, en el carrito y el drawer."],
    avoid: ["Para otro tipo de progreso: usá el componente Progress."],
  },
  {
    slug: "order-summary", cat: "Carrito", sb: P + "Order summary", title: "Order summary", nav: "Resumen del pedido en el carrito.",
    desc: "Resumen del pedido con total, cupón y botón de finalizar. Envío gratis en CABA.",
    shots: [{ label: "Bajo el mínimo", story: [P + "Order summary", "Below Minimum"], w: 480 }, { label: "Listo", story: [P + "Order summary", "Ready"], w: 480 }],
    props: [["totalItems", "number", undefined, true], ["subtotal", "number", undefined, true], ["total", "number", undefined, true], ["minimumMet", "boolean", undefined, true], ["remainingForMinimum", "number", undefined, true], ["loading", "boolean"], ["onCheckout", "() => void", undefined, true]],
    use: ["En la página del carrito, junto a la lista de productos."],
    avoid: ["Para el resumen de un paso del checkout: usá Order review."],
  },
  {
    slug: "shipping-form", cat: "Checkout", sb: P + "Shipping form", title: "Shipping form", nav: "Formulario de envío del checkout.",
    desc: "Formulario de envío del checkout. Es dueño de su estado y entrega los datos al enviar. Solo permite continuar con zona CABA y barrio reconocido; avisa la cobertura con DeliveryZoneNotice.",
    shots: [
      { label: "Vacío", story: [P + "Shipping form", "Empty"], w: 720 },
      { label: "Fuera de CABA", story: [P + "Shipping form", "Outside Caba"], w: 720 },
      { label: "Con datos", story: [P + "Shipping form", "Prefilled"], w: 720 },
    ],
    props: [["defaultValues", "Partial<ShippingData>", "Valores iniciales."], ["loading", "boolean"], ["onSubmit", "(data: ShippingData) => void", undefined, true]],
    use: ["En el paso de envío del checkout."],
    avoid: ["Para formularios sin validación de zona: armalo con Field + Input."],
    a11y: ["El código postal marca aria-invalid cuando no es válido."],
  },
  {
    slug: "order-review", cat: "Checkout", sb: P + "Order review", title: "Order review", nav: "Resumen de compra del checkout.",
    desc: "Resumen de compra del checkout. Incluye RecapCard: la tarjeta de recap de un paso completado, con botón de editar.",
    shots: [{ label: "Default", story: [P + "Order review", "Default"], w: 720 }, { label: "Recap", story: [P + "Order review", "Recap"], w: 720 }],
    props: [["items", "{ product: Product; quantity: number }[]", undefined, true], ["subtotal", "number", undefined, true], ["total", "number", undefined, true]],
    use: ["Antes de pagar, para revisar productos y pasos completados."],
    avoid: ["En el carrito: usá Order summary."],
    a11y: ["El botón de editar tiene un aria-label propio (editLabel)."],
  },
  {
    slug: "logo", group: "components", sb: "UI/Logo", title: "Logo", nav: "Logotipo de Orali.",
    desc: "Logotipo de Orali en cuatro tamaños.",
    shots: [{ label: "Default", story: ["UI/Logo", "Default"], w: 600 }, { label: "Large", story: ["UI/Logo", "Large"], w: 600 }, { label: "Checkout", story: ["UI/Logo", "Checkout"], w: 600 }],
    props: [["size", "\"sm\" | \"md\" | \"lg\" | \"checkout\"", "Por defecto md."], ["className", "string"]],
    use: ["En el header y el footer; el tamaño checkout, en el header simplificado."],
    avoid: ["Redibujarlo o cambiarle el color."],
  },
  {
    slug: "text", group: "components", sb: "UI/Text", title: "Text", nav: "Texto y títulos por escalones.",
    desc: "Text y Heading. Tamaño, tono y peso se eligen por props, nunca con utilidades de Tailwind.",
    shots: [{ label: "Body", story: ["UI/Text", "Body"], w: 700 }, { label: "Headings", story: ["UI/Text", "Headings"], w: 700 }],
    props: [["as", "ElementType", "Elemento HTML."], ["size", "xs … 4xl", "Escalón de tamaño. En Heading también: display, headline, title, subtitle, label, section, page."], ["tone", "primary | secondary | tertiary | brand | accent | success | error | inverse | inverse-muted | shipping-free"], ["weight", "regular | medium | semibold | bold"], ["flush", "boolean", "Interlineado 1: numerales grandes."], ["eyebrow", "boolean", "Mayúsculas espaciadas, para etiquetas sobre un título."], ["relaxed", "boolean", "Interlineado holgado para textos largos."]],
    use: ["Para todo texto de la interfaz, con el escalón de la tipografía del sistema."],
    avoid: ["Tamaños o colores sueltos con utilidades de Tailwind."],
  },
  {
    slug: "layout", group: "components", sb: "UI/Layout", title: "Layout", nav: "Row y Stack con gap por token.",
    desc: "Row y Stack: filas y columnas con gap por token. Arman piezas sin utilidades de Tailwind; la grilla de página sigue siendo grid/grid-cols.",
    shots: [{ label: "Row", story: ["UI/Layout", "Row Example"], w: 600 }, { label: "Stack", story: ["UI/Layout", "Stack Example"], w: 600 }],
    props: [["as", "ElementType"], ["gap", "1 | 2 | 3 | 4 | 5 | 6 | 8 | 10", "Separación por escalón de espacio."], ["align", "start | center | end | stretch"], ["justify", "start | center | between | end"], ["wrap", "boolean", "Solo Row."], ["inline", "boolean", "Solo Row."]],
    use: ["Para alinear y separar elementos con la escala de spacing."],
    avoid: ["Para la grilla de página: usá grid."],
  },
]

/** Capturas que genera scripts/shots.mjs: /patterns/{slug}-{n}.jpg */
export const shotFile = (slug: string, i: number) => `/patterns/${slug}-${i}.jpg`

export const sbNav = sbPatterns.filter((p) => p.group !== "components").map((p) => ({ slug: p.slug, title: p.title, description: p.nav, cat: p.cat }))
export const sbNavComponents = sbPatterns.filter((p) => p.group === "components").map((p) => ({ slug: p.slug, title: p.title, description: p.nav }))
