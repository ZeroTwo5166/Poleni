"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useLocale } from "./localeProvider"
import { useT } from "@/lib/i18n/useT"

export default function LegalBar() {
  const pathname = usePathname()
  const { locale, setLocale } = useLocale()
  const t = useT()

  const linkClass =
    "px-3 py-1.5 text-xs font-medium transition-colors duration-150 whitespace-nowrap"

  const isActive = (href: string) => pathname === href

  return (
    <div className="fixed bottom-5 left-5 z-40">
      <div
        className="flex items-center gap-0.5 px-1 py-1"
        style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)" }}
      >

        {/* Terms — hidden on mobile, footer already links to it */}
        <Link
          href="/handelsbetingelser"
          className={`hidden sm:inline-block ${linkClass}`}
          style={{
            color: isActive("/handelsbetingelser")
              ? "var(--text-primary)"
              : "var(--text-muted)",
            background: isActive("/handelsbetingelser")
              ? "var(--bg-hover)"
              : "transparent",
          }}
        >
          {t.legalBar.terms}
        </Link>

        {/* Divider */}
        <span className="hidden sm:block w-px h-3" style={{ background: "var(--border)" }} />

        {/* Privacy — hidden on mobile, footer already links to it */}
        <Link
          href="/privatliv"
          className={`hidden sm:inline-block ${linkClass}`}
          style={{
            color: isActive("/privatliv")
              ? "var(--text-primary)"
              : "var(--text-muted)",
            background: isActive("/privatliv")
              ? "var(--bg-hover)"
              : "transparent",
          }}
        >
          {t.legalBar.privacy}
        </Link>

        {/* Divider */}
        <span className="hidden sm:block w-px h-3" style={{ background: "var(--border)" }} />

        {/* Language switch — active language gets a filled chip, not just a
            color change, since text-color-only contrast was too weak to
            read at a glance in light mode. */}
        <div className="flex items-center gap-0.5 px-0.5">
          <button
            onClick={() => setLocale("da")}
            aria-pressed={locale === "da"}
            aria-label="Dansk"
            className="px-2 py-1.5 text-xs font-semibold transition-colors duration-150"
            style={{
              color: locale === "da" ? "var(--bg)" : "var(--text-muted)",
              background: locale === "da" ? "var(--accent)" : "transparent",
            }}
          >
            DA
          </button>
          <button
            onClick={() => setLocale("en")}
            aria-pressed={locale === "en"}
            aria-label="English"
            className="px-2 py-1.5 text-xs font-semibold transition-colors duration-150"
            style={{
              color: locale === "en" ? "var(--bg)" : "var(--text-muted)",
              background: locale === "en" ? "var(--accent)" : "transparent",
            }}
          >
            EN
          </button>
        </div>

      </div>
    </div>
  )
}
