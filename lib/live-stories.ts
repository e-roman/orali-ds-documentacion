/**
 * Qué vistas de cada patrón se renderizan en vivo (componente real de la tienda, inspeccionable) en lugar de mostrar una captura.
 * El orden coincide con `shots` en lib/sb-patterns.ts; las implementaciones están en content/patterns/live.tsx.
 */
export const LIVE: Record<string, boolean[]> = {
  footer: [true],
  hero: [true],
  nav: [true, true, true, true, true],
  "product-card": [true, true, true, true],
  "cart-item": [true, true],
  "product-detail": [true, true, true, true],
  "cart-drawer": [true, true, true],
  "shipping-form": [true, true, true],
  "order-summary": [true, true],
  "order-review": [true, true],
  "min-order-progress": [true, true, true],
  "newsletter-banner": [true],
  "promo-banner": [true, true],
  logo: [true, true, true],
  text: [true, true],
  layout: [true, true],
}
