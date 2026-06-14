"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

export default function LegalBar() {
  const pathname = usePathname()
  const [lang, setLang] = useState<"en" | "da">("da")

  const linkClass =
    "px-3 py-1.5 rounded-full text-xs font-medium transition-colors duration-150 whitespace-nowrap"

  const isActive = (href: string) => pathname === href

  return (
    <div className="fixed bottom-5 left-5 z-40">
      <div className="glass rounded-full flex items-center gap-0.5 px-1.5 py-1.5 shadow-lg">

        {/* Terms */}
        <Link
          href="/handelsbetingelser"
          className={linkClass}
          style={{
            color: isActive("/handelsbetingelser")
              ? "var(--text-primary)"
              : "var(--text-muted)",
            background: isActive("/handelsbetingelser")
              ? "var(--bg-hover)"
              : "transparent",
          }}
        >
          Handelsbetingelser
        </Link>

        {/* Divider */}
        <span className="w-px h-3" style={{ background: "var(--border)" }} />

        {/* Privacy */}
        <Link
          href="/privatliv"
          className={linkClass}
          style={{
            color: isActive("/privatliv")
              ? "var(--text-primary)"
              : "var(--text-muted)",
            background: isActive("/privatliv")
              ? "var(--bg-hover)"
              : "transparent",
          }}
        >
          Privatliv
        </Link>

        {/* Divider */}
        <span className="w-px h-3" style={{ background: "var(--border)" }} />

        {/* Language switch */}
        <div className="flex items-center gap-0.5 px-0.5">
           <button
            onClick={() => setLang("da")}
            className="px-2 py-1.5 rounded-full text-xs font-semibold transition-colors duration-150"
            style={{
              color: lang === "da" ? "#6366f1" : "var(--text-muted)",
              background:
                lang === "da" ? "rgba(99,102,241,0.1)" : "transparent",
            }}
          >
            DA
          </button>
          {/* <button
            onClick={() => setLang("en")}
            className="px-2 py-1.5 rounded-full text-xs font-semibold transition-colors duration-150"
            style={{
              color: lang === "en" ? "#6366f1" : "var(--text-muted)",
              background:
                lang === "en" ? "rgba(99,102,241,0.1)" : "transparent",
            }}
          >
            EN
          </button> */}

         
        </div>

      </div>
    </div>
  )
}