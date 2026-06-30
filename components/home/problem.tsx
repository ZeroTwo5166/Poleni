"use client"

import { motion } from "framer-motion"
import { useTheme } from "@/components/shared/themeProvider"
import { fadeUp } from "@/lib/animationVariants"

const painPoints = [
  {
    emoji: "😤",
    title: "Fastlåst i 12 måneders kontrakter",
    text: "Du vil gerne ud, men du kan ikke komme ud. Du betaler videre, selv når resultaterne udebliver.",
  },
  {
    emoji: "🤷",
    title: "Ingen idé om hvad du betaler for",
    text: "Uklare fakturaer. Ingen gennemsigtighed. Du stiller spørgsmål og får buzzwords tilbage.",
  },
  {
    emoji: "📉",
    title: "Månedlige gebyrer, ingen resultater",
    text: "Bureauet får sin betaling. Din virksomhed vokser ikke. Noget er galt.",
  },
]

export default function Problem() {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">

      {/* DARK MODE BACKGROUND (UNCHANGED) */}
      {isDark && (
        <>
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-px pointer-events-none"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(239,68,68,0.25), transparent)",
            }}
          />

          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[180px] pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at top, rgba(239,68,68,0.07) 0%, transparent 70%)",
            }}
          />

          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(239,68,68,0.04) 0%, transparent 70%)",
            }}
          />
        </>
      )}

      {/* LIGHT MODE — FIXED PREMIUM BACKGROUND */}
      {!isDark && (
        <>
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `
                radial-gradient(900px circle at 15% 10%, rgba(124,58,237,0.08), transparent 60%),
                radial-gradient(800px circle at 85% 20%, rgba(236,72,153,0.06), transparent 55%),
                radial-gradient(700px circle at 50% 100%, rgba(99,102,241,0.05), transparent 60%),
                linear-gradient(180deg, #ffffff 0%, #faf7ff 55%, #f8f7ff 100%)
              `,
            }}
          />

          {/* subtle ambient depth (NO orange dominance anymore) */}
          <div
            className="absolute -left-24 top-1/4 w-[280px] h-[280px] rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(124,58,237,0.06) 0%, transparent 70%)",
            }}
          />

          <div
            className="absolute -right-24 bottom-1/3 w-[240px] h-[240px] rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(236,72,153,0.05) 0%, transparent 70%)",
            }}
          />
        </>
      )}

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <span
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full
                       border border-red-500/20 bg-red-500/5
                       text-red-500 text-xs font-medium mb-8"
          >
            <span className="w-1 h-1 rounded-full bg-red-500" />
            Kender du det?
          </span>

          <h2
            className="text-4xl md:text-6xl font-bold leading-tight mb-6"
            style={{ color: "var(--text-primary)" }}
          >
            De fleste bureauer tager dine penge.
            <br />

            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
              Kun få skaber resultater.
            </span>
          </h2>

          <p
            className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-4"
            style={{ color: "var(--text-secondary)" }}
          >
            Hvis du har arbejdet med et bureau før, har du sandsynligvis oplevet det her.
          </p>

          <p
            className="text-base max-w-xl mx-auto leading-relaxed mb-14"
            style={{ color: "var(--text-muted)" }}
          >
            Lange kontrakter. Forvirrende rapporter. En ny kontaktperson hver 6. måned. Og alligevel — ingen reel vækst.
          </p>
        </motion.div>

        {/* CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {painPoints.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.45,
                delay: i * 0.08,
                ease: "easeOut",
              }}
              className="relative p-6 rounded-2xl text-left overflow-hidden"
              style={
                isDark
                  ? {
                      border: "1px solid rgba(239,68,68,0.10)",
                      background:
                        "linear-gradient(135deg,rgba(239,68,68,0.08),rgba(249,115,22,0.04))",
                    }
                  : {
                      border: "1px solid rgba(124,58,237,0.10)",
                      background: "#ffffff",
                      boxShadow: "0 18px 50px rgba(124,58,237,0.06)",
                    }
              }
            >
              {/* top line */}
              <div
                className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl"
                style={{
                  background: "linear-gradient(90deg, #ef4444, #f97316)",
                }}
              />

              <span className="text-3xl mb-4 block">{item.emoji}</span>

              <h3
                className="text-sm font-bold mb-2"
                style={{ color: "var(--text-primary)" }}
              >
                {item.title}
              </h3>

              <p
                className="text-sm leading-relaxed"
                style={{ color: "var(--text-muted)" }}
              >
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>

        {/* bottom */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.2 }}
          className="mt-16 inline-flex flex-col items-center gap-3"
        >
          <p
            className="text-base font-semibold"
            style={{ color: "var(--text-secondary)" }}
          >
            Poleni er bygget anderledes.
          </p>

          <div
            className="flex items-center gap-2 text-sm flex-wrap justify-center"
            style={{ color: "var(--text-muted)" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
            Faste priser

            <span className="w-1.5 h-1.5 rounded-full bg-green-500 ml-2" />
            Ingen binding

            <span className="w-1.5 h-1.5 rounded-full bg-green-500 ml-2" />
            Opsig når som helst
          </div>

          <motion.div
            animate={{ y: [0, 4, 0] }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="mt-2 text-indigo-400 text-xl"
          >
            ↓
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}