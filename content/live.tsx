"use client"
import { Tag } from "lucide-react"
import { AppRouterContext } from "next/dist/shared/lib/app-router-context.shared-runtime"
import { useEffect, type MouseEvent, type ReactNode } from "react"
import { Toaster } from "sonner"
import { CartProvider, useCart } from "@/lib/cart-context"
import { SeedCart, sampleProduct, saleProduct, sampleProducts } from "@shop/.storybook/fixtures"
import CartDrawer from "@shop/components/cart-drawer"
import Footer from "@shop/components/footer"
import Hero from "@shop/components/hero"
import NewsletterBanner from "@shop/components/newsletter-banner"
import { Row, Stack } from "@shop/components/ui/layout"
import { Logo } from "@shop/components/ui/logo"
import { Heading, Text } from "@shop/components/ui/text"
import { BuyBox } from "@shop/components/patterns/buy-box"
import { CartItem } from "@shop/components/patterns/cart-item"
import { CheckoutHeader } from "@shop/components/patterns/header/checkout-header"
import { MegaMenu } from "@shop/components/patterns/header/mega-menu"
import { MobileMenu } from "@shop/components/patterns/header/mobile-menu"
import { PASTAS_ITEMS } from "@shop/components/patterns/header/nav-items"
import Nav from "@shop/components/nav"
import { MinOrderProgress } from "@shop/components/patterns/min-order-progress"
import { OrderReview, RecapCard } from "@shop/components/patterns/order-review"
import { OrderSummary } from "@shop/components/patterns/order-summary"
import { ProductGallery } from "@shop/components/patterns/product-gallery"
import { ProductInfo } from "@shop/components/patterns/product-info"
import { ProductSpecs } from "@shop/components/patterns/product-specs"
import { PromoBanner } from "@shop/components/patterns/promo-banner"
import { ShippingForm } from "@shop/components/patterns/shipping-form"
import ProductCard from "@shop/components/patterns/product-card"

/** El producto de ejemplo sin oferta: el estado «Default» no muestra precio anterior ni descuento. */
const regularProduct = { ...sampleProduct, onSale: false, originalPriceX3: undefined }

/** Producto con datos extra, para el panel de especificaciones. */
const specsProduct = {
  ...regularProduct,
  conservation: "Mantener refrigerado entre 0 y 5 °C. Consumir dentro de las 48 hs de abierto.",
  nutritionTable: {
    portion: "100 g",
    rows: [
      { label: "Valor energético", value: "250 kcal" },
      { label: "Carbohidratos", value: "38 g" },
      { label: "Proteínas", value: "9 g" },
      { label: "Grasas totales", value: "6 g" },
    ],
  },
  legalWarnings: ["sodio"],
}

const noop = () => {}

/** Router de mentira: el Nav busca y «navega» con useRouter; acá no debe salir de la documentación. */
const fakeRouter = {
  push: noop, replace: noop, back: noop, forward: noop, refresh: noop,
  prefetch: () => Promise.resolve(),
} as unknown as NonNullable<React.ContextType<typeof AppRouterContext>>

/** Pedido de ejemplo del resumen de compra: dos productos, 1 y 2 packs. */
const reviewItems = sampleProducts.slice(0, 2).map((product, i) => ({ product, quantity: i + 1 }))
const reviewSubtotal = reviewItems.reduce((sum, i) => sum + i.product.priceX3 * i.quantity, 0)

/** Los links del patrón llevan a páginas de la tienda: acá no se navega. */
const inert = (e: MouseEvent) => {
  if ((e.target as Element).closest("a")) e.preventDefault()
}

/**
 * Entorno de la tienda para un patrón: carrito (opcionalmente precargado), avisos y ancho.
 * `contain` es para overlays que la tienda dibuja con position: fixed (drawer): el contenedor los encierra en su propio recuadro.
 */
