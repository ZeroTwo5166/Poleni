"use client"

import { useTheme } from "@/components/shared/themeProvider"

export default function MeshBackground() {
  const { theme } = useTheme()

  if (theme !== "light") return null

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
        {/* Violet — top left */}
        <div style={{
          position: "absolute", borderRadius: "50%",
          width: 680, height: 680, top: "-5%", left: "-5%",
          background: "radial-gradient(circle, rgba(139,92,246,0.45) 0%, rgba(139,92,246,0.15) 45%, transparent 70%)",
          filter: "blur(10px)",
          animation: "drift-1 16s ease-in-out infinite",
        }} />

        {/* Indigo — top right */}
        <div style={{
          position: "absolute", borderRadius: "50%",
          width: 620, height: 620, top: "-8%", right: "-5%",
          background: "radial-gradient(circle, rgba(99,102,241,0.42) 0%, rgba(99,102,241,0.14) 45%, transparent 70%)",
          filter: "blur(10px)",
          animation: "drift-2 20s ease-in-out infinite",
        }} />

        {/* Cyan — middle left */}
        <div style={{
          position: "absolute", borderRadius: "50%",
          width: 560, height: 560, top: "38%", left: "-8%",
          background: "radial-gradient(circle, rgba(6,182,212,0.38) 0%, rgba(6,182,212,0.12) 45%, transparent 70%)",
          filter: "blur(10px)",
          animation: "drift-3 24s ease-in-out infinite",
        }} />

        {/* Pink — middle right */}
        <div style={{
          position: "absolute", borderRadius: "50%",
          width: 640, height: 640, top: "30%", right: "-8%",
          background: "radial-gradient(circle, rgba(236,72,153,0.40) 0%, rgba(236,72,153,0.13) 45%, transparent 70%)",
          filter: "blur(10px)",
          animation: "drift-4 18s ease-in-out infinite",
        }} />

        {/* Amber — bottom left */}
        <div style={{
          position: "absolute", borderRadius: "50%",
          width: 580, height: 580, bottom: "-8%", left: "5%",
          background: "radial-gradient(circle, rgba(251,146,60,0.35) 0%, rgba(251,146,60,0.10) 45%, transparent 70%)",
          filter: "blur(10px)",
          animation: "drift-5 22s ease-in-out infinite",
        }} />

        {/* Rose — bottom right */}
        <div style={{
          position: "absolute", borderRadius: "50%",
          width: 600, height: 600, bottom: "-5%", right: "0%",
          background: "radial-gradient(circle, rgba(244,63,94,0.35) 0%, rgba(244,63,94,0.10) 45%, transparent 70%)",
          filter: "blur(10px)",
          animation: "drift-6 26s ease-in-out infinite",
        }} />
      </div>
    </>
  )
}