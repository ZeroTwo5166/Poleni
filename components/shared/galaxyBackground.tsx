"use client"

import Galaxy from "@/components/shared/Galaxy"
import { useTheme } from "@/components/shared/themeProvider"

// Replaces the old tsParticles star field — dark theme only, same slot
// MeshBackground fills for light theme.
export default function GalaxyBackground() {
  const { theme } = useTheme()

  if (theme !== "dark") return null

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Galaxy
        mouseRepulsion
        mouseInteraction
        density={3}
        glowIntensity={0}
        saturation={0}
        hueShift={130}
        twinkleIntensity={0.3}
        rotationSpeed={0.1}
        repulsionStrength={2}
        autoCenterRepulsion={0}
        starSpeed={1}
        speed={1.2}
      />
    </div>
  )
}
