import { clsx, type ClassValue } from "clsx"

/** Igual que lib/utils.ts de tienda-orali: los componentes de la tienda importan `cn` desde "@/lib/utils". */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}
