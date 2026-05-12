import Link from "next/link"

const quickLinks = [
  { label: "Services",   href: "/services" },
  { label: "Calculator", href: "/calculator" },
  { label: "About",      href: "/about" },
]

const socials = [
  {
    label: "LinkedIn",
    href: "#",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/>
        <circle cx="4" cy="4" r="2"/>
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "#",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "#",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
      </svg>
    ),
  },
]

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#080808] mt-24">
      <div className="max-w-6xl mx-auto px-6 py-16">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

          {/* Brand col */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2 w-fit">
              <div className="w-7 h-7 rounded-lg bg-indigo-500 flex items-center justify-center">
                <span className="text-white text-xs font-bold">P</span>
              </div>
              <span className="text-white font-semibold text-lg">Poleni</span>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              Transparent pricing. No contracts. Just a clear plan and a team that delivers results.
            </p>

            {/* Socials */}
            <div className="flex items-center gap-3 mt-2">
              {socials.map((s) => (
                <a 
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-8 h-8 rounded-lg border border-white/10 flex items-center
                             justify-center text-gray-500 hover:text-white
                             hover:border-white/20 transition-colors duration-200"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick links col */}
          <div className="flex flex-col gap-4">
            <p className="text-white text-sm font-medium">Quick links</p>
            <nav className="flex flex-col gap-2">
              {quickLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-500 hover:text-white text-sm
                             transition-colors duration-200 w-fit"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact col */}
          <div className="flex flex-col gap-4">
            <p className="text-white text-sm font-medium">Contact</p>
            <div className="flex flex-col gap-2">
              <a
                href="mailto:kontakt@poleni.dk"
                className="text-gray-500 hover:text-white text-sm
                           transition-colors duration-200 w-fit"
              >
                kontakt@poleni.dk
              </a>
              <a
                href="tel:+4542333995"
                className="text-gray-500 hover:text-white text-sm
                           transition-colors duration-200 w-fit"
              >
                +45 42 33 39 95
              </a>
            </div>

            {/* Mini trust badge */}
            <div className="mt-4 inline-flex items-center gap-2 px-3 py-2 rounded-lg
                            border border-white/5 bg-white/[0.02] w-fit">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span className="text-gray-500 text-xs">No lock-in contracts</span>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row
                        items-center justify-between gap-4">
          <p className="text-gray-600 text-xs">
            © {new Date().getFullYear()} Poleni. All rights reserved.
          </p>
          <p className="text-gray-600 text-xs">
            CVR: XXXXXXXX · Copenhagen, Denmark
          </p>
        </div>

      </div>
    </footer>
  )
}