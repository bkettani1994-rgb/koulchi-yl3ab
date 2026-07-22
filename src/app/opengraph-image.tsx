import { ImageResponse } from "next/og";
import { SITE } from "@/lib/constants";

export const alt = SITE.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
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
          background: "linear-gradient(135deg, #050505 0%, #0a0a0d 60%, #050505 100%)",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: 700,
            height: 700,
            borderRadius: "50%",
            background: "#006FCD",
            opacity: 0.35,
            filter: "blur(120px)",
            top: -180,
            left: -120,
          }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            marginBottom: 28,
          }}
        >
          <div
            style={{
              display: "flex",
              width: 72,
              height: 72,
              borderRadius: 20,
              background: "linear-gradient(135deg, #006FCD, #00A8FF)",
            }}
          />
          <div style={{ display: "flex", fontSize: 44, fontWeight: 700, color: "#fff" }}>
            {SITE.name}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 30,
            color: "#00A8FF",
            fontWeight: 600,
            textAlign: "center",
          }}
        >
          {SITE.tagline} au Maroc
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 24,
            fontSize: 22,
            color: "#a1a8b5",
            textAlign: "center",
            maxWidth: 820,
          }}
        >
          Livraison rapide · Installation incluse · Assistance disponible
        </div>
      </div>
    ),
    { ...size },
  );
}
