"use client"

import { useState, useCallback, useMemo } from "react"
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
import { fadeUp, fadeLeft, fadeRight, viewport } from "@/lib/animationVariants"

export default function Calculator() {
  const [websiteType, setWebsiteType] = useState<WebsiteTypeId | null>(null)
  const [activeAddons, setActiveAddons] = useState<Set<AddonId>>(new Set())
  const { theme } = useTheme()
  const isDark = theme === "dark"

  const selectedSite = websiteType
    ? WEBSITE_TYPES.find((t) => t.id === websiteType) ?? null
    : null

  const monthlyTotal = useMemo(
    () =>
      ADDONS.filter((a) => activeAddons.has(a.id)).reduce(
        (sum, a) => sum + a.price,
        0
      ),
    [activeAddons]
  )

  const growthCount = activeAddons.size
  const growthPct = Math.round((growthCount / 3) * 100)
  const growthMessage = GROWTH_MESSAGES[growthCount]

  const toggleAddon = useCallback((id: AddonId) => {
    setActiveAddons((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }, [])

  const toggleWebsiteType = useCallback((id: WebsiteTypeId) => {
    setWebsiteType((prev) => (prev === id ? null : id))
  }, [])

  return (
    <section
      id="calculator"
      className="relative py-32 px-6 overflow-hidden will-change-transform"
    >
      {/* Removed middle glow — only keep it in light theme via the non-dark block */}
      {!isDark && (
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                     w-[800px] h-[400px] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse, rgba(99,102,241,0.06) 0%, transparent 70%)",
          }}
        />
      )}

      {isDark && (
        <>
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px pointer-events-none"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(16,185,129,0.4), transparent)",
            }}
          />
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at top, rgba(16,185,129,0.12) 0%, transparent 70%)",
            }}
          />
        </>
      )}

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* HEADER */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full
                           border border-emerald-500/20 bg-emerald-500/10
                           text-emerald-500 text-xs font-medium mb-4">
            <span className="w-1 h-1 rounded-full bg-emerald-500" />
            Gennemsigtigt prissætningsværktøj
          </span>

          <h2
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ color: "var(--text-primary)" }}
          >
            Hvad koster det at{" "}
            <span className="text-emerald-500">vokse?</span>
          </h2>

          <p
            className="text-lg max-w-xl mx-auto"
            style={{ color: "var(--text-secondary)" }}
          >
            Byg din pakke og se prisen med det samme. Ingen skjulte gebyrer.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

          {/* LEFT */}
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            <div className="flex flex-col gap-6">

              {/* WEBSITE TYPE */}
              <div
                className="glass rounded-2xl p-6 border"
              >
                <div className="flex items-center justify-between mb-4">
                  <p
                    className="text-sm font-semibold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    1. Vælg din hjemmeside-type
                  </p>
                  <span
                    className="text-xs"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Valgfri
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {WEBSITE_TYPES.map((type) => {
                    const isActive = websiteType === type.id

                    return (
                      <motion.button
                        key={type.id}
                        onClick={() => toggleWebsiteType(type.id)}
                        whileHover={{ scale: 1.03, y: -2 }}
                        whileTap={{ scale: 0.97 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        className="relative p-4 rounded-xl border text-left"
                        style={
                          isActive
                            ? {
                                backgroundColor: "rgba(16,185,129,0.10)",
                                borderColor: "rgba(16,185,129,0.6)",
                              }
                            : isDark
                            ? {
                                background: "linear-gradient(160deg,#0a0a0a 0%,rgba(16,185,129,0.06) 100%)",
                                borderColor: "rgba(255,255,255,0.16)",
                              }
                            : {
                                backgroundColor: "rgba(255,255,255,0.55)",
                                borderColor: "rgba(16,185,129,0.20)",
                              }
                        }
                      >
                        <span className="flex flex-col gap-1">
                          <span className="text-lg">{type.icon}</span>

                          <span
                            className="text-sm font-semibold"
                            style={{
                              color: isActive
                                ? "#10b981"
                                : "var(--text-primary)",
                            }}
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
                      </motion.button>
                    )
                  })}
                </div>
              </div>

              {/* ADDONS */}
              <div
                className="glass rounded-2xl p-6 border"
              >
                <p
                  className="text-sm font-semibold mb-4"
                  style={{ color: "var(--text-primary)" }}
                >
                  2. Tilføj marketingydelser
                </p>

                <div className="flex flex-col gap-3">
                  {ADDONS.map((addon) => {
                    const isActive = activeAddons.has(addon.id)

                    return (
                      <motion.button
                        key={addon.id}
                        onClick={() => toggleAddon(addon.id)}
                        whileHover={{ scale: 1.02, x: 2 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        className="flex items-center gap-3 p-4 rounded-xl border"
                        style={
                          isActive
                            ? {
                                backgroundColor: "rgba(99,102,241,0.12)",
                                borderColor: "rgba(99,102,241,0.6)",
                              }
                            : isDark
                            ? {
                                background: "linear-gradient(160deg,#0a0a0a 0%,rgba(99,102,241,0.08) 100%)",
                                borderColor: "rgba(255,255,255,0.16)",
                              }
                            : {
                                backgroundColor: "rgba(255,255,255,0.55)",
                                borderColor: "rgba(99,102,241,0.20)",
                              }
                        }
                      >
                        {/* Radio indicator */}
                        <div
                          className="shrink-0 w-5 h-5 rounded-full border flex items-center justify-center"
                          style={{
                            borderColor: isActive
                              ? "#6366f1"
                              : isDark
                              ? "rgba(255,255,255,0.25)"
                              : "rgba(99,102,241,0.3)",
                            backgroundColor: isActive
                              ? "#6366f1"
                              : "transparent",
                          }}
                        />

                        {/* Label + desc */}
                        <div className="flex-1 text-left">
                          <p
                            className="text-sm font-semibold"
                            style={{ color: "var(--text-primary)" }}
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

                        {/* Price — pinned to the right */}
                        <span
                          className="shrink-0 text-sm font-semibold"
                          style={{ color: "var(--text-secondary)" }}
                        >
                          {addon.price.toLocaleString("da-DK")} kr/md
                        </span>
                      </motion.button>
                    )
                  })}
                </div>
              </div>

              <GrowthMeter pct={growthPct} message={growthMessage} />
            </div>
          </motion.div>

          {/* RIGHT */}
          <motion.div
            variants={fadeRight}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            <div className="flex flex-col gap-6 lg:sticky lg:top-28">

              <div
                className="glass rounded-2xl p-6 border"
              >
                <p
                  className="text-xs uppercase tracking-widest mb-4"
                  style={{ color: "var(--text-muted)" }}
                >
                  Dit estimat
                </p>

                <div className="flex justify-between mb-4 pb-4 border-b border-white/10">
                  <div>
                    <p
                      className="text-sm"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      Engangshjemmeside
                    </p>
                    <p
                      className="text-xs"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {selectedSite
                        ? selectedSite.label
                        : "Ikke inkluderet"}
                    </p>
                  </div>

                  <p
                    className="text-2xl font-bold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {!selectedSite
                      ? "—"
                      : selectedSite.price
                      ? `${selectedSite.price.toLocaleString("da-DK")} kr`
                      : "Kontakt os"}
                  </p>
                </div>

                <div className="flex justify-between mb-6">
                  <div>
                    <p
                      className="text-sm"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      Månedlig marketing
                    </p>
                  </div>

                  <p
                    className="text-2xl font-bold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {monthlyTotal > 0
                      ? `${monthlyTotal.toLocaleString("da-DK")} kr/md`
                      : "0 kr/md"}
                  </p>
                </div>

                <Link
                  href="/contact"
                  className="shimmer block w-full py-3.5 text-center font-semibold rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-400 hover:to-purple-400 text-white"
                >
                  Få et præcist tilbud →
                </Link>
              </div>

              <DeviceMockup
                websiteType={websiteType}
                activeAddons={activeAddons}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}