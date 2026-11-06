// Genera las capturas de Storybook que usan los patrones: public/patterns/{slug}-{n}.jpg y lib/shots.json (medidas).
// Uso: node scripts/shots.mjs [slug]   (necesita ../tienda-orali/node_modules/playwright y Chrome instalado)
import fs from "node:fs"
import { createRequire } from "node:module"
import ts from "typescript"

const require = createRequire(import.meta.url)
const { chromium } = require("../../tienda-orali/node_modules/playwright")
const src = ts.transpileModule(fs.readFileSync("lib/sb-patterns.ts", "utf8"), { compilerOptions: { module: "ESNext", target: "ES2020" } }).outputText
const { sbPatterns } = await import("data:text/javascript;base64," + Buffer.from(src).toString("base64"))
const SB = fs.readFileSync("lib/storybook.ts", "utf8").match(/SB = "([^"]+)"/)[1]
const kebab = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
const only = process.argv[2]

const browser = await chromium.launch({ channel: "chrome" })
const dims = fs.existsSync("lib/shots.json") ? JSON.parse(fs.readFileSync("lib/shots.json", "utf8")) : {}
for (const p of sbPatterns) {
  if (only && p.slug !== only) continue
  for (const [i, s] of p.shots.entries()) {
    const id = `${kebab(s.story[0])}--${kebab(s.story[1])}`
    const page = await browser.newPage({ viewport: { width: s.w, height: s.vh ?? 800 }, deviceScaleFactor: 1.5 })
    await page.goto(`${SB}/iframe.html?id=${id}&viewMode=story`, { waitUntil: "networkidle" })
    await page.waitForTimeout(1200)
    if (await page.locator(".sb-errordisplay:visible, #error-message:visible").count()) console.log("ERROR story", id)
    const root = page.locator("#storybook-root > *").first()
    const box = await root.boundingBox()
    const file = `public/patterns/${p.slug}-${i}.jpg`
    // Overlays fijos (drawer, menú mobile): el root queda vacío, se toma el viewport.
    if (s.vh || !box || box.height < 20) await page.screenshot({ path: file, type: "jpeg", quality: 82 })
    else await root.screenshot({ path: file, type: "jpeg", quality: 82 })
    const sz = fs.statSync(file).size
    dims[`/patterns/${p.slug}-${i}.jpg`] = s.vh || !box || box.height < 20 ? [s.w, s.vh ?? 800] : [Math.round(box.width), Math.round(box.height)]
    console.log(file, dims[`/patterns/${p.slug}-${i}.jpg`].join("x"), Math.round(sz / 1024) + "KB")
    await page.close()
  }
}
fs.writeFileSync("lib/shots.json", JSON.stringify(dims, null, 1))
await browser.close()
