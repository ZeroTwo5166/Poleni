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
    color: "bg-amber-500",
    // Placeholder image for Cafe
    image: "https://r4pr9pzkx7.ufs.sh/f/aSsRCWKGHkXJQ5K4KcYzsL9rcI3tEbHl2Wd1ATjp4QFRPvfV",
    href: null,
  },
  {
    title: "Maiya.dk (Maiya Nepali Kitchen)",
    headline: "Flere gæster gennem døren med annoncering",
    text: "Maiya.dk er en nepalesisk restaurant på Amager. De investerede 8.000 kr. i Google Ads og Facebook-annoncering over 6 uger. Resultatet: over 1.500 lokale handlinger (direkte klik, opkald, rutevejledning). Bookinger steg med ca. 20% i perioden, og restauranten fik flere nye gæster, der havde set dem på nettet.",
    initials: "MN",
    color: "bg-yellow-500",
    // Placeholder image for Restaurant
    image: "https://r4pr9pzkx7.ufs.sh/f/aSsRCWKGHkXJzYYdnPZs9QSLCK7uZRrceti8MTa6YgNoqxGz",
    href: "https://maiya.dk/",
  },
  {
    title: "MightyLoyalty",
    headline: "Loyalty software der skaber gentagne køb",
    text: "MightyLoyalty hjælper caféer, restauranter og butikker med at fastholde kunder gennem digital loyalitet. Vi har hjulpet med at positionere produktet, opsætte hjemmeside og definere målgrupper.",
    initials: "ML",
    color: "bg-orange-500",
    // Placeholder image for Software
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
    href: "https://mightyloyalty.dk",
  },
]

export default function OurWork() {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  return (
    <section className="relative py-32 px-6 overflow-hidden transition-colors duration-500">
      {/* Top glow — dark mode only */}
      {isDark && (
        <>
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px pointer-events-none"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(245,158,11,0.45), transparent)",
            }}
          />

          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at top, rgba(245,158,11,0.12) 0%, transparent 70%)",
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
          className="text-center mb-16"
        >
          <span
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full
                       border border-amber-500/20 bg-amber-500/10
                       text-amber-600 dark:text-amber-500 text-xs font-bold mb-4"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
            Vores arbejde
          </span>

          <h2
            className="text-4xl md:text-5xl font-bold tracking-tight"
            style={{ color: "var(--text-primary)" }}
          >
            Resultater, ikke løfter.
          </h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          exit="exit"
          viewport={viewport}
        >
          {cases.map((c) => {
            const CardInner = (
              <>
                {/* Image Section */}
                <div className="w-full h-56 relative overflow-hidden bg-gray-100 dark:bg-zinc-800 border-b border-black/5 dark:border-white/5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={c.image}
                    alt={c.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  
                  {/* Floating Initials Badge over the image */}
                  <div
                    className={`absolute top-4 left-4 w-10 h-10 rounded-xl ${c.color} flex items-center justify-center shrink-0 shadow-lg`}
                  >
                    <span className="text-white text-sm font-bold">
                      {c.initials}
                    </span>
                  </div>
                </div>

                {/* Text Section */}
                <div className="p-6 flex flex-col flex-1 relative">
                  <span
                    className="text-5xl font-serif absolute top-4 right-5 select-none leading-none"
                    style={{ color: "var(--text-primary)", opacity: 0.04 }}
                  >
                    &quot;
                  </span>

                  <p
                    className="text-sm font-bold mb-2 uppercase tracking-wide"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {c.title}
                  </p>

                  <h3
                    className="text-xl font-bold mb-3 relative z-10"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {c.headline}
                  </h3>

                  <p
                    className="text-sm leading-relaxed relative z-10 mb-4 flex-1"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {c.text}
                  </p>

                  {c.href && (
                    <div className="mt-auto pt-4 border-t border-black/5 dark:border-white/5">
                      <p
                        className="text-xs font-semibold relative z-10 text-amber-600 dark:text-amber-500 group-hover:text-amber-500 dark:group-hover:text-amber-400 transition-colors"
                      >
                        Besøg siden ↗
                      </p>
                    </div>
                  )}
                </div>
              </>
            )

            return (
              <motion.div
                key={c.title}
                variants={fadeUp}
                whileHover={{ y: -6 }}
                className={`relative group rounded-2xl cursor-default flex flex-col justify-between overflow-hidden transition-all duration-300 ${
                  isDark
                    ? "bg-[#0b0b0f] border border-white/10 hover:border-white/20 hover:shadow-[0_8px_30px_rgba(245,158,11,0.1)]"
                    : "bg-gradient-to-b from-white to-amber-50/60 border border-amber-200/70 shadow-xl shadow-amber-500/5 hover:shadow-2xl hover:shadow-amber-500/15"
                }`}
              >
                {c.href ? (
                  <a
                    href={c.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block h-full w-full text-left clear-both flex flex-col"
                  >
                    {CardInner}
                  </a>
                ) : (
                  <div className="block h-full w-full text-left clear-both flex flex-col">
                    {CardInner}
                  </div>
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
          className="text-center mt-20"
        >
          <p
            className="text-sm mb-6"
            style={{ color: "var(--text-muted)" }}
          >
            Klar til at vokse? Kontakt os og få en gratis gennemgang af din
            virksomhed.
          </p>

          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4
                       bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400
                       text-white font-bold rounded-xl shadow-[0_8px_20px_rgba(245,158,11,0.3)]
                       hover:shadow-[0_8px_25px_rgba(245,158,11,0.4)] hover:-translate-y-1
                       transition-all duration-300"
          >
            Book et uforpligtende møde →
          </Link>
        </motion.div>
      </div>
    </section>
  )
}