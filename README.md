# Orali Design System — documentación

Sitio de documentación del sistema de diseño de Tienda Orali: Foundations, Componentes y Patrones. Los previews usan los componentes reales de la tienda, así que lo que se ve acá es lo que se ve en el sitio.

Publicado en https://orali-doc.emilianoroman.com.ar (Vercel, proyecto `orali-ds-documentacion`).

## De dónde sale cada cosa

| Qué | Origen | Cómo llega |
| --- | --- | --- |
| Componentes y patrones (`@shop/*`) | repo privado [`tienda-orali`](https://github.com/e-roman/tienda-orali), rama `main` | carpeta hermana `../tienda-orali`; en el build la clona `scripts/fetch-shop.mjs` |
| Tokens (`@orali/design-tokens`) | repo [`orali-design-tokens`](https://github.com/e-roman/orali-design-tokens) | dependencia de `package.json`; en Vercel `scripts/update-tokens.mjs` instala el tag `vX.Y.Z` más alto |
| Textos, estructura e ilustraciones de las cards | este repo (`content/`, `lib/`, `public/illustrations/`) | — |

Este proyecto **no modifica** `tienda-orali`: solo lo lee.

## Desarrollo local

Requisitos: Node 20+, y `tienda-orali` clonada como carpeta hermana de este repo.

```
proyectos/
├─ tienda-orali/
└─ orali-ds-documentacion/   ← este repo
```

```bash
npm install
npm run dev        # http://localhost:3200
```

`npm run dev` primero copia las imágenes de la tienda a `public/` (`scripts/sync-shop-assets.mjs`).
No dejes corriendo `next dev` y `next start` a la vez sobre la misma carpeta: comparten `.next` y se pisan.

## Actualización automática (Vercel)

Cada deploy compila con la tienda y los tokens vigentes. Se dispara solo cuando:

- cambia este repo (push a `main`);
- hay un push a `main` en `tienda-orali`, o un push a `main` o un tag `v*` en `orali-design-tokens`. Esos dos repos tienen el workflow `.github/workflows/redeploy-docs.yml`, que llama a un Deploy Hook de Vercel (secreto `VERCEL_DEPLOY_HOOK` de cada repo).

Configuración necesaria en Vercel (proyecto `orali-ds-documentacion`):

- Variable de entorno `GH_TOKEN`: token fine-grained de solo lectura (Contents: Read-only) sobre `tienda-orali`. **Vence**: al renovarlo, actualizá la variable.
- Deploy Hooks `tienda-orali` y `orali-design-tokens`, ambos sobre `main`.

## Si el build falla en Vercel

- `fetch-shop: no se pudo clonar tienda-orali`: falta `GH_TOKEN`, venció o no tiene acceso al repo.
- `Module not found: @shop/...`: la tienda no se clonó; revisá las primeras líneas del log (`fetch-shop:`).
- Un tag de tokens nuevo rompió algo: fijá la versión anterior en `package.json` y volvé a desplegar.

## Estructura

- `app/`: rutas (Foundations, Componentes, Patrones, Empezar) y estilos globales.
- `components/`: UI de la documentación (sidebar, tabs, inspector, previews).
- `content/`: páginas de componentes y patrones.
- `lib/`: navegación, tokens, índice de búsqueda y datos de Storybook.
- `public/illustrations/`: ilustraciones de las cards (trazo negro y un acento rojo; ver `illustrations/index.html`).
