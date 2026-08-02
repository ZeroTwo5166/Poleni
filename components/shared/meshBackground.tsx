"use client"

import { useTheme } from "@/components/shared/themeProvider"

const lightBlobs = [
  { top: "-5%", left: "-5%", w: 680, h: 680, color: "139,92,246", anim: "drift-1 16s ease-in-out infinite" },
  { top: "-8%", right: "-5%", w: 620, h: 620, color: "99,102,241", anim: "drift-2 20s ease-in-out infinite" },
  { top: "38%", left: "-8%", w: 560, h: 560, color: "6,182,212", anim: "drift-3 24s ease-in-out infinite" },
  { top: "30%", right: "-8%", w: 640, h: 640, color: "236,72,153", anim: "drift-4 18s ease-in-out infinite" },
  { bottom: "-8%", left: "5%", w: 580, h: 580, color: "251,146,60", anim: "drift-5 22s ease-in-out infinite" },
  { bottom: "-5%", right: "0%", w: 600, h: 600, color: "244,63,94", anim: "drift-6 26s ease-in-out infinite" },
] as const

export default function MeshBackground() {
  const { theme } = useTheme()

  if (theme !== "light") return null

  const blobs = lightBlobs
  const opacityMax = 0.45
  const opacityMid = 0.15

  return (
    <>
      <style>{`
        @keyframes drift-1 {
          0%   { transform: translate(0px, 0px);    }
          25%  { transform: translate(180px, 120px);  }
          50%  { transform: translate(80px, 280px);   }
          75%  { transform: translate(-100px, 150px); }
          100% { transform: translate(0px, 0px);    }
        }
        @keyframes drift-2 {
          0%   { transform: translate(0px, 0px);     }
          25%  { transform: translate(-150px, 100px); }
          50%  { transform: translate(-80px, -180px); }
          75%  { transform: translate(120px, -80px);  }
          100% { transform: translate(0px, 0px);     }
        }
        @keyframes drift-3 {
          0%   { transform: translate(0px, 0px);     }
          33%  { transform: translate(200px, -120px); }
          66%  { transform: translate(-120px, 100px); }
          100% { transform: translate(0px, 0px);     }
        }
        @keyframes drift-4 {
          0%   { transform: translate(0px, 0px);    }
          25%  { transform: translate(-180px, -100px); }
          50%  { transform: translate(100px, -200px);  }
          75%  { transform: translate(160px, 80px);    }
          100% { transform: translate(0px, 0px);    }
        }
        @keyframes drift-5 {
          0%   { transform: translate(0px, 0px);    }
          33%  { transform: translate(-200px, 150px); }
          66%  { transform: translate(150px, 100px);  }
          100% { transform: translate(0px, 0px);    }
        }
        @keyframes drift-6 {
          0%   { transform: translate(0px, 0px);     }
          25%  { transform: translate(120px, -150px); }
          50%  { transform: translate(-100px, -200px);}
          75%  { transform: translate(-180px, 80px);  }
          100% { transform: translate(0px, 0px);     }
        }
      `}</style>

      <div
        className="pointer-events-none"
        style={{ position: "fixed", inset: 0, zIndex: 0, overflow: "hidden" }}
      >
        {blobs.map((b, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              borderRadius: "50%",
              width: b.w,
              height: b.h,
              top: "top" in b ? b.top : undefined,
              left: "left" in b ? b.left : undefined,
              right: "right" in b ? b.right : undefined,
              bottom: "bottom" in b ? b.bottom : undefined,
              background: `radial-gradient(circle, rgba(${b.color},${opacityMax}) 0%, rgba(${b.color},${opacityMid}) 45%, transparent 70%)`,
              filter: "blur(10px)",
              animation: b.anim,
            }}
          />
        ))}
      </div>
    </>
  )
}
