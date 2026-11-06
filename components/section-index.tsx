import Link from "next/link"
import { Fragment } from "react"
import type { NavItem } from "@/lib/nav"
import CardArt from "./card-art"

export default function SectionIndex({ title, intro, base, items }: { title: string; intro: string; base: string; items: NavItem[] }) {
  return (
    <div className="index">
      <h1 className="doc-h1">{title}</h1>
      <p className="lead">{intro}</p>
      {items.length === 0 ? (
        <p className="empty">Próximamente.</p>
      ) : (
        <ul className="cards">
          {items.map((i, n) => (
            <Fragment key={i.slug}>
              {i.cat && i.cat !== items[n - 1]?.cat && <li className="cat-h"><h2 className="doc-h2">{i.cat}</h2></li>}
              <li>
                <Link href={`${base}/${i.slug}`}>
                  <div className="card-art" aria-hidden><CardArt slug={i.slug} base={base} /></div>
                  <span className="card-title">{i.title}<i aria-hidden>→</i></span>
                </Link>
              </li>
            </Fragment>
          ))}
        </ul>
      )}
    </div>
  )
}
