// components/home/DeviceMockup.tsx
"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "@/components/shared/themeProvider"
import type { WebsiteTypeId, AddonId } from "@/lib/pricing"
import { WEBSITE_TYPES, ADDONS } from "@/lib/pricing"

interface Props {
  websiteType:  WebsiteTypeId
  activeAddons: Set<AddonId>
}

const websiteIcons: Record<WebsiteTypeId, string> = {
  static:    "🖥️",
  dynamic:   "📄",
  ecommerce: "🛒",
  custom:    "⚡",
}

export default function DeviceMockup({ websiteType, activeAddons }: Props) {
  const { theme }        = useTheme()
  const isDark           = theme === "dark"
  const site             = WEBSITE_TYPES.find((t) => t.id === websiteType)!
  const activeAddonsList = ADDONS.filter((a) => activeAddons.has(a.id))

  return (
    <div className="glass rounded-2xl p-6">
      <p
        className="text-xs uppercase tracking-widest mb-6"
        style={{ color: "var(--text-muted)" }}
      >
        Live preview
      </p>

      {/* Phone frame — wider and taller */}
      <div className="mx-auto w-[280px]">
        <div
          className="relative rounded-[3rem] border-[8px] shadow-2xl overflow-hidden"
          style={{
            background:  isDark ? "#1a1a1a" : "#d4d4d4",
            borderColor: isDark ? "#2a2a2a" : "#bbbbbb",
          }}
        >

          {/* Notch */}
          <div
            className="absolute top-4 left-1/2 -translate-x-1/2
                       w-20 h-5 rounded-full z-10"
            style={{ background: isDark ? "#1a1a1a" : "#d4d4d4" }}
          />

          {/* Screen */}
          <div
            className="h-[500px] overflow-hidden relative pt-10"
            style={{ background: isDark ? "#0a0a0a" : "#f5f5f5" }}
          >

            {/* Mini navbar */}
            <div
              className="flex items-center justify-between px-4 py-3"
              style={{ borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}` }}
            >
              <div className="flex items-center gap-1.5">
                <div className="w-5 h-5 rounded-md bg-indigo-500 flex items-center
                                justify-center">
                  <span className="text-white text-[9px] font-bold">P</span>
                </div>
                <span
                  className="text-[11px] font-semibold"
                  style={{ color: "var(--text-primary)" }}
                >
                  Poleni
                </span>
              </div>
              <div className="flex gap-2">
                {["Services", "About"].map((l) => (
                  <span
                    key={l}
                    className="text-[9px]"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {l}
                  </span>
                ))}
              </div>
            </div>

            {/* Hero area */}
            <div className="px-4 py-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={websiteType}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-3xl mb-2">
                    {websiteIcons[websiteType]}
                  </div>
                  <p
                    className="text-[13px] font-bold leading-tight mb-1"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {site.label}
                  </p>
                  <p
                    className="text-[11px] leading-relaxed"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {site.desc}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* CTA button */}
              <div className="mt-3 w-full py-2 bg-indigo-500 rounded-lg">
                <p className="text-white text-[11px] text-center font-semibold">
                  Get started →
                </p>
              </div>
            </div>

            {/* Divider */}
            <div
              className="mx-4 h-px mb-3"
              style={{
                background: isDark
                  ? "rgba(255,255,255,0.06)"
                  : "rgba(0,0,0,0.06)",
              }}
            />

            {/* Active services */}
            <div className="px-4">
              <p
                className="text-[9px] uppercase tracking-wider font-medium mb-2"
                style={{ color: "var(--text-muted)" }}
              >
                Active services
              </p>
              <div className="flex flex-col gap-1.5">
                <AnimatePresence>
                  {activeAddonsList.length === 0 ? (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-[11px]"
                      style={{ color: "var(--text-muted)" }}
                    >
                      No services selected yet
                    </motion.p>
                  ) : (
                    activeAddonsList.map((addon) => (
                      <motion.div
                        key={addon.id}
                        initial={{ opacity: 0, x: -8, height: 0 }}
                        animate={{ opacity: 1, x: 0, height: "auto" }}
                        exit={{ opacity: 0, x: -8, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="flex items-center justify-between px-3 py-2 rounded-lg"
                        style={{
                          background: isDark
                            ? "rgba(255,255,255,0.04)"
                            : "rgba(0,0,0,0.04)",
                          border: `1px solid ${isDark
                            ? "rgba(255,255,255,0.06)"
                            : "rgba(0,0,0,0.06)"}`,
                        }}
                      >
                        <div className="flex items-center gap-2">
                          <div className={`w-1.5 h-1.5 rounded-full ${addon.dot}`} />
                          <span
                            className="text-[11px] font-medium"
                            style={{ color: "var(--text-secondary)" }}
                          >
                            {addon.label}
                          </span>
                        </div>
                        <span
                          className="text-[10px] font-semibold"
                          style={{ color: "var(--text-muted)" }}
                        >
                          {addon.price.toLocaleString("da-DK")} kr
                        </span>
                      </motion.div>
                    ))
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Growth bar */}
            <div className="px-4 mt-4">
              <div className="flex items-center justify-between mb-1.5">
                <span
                  className="text-[10px] uppercase tracking-wider font-medium"
                  style={{ color: "var(--text-muted)" }}
                >
                  Growth potential
                </span>
                <span
                  className="text-[11px] font-bold"
                  style={{ color: "var(--text-primary)" }}
                >
                  {Math.round((activeAddons.size / 3) * 100)}%
                </span>
              </div>
              <div
                className="h-1.5 rounded-full overflow-hidden"
                style={{
                  background: isDark
                    ? "rgba(255,255,255,0.06)"
                    : "rgba(0,0,0,0.06)",
                }}
              >
                <motion.div
                  className="h-full bg-indigo-500 rounded-full"
                  animate={{
                    width: `${Math.round((activeAddons.size / 3) * 100)}%`,
                  }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              </div>
            </div>

          </div>

          {/* Home bar */}
          <div
            className="flex justify-center py-3"
            style={{ background: isDark ? "#1a1a1a" : "#d4d4d4" }}
          >
            <div
              className="w-16 h-1 rounded-full"
              style={{ background: isDark ? "#3a3a3a" : "#aaaaaa" }}
            />
          </div>

        </div>
      </div>
    </div>
  )
}