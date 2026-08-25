// components/home/DeviceMockup.tsx
"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Monitor, FileText, ShoppingCart, Lightning, Megaphone } from "@phosphor-icons/react/dist/ssr"
import type { WebsiteTypeId, AddonId } from "@/lib/pricing"
import { WEBSITE_TYPES, ADDONS } from "@/lib/pricing"
import { useT } from "@/lib/i18n/useT"

interface Props {
  websiteType:  WebsiteTypeId | null
  activeAddons: Set<AddonId>
}

const TYPE_ICONS: Record<WebsiteTypeId, typeof Monitor> = {
  static: Monitor,
  dynamic: FileText,
  ecommerce: ShoppingCart,
  custom: Lightning,
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
  const t                 = useT()
  const site              = websiteType ? WEBSITE_TYPES.find((wt) => wt.id === websiteType) ?? null : null
  const activeAddonsList  = ADDONS.filter((a) => activeAddons.has(a.id))
  const SiteIcon          = site ? TYPE_ICONS[site.id] : Megaphone

  const skeleton       = "var(--border)"
  const skeletonStrong = "var(--border-strong)"
  const cardBorder     = "1px solid var(--border)"

  const renderPreview = () => {
    switch (websiteType) {
      // ---------------- STATIC: simple landing page ----------------
      case "static":
        return (
          <div className="flex flex-col gap-2">
            <motion.div
              variants={itemVariants}
              className="h-14 flex items-center justify-center"
              style={{ background: skeleton }}
            >
              <div className="w-6 h-6 rounded-full" style={{ background: "var(--accent)" }} />
            </motion.div>
            <motion.div variants={itemVariants} className="h-2 w-3/4" style={{ background: skeletonStrong }} />
            <motion.div variants={itemVariants} className="h-1.5 w-full" style={{ background: skeleton }} />
            <motion.div variants={itemVariants} className="h-1.5 w-5/6" style={{ background: skeleton }} />
            <motion.div variants={itemVariants} className="h-5 w-20 mt-1" style={{ background: "var(--accent)" }} />
          </div>
        )

      // ---------------- DYNAMIC: blog / CMS feed ----------------
      case "dynamic":
        return (
          <div className="flex flex-col gap-2">
            <motion.div
              variants={itemVariants}
              className="h-10 flex items-center px-2 justify-between"
              style={{ background: skeleton }}
            >
              <div className="h-2 w-1/3" style={{ background: skeletonStrong }} />
              <div className="h-4 w-10" style={{ background: "var(--accent)" }} />
            </motion.div>
            <div className="grid grid-cols-2 gap-2">
              {[0, 1].map((i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  className="p-1.5 flex flex-col gap-1.5"
                  style={{ border: cardBorder }}
                >
                  <div className="h-8 w-full" style={{ background: skeleton }} />
                  <div className="h-1.5 w-full" style={{ background: skeletonStrong }} />
                  <div className="h-1.5 w-2/3" style={{ background: skeleton }} />
                </motion.div>
              ))}
            </div>
            <motion.div variants={itemVariants} className="h-1.5 w-1/3 self-center mt-1" style={{ background: skeleton }} />
          </div>
        )

      // ---------------- ECOMMERCE: product grid ----------------
      case "ecommerce":
        return (
          <div className="flex flex-col gap-2">
            <motion.div
              variants={itemVariants}
              className="h-6 flex items-center px-2.5"
              style={{ background: skeleton }}
            >
              <div className="w-1.5 h-1.5 rounded-full mr-2" style={{ background: skeletonStrong }} />
              <div className="h-1.5 w-1/3" style={{ background: skeletonStrong }} />
            </motion.div>
            <div className="grid grid-cols-2 gap-2">
              {[0, 1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  className="p-1.5 flex flex-col gap-1"
                  style={{ border: cardBorder }}
                >
                  <div className="h-8 w-full" style={{ background: skeleton }} />
                  <div className="h-1.5 w-2/3" style={{ background: skeletonStrong }} />
                  <div className="h-1.5 w-1/3" style={{ background: "var(--accent)" }} />
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
                className="col-span-2 row-span-2"
                style={{ background: "var(--accent-soft)", border: `1px solid ${skeletonStrong}` }}
              />
              <motion.div variants={itemVariants} style={{ background: skeleton }} />
              <motion.div variants={itemVariants} style={{ background: "var(--amber-soft)" }} />
            </div>
            <motion.div variants={itemVariants} className="h-1.5 w-1/2" style={{ background: skeletonStrong }} />
            <motion.div variants={itemVariants} className="h-1.5 w-1/3" style={{ background: skeleton }} />
          </div>
        )

      // ---------------- NO WEBSITE: campaign / marketing preview ----------------
      default:
        return (
          <div className="flex flex-col gap-2">
            <motion.div
              variants={itemVariants}
              className="p-2 flex items-end justify-between gap-1.5 h-16"
              style={{ border: cardBorder }}
            >
              {[40, 70, 50, 90, 65].map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ duration: 0.5, delay: 0.05 * i, ease: "easeOut" }}
                  className="flex-1"
                  style={{ background: "var(--accent)" }}
                />
              ))}
            </motion.div>
            <motion.div variants={itemVariants} className="h-1.5 w-2/3" style={{ background: skeletonStrong }} />
            <motion.div variants={itemVariants} className="h-1.5 w-1/2" style={{ background: skeleton }} />
          </div>
        )
    }
  }

  return (
    <div className="panel p-6">
      <p className="text-xs uppercase tracking-widest font-semibold mb-6" style={{ color: "var(--text-muted)" }}>
        {t.deviceMockup.livePreview}
      </p>

      {/* Phone frame */}
      <div className="mx-auto w-full max-w-[300px]">
        <div
          className="relative rounded-[2rem] border-[8px] overflow-hidden"
          style={{ background: "var(--bg-elevated)", borderColor: "var(--border-strong)" }}
        >
          {/* Notch */}
          <div
            className="absolute top-4 left-1/2 -translate-x-1/2 w-20 h-5 rounded-full z-10"
            style={{ background: "var(--bg-elevated)" }}
          />

          {/* Screen */}
          <div className="h-[550px] overflow-hidden relative pt-10" style={{ background: "var(--bg)" }}>

            {/* Mini navbar */}
            <div className="flex items-center justify-between px-4 py-3 rule-bottom">
              <div className="flex items-center gap-1.5">
                <span className="font-display text-[11px] font-medium tracking-tightest" style={{ color: "var(--text-primary)" }}>
                  Poleni
                </span>
              </div>
              <div className="flex gap-2">
                {t.deviceMockup.navLabels.map((l) => (
                  <span key={l} className="text-[9px]" style={{ color: "var(--text-muted)" }}>
                    {l}
                  </span>
                ))}
              </div>
            </div>

            {/* Hero / preview area */}
            <div className="px-4 py-4">
              <div className="flex items-center gap-1.5 mb-2.5">
                <SiteIcon size={14} weight="light" style={{ color: "var(--accent)" }} />
                <span className="text-[11px] font-semibold" style={{ color: "var(--text-primary)" }}>
                  {site ? t.pricing.websiteTypes[site.id].label : t.deviceMockup.marketingOnly}
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
              <div className="mt-3 w-full py-2" style={{ background: "var(--accent)" }}>
                <p className="text-[11px] text-center font-semibold" style={{ color: "var(--bg)" }}>
                  {t.deviceMockup.cta}
                </p>
              </div>
            </div>

            {/* Divider */}
            <div className="mx-4 h-px mb-3" style={{ background: "var(--border)" }} />

            {/* Active services */}
            <div className="px-4">
              <p className="text-[9px] uppercase tracking-wider font-medium mb-2" style={{ color: "var(--text-muted)" }}>
                {t.deviceMockup.activeServices}
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
                      {t.deviceMockup.noServicesYet}
                    </motion.p>
                  ) : (
                    activeAddonsList.map((addon) => (
                      <motion.div
                        key={addon.id}
                        initial={{ opacity: 0, x: -8, height: 0 }}
                        animate={{ opacity: 1, x: 0, height: "auto" }}
                        exit={{ opacity: 0, x: -8, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="flex items-center justify-between px-3 py-2"
                        style={{ border: `1px solid var(--border)` }}
                      >
                        <div className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--accent)" }} />
                          <span className="text-[11px] font-medium" style={{ color: "var(--text-secondary)" }}>
                            {t.pricing.addons[addon.id].label}
                          </span>
                        </div>
                        <span className="tabular text-[10px] font-semibold" style={{ color: "var(--text-muted)" }}>
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
                <span className="text-[10px] uppercase tracking-wider font-medium" style={{ color: "var(--text-muted)" }}>
                  {t.deviceMockup.growthPotential}
                </span>
                <span className="tabular text-[11px] font-semibold" style={{ color: "var(--text-primary)" }}>
                  {Math.round((activeAddons.size / 3) * 100)}%
                </span>
              </div>
              <div className="h-1.5 overflow-hidden" style={{ background: "var(--border)" }}>
                <motion.div
                  className="h-full"
                  style={{ background: "var(--accent)" }}
                  animate={{ width: `${Math.round((activeAddons.size / 3) * 100)}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              </div>
            </div>

          </div>

          {/* Home bar */}
          <div className="flex justify-center py-3" style={{ background: "var(--bg-elevated)" }}>
            <div className="w-16 h-1 rounded-full" style={{ background: "var(--border-strong)" }} />
          </div>

        </div>
      </div>
    </div>
  )
}
