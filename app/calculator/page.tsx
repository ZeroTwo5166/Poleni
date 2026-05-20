// app/calculator/page.tsx
"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "@/components/shared/themeProvider"
import {
  WEBSITE_TYPES,
  ADDONS,
  GROWTH_MESSAGES,
  type WebsiteTypeId,
  type AddonId,
} from "@/lib/pricing"
import DeviceMockup from "@/components/home/deviceMockup"

const faqs = [
  {
    q: "Is the ads budget included in the price?",
    a: "No. The monthly price covers our management fee only. Your ads budget (what you spend on Google or Meta) is separate and goes directly to the platform.",
  },
  {
    q: "Can I pause or cancel anytime?",
    a: "Yes. All marketing services are month-to-month. No lock-in contracts. Pause or cancel with 30 days notice.",
  },
  {
    q: "Is the website price really one-time?",
    a: "Yes. You pay once and own it forever. No monthly platform fees, no surprise charges. Hosting is extra but we'll help you set it up cheap.",
  },
  {
    q: "How accurate is this estimate?",
    a: "Very accurate for standard projects. Custom projects may vary. Book a free consultation and we'll give you an exact quote.",
  },
]

const colors = [
  "from-gray-600 to-gray-500",
  "from-blue-600 to-blue-400",
  "from-indigo-600 to-purple-400",
  "from-indigo-500 via-purple-500 to-pink-400",
]

const included = [
  "Fixed price — no surprise invoices",
  "You own the website forever",
  "No lock-in on marketing services",
  "Monthly reports on all services",
  "Direct access to your team",
  "Response within 24 hours",
]

