"use client"

import { motion } from "framer-motion"
import { useTheme } from "@/components/shared/themeProvider"
import Link from "next/link"

const values = [
  {
    icon: "◈",
    title: "Transparency",
    desc: "You see the price before you sign. No vague quotes, no surprise invoices.",
    color: "text-indigo-400",
    border: "border-indigo-500/20",
    bg: "bg-indigo-500/5",
  },
  {
    icon: "⬡",
    title: "Honesty",
    desc: "We tell you what you need — not what makes us the most money.",
    color: "text-purple-400",
    border: "border-purple-500/20",
    bg: "bg-purple-500/5",
  },
  {
    icon: "○",
    title: "No bullshit",
    desc: "No 12-month lock-ins. No hidden fees. No corporate nonsense.",
    color: "text-pink-400",
    border: "border-pink-500/20",
    bg: "bg-pink-500/5",
  },
]

const stats = [
  { value: "6+", label: "Clients served" },
  { value: "100%", label: "Transparent pricing" },
  { value: "24h", label: "Response time" },
  { value: "0", label: "Lock-in contracts" },
]

export default function AboutPage() {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  return (
    <main className="min-h-screen pt-32 pb-24 px-6 overflow-x-hidden">
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
            About Poleni
          </span>
          <h1
            className="text-5xl md:text-7xl font-bold mb-8 leading-[1.1] tracking-tight"
            style={{ color: "var(--text-primary)" }}
          >
            Built for businesses
            <br />
            <span className="gradient-text">tired of being overcharged</span>
          </h1>
          <p
            className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed opacity-80"
            style={{ color: "var(--text-secondary)" }}
          >
            We started Poleni because small businesses deserve honest pricing
            and real results — not 12-month traps and vague promises.
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
                Founder story
              </span>
              <h2
                className="text-3xl md:text-4xl font-bold"
                style={{ color: "var(--text-primary)" }}
              >
                Why we built Poleni
              </h2>
              <div className="space-y-4 text-base md:text-lg opacity-80" style={{ color: "var(--text-secondary)" }}>
                <p>
                  I kept seeing small business owners get burned by agencies —
                  locked into 12-month contracts, paying monthly retainers for
                  work they couldn&apos;t measure, and never knowing what they were
                  actually getting.
                </p>
                <p>
                  So I built Poleni differently. Fixed prices. Transparent timelines.
                  No lock-in. You see exactly what you&apos;re paying for before you
                  pay a single krone.
                </p>
                <p>
                  Our developers and ad specialists are based in Copenhagen.
                  Experienced, reliable, and fast.
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
                <h3 className="font-bold text-xl mb-1" style={{ color: "var(--text-primary)" }}>Poleni Founder</h3>
                <p className="text-sm mb-8 opacity-60" style={{ color: "var(--text-muted)" }}>CEO & Lead Developer</p>

                <div className="space-y-3">
                  {[
                    { dot: "bg-green-400", text: "Based in Copenhagen", pulse: true },
                    { dot: "bg-indigo-400", text: "Full-stack developer", pulse: false },
                    { dot: "bg-purple-400", text: "Google & Meta Ads certified", pulse: false },
                  ].map((item) => (
                    <div
                      key={item.text}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl transition-colors"
                      style={{
                        background: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)",
                        border: `1px solid ${isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"}`,
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
            What we stand for
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
            Ready to work together?
          </h2>
          <p className="mb-10 max-w-md mx-auto text-lg opacity-70" style={{ color: "var(--text-secondary)" }}>
            Free consultation. No pressure. We&apos;ll tell you exactly what you need and what it costs.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/contact"
              className="w-full sm:w-auto px-10 py-5 bg-indigo-500 hover:bg-indigo-400 text-white font-bold rounded-2xl transition-all hover:scale-105 active:scale-95 shadow-lg shadow-indigo-500/20"
            >
              Book free consultation →
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
              See our services
            </Link>
          </div>
        </motion.div>

      </div>
    </main>
  )
}