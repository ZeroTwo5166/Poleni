"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "@/components/shared/themeProvider"

interface Props {
  pct:     number
  message: string
}

const colors = [
  "from-gray-600 to-gray-500",
  "from-blue-600 to-blue-400",
  "from-indigo-600 to-purple-400",
  "from-indigo-500 via-purple-500 to-pink-400",
]

export default function GrowthMeter({ pct, message }: Props) {
  const { theme }     = useTheme()
  const isDark        = theme === "dark"
  const idx           = Math.round((pct / 100) * 3)
  const gradientClass = colors[idx]

  return (
    <div
  className="rounded-2xl p-6"
  style={
    isDark
      ? {
          background: "linear-gradient(160deg, #0b0b0f 0%, rgba(99,102,241,0.12) 100%)",
          border: "1px solid rgba(99,102,241,0.22)",
          boxShadow: "0 20px 50px rgba(99,102,241,0.12)",
        }
      : {
          background: "linear-gradient(160deg, #ffffff 0%, #f2f1ff 100%)",
          border: "1px solid rgba(99, 102, 241, 0.14)",
          boxShadow: "0 20px 50px rgba(99,102,241,0.08)",
        }
  }
>
      <div className="flex items-center justify-between mb-3">
        <p
          className="text-sm font-medium"
          style={{ color: "var(--text-primary)" }}
        >
          Vækstpotentiale
        </p>
        <motion.span
          key={pct}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-2xl font-bold"
          style={{ color: "var(--text-primary)" }}
        >
          {pct}%
        </motion.span>
      </div>

      <div
        className="h-2.5 rounded-full overflow-hidden mb-3"
        style={{ background: isDark ? "rgba(255,255,255,0.06)" : "rgba(99,102,241,0.10)" }}
      >
        <motion.div
          className={`h-full rounded-full bg-gradient-to-r ${gradientClass}`}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.p
          key={message}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.3 }}
          className="text-xs"
          style={{ color: "var(--text-secondary)" }}
        >
          {message}
        </motion.p>
      </AnimatePresence>
    </div>
  )
}