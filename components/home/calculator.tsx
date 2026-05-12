"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
  WEBSITE_TYPES,
  ADDONS,
  GROWTH_MESSAGES,
  type WebsiteTypeId,
  type AddonId,
} from "@/lib/pricing"
import DeviceMockup from "./deviceMockup"
import GrowthMeter from "./growthMeter"
import { useTheme } from "@/components/shared/themeProvider"

export default function Calculator() {
  const [websiteType, setWebsiteType] = useState<WebsiteTypeId>("static")
  const [activeAddons, setActiveAddons] = useState<Set<AddonId>>(new Set())
  const { theme } = useTheme()
  const isDark    = theme === "dark"

  const selectedSite  = WEBSITE_TYPES.find((t) => t.id === websiteType)!
  const monthlyTotal  = ADDONS
    .filter((a) => activeAddons.has(a.id))
    .reduce((sum, a) => sum + a.price, 0)
  const growthCount   = activeAddons.size
  const growthPct     = Math.round((growthCount / 3) * 100)
  const growthMessage = GROWTH_MESSAGES[growthCount]

  function toggleAddon(id: AddonId) {
    setActiveAddons((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  return (
    <section id="calculator" className="relative py-32 px-6 overflow-hidden">

      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                   w-[800px] h-[400px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(99,102,241,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full
                           border border-indigo-500/20 bg-indigo-500/5
                           text-indigo-400 text-xs font-medium mb-4">
            <span className="w-1 h-1 rounded-full bg-indigo-400" />
            Transparent pricing tool
          </span>
          <h2
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ color: "var(--text-primary)" }}
          >
            What does it cost to grow?
          </h2>
          <p
            className="text-lg max-w-xl mx-auto"
            style={{ color: "var(--text-secondary)" }}
          >
            Build your package and see the price instantly.
            No hidden fees. No surprises.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

          {/* Left: inputs */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-6"
          >

            {/* Website type */}
            <div className="glass rounded-2xl p-6">
              <p
                className="text-sm font-medium mb-4"
                style={{ color: "var(--text-primary)" }}
              >
                1. Choose your website type
              </p>
              <div className="grid grid-cols-2 gap-3">
                {WEBSITE_TYPES.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setWebsiteType(type.id)}
                    className={`
                      relative p-4 rounded-xl border text-left
                      transition-all duration-200
                      ${websiteType === type.id
                        ? "border-indigo-500/50 bg-indigo-500/10"
                        : isDark
                          ? "border-white/[0.06] bg-white/[0.02] hover:border-white/10"
                          : "border-black/[0.06] bg-black/[0.02] hover:border-black/10"}
                    `}
                  >
                    {websiteType === type.id && (
                      <motion.div
                        layoutId="site-type-bg"
                        className="absolute inset-0 rounded-xl bg-indigo-500/5"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10 flex flex-col gap-1">
                      <span className="text-lg">{type.icon}</span>
                      <span className={`text-sm font-medium ${
                        websiteType === type.id
                          ? "text-indigo-400"
                          : ""
                      }`}
                        style={websiteType !== type.id
                          ? { color: "var(--text-secondary)" }
                          : {}}
                      >
                        {type.label}
                      </span>
                      <span
                        className="text-xs"
                        style={{ color: "var(--text-muted)" }}
                      >
                        {type.desc}
                      </span>
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Addons */}
            <div className="glass rounded-2xl p-6">
              <p
                className="text-sm font-medium mb-4"
                style={{ color: "var(--text-primary)" }}
              >
                2. Add marketing services
              </p>
              <div className="flex flex-col gap-3">
                {ADDONS.map((addon) => {
                  const isActive = activeAddons.has(addon.id)
                  return (
                    <button
                      key={addon.id}
                      onClick={() => toggleAddon(addon.id)}
                      className={`
                        flex items-center justify-between p-4 rounded-xl border
                        transition-all duration-200 text-left
                        ${isActive
                          ? addon.active
                          : isDark
                            ? "border-white/[0.06] hover:border-white/10"
                            : "border-black/[0.06] hover:border-black/10"}
                      `}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`
                          w-5 h-5 rounded-full border-2 flex items-center
                          justify-center transition-all duration-200 shrink-0
                          ${isActive ? "border-current bg-current" : "border-gray-600"}
                        `}>
                          {isActive && (
                            <motion.svg
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              width="10" height="10" viewBox="0 0 10 10"
                            >
                              <path
                                d="M2 5l2.5 2.5L8 3"
                                stroke="white" strokeWidth="1.5"
                                strokeLinecap="round" strokeLinejoin="round"
                                fill="none"
                              />
                            </motion.svg>
                          )}
                        </div>
                        <div>
                          <p
                            className="text-sm font-medium"
                            style={{ color: isActive
                              ? "var(--text-primary)"
                              : "var(--text-secondary)" }}
                          >
                            {addon.label}
                          </p>
                          <p
                            className="text-xs"
                            style={{ color: "var(--text-muted)" }}
                          >
                            {addon.desc}
                          </p>
                        </div>
                      </div>
                      <span
                        className="text-sm font-semibold shrink-0 ml-4"
                        style={{ color: isActive
                          ? "var(--text-primary)"
                          : "var(--text-secondary)" }}
                      >
                        {addon.price.toLocaleString("da-DK")} kr/md
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>

            <GrowthMeter pct={growthPct} message={growthMessage} />

          </motion.div>

          {/* Right: output */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col gap-6 lg:sticky lg:top-28"
          >

            {/* Price summary */}
            <div className="glass rounded-2xl p-6">
              <p
                className="text-xs uppercase tracking-widest mb-4"
                style={{ color: "var(--text-muted)" }}
              >
                Your estimate
              </p>

              <div
                className="flex items-start justify-between mb-4 pb-4"
                style={{ borderBottom: "1px solid var(--border)" }}
              >
                <div>
                  <p
                    className="text-sm"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    One-time website
                  </p>
                  <p
                    className="text-xs mt-0.5"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {selectedSite.label}
                  </p>
                </div>
                <AnimatePresence mode="wait">
                  <motion.p
                    key={websiteType}
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    className="text-2xl font-bold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {selectedSite.price
                      ? `${selectedSite.price.toLocaleString("da-DK")} kr`
                      : "Kontakt os"}
                  </motion.p>
                </AnimatePresence>
              </div>

              <div className="flex items-start justify-between mb-6">
                <div>
                  <p
                    className="text-sm"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    Monthly marketing
                  </p>
                  <p
                    className="text-xs mt-0.5"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {activeAddons.size === 0
                      ? "No services selected"
                      : [...activeAddons].join(" + ")}
                  </p>
                </div>
                <AnimatePresence mode="wait">
                  <motion.p
                    key={monthlyTotal}
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    className="text-2xl font-bold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {monthlyTotal > 0
                      ? `${monthlyTotal.toLocaleString("da-DK")} kr/md`
                      : "0 kr/md"}
                  </motion.p>
                </AnimatePresence>
              </div>

              <Link
                href="/contact"
                className="block w-full py-3.5 text-center bg-indigo-500
                           hover:bg-indigo-400 text-white font-semibold rounded-xl
                           transition-colors duration-200"
              >
                Get exact quote →
              </Link>

              <p
                className="text-xs text-center mt-3"
                style={{ color: "var(--text-muted)" }}
              >
                Prices are estimates. Ads budget is separate.
              </p>
            </div>

            <DeviceMockup
              websiteType={websiteType}
              activeAddons={activeAddons}
            />

          </motion.div>
        </div>
      </div>
    </section>
  )
}