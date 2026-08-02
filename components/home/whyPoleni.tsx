"use client"

import React from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { useTheme } from "@/components/shared/themeProvider"
import { fadeUp, staggerContainer, viewport } from "@/lib/animationVariants"
import {
  Banknote,
  Zap,
  HeartHandshake,
  MessageSquare,
  Target,
  TrendingUp
} from "lucide-react"

const reasons = [
  {
    icon: <Banknote size={28} />,
    title: "Faste priser",
    desc: "Ingen skjulte gebyrer.",
    detail:
      'Du ser den præcise pris, før du skriver under. Ingen uklare tilbud, ingen overraskelsesfakturaer, ingen "det kommer an på det".',
    
    // -- Dark Theme --
    color: "text-indigo-400",
    darkBg: "bg-[linear-gradient(160deg,#0b0b14_0%,rgba(79,70,229,0.16)_100%)]",
    darkBorder: "border-indigo-500/30",
    darkShadow: "rgba(99,102,241,0.2)",
    accent: "#4f46e5", // Indigo
    spotRgb: "99,102,241",

    // -- Light Theme (New Bluish Look) --
    lightBg: "bg-gradient-to-br from-white via-blue-50 to-blue-100/70",
    lightBorder: "border-blue-300",
    lightShadow: "rgba(37,99,235,0.16)",
    lightAccent: "#2563eb", // Blue-600
  },
  {
    icon: <Zap size={28} />,
    title: "Ingen binding",
    desc: "Opsig når som helst.",
    detail:
      "Annoncer kører måned til måned. Pause når som helst, opsig når som helst. Vi beholder kunder fordi vi leverer resultater — ikke fordi vi binder dem i kontrakter.",
    
    // -- Dark Theme --
    color: "text-purple-400",
    darkBg: "bg-[linear-gradient(160deg,#0e0a14_0%,rgba(147,51,234,0.16)_100%)]",
    darkBorder: "border-purple-500/30",
    darkShadow: "rgba(168,85,247,0.2)",
    accent: "#9333ea", // Purple
    spotRgb: "168,85,247",

    // -- Light Theme (New Bluish Look) --
    lightBg: "bg-gradient-to-br from-white via-sky-50 to-sky-100/70",
    lightBorder: "border-sky-300",
    lightShadow: "rgba(2,132,199,0.16)",
    lightAccent: "#0284c7", // Sky-600
  },
  {
    icon: <HeartHandshake size={28} />,
    title: "Du er ikke bare et nummer",
    desc: "Vi er små med vilje.",
    detail:
      "Store bureauer har 100+ kunder. Det har vi ikke. Hver kunde er vigtig for os — du får et rigtigt team, ikke en account manager der skifter hver 6. måned.",
    
    // -- Dark Theme --
    color: "text-pink-400",
    darkBg: "bg-[linear-gradient(160deg,#140a10_0%,rgba(219,39,119,0.16)_100%)]",
    darkBorder: "border-pink-500/30",
    darkShadow: "rgba(236,72,153,0.2)",
    accent: "#db2777", // Pink
    spotRgb: "236,72,153",

    // -- Light Theme (New Bluish Look) --
    lightBg: "bg-gradient-to-br from-white via-cyan-50 to-cyan-100/70",
    lightBorder: "border-cyan-300",
    lightShadow: "rgba(8,145,178,0.16)",
    lightAccent: "#0891b2", // Cyan-600
  },
]

