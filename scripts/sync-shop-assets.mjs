// Copia las imágenes de la tienda (productos, banners) a public/ para que los patrones en vivo las muestren.
// Se corre antes de dev/build/start. Solo lectura sobre ../tienda-orali.
import fs from "node:fs"
import path from "node:path"

const shop = path.resolve("..", "tienda-orali", "public")
for (const dir of ["imagenes", "cards"]) {
  const from = path.join(shop, dir)
  if (!fs.existsSync(from)) { console.warn(`sync-shop-assets: no existe ${from}`); continue }
  fs.cpSync(from, path.join("public", dir), { recursive: true })
  console.log(`sync-shop-assets: ${dir} copiado`)
}
