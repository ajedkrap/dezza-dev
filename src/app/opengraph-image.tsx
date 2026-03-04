import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Dezza Rizqi — Fullstack Mobile Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(135deg, #09090B 0%, #1a0a2e 50%, #09090B 100%)",
          fontFamily: "sans-serif",
        }}
      >
        {/* Accent glow */}
        <div
          style={{
            position: "absolute",
            top: -100,
            right: -100,
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(124,58,237,0.3) 0%, transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -80,
            left: -80,
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(6,182,212,0.2) 0%, transparent 70%)",
          }}
        />

        {/* Card */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "48px 64px",
            borderRadius: 24,
            border: "1px solid rgba(255,255,255,0.1)",
            background: "rgba(255,255,255,0.05)",
            backdropFilter: "blur(20px)",
          }}
        >
          {/* Initials badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 80,
              height: 80,
              borderRadius: 20,
              background: "linear-gradient(135deg, #7C3AED, #06B6D4)",
              fontSize: 36,
              fontWeight: 700,
              color: "white",
              marginBottom: 24,
            }}
          >
            DR
          </div>

          <div
            style={{
              fontSize: 48,
              fontWeight: 700,
              color: "white",
              lineHeight: 1.2,
              textAlign: "center",
            }}
          >
            Dezza Rizqi
          </div>

          <div
            style={{
              fontSize: 24,
              fontWeight: 400,
              color: "rgba(255,255,255,0.6)",
              marginTop: 12,
              textAlign: "center",
            }}
          >
            Fullstack Mobile Engineer
          </div>

          {/* Tech tags */}
          <div
            style={{
              display: "flex",
              gap: 12,
              marginTop: 32,
            }}
          >
            {["React Native", "Flutter", "TypeScript", "Expo"].map((tech) => (
              <div
                key={tech}
                style={{
                  padding: "8px 16px",
                  borderRadius: 8,
                  border: "1px solid rgba(124,58,237,0.3)",
                  background: "rgba(124,58,237,0.1)",
                  color: "rgba(255,255,255,0.8)",
                  fontSize: 16,
                  fontWeight: 500,
                }}
              >
                {tech}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
