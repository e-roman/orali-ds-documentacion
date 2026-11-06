# Iconografía: textos propuestos

Para el agente de código: nueva página en Foundations (`/foundations/iconography`). Slug sugerido `iconography`; título "Iconografía". Tablas y demos las arma el agente de código; acá solo va el contenido.

**Descripción (tarjeta y bajada):** Íconos de línea de Lucide, en siete tamaños y con color por token.

## Qué es
Orali usa la librería **Lucide** (`lucide-react`): íconos de línea, de trazo uniforme y esquinas redondeadas, que combinan con Montserrat. No hay íconos propios salvo el logotipo.

## Tamaños
Se eligen con una clase, nunca con utilidades de Tailwind (`w-` / `h-`). Cada tamaño sale de la escala de spacing.

| Clase | Tamaño | Dónde se usa |
|---|---|---|
| `icon-xs` | 14 px | Junto a texto chico, como avisos y badges |
| `icon-sm` | 16 px | Dentro de botones y links |
| `icon-md` | 20 px | Tamaño base: listas, features, botones grandes |
| `icon-lg` | 24 px | Íconos de acción: cerrar, buscar, carrito |
| `icon-xl` | 28 px | Íconos de apoyo en cards |
| `icon-2xl` | 36 px | Íconos dentro de Icon badge |
| `icon-3xl` | 40 px | Estados vacíos y pantallas de confirmación |

> Verificar: los usos son una propuesta a partir de lo que se ve en los componentes; confirmar con el código antes de publicar.

## Color
Los íconos heredan el color del texto (`currentColor`). Cuando necesitan uno propio, usan estos tokens:

| Token | Para qué |
|---|---|
| `color-icon-default` | Íconos de interfaz |
| `color-icon-subtle` | Íconos secundarios o deshabilitados |
| `color-icon-brand` | Íconos de marca y de énfasis |
| `color-icon-inverse` | Íconos sobre fondos oscuros o foto |

## Reglas
- **Decorativo por defecto.** Un ícono que acompaña a un texto lleva `aria-hidden`: el significado lo da el texto.
- **Solo ícono, con nombre.** Si no hay texto, el botón necesita `aria-label` (ver Icon button).
- **Un ícono, un significado.** Usá el mismo ícono para la misma acción en todo el sitio.
- **No los uses solos para comunicar estado.** Sumá texto o color con contraste suficiente.
- **Área táctil.** Un ícono clickeable tiene al menos 44 px de área, aunque se dibuje más chico.

## Ejemplo
```tsx
import { ShoppingCart } from "lucide-react"

<Button><ShoppingCart className="icon-sm" aria-hidden />Agregar</Button>
```

## Relacionados
Button, Icon button, Icon badge.
