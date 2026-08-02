"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "./themeProvider"

const links = [
  { label: "Services",   href: "/services"    },
  { label: "Prisberegner", href: "/calculator" },
  { label: "Om os",      href: "/about"       },
  { label: "Kontakt",    href: "/contact"     },
]

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === "dark"

  return (
    <button
      onClick={toggleTheme}
      aria-label="Skift tema"
      className="relative w-14 h-7 rounded-full border border-white/10
                 bg-white/[0.05] hover:bg-white/[0.08]
                 transition-all duration-300 flex items-center px-1"
    >
      <motion.div
        className="absolute inset-0 rounded-full"
        animate={{
          background: isDark
            ? "rgba(99,102,241,0.15)"
            : "rgba(251,191,36,0.15)",
        }}
        transition={{ duration: 0.3 }}
      />
      <motion.div
        className="relative z-10 w-5 h-5 rounded-full flex items-center justify-center text-xs shadow-md"
        animate={{
          x: isDark ? 0 : 28,
          background: isDark ? "#6366f1" : "#fbbf24",
        }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      >
        <motion.span
          key={theme}
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.25 }}
        >
          {isDark ? "🌙" : "☀️"}
        </motion.span>
      </motion.div>
    </button>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const { theme } = useTheme()
  const isDark = theme === "dark"

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  function handleLogoClick(e: React.MouseEvent) {
    e.preventDefault()
    if (pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" })
    } else {
      router.push("/")
    }
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500
          ${
            scrolled
              ? `py-3 backdrop-blur-xl border-b ${
                  isDark
                    ? "bg-[#080808]/80 border-white/5"
                    : "bg-[#f8f8f8]/80 border-black/5"
                }`
              : "py-5 bg-transparent"
          }`}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">

          {/* Logo */}
          <a
            href="/"
            onClick={handleLogoClick}
            className="group flex items-center gap-2 cursor-pointer"
          >
            <span
              className={`font-semibold tracking-tight text-lg ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              Poleni
            </span>
          </a>

          {/* Desktop links */}
          <nav className="hidden md:flex items-center gap-1">
            {links.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2 text-sm rounded-lg transition-colors duration-200
                    ${
                      isActive
                        ? isDark
                          ? "text-white"
                          : "text-gray-900"
                        : isDark
                        ? "text-gray-400 hover:text-white"
                        : "text-gray-500 hover:text-gray-900"
                    }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className={`absolute inset-0 rounded-lg ${
                        isDark ? "bg-white/8" : "bg-indigo-500/8"
                      }`}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </Link>
              )
            })}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            <Link
              href="/contact"
              className="shimmer px-4 py-2 text-sm text-white bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-400 hover:to-purple-400 rounded-lg transition-colors duration-200 font-medium"
            >
              Kom i gang
            </Link>
          </div>

          <div className="md:hidden flex items-center gap-3">
            <ThemeToggle />
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="flex flex-col gap-1.5 p-2"
              aria-label="Åbn menu"
            >
              <motion.span
                animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                className={`block w-5 h-px origin-center ${
                  isDark ? "bg-white" : "bg-gray-900"
                }`}
              />
              <motion.span
                animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
                className={`block w-5 h-px ${
                  isDark ? "bg-white" : "bg-gray-900"
                }`}
              />
              <motion.span
                animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                className={`block w-5 h-px origin-center ${
                  isDark ? "bg-white" : "bg-gray-900"
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className={`fixed inset-0 z-40 backdrop-blur-xl flex flex-col pt-24 px-6 md:hidden
              ${isDark ? "bg-[#080808]/95" : "bg-[#f8f8f8]/95"}`}
          >
            <nav className="flex flex-col gap-2">
              {links.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <Link
                    href={link.href}
                    className={`block px-4 py-4 text-2xl font-medium rounded-xl transition-colors duration-200
                      ${
                        pathname === link.href
                          ? isDark
                            ? "text-white bg-white/5"
                            : "text-indigo-600 bg-indigo-500/8"
                          : isDark
                          ? "text-gray-400 hover:text-white"
                          : "text-gray-500 hover:text-gray-900"
                      }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.28 }}
              className="mt-8"
            >
              <Link
                href="/contact"
                className="shimmer block w-full py-4 text-center text-white bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-400 hover:to-purple-400 rounded-xl font-medium text-lg transition-colors duration-200"
              >
                Kom i gang
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}