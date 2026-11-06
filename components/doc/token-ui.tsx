import CopyToken from "@/components/copy-token"
import { contrast } from "@/lib/contrast"
import { token, tokensUsedBy, withPrefix } from "@/lib/tokens"

export const val = (name: string) => token(name)?.resolved
export const ratio = (a?: string, b?: string) => (a && b ? contrast(a, b) : null)

export function Ratio({ r, min = 4.5 }: { r: number | null; min?: number }) {
  if (r === null) return <span className="muted">—</span>
  return <span className={r >= min ? "pass" : "fail"}>{r.toFixed(2)}:1 {r >= min ? "OK" : "No cumple"}</span>
}

export function Swatch({ name }: { name: string }) {
  const t = token(name)
  if (!t) return <span className="muted">—</span>
  return (
    <span className="sw-cell" title={`--${name}`}>
      <span className={`sw tk-bg-${name}`} />
      <code>{t.resolved}</code>
    </span>
  )
}

const isColor = (v: string) => /^#|^rgb/.test(v)

/** Tabla automática de todos los tokens con un prefijo (nombre, valor y descripción). */
export function TokenTable({ prefix, exclude }: { prefix: string; exclude?: RegExp }) {
  const list = withPrefix(prefix).filter((t) => !exclude?.test(t.name))
  return (
    <div className="tablewrap">
      <table>
        <thead><tr><th></th><th>Token</th><th>Valor</th><th>Uso</th></tr></thead>
        <tbody>
          {list.map((t) => (
            <tr key={t.name}>
              <td className="td-sample">{isColor(t.resolved) && <span className={`sw tk-bg-${t.name}`} />}</td>
              <td><CopyToken name={t.name} /></td>
              <td><code>{t.resolved}</code></td>
              <td className="muted">{t.desc ?? ""}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/** Tokens globales que usa un CSS de la tienda, leídos del archivo real. */
export function UsedTokens({ file, selector }: { file: string; selector?: RegExp }) {
  const list = tokensUsedBy(file, selector)
  if (list.length === 0) return <p className="muted">Este componente no usa tokens propios.</p>
  return (
    <div className="tablewrap">
      <table>
        <thead><tr><th></th><th>Token</th><th>Valor</th></tr></thead>
        <tbody>
          {list.map((t) => (
            <tr key={t.name}>
              <td className="td-sample">{isColor(t.resolved) && <span className={`sw tk-bg-${t.name}`} />}</td>
              <td><CopyToken name={t.name} /></td>
              <td><code>{t.resolved}</code></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
