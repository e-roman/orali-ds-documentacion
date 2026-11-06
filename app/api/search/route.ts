import { searchIndex } from "@/lib/search-index"

export const dynamic = "force-static"

/** Índice del buscador (páginas + tokens), generado al construir el sitio. */
export function GET() {
  return Response.json(searchIndex())
}
