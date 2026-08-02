"use client"

import { motion } from "framer-motion"
import { useTheme } from "@/components/shared/themeProvider"
import Link from "next/link"
import { fadeUp, scaleFade, staggerContainer, viewport } from "@/lib/animationVariants"



const clients = [
  { name: "Nautk",          url: "https://nautk.pt",             initials: "NK" },
  { name: "Argo Vilamoura", url: "https://argovilamoura.pt",     initials: "AV" },
  { name: "Junto WD",       url: "https://juntowd.com",          initials: "JW" },
  { name: "The Hideout",    url: "https://thehideoutbrunch.com", initials: "TH" },
  { name: "Maiya",          url: "https://maiya.dk",             initials: "MA" },
  { name: "MightyLoyalty",  url: "https://mightyloyalty.dk",     initials: "ML" },
]


export default function Guarantee() {
  const { theme } = useTheme()
  const isDark    = theme === "dark"

  return (
    <section className="relative py-32 px-6 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(99,102,241,0.06) 0%, transparent 65%)" }}
      />

      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          exit="exit"
          viewport={viewport}
          className="relative p-10 md:p-16 rounded-3xl border overflow-hidden text-center
                     border-indigo-500/20 bg-indigo-500/5"
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(99,102,241,0.1) 0%, transparent 60%)" }}
          />

          <motion.div
            variants={scaleFade}
            initial="hidden"
            whileInView="visible"
            exit="exit"
            viewport={viewport}
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl
                       bg-indigo-500/10 border border-indigo-500/20 mb-8 text-3xl"
          >
            🛡️
          </motion.div>

          <h2 className="text-4xl md:text-6xl font-bold leading-tight mb-6" style={{ color: "var(--text-primary)" }}>
            3 months. Results.
            <br />
            <span className="gradient-text">Or we don't get paid.</span>
          </h2>

          <p className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10" style={{ color: "var(--text-secondary)" }}>
            We work for 90 days. If you don't see more customers, you don't pay for our service.
          </p>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12 text-left"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            exit="exit"
            viewport={viewport}
          >
            {[
              { step: "01", title: "We start working", desc: "Full setup, strategy, and execution from day one." },
              { step: "02", title: "90 days of results", desc: "We track everything. You see the numbers every month." },
              { step: "03", title: "You decide", desc: "Seeing results? Continue. Not satisfied? You don't pay." },
            ].map((item) => (
              <motion.div
                key={item.step}
                variants={fadeUp}
                className={`p-5 rounded-2xl border
                  ${isDark ? "border-white/[0.06] bg-white/[0.02]" : "border-black/[0.06] bg-black/[0.02]"}`}
              >
                <span className="text-xs font-bold text-indigo-400 bg-indigo-500/10
                               border border-indigo-500/20 rounded-lg px-2 py-1 mb-3 inline-block">
                  {item.step}
                </span>
                <p className="text-sm font-semibold mb-1" style={{ color: "var(--text-primary)" }}>{item.title}</p>
                <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="shimmer px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-400 hover:to-purple-400 text-white
                         font-semibold rounded-xl transition-colors duration-200
                         w-full sm:w-auto text-center"
            >
              Claim your free audit →
            </Link>
            <Link
              href="/partnership"
              className={`px-8 py-4 rounded-xl font-medium transition-all duration-300
                text-base w-full sm:w-auto text-center border
                ${isDark
                  ? "border-white/10 hover:border-white/20 text-gray-300 hover:text-white bg-white/[0.02] hover:bg-white/[0.05]"
                  : "border-black/10 hover:border-black/20 text-gray-600 hover:text-gray-900 bg-black/[0.02] hover:bg-black/[0.05]"}`}
            >
              No budget? See partnership →
            </Link>
          </div>



        </motion.div>
        
        {/* Client logos */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          exit="exit"
          viewport={viewport}
          className="text-center mb-16"
        >
          <p className="text-sm mt-10 uppercase tracking-widest mb-10" style={{ color: "var(--text-muted)" }}>
            Trusted by
          </p>
          <motion.div
            className="flex flex-wrap items-center justify-center gap-4"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            exit="exit"
            viewport={viewport}
          >
            {clients.map((client) => (
              <motion.a
                key={client.name}
                href={client.url}
                target="_blank"
                rel="noopener noreferrer"
                variants={fadeUp}
                whileHover={{ scale: 1.05, y: -2 }}
                className={`flex items-center gap-3 px-5 py-3 rounded-xl glass
                  transition-colors duration-200 group
                  ${isDark ? "hover:border-white/10" : "hover:border-black/10"}`}
              >
                <div className="w-7 h-7 rounded-lg bg-indigo-500/20 border border-indigo-500/20
                                flex items-center justify-center shrink-0">
                  <span className="text-indigo-400 text-[9px] font-bold">{client.initials}</span>
                </div>
                <span className="text-sm font-medium transition-colors duration-200" style={{ color: "var(--text-secondary)" }}>
                  {client.name}
                </span>
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}