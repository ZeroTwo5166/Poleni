"use client"

import { motion } from "framer-motion"
import { useTheme } from "@/components/shared/themeProvider"
import Link from "next/link"
import { fadeUp, staggerContainer, viewport } from "@/lib/animationVariants"

const testimonials = [
  {
    quote:
      "Endelig et bureau der bare fortæller prisen. Ingen frem og tilbage, ingen overraskelser. Vores site var live på 4 dage.",
    author: "Mads K.",
    role: "Ejer, Maiya.dk",
    initials: "MK",
    color: "bg-emerald-500",
  },
  {
    quote:
      "Vi satte vores annoncer på pause over sommeren og startede igen i september. Ingen spørgsmål stillet. Den fleksibilitet er sjælden.",
    author: "Sarah L.",
    role: "Grundlægger, MightyLoyalty",
    initials: "SL",
    color: "bg-emerald-600",
  },
  {
    quote:
      "Kalkulatoren på deres hjemmeside solgte mig, før jeg overhovedet kontaktede dem. Jeg vidste præcis, hvad jeg betalte for.",
    author: "Thomas B.",
    role: "CEO, The Hideout Brunch",
    initials: "TB",
    color: "bg-emerald-700",
  },
]

export default function TrustSignals() {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  return (
    <section className="relative py-32 px-6 overflow-hidden">

      {/* subtle green glow (dark only) */}
      {isDark && (
        <>
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px pointer-events-none"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(16,185,129,0.25), transparent)",
            }}
          />
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at top, rgba(16,185,129,0.10) 0%, transparent 70%)",
            }}
          />
        </>
      )}

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* Header */}
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
                       border border-emerald-500/20 bg-emerald-500/10
                       text-emerald-600 text-xs font-medium mb-4"
          >
            <span className="w-1 h-1 rounded-full bg-emerald-500" />
            Hvad kunder siger
          </span>

          <h2
            className="text-4xl md:text-5xl font-bold"
            style={{ color: "var(--text-primary)" }}
          >
            Ægte feedback. Ingen fyld.
          </h2>
        </motion.div>

        {/* Cards */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          exit="exit"
          viewport={viewport}
        >
          {testimonials.map((t) => (
            <motion.div
              key={t.author}
              variants={fadeUp}
              whileHover={{ scale: 1.02, y: -4 }}
              className="relative p-6 rounded-2xl"
              style={
                isDark
                  ? {
                      background: "#0f1412",
                      border: "1px solid rgba(16,185,129,0.12)",
                    }
                  : {
                      background:
                        "linear-gradient(160deg, #ffffff 0%, #ecfdf5 100%)",
                      border: "1px solid rgba(16,185,129,0.18)",
                      boxShadow: "0 12px 32px rgba(16,185,129,0.06)",
                    }
              }
            >
              <span
                className="text-4xl font-serif absolute top-4 right-5"
                style={{ color: "var(--text-primary)", opacity: 0.05 }}
              >
                &quot;
              </span>

              <p
                className="text-sm leading-relaxed mb-6 relative z-10"
                style={{ color: "var(--text-secondary)" }}
              >
                &quot;{t.quote}&quot;
              </p>

              <div className="flex items-center gap-3">
                <div
                  className={`w-9 h-9 rounded-full ${t.color} flex items-center justify-center shrink-0`}
                >
                  <span className="text-white text-xs font-bold">
                    {t.initials}
                  </span>
                </div>

                <div>
                  <p
                    className="text-sm font-medium"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {t.author}
                  </p>
                  <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                    {t.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          exit="exit"
          viewport={viewport}
          className="text-center mt-16"
        >
          <p className="text-sm mb-6" style={{ color: "var(--text-muted)" }}>
            Klar til at vækste din virksomhed?
          </p>

          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-500
                       hover:bg-emerald-400 text-black font-semibold rounded-xl
                       transition-colors duration-200"
          >
            Kom i gang gratis →
          </Link>
        </motion.div>

      </div>
    </section>
  )
}