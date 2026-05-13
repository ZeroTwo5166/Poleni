"use client"

import { useEffect, useState } from "react"
import Particles, { initParticlesEngine } from "@tsparticles/react"
import { loadSlim } from "@tsparticles/slim"
import { useTheme } from "@/components/shared/themeProvider"

export default function StarField() {
  const [ready, setReady] = useState(false)
  const { theme } = useTheme()

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine)
    }).then(() => setReady(true))
  }, [])

  if (!ready || theme !== "dark") return null

  return (
    <Particles
      id="starfield"
      className="fixed inset-0 z-0 pointer-events-none"
      options={{
        fullScreen: false,
        background: { color: { value: "transparent" } },
        fpsLimit: 120,
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: "grab",
            },
            onClick: {
                enable: true,
                mode: "repulse",
            }
          },
          modes: {
            grab: {
              distance: 180,
              links: {
                opacity: 0.4,
                color: "#ffffff",
                width: 1,
              },
            },
          },
        },
        particles: {
          number: {
            value: 500,
            density: { enable: true, width: 1920, height: 1080 },
          },
          color: { value: "#ffffff" },
          shape: { type: "star" },
          opacity: {
            value: { min: 0.15, max: 0.7 },
            animation: {
              enable: true,
              speed: 0.8,
              sync: false,
            },
          },
          size: {
            value: { min: 0.8, max: 2.5 },
          },
          links: {
            enable: false,
          },
          move: {
            enable: true,
            speed: 0.6,
            direction: "left",
            random: true,
            straight: false,
            angle: {
              value: 10,
              offset: 5,
            },
            outModes: { default: "out" },
          },
        },
        detectRetina: true,
      }}
    />
  )
}