// En Vercel (o cualquier entorno limpio) ../tienda-orali no existe: se clona su rama main para compilar con los componentes reales.
// En local, donde la carpeta ya existe, no hace nada. Repo privado: definir GH_TOKEN (token de solo lectura).
import fs from "node:fs"
import path from "node:path"
import { execFileSync } from "node:child_process"

const dest = path.resolve("..", "tienda-orali")
if (fs.existsSync(path.join(dest, "package.json"))) {
  console.log("fetch-shop: ../tienda-orali ya existe, no se clona")
  process.exit(0)
}
const token = process.env.GH_TOKEN
const url = token ? `https://x-access-token:${token}@github.com/e-roman/tienda-orali.git` : "https://github.com/e-roman/tienda-orali.git"
const branch = process.env.SHOP_BRANCH || "main"
try {
  execFileSync("git", ["clone", "--depth", "1", "--branch", branch, url, dest], { stdio: ["ignore", "inherit", "inherit"] })
  console.log(`fetch-shop: tienda-orali (${branch}) clonada en ${dest}`)
} catch {
  console.error("fetch-shop: no se pudo clonar tienda-orali. Si el repo es privado, definí GH_TOKEN en las variables de entorno.")
  process.exit(1)
}
