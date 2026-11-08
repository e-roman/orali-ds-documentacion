import type { CSSProperties } from "react"
import type { Metadata } from "next"
import "@orali/design-tokens/tokens.css"
import "./globals.css"
import { SiteHeader } from "ds-docs-theme/docs/site-header"
import { Toaster } from "ds-docs-theme/ui/sonner"
import { TooltipProvider } from "ds-docs-theme/ui/tooltip"
import { brand, allTokens } from "@/lib/project"
import { topNav } from "@/lib/nav"
import { searchIndex } from "@/lib/search-index"

export const metadata: Metadata = {
  title: "Orali Design System",
  description: "Documentación del sistema de diseño de Tienda Orali.",
  icons: { icon: "/favicon.png", shortcut: "/favicon.png", apple: "/logo-orali.png" },
}

/** Colores de la documentación que salen del paquete de tokens, no se escriben a mano. */
const tokenValue = (name: string, fallback: string) => allTokens().find((t) => t.name === name)?.resolved ?? fallback

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const vars = {
    "--brand": tokenValue("color-text-brand", "#e30613"),
    "--success": tokenValue("color-feedback-success-text", "#15803d"),
    "--danger": tokenValue("color-feedback-error-border", "#dc2626"),
    "--doc-font-sans": '"DM Sans", system-ui, sans-serif',
    "--doc-font-mono": "ui-monospace, SFMono-Regular, Menlo, monospace",
  } as CSSProperties
  return (
    <html lang="es" className="h-full antialiased" style={vars}>
      <head>
        {/* Fuentes a nivel documento: las @font-face sí llegan a los shadow roots de las vistas */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Montserrat:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-full">
        <TooltipProvider>
          <SiteHeader entries={searchIndex()} brand={brand} topNav={topNav} />
          {children}
          <Toaster />
        </TooltipProvider>
      </body>
    </html>
  )
}
