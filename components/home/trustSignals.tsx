"use client"

import { motion } from "framer-motion"
import { useTheme } from "@/components/shared/themeProvider"
import Link from "next/link" 

const clients = [
  { name: "Nautk",          url: "https://nautk.pt",             initials: "NK" },
  { name: "Argo Vilamoura", url: "https://argovilamoura.pt",     initials: "AV" },
  { name: "Junto WD",       url: "https://juntowd.com",          initials: "JW" },
  { name: "The Hideout",    url: "https://thehideoutbrunch.com", initials: "TH" },
  { name: "Maiya",          url: "https://maiya.dk",             initials: "MA" },
  { name: "MightyLoyalty",  url: "https://mightyloyalty.dk",     initials: "ML" },
]

const testimonials = [
  {
    quote:    "Finally an agency that just tells you the price. No back and forth, no surprises. Our site was live in 4 days.",
    author:   "Mads K.",
    role:     "Owner, Maiya.dk",
    initials: "MK",
    color:    "bg-indigo-500",
  },
  {
    quote:    "We paused our ads for the summer and started again in September. No questions asked. That flexibility is rare.",
    author:   "Sarah L.",
    role:     "Founder, MightyLoyalty",
    initials: "SL",
    color:    "bg-purple-500",
  },
  {
    quote:    "The calculator on their site sold me before I even contacted them. Knew exactly what I was paying for.",
    author:   "Thomas B.",
    role:     "CEO, The Hideout Brunch",
    initials: "TB",
    color:    "bg-pink-500",
  },
]

export default function TrustSignals() {
  const { theme } = useTheme()
  const isDark    = theme === "dark"

  return (
    <section className="relative py-32 px-6 overflow-hidden">

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 50% 100%, rgba(99,102,241,0.05) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* Client logos */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p
            className="text-sm uppercase tracking-widest mb-10"
            style={{ color: "var(--text-muted)" }}
          >
            Trusted by
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            {clients.map((client, i) => (
              <motion.a
                key={client.name}
                href={client.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                whileHover={{ scale: 1.05, y: -2 }}
                className={`
                  flex items-center gap-3 px-5 py-3 rounded-xl glass
                  transition-colors duration-200 group
                  ${isDark
                    ? "hover:border-white/10"
                    : "hover:border-black/10"}
                `}
              >
                <div className="w-7 h-7 rounded-lg bg-indigo-500/20 border
                                border-indigo-500/20 flex items-center
                                justify-center shrink-0">
                  <span className="text-indigo-400 text-[9px] font-bold">
                    {client.initials}
                  </span>
                </div>
                <span
                  className="text-sm font-medium transition-colors duration-200"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {client.name}
                </span>
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Divider */}
        <div
          className="w-full h-px mb-16"
          style={{ background: "var(--border)" }}
        />

        {/* Testimonials header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full
                           border border-indigo-500/20 bg-indigo-500/5
                           text-indigo-400 text-xs font-medium mb-4">
            <span className="w-1 h-1 rounded-full bg-indigo-400" />
            What clients say
          </span>
          <h2
            className="text-4xl md:text-5xl font-bold"
            style={{ color: "var(--text-primary)" }}
          >
            Real feedback. No fluff.
          </h2>
        </motion.div>

        {/* Testimonials grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.author}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ scale: 1.02, y: -4 }}
              className="relative p-6 rounded-2xl glass cursor-default"
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
                <div className={`w-9 h-9 rounded-full ${t.color}
                                 flex items-center justify-center shrink-0`}>
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
                  <p
                    className="text-xs"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {t.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mt-16"
        >
          <p
            className="text-sm mb-6"
            style={{ color: "var(--text-muted)" }}
          >
            Ready to grow your business?
          </p>
          
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-indigo-500
                       hover:bg-indigo-400 text-white font-semibold rounded-xl
                       transition-colors duration-200"
          >
            Start for free →
          </Link>
        </motion.div>

      </div>
    </section>
  )
}