const steps = [
  {
    icon: <MessageSquare size={24} />,
    title: "1. Uforpligtende snak",
    desc: "Vi tager en ærlig snak om din forretning og vurderer, om vi er et godt match. Ingen aggressive salgstaler.",
  },
  {
    icon: <Target size={24} />,
    title: "2. Strategi & Opsætning",
    desc: "Vi lægger en skræddersyet plan, bygger dine kampagner og sætter sporing op, så alt kan måles fra dag ét.",
  },
  {
    icon: <TrendingUp size={24} />,
    title: "3. Skalering & Vækst",
    desc: "Kampagnerne går live. Vi overvåger, optimerer og skalerer budgettet i takt med, at vi ser et positivt afkast.",
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
    e.currentTarget.style.setProperty("--spot-x", `${e.clientX - rect.left}px`)
    e.currentTarget.style.setProperty("--spot-y", `${e.clientY - rect.top}px`)
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
      style={
        {
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          willChange: "transform",
          boxShadow: isDark
            ? `0 0 40px -15px ${reason.darkShadow}`
            : `0 15px 40px -15px ${reason.lightShadow}`,
          "--spot-color": reason.spotRgb,
        } as React.CSSProperties
      }
      className={`spotlight relative p-8 rounded-2xl group cursor-default overflow-hidden flex flex-col gap-3 transition-shadow duration-300 border ${
        isDark
          ? `${reason.darkBorder} ${reason.darkBg}`
          : `${reason.lightBorder} ${reason.lightBg}`
      }`}
    >
      <div style={{ transform: "translateZ(40px)" }}>
        <span
          className={`inline-block mb-2 ${isDark ? reason.color : ""}`}
          style={{
            // Use lightAccent for light theme, allowing dark theme to remain untouched
            color: !isDark ? reason.lightAccent : undefined,
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
              // Use lightAccent for light theme
              color: isDark ? "var(--text-secondary)" : reason.lightAccent,
            }}
          >
            {reason.desc}
          </p>

          <p
            className="text-sm leading-relaxed"
            style={{
              color: isDark ? "var(--text-muted)" : "#475569",
            }}
          >
            {reason.detail}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

// Uniform, tiled texture that looks the same no matter how tall the section
// ends up being — corner-anchored radial blobs banded visibly on very tall
// (mobile) or split (pinned + trailing) layouts, so we avoid them entirely.
function SectionAmbience({ isDark }: { isDark: boolean }) {
  return (
    <div
      className={`absolute inset-0 pointer-events-none ${isDark ? "opacity-[0.05]" : "opacity-[0.07]"}`}
      style={{
        backgroundImage: `radial-gradient(${isDark ? "rgba(129,140,248,0.8)" : "rgba(37,99,235,0.4)"} 1px, transparent 1px)`,
        backgroundSize: "32px 32px",
      }}
    />
  )
}

export default function WhyPoleni({ hideProcess = false }: { hideProcess?: boolean }) {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  return (
    <section
      className={`relative min-h-screen py-32 px-6 overflow-hidden transition-colors duration-500 flex flex-col justify-center ${
        // A very subtle, icy blue-tinted background for light mode
        isDark ? "bg-transparent" : "bg-[#f4f7fb]"
      }`}
    >
      {isDark && (
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px pointer-events-none opacity-50"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(99,102,241,0.4), transparent)",
          }}
        />
      )}
      <SectionAmbience isDark={isDark} />

      <div className="relative z-10 max-w-6xl mx-auto w-full">
        {/* Header Section */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="text-center mb-16"
        >
          <span
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-bold mb-6 ${
              isDark
                ? "border-indigo-500/20 bg-indigo-500/10 text-indigo-400"
                : "border-blue-200 bg-blue-50 text-blue-700" // Blue badge for light mode
            }`}
          >
            <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${isDark ? "bg-indigo-500" : "bg-blue-600"}`} />
            Hvorfor Poleni
          </span>

          <h2
            className="text-4xl md:text-5xl font-bold mb-6 tracking-tight"
            style={{ color: "var(--text-primary)" }}
          >
            Intet bullshit.{" "}
            <span className={`text-transparent bg-clip-text ${
              isDark 
                ? "bg-gradient-to-r from-indigo-500 to-purple-500"
                : "bg-gradient-to-r from-blue-600 to-cyan-500" // Cool gradient for light mode
            }`}>
              Kun resultater.
            </span>
          </h2>

          <p
            className="text-lg max-w-xl mx-auto"
            style={{ color: isDark ? "var(--text-secondary)" : "#475569" }}
          >
            Vi byggede Poleni fordi små virksomheder fortjener ærlig prissætning
            og reelle resultater — ikke 12-måneders fælder.
          </p>
        </motion.div>

        {/* Cards Section - Added mt-24 to push the cards down */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-16 lg:mt-24"
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

        {/* New Process Section to fill out the page */}
        {!hideProcess && (
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="mt-32 max-w-5xl mx-auto text-center"
          >
            <ProcessSteps isDark={isDark} />
          </motion.div>
        )}
      </div>
    </section>
  )
}

function ProcessSteps({ isDark }: { isDark: boolean }) {
  return (
    <>
      <h3
        className="text-3xl font-bold mb-16 tracking-tight"
        style={{ color: "var(--text-primary)" }}
      >
        Sådan fungerer samarbejdet
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12 relative">
        {/* Connecting line for desktop views */}
        <div
          className={`hidden lg:block absolute top-10 left-[15%] right-[15%] h-px -z-10 ${
            isDark
              ? "bg-gradient-to-r from-transparent via-zinc-200 to-transparent"
              : "bg-gradient-to-r from-transparent via-blue-700 to-transparent"
          }`}
        />

        {steps.map((step, i) => (
          <div key={i} className="flex flex-col items-center">
            <div
              className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-6 shadow-xl ${
                isDark
                  ? 'bg-zinc-800/80 text-indigo-400 border border-indigo-500/20 shadow-indigo-500/10'
                  : 'bg-white text-blue-600 border border-blue-100 shadow-blue-500/10'
              }`}
            >
              {step.icon}
            </div>
            <h4
              className="text-xl font-bold mb-3"
              style={{ color: "var(--text-primary)" }}
            >
              {step.title}
            </h4>
            <p
              className="text-sm leading-relaxed max-w-[280px]"
              style={{ color: isDark ? "var(--text-muted)" : "#475569" }}
            >
              {step.desc}
            </p>
          </div>
        ))}
      </div>
    </>
  )
}

// Rendered in normal document flow after the pinned WhyPoleni slam-in
// animation finishes, since this section is too tall to fit the 100vh
// pin box alongside the reason cards without shrinking text unreadably.
export function WhyPoleniProcess() {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  return (
    <section
      className={`relative py-24 px-6 overflow-hidden transition-colors duration-500 ${
        isDark ? "bg-transparent" : "bg-[#f4f7fb]"
      }`}
    >
      <SectionAmbience isDark={isDark} />

      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        className="relative z-10 max-w-5xl mx-auto text-center"
      >
        <ProcessSteps isDark={isDark} />
      </motion.div>
    </section>
  )
}