export default function CalculatorPage() {
  const [websiteType, setWebsiteType]   = useState<WebsiteTypeId>("static")
  const [activeAddons, setActiveAddons] = useState<Set<AddonId>>(new Set())
  const [openFaq, setOpenFaq]           = useState<number | null>(null)
  const { theme }                       = useTheme()
  const isDark                          = theme === "dark"

  const selectedSite  = WEBSITE_TYPES.find((t) => t.id === websiteType)!
  const monthlyTotal  = ADDONS
    .filter((a) => activeAddons.has(a.id))
    .reduce((sum, a) => sum + a.price, 0)
  const growthCount   = activeAddons.size
  const growthPct     = Math.round((growthCount / 3) * 100)
  const growthMessage = GROWTH_MESSAGES[growthCount]
  const gradientClass = colors[Math.round((growthPct / 100) * 3)]

  function toggleAddon(id: AddonId) {
    setActiveAddons((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const inactiveCard = isDark ? {
    borderColor: "rgba(255,255,255,0.15)",
    backgroundColor: "rgba(255,255,255,0.08)",
  } : {
    borderColor: "rgba(0,0,0,0.15)",
    backgroundColor: "rgba(0,0,0,0.04)",
  }

  const inactiveAddon = isDark ? {
    borderColor: "rgba(255,255,255,0.15)",
    backgroundColor: "rgba(255,255,255,0.08)",
  } : {
    borderColor: "rgba(0,0,0,0.15)",
    backgroundColor: "rgba(0,0,0,0.04)",
  }

  return (
    <main className="min-h-screen pt-32 pb-24 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full
                           border border-indigo-500/20 bg-indigo-500/5
                           text-indigo-400 text-xs font-medium mb-6">
            <span className="w-1 h-1 rounded-full bg-indigo-400" />
            Growth calculator
          </span>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight"
            style={{ color: "var(--text-primary)" }}>
            What does it cost
            <br />
            <span className="gradient-text">to grow your business?</span>
          </h1>
          <p className="text-lg max-w-2xl mx-auto leading-relaxed"
            style={{ color: "var(--text-secondary)" }}>
            Build your package and see the exact price instantly.
            No hidden fees. No surprises. No sales calls.
          </p>
        </motion.div>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">

          {/* ── LEFT: inputs + included ── */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col gap-6"
          >
            {/* Website type */}
            <div className="glass rounded-2xl p-6">
              <p className="text-sm font-medium mb-1" style={{ color: "var(--text-primary)" }}>
                1. Choose your website type
              </p>
              <p className="text-xs mb-4" style={{ color: "var(--text-muted)" }}>
                One-time fixed price — you own it forever
              </p>
              <div className="grid grid-cols-2 gap-3">
                {WEBSITE_TYPES.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setWebsiteType(type.id)}
                    className="relative p-4 rounded-xl border text-left transition-all duration-200"
                    style={websiteType === type.id ? {
                      borderColor: "rgba(99,102,241,0.6)",
                      backgroundColor: "rgba(99,102,241,0.12)",
                      boxShadow: "0 0 0 1px rgba(99,102,241,0.2)",
                    } : inactiveCard}
                  >
                    {websiteType === type.id && (
                      <motion.div
                        layoutId="calc-page-site-bg"
                        className="absolute inset-0 rounded-xl bg-indigo-500/5"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10 flex flex-col gap-1">
                      <span className="text-xl">{type.icon}</span>
                      <span className="text-sm font-medium" style={{
                        color: websiteType === type.id ? "#818cf8" : "var(--text-primary)",
                      }}>
                        {type.label}
                      </span>
                      <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                        {type.desc}
                      </span>
                      <span className="text-sm font-bold mt-1" style={{
                        color: websiteType === type.id ? "var(--text-primary)" : "var(--text-secondary)",
                      }}>
                        {type.price ? `${type.price.toLocaleString("da-DK")} kr` : "Contact us"}
                      </span>
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Addons */}
            <div className="glass rounded-2xl p-6">
              <p className="text-sm font-medium mb-1" style={{ color: "var(--text-primary)" }}>
                2. Add marketing services
              </p>
              <p className="text-xs mb-4" style={{ color: "var(--text-muted)" }}>
                Month-to-month — cancel anytime
              </p>
              <div className="flex flex-col gap-3">
                {ADDONS.map((addon) => {
                  const isActive = activeAddons.has(addon.id)
                  return (
                    <button
                      key={addon.id}
                      onClick={() => toggleAddon(addon.id)}
                      className={`flex items-center justify-between p-4 rounded-xl border
                        transition-all duration-200 text-left
                        ${isActive ? addon.active : ""}`}
                      style={!isActive ? inactiveAddon : undefined}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 shrink-0"
                          style={isActive ? {
                            borderColor: "currentColor",
                            backgroundColor: "currentColor",
                          } : isDark ? {
                            borderColor: "rgba(255,255,255,0.4)",
                          } : {
                            borderColor: "rgba(0,0,0,0.3)",
                          }}
                        >
                          {isActive && (
                            <motion.svg initial={{ scale: 0 }} animate={{ scale: 1 }}
                              width="10" height="10" viewBox="0 0 10 10">
                              <path d="M2 5l2.5 2.5L8 3" stroke="white" strokeWidth="1.5"
                                strokeLinecap="round" strokeLinejoin="round" fill="none" />
                            </motion.svg>
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                            {addon.label}
                          </p>
                          <p className="text-xs" style={{ color: "var(--text-muted)" }}>{addon.desc}</p>
                        </div>
                      </div>
                      <span className="text-sm font-semibold shrink-0 ml-4"
                        style={{ color: "var(--text-secondary)" }}>
                        {addon.price.toLocaleString("da-DK")} kr/md
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Growth meter */}
            <div className="glass rounded-2xl p-6">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                  Growth potential
                </p>
                <motion.span key={growthPct} initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }} className="text-2xl font-bold"
                  style={{ color: "var(--text-primary)" }}>
                  {growthPct}%
                </motion.span>
              </div>
              <div className="h-2.5 rounded-full overflow-hidden mb-3" style={{
                background: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)",
              }}>
                <motion.div
                  className={`h-full rounded-full bg-gradient-to-r ${gradientClass}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${growthPct}%` }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                />
              </div>
              <AnimatePresence mode="wait">
                <motion.p key={growthMessage} initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.3 }} className="text-xs"
                  style={{ color: "var(--text-secondary)" }}>
                  {growthMessage}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Everything included — moved here */}
            <div className="glass rounded-2xl p-6">
              <p className="text-sm font-medium mb-4" style={{ color: "var(--text-primary)" }}>
                Everything included
              </p>
              <div className="grid grid-cols-1 gap-2">
                {included.map((item) => (
                  <div key={item} className="flex items-center gap-3 py-1">
                    <div className="w-5 h-5 rounded-full bg-indigo-500/15 border border-indigo-500/30
                                    flex items-center justify-center shrink-0">
                      <svg width="10" height="10" viewBox="0 0 10 10">
                        <path d="M2 5l2.5 2.5L8 3" stroke="#6366f1" strokeWidth="1.5"
                          strokeLinecap="round" strokeLinejoin="round" fill="none" />
                      </svg>
                    </div>
                    <span className="text-sm" style={{ color: "var(--text-secondary)" }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ── RIGHT: price summary + phone ── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex flex-col gap-6 lg:sticky lg:top-28"
          >
            {/* Price summary */}
            <div className="glass rounded-2xl p-6">
              <p className="text-xs uppercase tracking-widest mb-6" style={{ color: "var(--text-muted)" }}>
                Your estimate
              </p>

              <div className="flex items-start justify-between mb-4 pb-4"
                style={{ borderBottom: "1px solid var(--border)" }}>
                <div>
                  <p className="text-sm" style={{ color: "var(--text-secondary)" }}>One-time website</p>
                  <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>{selectedSite.label}</p>
                </div>
                <AnimatePresence mode="wait">
                  <motion.p key={websiteType} initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}
                    className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>
                    {selectedSite.price ? `${selectedSite.price.toLocaleString("da-DK")} kr` : "Kontakt os"}
                  </motion.p>
                </AnimatePresence>
              </div>

              <div className="flex items-start justify-between mb-6">
                <div>
                  <p className="text-sm" style={{ color: "var(--text-secondary)" }}>Monthly marketing</p>
                  <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                    {activeAddons.size === 0
                      ? "No services selected"
                      : [...activeAddons].map((id) => ADDONS.find((a) => a.id === id)?.label).join(" + ")}
                  </p>
                </div>
                <AnimatePresence mode="wait">
                  <motion.p key={monthlyTotal} initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}
                    className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>
                    {monthlyTotal > 0 ? `${monthlyTotal.toLocaleString("da-DK")} kr/md` : "0 kr/md"}
                  </motion.p>
                </AnimatePresence>
              </div>

              {(selectedSite.price || monthlyTotal > 0) && (
                <div className="flex items-center justify-between mb-6 px-4 py-3
                               rounded-xl bg-indigo-500/5 border border-indigo-500/20">
                  <p className="text-sm" style={{ color: "var(--text-secondary)" }}>First year total</p>
                  <p className="text-indigo-400 font-bold">
                    {((selectedSite.price ?? 0) + monthlyTotal * 12).toLocaleString("da-DK")} kr
                  </p>
                </div>
              )}

              <Link href="/contact"
                className="block w-full py-3.5 text-center bg-indigo-500 hover:bg-indigo-400
                           text-white font-semibold rounded-xl transition-colors duration-200 mb-3">
                Get exact quote →
              </Link>
              <p className="text-xs text-center" style={{ color: "var(--text-muted)" }}>
                Prices are estimates. Ads budget is separate and goes directly to Google / Meta.
              </p>
            </div>

            {/* Phone mockup */}
            <DeviceMockup websiteType={websiteType} activeAddons={activeAddons} />
          </motion.div>
        </div>

        {/* FAQ */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-3xl font-bold text-center mb-8" style={{ color: "var(--text-primary)" }}>
            Common questions
          </h2>

          <div className="flex flex-col gap-3">
            {faqs.map((faq, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                className="glass rounded-2xl overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left">
                  <span className="text-sm font-medium pr-4" style={{ color: "var(--text-primary)" }}>
                    {faq.q}
                  </span>
                  <motion.span animate={{ rotate: openFaq === i ? 45 : 0 }}
                    transition={{ duration: 0.2 }} className="text-xl shrink-0"
                    style={{ color: "var(--text-muted)" }}>
                    +
                  </motion.span>
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="overflow-hidden">
                      <p className="px-6 pb-5 text-sm leading-relaxed pt-4"
                        style={{ color: "var(--text-secondary)", borderTop: "1px solid var(--border)" }}>
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mt-16">
            <p className="text-sm mb-6" style={{ color: "var(--text-muted)" }}>
              Still not sure? Book a free call — no pressure, no pitch.
            </p>
            <Link href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-indigo-500
                         hover:bg-indigo-400 text-white font-semibold rounded-xl transition-colors duration-200">
              Book free consultation →
            </Link>
          </motion.div>
        </motion.div>

      </div>
    </main>
  )
}