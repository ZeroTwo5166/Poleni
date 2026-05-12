"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"

const words = ["Strategy.", "Action.", "Results."]

export default function Preloader() {
  const [index, setIndex]     = useState(0)
  const [visible, setVisible] = useState(true)
  const pathname              = usePathname()
  const isHome                = pathname === "/"

  useEffect(() => {
    if (!isHome) return
    if (index < words.length - 1) {
      const t = setTimeout(() => setIndex((i) => i + 1), 450)
      return () => clearTimeout(t)
    } else {
      const t = setTimeout(() => setVisible(false), 500)
      return () => clearTimeout(t)
    }
  }, [index, isHome])

  if (!isHome || !visible) return null

  return (
    <AnimatePresence>
      <motion.div
        key="preloader"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="fixed inset-0 z-[9999] bg-[#080808] flex items-center justify-center"
      >
        <AnimatePresence mode="popLayout">
          <motion.span
            key={words[index]}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, transition: { duration: 0 } }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="text-white font-bold text-6xl md:text-8xl lg:text-9xl
                       tracking-tight select-none"
          >
            {words[index]}
          </motion.span>
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  )
}