"use client"

import { motion } from "framer-motion"
import { useTheme } from "@/components/shared/themeProvider"
import Link from "next/link"

const values = [
  {
    icon: "◈",
    title: "Gennemsigtighed",
    desc: "Du ser prisen, før du skriver under. Ingen uklare tilbud, ingen overraskelsesfakturaer.",
    color: "text-indigo-400",
    border: "border-indigo-500/20",
    bg: "bg-indigo-500/5",
  },
  {
    icon: "⬡",
    title: "Ærlighed",
    desc: "Vi fortæller dig, hvad du har brug for — ikke hvad der giver os mest penge.",
    color: "text-purple-400",
    border: "border-purple-500/20",
    bg: "bg-purple-500/5",
  },
  {
    icon: "○",
    title: "Intet bullshit",
    desc: "Ingen 12-måneders binding. Ingen skjulte gebyrer. Ingen corporate nonsens.",
    color: "text-pink-400",
    border: "border-pink-500/20",
    bg: "bg-pink-500/5",
  },
]

const stats = [
  { value: "6+", label: "Kunder hjulpet" },
  { value: "100%", label: "Gennemsigtig prissætning" },
  { value: "24h", label: "Svartid" },
  { value: "0", label: "Bindingsaftaler" },
]

export default function AboutPage() {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  return (
    <main className="relative min-h-screen pt-32 pb-24 px-6 overflow-x-hidden">
      {!isDark && (
        <div
          className="absolute inset-0 pointer-events-none -z-10"
          style={{
            background: `
              radial-gradient(900px circle at 10% 10%, rgba(99,102,241,0.07), transparent 55%),
              radial-gradient(800px circle at 90% 25%, rgba(168,85,247,0.06), transparent 55%),
              radial-gradient(700px circle at 50% 100%, rgba(236,72,153,0.05), transparent 60%)
            `,
          }}
        />
      )}
      <div className="max-w-5xl mx-auto">

        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-24"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full
                           border border-indigo-500/20 bg-indigo-500/5
                           text-indigo-400 text-xs font-medium mb-6">
            <span className="w-1 h-1 rounded-full bg-indigo-400" />
            Om Poleni
          </span>
          <h1
            className="text-4xl sm:text-5xl md:text-7xl font-bold mb-8 leading-[1.1] tracking-tight"
            style={{ color: "var(--text-primary)" }}
          >
            Bygget til virksomheder
            <br />
            <span className="gradient-text">trætte af at blive overopkrævet</span>
          </h1>
          <p
            className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed opacity-80"
            style={{ color: "var(--text-secondary)" }}
          >
            Vi startede Poleni, fordi små virksomheder fortjener ærlig prissætning
            og reelle resultater — ikke 12-måneders fælder og vage løfter.
          </p>
        </motion.div>

        {/* Founder Story Card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass rounded-3xl p-8 md:p-16 mb-12 border border-white/5"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Story Text */}
            <div className="space-y-6">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full
                               border border-purple-500/20 bg-purple-500/5
                               text-purple-400 text-xs font-medium">
                <span className="w-1 h-1 rounded-full bg-purple-400" />
                Grundlæggerhistorie
              </span>
              <h2
                className="text-3xl md:text-4xl font-bold"
                style={{ color: "var(--text-primary)" }}
              >
                Hvorfor vi byggede Poleni
              </h2>
              <div className="space-y-4 text-base md:text-lg opacity-80" style={{ color: "var(--text-secondary)" }}>
                <p>
                  Jeg så hele tiden små virksomhedsejere blive udnyttet af bureauer —
                  låst i 12-måneders kontrakter, betale månedlige retainers for
                  arbejde de ikke kunne måle, og aldrig vide hvad de faktisk fik.
                </p>
                <p>
                  Så jeg byggede Poleni anderledes. Faste priser. Gennemsigtige tidslinjer.
                  Ingen binding. Du ser præcis hvad du betaler for, før du
                  betaler en eneste krone.
                </p>
                <p>
                  Vores udviklere og annonce-specialister er baseret i København.
                  Erfarne, pålidelige og hurtige.
                </p>
              </div>
            </div>

            {/* Visual Profile Card */}
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-tr from-indigo-500/20 to-purple-500/20 blur-2xl rounded-full opacity-50 group-hover:opacity-80 transition-opacity" />
              <div className="relative glass p-8 rounded-2xl text-center border border-white/10">
                <div className="w-24 h-24 rounded-2xl bg-indigo-500 flex items-center
                                justify-center mx-auto mb-6 text-white text-3xl font-bold shadow-xl shadow-indigo-500/20">
                  P
                </div>
                <h3 className="font-bold text-xl mb-1" style={{ color: "var(--text-primary)" }}>Poleni Grundlægger</h3>
                <p className="text-sm mb-8 opacity-60" style={{ color: "var(--text-muted)" }}>Stifter & CEO</p>

                <div className="space-y-3">
                  {[
                    { dot: "bg-green-400", text: "Baseret i København", pulse: true },
                    { dot: "bg-indigo-400", text: "Full-stack udvikler", pulse: false },
                    { dot: "bg-purple-400", text: "Google & Meta Ads certificeret", pulse: false },
                  ].map((item) => (
                    <div
                      key={item.text}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl transition-colors"
                      style={{
                        background: isDark ? "rgba(255,255,255,0.03)" : "rgba(99,102,241,0.05)",
                        border: `1px solid ${isDark ? "rgba(255,255,255,0.06)" : "rgba(99,102,241,0.12)"}`,
                      }}
                    >
                      <div className={`w-2 h-2 rounded-full shrink-0 ${item.dot} ${item.pulse ? "animate-pulse" : ""}`} />
                      <span className="text-sm font-medium" style={{ color: "var(--text-secondary)" }}>{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Values Section */}
        <div className="mb-24">
          <h2 className="text-3xl font-bold mb-12 text-center" style={{ color: "var(--text-primary)" }}>
            Hvad vi står for
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5 }}
                className={`p-8 rounded-3xl border ${value.border} ${value.bg} backdrop-blur-sm`}
              >
                <span className={`text-4xl ${value.color} mb-6 block`}>{value.icon}</span>
                <h3 className="text-xl font-bold mb-3" style={{ color: "var(--text-primary)" }}>{value.title}</h3>
                <p className="text-sm leading-relaxed opacity-70" style={{ color: "var(--text-secondary)" }}>{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-24">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.04, y: -3 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="glass rounded-2xl p-8 text-center"
            >
              <p className="text-4xl font-bold mb-2 tracking-tighter" style={{ color: "var(--text-primary)" }}>{stat.value}</p>
              <p className="text-xs uppercase tracking-widest opacity-50 font-bold" style={{ color: "var(--text-muted)" }}>{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Refined CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-[2.5rem] p-12 md:p-20 text-center relative overflow-hidden"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />

          <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: "var(--text-primary)" }}>
            Klar til at arbejde sammen?
          </h2>
          <p className="mb-10 max-w-md mx-auto text-lg opacity-70" style={{ color: "var(--text-secondary)" }}>
            Gratis konsultation. Ingen pres. Vi fortæller dig præcis hvad du har brug for og hvad det koster.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/contact"
              className="w-full sm:w-auto px-10 py-5 bg-indigo-500 hover:bg-indigo-400 text-white font-bold rounded-2xl transition-all hover:scale-105 active:scale-95 shadow-lg shadow-indigo-500/20"
            >
              Book gratis konsultation →
            </Link>

            <Link
              href="/services"
              className={`
                w-full sm:w-auto px-10 py-5 rounded-2xl font-bold transition-all border hover:scale-105 active:scale-95
                ${isDark
                  ? "border-white/10 hover:border-white/20 text-white bg-white/5"
                  : "border-black/10 hover:border-black/20 text-gray-900 bg-black/5"}
              `}
            >
              Se vores services
            </Link>
          </div>
        </motion.div>

      </div>
    </main>
  )
}