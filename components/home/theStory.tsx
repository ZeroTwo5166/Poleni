"use client"

import { motion } from "framer-motion"
import { useTheme } from "@/components/shared/themeProvider"
import Link from "next/link"
import { fadeUp, staggerContainer, viewport } from "@/lib/animationVariants"

export default function TheStory() {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  return (
    <section
      // Removed "flex items-center justify-center" and added "pt-32 pb-24" so it aligns at the top
      className="relative min-h-screen pt-32 pb-24 px-6 overflow-hidden flex flex-col"
      style={
        !isDark
          ? {
              /* FIXED LIGHT BASE — no more pink wash */
              backgroundColor: "#faf8ff",
            }
          : undefined
      }
    >
      {/* DARK MODE TOP GLOW (UNCHANGED) */}
      {isDark && (
        <>
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px pointer-events-none"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(244,63,94,0.4), transparent)",
            }}
          />
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at top, rgba(244,63,94,0.14) 0%, transparent 70%)",
            }}
          />
        </>
      )}

      {/* BACKGROUND */}
      <div className="absolute inset-0 pointer-events-none">
        {isDark ? (
          /* DARK MODE BACKGROUND — UNTOUCHED */
          <div
            className="absolute left-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] opacity-60"
            style={{
              background:
                "radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%)",
            }}
          />
        ) : (
          /* FIXED LIGHT BACKGROUND (premium violet depth) */
          <>
            <div
              className="absolute inset-0"
              style={{
                background: `
                  radial-gradient(900px circle at 15% 20%, rgba(124,58,237,0.08), transparent 60%),
                  radial-gradient(800px circle at 85% 30%, rgba(99,102,241,0.06), transparent 55%),
                  radial-gradient(700px circle at 50% 100%, rgba(236,72,153,0.04), transparent 60%),
                  linear-gradient(180deg, #ffffff 0%, #faf8ff 60%, #f6f5ff 100%)
                `,
              }}
            />

            {/* subtle noise */}
            <div
              className="absolute inset-0 opacity-[0.03] mix-blend-multiply"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
              }}
            />
          </>
        )}
      </div>

      <div className="relative z-10 max-w-4xl mx-auto w-full">
        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="mb-12 text-center"
        >
          <span
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-bold mb-6
            ${
              isDark
                ? "border-rose-500/20 bg-rose-500/5 text-rose-400"
                : "border-rose-200 bg-white text-rose-600 shadow-sm"
            }`}
          >
            <span className="w-1 h-1 rounded-full bg-rose-400" />
            Hvad der adskiller Poleni
          </span>

          <h2
            className="text-4xl md:text-6xl font-bold leading-tight"
            style={{ color: "var(--text-primary)" }}
          >
            Du er ikke et nummer.
            <br />
            <span
              style={{
                backgroundImage:
                  "linear-gradient(135deg, #f43f5e, #fb7185)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Du er vores omdømme.
            </span>
          </h2>
        </motion.div>

        {/* Quote */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className={`relative p-8 md:p-12 rounded-2xl border-2 mb-8 overflow-hidden
            ${
              isDark
                ? "border-rose-500/20 bg-[linear-gradient(160deg,#0a0a0d_0%,rgba(244,63,94,0.10)_100%)]"
                : "border-violet-300 bg-gradient-to-br from-white to-rose-50/60 shadow-[0_20px_60px_rgba(124,58,237,0.14)]"
            }`}
        >
          <span
            className={`absolute -top-2 left-4 text-9xl font-serif leading-none pointer-events-none select-none
            ${isDark ? "text-rose-500/40" : "text-violet-200"}`}
          >
            "
          </span>

          <p
            className="text-lg md:text-xl italic leading-relaxed mb-6 relative z-10 font-medium"
            style={{ color: isDark ? "#fff" : "#0f172a" }}
          >
            "Store bureauer har 100+ kunder. Du er bare endnu en række i deres
            regneark. De mister ikke søvn over noget. Vi mister søvn over dig."
          </p>

          <div
            className="w-12 h-1 mb-6 rounded-full"
            style={{
              background: "linear-gradient(90deg, #f43f5e, #fb7185)",
            }}
          />

          <div className="flex flex-col gap-5">
            <p
              className="text-base leading-relaxed"
              style={{
                color: isDark ? "var(--text-secondary)" : "#334155",
              }}
            >
              Vi har ikke 100 kunder. Vi har en lille gruppe virksomheder, vi
              virkelig går op i.{" "}
              <span className="font-bold text-rose-500">
                Hvis du ikke vokser, vokser vi ikke.
              </span>
            </p>

            <p
              className="text-base leading-relaxed font-bold"
              style={{
                color: isDark ? "var(--text-primary)" : "#0f172a",
              }}
            >
              Store bureauer taler om resultater. Vi leverer dem.
            </p>
          </div>
        </motion.div>

        {/* Pills */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          {[
            { icon: "⚡", label: "Svar inden for få timer" },
            { icon: "👥", label: "Små med vilje" },
            { icon: "📞", label: "Direkte adgang til teamet" },
          ].map((item, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className={`flex items-center gap-3 p-4 rounded-xl border-2
                ${
                  isDark
                    ? "border-rose-500/15 bg-rose-500/[0.04]"
                    : "border-violet-300 bg-gradient-to-br from-white to-violet-50 shadow-sm"
                }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span
                className="text-sm font-bold"
                style={{
                  color: isDark ? "var(--text-secondary)" : "#6d28d9",
                }}
              >
                {item.label}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* NEW CONTENT: Core Principles (Fills the page naturally without clutter) */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16"
        >
          <div className={`p-8 rounded-2xl border ${isDark ? 'border-rose-500/15 bg-rose-500/[0.03]' : 'border-violet-500 bg-violet-50/50'}`}>
            <h3 className="text-lg font-bold mb-3" style={{ color: isDark ? '#fff' : '#0f172a' }}>
              1. Ærlighed frem for alt
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: isDark ? 'var(--text-secondary)' : '#475569' }}>
              Vi siger tingene som de er. Hvis vi ikke tror, vi kan skabe et positivt afkast for din forretning, siger vi pænt nej tak fra starten.
            </p>
          </div>
          
          <div className={`p-8 rounded-2xl border ${isDark ? 'border-rose-500/15 bg-rose-500/[0.03]' : 'border-violet-500 bg-violet-50/50'}`}>
            <h3 className="text-lg font-bold mb-3" style={{ color: isDark ? '#fff' : '#0f172a' }}>
              2. Bundlinje over forfængelighed
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: isDark ? 'var(--text-secondary)' : '#475569' }}>
              Likes og visninger betaler ikke dine regninger. Vi optimerer benhårdt efter de resultater og konverteringer, der skaber reel værdi.
            </p>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="text-center"
        >
          <Link
            href="/contact"
            className="shimmer inline-flex items-center gap-2 px-8 py-4 text-white font-bold rounded-xl
                       transition-all duration-200 shadow-lg active:scale-95 hover:scale-105"
            style={{
              background: "linear-gradient(135deg, #f43f5e, #fb7185)",
              boxShadow: "0 10px 30px rgba(244,63,94,0.25)",
            }}
          >
            Tal med os →
          </Link>
        </motion.div>
      </div>
    </section>
  )
}