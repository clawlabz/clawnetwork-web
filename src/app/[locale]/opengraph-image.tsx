import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "ClawNetwork — The Blockchain Built for OpenClaw. Open to All AI Agents.";
export const size = { width: 2400, height: 1260 };
export const contentType = "image/png";

export default async function OGImage() {
  const logoData = await readFile(
    join(process.cwd(), "public", "apple-touch-icon.png")
  );
  const logoBase64 = `data:image/png;base64,${logoData.toString("base64")}`;

  // Deterministic particle dots
  const dots: Array<{ x: number; y: number; r: number; o: number }> = [];
  for (let i = 0; i < 80; i++) {
    const seed = (i * 7919 + 104729) % 100000;
    dots.push({
      x: seed % 2400,
      y: (seed * 3) % 1260,
      r: 2 + (seed % 4),
      o: 0.15 + (seed % 40) / 100,
    });
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(135deg, #0d0906 0%, #1a120c 40%, #0d0906 70%, #110a1a 100%)",
          position: "relative",
          overflow: "hidden",
          fontFamily: "sans-serif",
        }}
      >
        {/* Grid + particles */}
        <svg
          width="2400"
          height="1260"
          viewBox="0 0 2400 1260"
          style={{ position: "absolute", top: 0, left: 0 }}
        >
          <defs>
            <radialGradient id="glow" cx="50%" cy="45%" r="60%">
              <stop offset="0%" stopColor="#F96706" stopOpacity="0.08" />
              <stop offset="60%" stopColor="#F96706" stopOpacity="0.02" />
              <stop offset="100%" stopColor="#F96706" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="purpleGlow" cx="80%" cy="70%" r="40%">
              <stop offset="0%" stopColor="#a855f7" stopOpacity="0.06" />
              <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="2400" height="1260" fill="url(#glow)" />
          <rect width="2400" height="1260" fill="url(#purpleGlow)" />

          {/* Horizontal grid lines */}
          {[210, 420, 630, 840, 1050].map((y) => (
            <line
              key={`h${y}`}
              x1="0"
              y1={y}
              x2="2400"
              y2={y}
              stroke="#F96706"
              strokeOpacity="0.04"
              strokeWidth="1"
            />
          ))}
          {/* Vertical grid lines */}
          {[400, 800, 1200, 1600, 2000].map((x) => (
            <line
              key={`v${x}`}
              x1={x}
              y1="0"
              x2={x}
              y2="1260"
              stroke="#F96706"
              strokeOpacity="0.04"
              strokeWidth="1"
            />
          ))}

          {/* Particle dots */}
          {dots.map((d, i) => (
            <circle
              key={i}
              cx={d.x}
              cy={d.y}
              r={d.r}
              fill={i % 5 === 0 ? "#22d3ee" : "#F96706"}
              opacity={d.o}
            />
          ))}

          {/* Decorative network lines */}
          <line x1="1040" y1="520" x2="360" y2="240" stroke="#F96706" strokeOpacity="0.06" strokeWidth="1.5" />
          <line x1="1360" y1="520" x2="2040" y2="240" stroke="#F96706" strokeOpacity="0.06" strokeWidth="1.5" />
          <line x1="1040" y1="740" x2="240" y2="1060" stroke="#a855f7" strokeOpacity="0.04" strokeWidth="1.5" />
          <line x1="1360" y1="740" x2="2160" y2="1060" stroke="#a855f7" strokeOpacity="0.04" strokeWidth="1.5" />

          {/* Corner node dots */}
          <circle cx="360" cy="240" r="5" fill="#F96706" opacity="0.2" />
          <circle cx="2040" cy="240" r="5" fill="#F96706" opacity="0.2" />
          <circle cx="240" cy="1060" r="5" fill="#a855f7" opacity="0.15" />
          <circle cx="2160" cy="1060" r="5" fill="#a855f7" opacity="0.15" />
        </svg>

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* Logo */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 176,
              height: 176,
              borderRadius: 40,
              marginBottom: 56,
              boxShadow:
                "0 0 80px rgba(249, 103, 6, 0.25), 0 0 160px rgba(249, 103, 6, 0.1)",
            }}
          >
            <img
              src={logoBase64}
              width={176}
              height={176}
              style={{ borderRadius: 40 }}
            />
          </div>

          {/* Title */}
          <div
            style={{
              display: "flex",
              fontSize: 112,
              fontWeight: 700,
              color: "#fdf8f5",
              letterSpacing: "-2px",
              lineHeight: 1,
              marginBottom: 32,
            }}
          >
            Claw
            <span style={{ color: "#F96706" }}>Network</span>
          </div>

          {/* Tagline */}
          <div
            style={{
              display: "flex",
              fontSize: 44,
              color: "#8892a0",
              letterSpacing: "1px",
              lineHeight: 1,
            }}
          >
            The Blockchain Built for OpenClaw. Open to All AI Agents.
          </div>

          {/* Bottom badges */}
          <div
            style={{
              display: "flex",
              gap: 32,
              marginTop: 72,
            }}
          >
            {["PoS + Agent Score", "3s Finality", "Wasm Smart Contracts"].map(
              (label) => (
                <div
                  key={label}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    background: "rgba(249, 103, 6, 0.08)",
                    border: "2px solid rgba(249, 103, 6, 0.15)",
                    borderRadius: 16,
                    padding: "12px 28px",
                    fontSize: 26,
                    color: "#F96706",
                    fontWeight: 500,
                  }}
                >
                  {label}
                </div>
              )
            )}
          </div>
        </div>

        {/* Bottom gradient bar */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 6,
            display: "flex",
            background:
              "linear-gradient(90deg, transparent 0%, #F96706 30%, #a855f7 70%, transparent 100%)",
            opacity: 0.6,
          }}
        />
      </div>
    ),
    { ...size }
  );
}
