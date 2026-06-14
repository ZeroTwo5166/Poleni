import Link from "next/link"

const quickLinks = [
  { label: "Services", href: "/services" },
  { label: "Prisberegner", href: "/calculator" },
  { label: "Om os", href: "/about" },
  { label: "Privatlivspolitik", href: "/privatliv" },
  { label: "Handelsbetingelser", href: "/handelsbetingelser" },
]

const socials = [
  {
    label: "LinkedIn",
    href: "#",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "#",
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "#",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
]

export default function Footer() {
  return (
    <>
      <style>{`
        .footer-link { color: var(--text-muted); transition: color 0.2s; }
        .footer-link:hover { color: var(--text-primary); }
        .footer-social { color: var(--text-muted); border: 1px solid var(--border); transition: color 0.2s, border-color 0.2s; }
        .footer-social:hover { color: var(--text-primary); border-color: var(--border-hover); }
      `}</style>

      <footer
        className="mt-24 border-t"
        style={{ background: "transparent", borderColor: "var(--border)" }}
      >
        <div className="max-w-6xl mx-auto px-6 py-16">

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

            {/* Brand col */}
            <div className="flex flex-col gap-4">
              <Link href="/" className="flex items-center gap-2 w-fit">
                <div className="w-7 h-7 rounded-lg bg-indigo-500 flex items-center justify-center">
                  <span className="text-white text-xs font-bold">P</span>
                </div>
                <span
                  className="text-sm font-semibold"
                  style={{ color: "var(--text-primary)" }}
                >
                  Poleni
                </span>
              </Link>

              <p
                className="text-sm leading-relaxed max-w-xs"
                style={{ color: "var(--text-muted)" }}
              >
                Gennemsigtig prissætning. Ingen bindinger. En klar plan og et
                team der leverer resultater.
              </p>

              <div className="flex items-center gap-3 mt-2">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="footer-social w-8 h-8 rounded-lg flex items-center justify-center"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Quick links col */}
            <div className="flex flex-col gap-4">
              <p
                className="text-sm font-medium"
                style={{ color: "var(--text-primary)" }}
              >
                Hurtige links
              </p>

              <nav className="flex flex-col gap-2">
                {quickLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="footer-link text-sm w-fit"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Contact col */}
            <div className="flex flex-col gap-4">
              <p
                className="text-sm font-medium"
                style={{ color: "var(--text-primary)" }}
              >
                Kontakt
              </p>

              <div className="flex flex-col gap-2">
                <a
                  href="mailto:kontakt@poleni.dk"
                  className="footer-link text-sm w-fit"
                >
                  kontakt@poleni.dk
                </a>
                <a
                  href="tel:+4542333995"
                  className="footer-link text-sm w-fit"
                >
                  +45 42 33 39 95
                </a>
              </div>

              <div
                className="mt-4 inline-flex items-center gap-2 px-3 py-2 rounded-lg w-fit"
                style={{
                  border: "1px solid var(--border)",
                  background: "var(--bg-card)",
                }}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                  Ingen binding
                </span>
              </div>
            </div>

          </div>

          {/* Bottom bar */}
          <div
            className="mt-16 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 border-t"
            style={{ borderColor: "var(--border)" }}
          >
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>
              © {new Date().getFullYear()} Poleni. Alle rettigheder forbeholdes.
            </p>

            <p className="text-xs" style={{ color: "var(--text-muted)" }}>
              CVR: 46361571 · København, Danmark
            </p>
          </div>

        </div>
      </footer>
    </>
  )
}