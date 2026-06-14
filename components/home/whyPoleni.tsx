"use client"

import React from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { useTheme } from "@/components/shared/themeProvider"
import { fadeUp, staggerContainer, viewport } from "@/lib/animationVariants"
import { Banknote, Zap, HeartHandshake } from "lucide-react"

const reasons = [
  {
    icon: <Banknote size={28} />,
    title: "Faste priser",
    desc: "Ingen skjulte gebyrer.",
    detail:
      'Du ser den præcise pris, før du skriver under. Ingen uklare tilbud, ingen overraskelsesfakturaer, ingen "det kommer an på det".',
    color: "text-indigo-400",
    border: "border-indigo-500/30",
    bg: "bg-indigo-500/10",

    lightBg: "bg-indigo-400/50",
    lightBorder: "border-indigo-200/60",

    accent: "#4f46e5",
  },
  {
    icon: <Zap size={28} />,
    title: "Ingen binding",
    desc: "Opsig når som helst.",
    detail:
      "Annoncer kører måned til måned. Pause når som helst, opsig når som helst. Vi beholder kunder fordi vi leverer resultater — ikke fordi vi binder dem i kontrakter.",
    color: "text-purple-400",
    border: "border-purple-500/30",
    bg: "bg-purple-500/10",

    lightBg: "bg-purple-400/50",
    lightBorder: "border-purple-200/60",

    accent: "#9333ea",
  },
  {
    icon: <HeartHandshake size={28} />,
    title: "Du er ikke bare et nummer",
    desc: "Vi er små med vilje.",
    detail:
      "Store bureauer har 100+ kunder. Det har vi ikke. Hver kunde er vigtig for os — du får et rigtigt team, ikke en account manager der skifter hver 6. måned.",
    color: "text-pink-400",
    border: "border-pink-500/30",
    bg: "bg-pink-500/10",

    lightBg: "bg-pink-400/50",
    lightBorder: "border-pink-200/60",

    accent: "#db2777",
  },
]

function TiltCard({ reason, isDark }: { reason: (typeof reasons)[0]; isDark: boolean }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const smoothX = useSpring(x, { stiffness: 140, damping: 18 })
  const smoothY = useSpring(y, { stiffness: 140, damping: 18 })

  const rotateX = useTransform(smoothY, [-0.5, 0.5], ["10deg", "-10deg"])
  const rotateY = useTransform(smoothX, [-0.5, 0.5], ["-10deg", "10deg"])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    x.set((e.clientX - rect.left) / rect.width - 0.5)
    y.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      variants={fadeUp}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.02, y: -5 }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        willChange: "transform",
        ...(isDark
          ? {}
          : {
              boxShadow: `0 4px 24px ${reason.accent}18`,
              backdropFilter: "blur(12px)",
              border: `1px solid ${reason.accent}25`,
            }),
      }}
      className={`relative p-8 rounded-2xl group cursor-default overflow-hidden flex flex-col gap-3 transition-shadow duration-300 ${
        isDark
          ? `${reason.border} ${reason.bg}`
          : `${reason.lightBorder} ${reason.lightBg}`
      }`}
    >
      <div style={{ transform: "translateZ(40px)" }}>
        <span
          className={`inline-block mb-2 ${isDark ? reason.color : ""}`}
          style={{
            color: !isDark ? reason.accent : undefined,
            transform: "translateZ(20px)",
          }}
        >
          {reason.icon}
        </span>

        <div>
          <h3
            className="text-xl font-bold mb-1"
            style={{ color: "var(--text-primary)" }}
          >
            {reason.title}
          </h3>

          <p
            className="text-sm font-semibold mb-3"
            style={{
              color: isDark ? "var(--text-secondary)" : reason.accent,
            }}
          >
            {reason.desc}
          </p>

          <p
            className="text-sm leading-relaxed"
            style={{
              color: isDark ? "var(--text-muted)" : "#334155",
            }}
          >
            {reason.detail}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

export default function WhyPoleni() {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  return (
    <section
      className="relative min-h-screen py-32 px-6 overflow-hidden"
      style={
        isDark
          ? undefined
          : {
              background: "linear-gradient(180deg, #ffffff 0%, #fafafa 100%)",
            }
      }
    >
      {isDark && (
        <>
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px pointer-events-none"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(99,102,241,0.4), transparent)",
            }}
          />
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at top, rgba(59,130,246,0.18) 0%, transparent 70%)",
            }}
          />
        </>
      )}

      {isDark ? (
        <div
          className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(168,85,247,0.05) 0%, transparent 70%)",
          }}
        />
      ) : (
        <>
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at top, rgba(59,130,246,0.04) 0%, transparent 60%)",
            }}
          />
          <div
            className="absolute inset-0 pointer-events-none bg-gradient-to-r from-blue-600 to-indigo-500"
            style={{ opacity: 0.3 }}
          />
        </>
      )}

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="text-center mb-16"
        >
          <span
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full
                           border border-blue-500/20 bg-blue-500/10
                           text-blue-600 dark:text-blue-400 text-xs font-bold mb-4"
          >
            <span className="w-1 h-1 rounded-full bg-blue-600 dark:bg-blue-400" />
            Hvorfor Poleni
          </span>

          <h2
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ color: "var(--text-primary)" }}
          >
            Intet bullshit.{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500 dark:from-blue-400 dark:to-indigo-300">
              Kun resultater.
            </span>
          </h2>

          <p
            className="text-lg max-w-xl mx-auto"
            style={{ color: "var(--text-secondary)" }}
          >
            Vi byggede Poleni fordi små virksomheder fortjener ærlig prissætning
            og reelle resultater — ikke 12-måneders fælder.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          style={{ perspective: 1200 }}
        >
          {reasons.map((reason) => (
            <TiltCard key={reason.title} reason={reason} isDark={isDark} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}