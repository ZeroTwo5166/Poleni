"use client"

import { motion } from "framer-motion"
import { useTheme } from "@/components/shared/themeProvider"
import Link from "next/link"
import { fadeUp, staggerContainer, viewport } from "@/lib/animationVariants"

const cases = [
  {
    title: "Café Nims, Ballerup",
    headline: "Styrket synlighed for ny café i Ballerup",
    text: "Café Nims i Ballerup havde brug for at blive set. Café Nims var helt ny. Ingen kendte den. Med et lille budget på 2.500 kr. over 3 uger kørte vi målrettede Meta-ads i lokalområdet og optimerede deres Google-profil. Resultatet: over 800 lokale handlinger (rutevejledning, opkald, klik til hjemmeside). Caféen fik gæster ind ad døren fra den første uge – noget der ellers kan tage måneder for en ny café.",
    initials: "CN",
    color: "bg-indigo-500",
    href: null,
  },
  {
    title: "Maiya.dk (Maiya Nepali Kitchen)",
    headline: "Flere gæster gennem døren med annoncering",
    text: "Maiya.dk er en nepalesisk restaurant på Amager. De investerede 8.000 kr. i Google Ads og Facebook-annoncering over 6 uger. Resultatet: over 1.500 lokale handlinger (direkte klik, opkald, rutevejledning). Bookinger steg med ca. 20% i perioden, og restauranten fik flere nye gæster, der havde set dem på nettet.",
    initials: "MN",
    color: "bg-purple-500",
    href: "https://maiya.dk/",
  },
  {
    title: "MightyLoyalty",
    headline: "Loyalty software der skaber gentagne køb",
    text: "MightyLoyalty hjælper caféer, restauranter og butikker med at fastholde kunder gennem digital loyalitet. Vi har hjulpet med at positionere produktet, opsætte hjemmeside og definere målgrupper.",
    initials: "ML",
    color: "bg-pink-500",
    href: "https://mightyloyalty.dk",
  },
]

export default function OurWork() {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  return (
    <section className="relative py-32 px-6 overflow-hidden">
      {/* Top glow — dark mode only */}
      {isDark && (
        <>
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px pointer-events-none"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(6,182,212,0.4), transparent)",
            }}
          />
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at top, rgba(6,182,212,0.12) 0%, transparent 70%)",
            }}
          />
        </>
      )}

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          exit="exit"
          viewport={viewport}
          className="text-center mb-12"
        >
          <span
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full
                       border border-cyan-500/20 bg-cyan-500/5
                       text-cyan-500 text-xs font-medium mb-4"
          >
            <span className="w-1 h-1 rounded-full bg-cyan-500" />
            Vores arbejde
          </span>

          <h2
            className="text-4xl md:text-5xl font-bold"
            style={{ color: "var(--text-primary)" }}
          >
            Resultater, ikke løfter.
          </h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          exit="exit"
          viewport={viewport}
        >
          {cases.map((c) => {
            const CardInner = (
              <>
                <span
                  className="text-4xl font-serif absolute top-4 right-5 select-none"
                  style={{ color: "var(--text-primary)", opacity: 0.05 }}
                >
                  &quot;
                </span>

                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`w-9 h-9 rounded-full ${c.color} flex items-center justify-center shrink-0`}
                  >
                    <span className="text-white text-xs font-bold">
                      {c.initials}
                    </span>
                  </div>

                  <p
                    className="text-sm font-medium"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {c.title}
                  </p>
                </div>

                <h3
                  className="text-base font-semibold mb-3 relative z-10"
                  style={{ color: "var(--text-primary)" }}
                >
                  {c.headline}
                </h3>

                <p
                  className="text-sm leading-relaxed relative z-10"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {c.text}
                </p>

                {c.href && (
                  <p
                    className="text-xs font-medium mt-4 relative z-10 text-left"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {c.href.replace(/^https?:\/\//, "")} ↗
                  </p>
                )}
              </>
            )

            return (
              <motion.div
                key={c.title}
                variants={fadeUp}
                whileHover={{ scale: 1.02, y: -4 }}
                className="relative p-6 rounded-2xl glass cursor-default flex flex-col justify-between"
              >
                {c.href ? (
                  <a
                    href={c.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block h-full w-full text-left clear-both"
                  >
                    {CardInner}
                  </a>
                ) : (
                  <div>{CardInner}</div>
                )}
              </motion.div>
            )
          })}
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          exit="exit"
          viewport={viewport}
          className="text-center mt-16"
        >
          <p className="text-sm mb-6" style={{ color: "var(--text-muted)" }}>
            Klar til at vokse? Kontakt os og få en gratis gennemgang af din virksomhed.
          </p>

          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-indigo-500
                       hover:bg-indigo-400 text-white font-semibold rounded-xl
                       transition-colors duration-200"
          >
            Book et uforpligtende møde →
          </Link>
        </motion.div>
      </div>
    </section>
  )
}