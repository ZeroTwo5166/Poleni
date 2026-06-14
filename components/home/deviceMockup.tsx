// components/home/DeviceMockup.tsx
"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "@/components/shared/themeProvider"
import type { WebsiteTypeId, AddonId } from "@/lib/pricing"
import { WEBSITE_TYPES, ADDONS } from "@/lib/pricing"

interface Props {
  websiteType:  WebsiteTypeId | null
  activeAddons: Set<AddonId>
}

const websiteIcons: Record<WebsiteTypeId, string> = {
  static:    "🖥️",
  dynamic:   "📄",
  ecommerce: "🛒",
  custom:    "⚡",
}

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05, delayChildren: 0.05 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 6 },
  show: { opacity: 1, y: 0, transition: { duration: 0.25 } },
}

export default function DeviceMockup({ websiteType, activeAddons }: Props) {
  const { theme }        = useTheme()
  const isDark           = theme === "dark"
  const site             = websiteType ? WEBSITE_TYPES.find((t) => t.id === websiteType) ?? null : null
  const activeAddonsList = ADDONS.filter((a) => activeAddons.has(a.id))

  // shared skeleton tones
  const skeleton       = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)"
  const skeletonStrong = isDark ? "rgba(255,255,255,0.14)" : "rgba(0,0,0,0.10)"
  const cardBg         = isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)"
  const cardBorder     = `1px solid ${isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)"}`

  const renderPreview = () => {
    switch (websiteType) {
      // ---------------- STATIC: simple landing page ----------------
      case "static":
        return (
          <div className="flex flex-col gap-2">
            <motion.div
              variants={itemVariants}
              className="h-14 rounded-lg flex items-center justify-center"
              style={{ background: skeleton }}
            >
              <div className="w-6 h-6 rounded-full bg-indigo-500/70" />
            </motion.div>
            <motion.div variants={itemVariants} className="h-2 rounded-full w-3/4" style={{ background: skeletonStrong }} />
            <motion.div variants={itemVariants} className="h-1.5 rounded-full w-full" style={{ background: skeleton }} />
            <motion.div variants={itemVariants} className="h-1.5 rounded-full w-5/6" style={{ background: skeleton }} />
            <motion.div variants={itemVariants} className="h-5 w-20 rounded-md mt-1 bg-indigo-500/80" />
          </div>
        )

      // ---------------- DYNAMIC: blog / CMS feed ----------------
      case "dynamic":
        return (
          <div className="flex flex-col gap-2">
            <motion.div
              variants={itemVariants}
              className="h-10 rounded-lg flex items-center px-2 justify-between"
              style={{ background: skeleton }}
            >
              <div className="h-2 rounded-full w-1/3" style={{ background: skeletonStrong }} />
              <div className="h-4 w-10 rounded-md bg-indigo-500/70" />
            </motion.div>
            <div className="grid grid-cols-2 gap-2">
              {[0, 1].map((i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  className="rounded-lg p-1.5 flex flex-col gap-1.5"
                  style={{ background: cardBg, border: cardBorder }}
                >
                  <div className="h-8 rounded w-full" style={{ background: skeleton }} />
                  <div className="h-1.5 rounded-full w-full" style={{ background: skeletonStrong }} />
                  <div className="h-1.5 rounded-full w-2/3" style={{ background: skeleton }} />
                </motion.div>
              ))}
            </div>
            <motion.div variants={itemVariants} className="h-1.5 rounded-full w-1/3 self-center mt-1" style={{ background: skeleton }} />
          </div>
        )

      // ---------------- ECOMMERCE: product grid ----------------
      case "ecommerce":
        return (
          <div className="flex flex-col gap-2">
            <motion.div
              variants={itemVariants}
              className="h-6 rounded-full flex items-center px-2.5"
              style={{ background: skeleton }}
            >
              <div className="w-1.5 h-1.5 rounded-full mr-2" style={{ background: skeletonStrong }} />
              <div className="h-1.5 rounded-full w-1/3" style={{ background: skeletonStrong }} />
            </motion.div>
            <div className="grid grid-cols-2 gap-2">
              {[0, 1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  className="rounded-lg p-1.5 flex flex-col gap-1"
                  style={{ background: cardBg, border: cardBorder }}
                >
                  <div className="h-8 rounded w-full" style={{ background: skeleton }} />
                  <div className="h-1.5 rounded-full w-2/3" style={{ background: skeletonStrong }} />
                  <div className="h-1.5 rounded-full w-1/3 bg-emerald-500/70" />
                </motion.div>
              ))}
            </div>
          </div>
        )

      // ---------------- CUSTOM: bento-style layout ----------------
      case "custom":
        return (
          <div className="flex flex-col gap-2">
            <div className="grid grid-cols-3 grid-rows-2 gap-2 h-24">
              <motion.div
                variants={itemVariants}
                className="col-span-2 row-span-2 rounded-lg"
                style={{
                  background: isDark
                    ? "linear-gradient(135deg, rgba(99,102,241,0.35), rgba(16,185,129,0.18))"
                    : "linear-gradient(135deg, rgba(99,102,241,0.18), rgba(16,185,129,0.12))",
                }}
              />
              <motion.div variants={itemVariants} className="rounded-lg" style={{ background: skeleton }} />
              <motion.div variants={itemVariants} className="rounded-lg bg-amber-500/60" />
            </div>
            <motion.div variants={itemVariants} className="h-1.5 rounded-full w-1/2" style={{ background: skeletonStrong }} />
            <motion.div variants={itemVariants} className="h-1.5 rounded-full w-1/3" style={{ background: skeleton }} />
          </div>
        )

      // ---------------- NO WEBSITE: campaign / marketing preview ----------------
      default:
        return (
          <div className="flex flex-col gap-2">
            <motion.div
              variants={itemVariants}
              className="rounded-lg p-2 flex items-end justify-between gap-1.5 h-16"
              style={{ background: cardBg, border: cardBorder }}
            >
              {[40, 70, 50, 90, 65].map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ duration: 0.5, delay: 0.05 * i, ease: "easeOut" }}
                  className="flex-1 rounded-sm bg-indigo-500/70"
                />
              ))}
            </motion.div>
            <motion.div variants={itemVariants} className="h-1.5 rounded-full w-2/3" style={{ background: skeletonStrong }} />
            <motion.div variants={itemVariants} className="h-1.5 rounded-full w-1/2" style={{ background: skeleton }} />
          </div>
        )
    }
  }

  return (
    <div className="glass rounded-2xl p-6">
      <p
        className="text-xs uppercase tracking-widest mb-6"
        style={{ color: "var(--text-muted)" }}
      >
        Live forhåndsvisning
      </p>

      {/* Phone frame — wider and taller */}
      <div className="mx-auto w-[300px]">
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
            className="h-[550px] overflow-hidden relative pt-10"
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
                {["Ydelser", "Om"].map((l) => (
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

            {/* Hero / preview area */}
            <div className="px-4 py-4">
              <div className="flex items-center gap-1.5 mb-2.5">
                <span className="text-base">
                  {site ? websiteIcons[site.id] : "📣"}
                </span>
                <span
                  className="text-[11px] font-bold"
                  style={{ color: "var(--text-primary)" }}
                >
                  {site ? site.label : "Kun marketing"}
                </span>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={websiteType ?? "none"}
                  variants={containerVariants}
                  initial="hidden"
                  animate="show"
                  exit={{ opacity: 0, transition: { duration: 0.1 } }}
                >
                  {renderPreview()}
                </motion.div>
              </AnimatePresence>

              {/* CTA button */}
              <div className="mt-3 w-full py-2 bg-indigo-500 rounded-lg">
                <p className="text-white text-[11px] text-center font-semibold">
                  Kom i gang →
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
                Aktive ydelser
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
                      Ingen ydelser valgt endnu
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
                  Vækstpotentiale
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