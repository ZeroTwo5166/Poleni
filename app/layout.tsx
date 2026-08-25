import type { Metadata } from "next"
import { Space_Grotesk, Public_Sans, JetBrains_Mono } from "next/font/google"
import Script from "next/script"
import "./globals.css"
import Navbar from "@/components/shared/navbar"
import Footer from "@/components/shared/footer"
import ThemeProvider from "@/components/shared/themeProvider"
import LocaleProvider from "@/components/shared/localeProvider"
import Preloader from "@/components/shared/preloader"
import AmbientBackground from "@/components/shared/ambientBackground"
import ClockCursor from "@/components/shared/clockcursor"
import ScrollToTop from "@/components/shared/scrollToTop"
import LegalBar from "@/components/shared/legalBar"

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "700"],
})

const body = Public_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
})

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "600"],
})

export const metadata: Metadata = {
  title: "Poleni – Transparent pricing. No contracts. More customers.",
  description:
    "We help Danish businesses grow through websites and marketing. Fixed prices, no hidden fees, no lock-in contracts.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="da" suppressHydrationWarning data-scroll-behavior="smooth">
      <body className={`${display.variable} ${body.variable} ${mono.variable} font-sans antialiased`}>
        {/* Calendly assets — loaded right after hydration (not on click) so
            the booking widget (guarantee section, contact page) is already
            initializing well before the user scrolls to it. `beforeInteractive`
            was tried here first but its SSR-to-head hoisting doesn't survive a
            client-side re-render if hydration bails for any other reason,
            which surfaced as a "script tag" console error + full tree
            regeneration — afterInteractive avoids that whole hydration path. */}
        <link rel="preconnect" href="https://calendly.com" />
        <link rel="preconnect" href="https://assets.calendly.com" />
        <link
          href="https://assets.calendly.com/assets/external/widget.css"
          rel="stylesheet"
        />
        <Script
          src="https://assets.calendly.com/assets/external/widget.js"
          strategy="afterInteractive"
        />

        <LocaleProvider>
        <ThemeProvider>
          <Preloader />

          {/* Background — lowest layer */}
          <AmbientBackground />

          <ClockCursor />

          {/* Content wrapper */}
          <div style={{ position: "relative", zIndex: 5 }}>
            <Navbar />
            <main>
              <ScrollToTop/>
              {children}
              </main>
            <Footer />
          </div>
          <LegalBar />
        </ThemeProvider>
        </LocaleProvider>
      </body>
    </html>
  )
}
