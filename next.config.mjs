import createMDX from "@next/mdx"
import path from "node:path"

const withMDX = createMDX({})
const here = process.cwd()

/**
 * Los componentes reales viven en ../tienda-orali (se importan como @shop/*, solo lectura).
 * Para no duplicar lucide y clsx (React lo resuelve Next solo), se fuerza a que resuelvan desde este proyecto.
 * "@/lib/utils" (cn) existe también acá: es la misma función que usa la tienda.
 */
/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  transpilePackages: ["@orali/design-tokens"],
  experimental: { externalDir: true },
  // Igual que la tienda: imágenes sin optimizar y los dominios de las fotos del hero y los productos.
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "www.tiendaorali.com", pathname: "/**" },
      { protocol: "https", hostname: "pastasorali.com", pathname: "/**" },
    ],
  },
  webpack: (config) => {
    for (const pkg of ["lucide-react", "clsx", "sonner"]) {
      config.resolve.alias[pkg] = path.join(here, "node_modules", pkg)
    }
    return config
  },
}

export default withMDX(nextConfig)