function Env({ width, cart, contain, children }: { width: number | "full"; cart?: { product: typeof sampleProduct; quantity: number }[]; contain?: boolean; children: ReactNode }) {
  return (
    <CartProvider>
      <div className={`shop-scope demo-w-${width}${contain ? " live-fixed" : ""}`} onClickCapture={inert}>
        {cart ? <SeedCart items={cart}>{children}</SeedCart> : children}
      </div>
      <Toaster />
    </CartProvider>
  )
}

/** Mantiene abierto el drawer del carrito y evita que bloquee el scroll de la documentación. */
function KeepOpen({ children }: { children: ReactNode }) {
  const { isOpen, openCart } = useCart()
  useEffect(() => {
    if (!isOpen) openCart()
  }, [isOpen, openCart])
  useEffect(() => {
    const unlock = () => {
      if (document.body.style.overflow === "hidden") document.body.style.overflow = ""
    }
    unlock()
    const mo = new MutationObserver(unlock)
    mo.observe(document.body, { attributes: true, attributeFilter: ["style"] })
    return () => mo.disconnect()
  }, [])
  return <>{children}</>
}

/** Nav completo: con carrito de ejemplo y sin navegar. */
function NavEnv({ children }: { children: ReactNode }) {
  return <AppRouterContext.Provider value={fakeRouter}>{children}</AppRouterContext.Provider>
}

const promo = {
  image: sampleProduct.image,
  imageAlt: sampleProduct.name,
  icon: <Tag aria-hidden="true" />,
  title: "Ofertas de la semana",
  text: "Hasta 20% off en packs seleccionados.",
  href: "/ofertas",
}

/** Las mismas stories que Storybook, pero con el componente real renderizado acá (así se puede inspeccionar).
 *  El índice coincide con `shots` del patrón (lib/sb-patterns.ts) y con lib/live-stories.ts. */
