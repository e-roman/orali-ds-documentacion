import type { Metadata } from "next"
import "@orali/design-tokens/tokens.css"
import "./shop.css"
import "./globals.css"
import SiteHeader from "@/components/site-header"
import InspectDrawer from "@/components/doc/inspector"
import SearchPalette from "@/components/search-palette"

export const metadata: Metadata = {
  title: "Orali Design System",
  description: "Documentación del sistema de diseño de Tienda Orali.",
  icons: { icon: "/favicon.png", shortcut: "/favicon.png", apple: "/logo-orali.png" },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href="/api/utility-css" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Montserrat:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <SiteHeader />
        {children}
        <InspectDrawer />
        <SearchPalette />
      </body>
    </html>
  )
}