const STORIES: Record<string, ReactNode[]> = {
  "product-card": [
    <Env key="0" width={280}><ProductCard product={regularProduct} /></Env>,
    <Env key="1" width={280}><ProductCard product={saleProduct} /></Env>,
    <Env key="2" width={280} cart={[{ product: regularProduct, quantity: 2 }]}><ProductCard product={regularProduct} /></Env>,
    <Env key="3" width={872}>
      <div className="grid grid-cols-3 gap-4">
        {sampleProducts.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>
    </Env>,
  ],
  "cart-item": [
    <Env key="0" width={560}><CartItem product={regularProduct} quantity={2} onIncrement={noop} onDecrement={noop} onRemove={noop} /></Env>,
    <Env key="1" width={560}><CartItem product={regularProduct} quantity={2} variant="drawer" onIncrement={noop} onDecrement={noop} onRemove={noop} /></Env>,
  ],
  "product-detail": [
    <Env key="0" width={480}><ProductInfo product={regularProduct} onViewSpecs={noop} /></Env>,
    <Env key="1" width={480}><div className="demo-h-480"><ProductGallery product={regularProduct} /></div></Env>,
    <Env key="2" width={420}><BuyBox product={regularProduct} /></Env>,
    <Env key="3" width={880}><ProductSpecs product={specsProduct} sku="ORA-0001" /></Env>,
  ],
  "cart-drawer": [
    <Env key="0" width={520} contain><KeepOpen><CartDrawer /></KeepOpen></Env>,
    <Env key="1" width={520} contain cart={[{ product: sampleProducts[0], quantity: 2 }]}><KeepOpen><CartDrawer /></KeepOpen></Env>,
    <Env key="2" width={520} contain cart={[{ product: sampleProducts[0], quantity: 2 }, { product: sampleProducts[1], quantity: 2 }]}><KeepOpen><CartDrawer /></KeepOpen></Env>,
  ],
  "shipping-form": [
    <Env key="0" width={560}><ShippingForm onSubmit={noop} /></Env>,
    <Env key="1" width={560}><ShippingForm onSubmit={noop} defaultValues={{ localidad: "La Plata", cp: "1900" }} /></Env>,
    <Env key="2" width={560}><ShippingForm onSubmit={noop} defaultValues={{ nombre: "María", apellido: "González", direccion: "Av. Corrientes 1234", localidad: "Palermo", cp: "1414", telefono: "11 4567-8901" }} /></Env>,
  ],
  "order-summary": [
    <Env key="0" width={400}><OrderSummary totalItems={2} subtotal={25500} total={25500} minimumMet={false} remainingForMinimum={2} onCheckout={noop} /></Env>,
    <Env key="1" width={400}><OrderSummary totalItems={4} subtotal={51000} total={51000} minimumMet remainingForMinimum={0} onCheckout={noop} /></Env>,
  ],
  "order-review": [
    <Env key="0" width={420}><OrderReview items={reviewItems} subtotal={reviewSubtotal} total={reviewSubtotal} /></Env>,
    <Env key="1" width={420}>
      <RecapCard title="Envío" editLabel="Editar envío" onEdit={noop}>
        <p>María González</p>
        <p>Av. Corrientes 1234, Palermo</p>
      </RecapCard>
    </Env>,
  ],
  "min-order-progress": [
    <Env key="0" width={420} cart={[{ product: sampleProduct, quantity: 2 }]}><MinOrderProgress /></Env>,
    <Env key="1" width={420} cart={[{ product: sampleProduct, quantity: 4 }]}><MinOrderProgress /></Env>,
    <Env key="2" width={420} cart={[{ product: sampleProduct, quantity: 1 }]}><MinOrderProgress variant="compact" /></Env>,
  ],
  "newsletter-banner": [
    <Env key="0" width="full"><NewsletterBanner /></Env>,
  ],
  "promo-banner": [
    <Env key="0" width={560}><PromoBanner {...promo} /></Env>,
    <Env key="1" width={560}><PromoBanner {...promo} cta="Aprovechar ahora" /></Env>,
  ],
  logo: [
    <Env key="0" width={600}><Logo /></Env>,
    <Env key="1" width={600}><Logo size="lg" /></Env>,
    <Env key="2" width={600}><Logo size="checkout" /></Env>,
  ],
  text: [
    <Env key="0" width={600}><Text>La calidad que vos te merecés.</Text></Env>,
    <Env key="1" width={600}>
      <div className="demo-stack-12">
        {(["display", "headline", "title", "subtitle", "label", "section", "page"] as const).map((size) => (
          <Heading key={size} size={size}>{size}</Heading>
        ))}
      </div>
    </Env>,
  ],
  layout: [
    <Env key="0" width={600}>
      <Row gap={4} align="center" justify="between">
        <div className="demo-box-sample">Uno</div><div className="demo-box-sample">Dos</div><div className="demo-box-sample">Tres</div>
      </Row>
    </Env>,
    <Env key="1" width={600}>
      <Stack gap={3}>
        <div className="demo-box-sample">Uno</div><div className="demo-box-sample">Dos</div><div className="demo-box-sample">Tres</div>
      </Stack>
    </Env>,
  ],
  nav: [
    <Env key="0" width="full"><NavEnv><Nav /></NavEnv></Env>,
    <iframe key="1" className="live-frame live-frame--nav" src="/live/nav-mobile" title="Header en mobile (390 px)" loading="lazy" />,
    <Env key="2" width={480}><div className="demo-minh-320"><MegaMenu label="Pastas" items={PASTAS_ITEMS} verTodosKey="pastas-todos" open onToggle={noop} onItemClick={noop} /></div></Env>,
    <Env key="3" width={392} contain><MobileMenu onClose={noop} onOpenAuth={noop} /></Env>,
    <Env key="4" width="full"><CheckoutHeader /></Env>,
  ],
  footer: [
    <Env key="0" width="full"><Footer /></Env>,
  ],
  hero: [
    <Env key="0" width="full"><Hero /></Env>,
  ],
}

/** Vista del header en mobile: se carga en un iframe de 390 px para que apliquen los breakpoints reales. */
export function NavMobileEmbed() {
  return <Env width="full"><NavEnv><Nav /></NavEnv></Env>
}

export default function LiveStory({ slug, index }: { slug: string; index: number }) {
  return <>{STORIES[slug]?.[index] ?? null}</>
}
