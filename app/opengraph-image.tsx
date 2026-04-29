import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Chronos-Dev | Software & AI Integration";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
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
          backgroundColor: "#131a13",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Decoración de fondo tipo brillo */}
        <div
          style={{
            position: "absolute",
            width: "1000px",
            height: "1000px",
            background: "radial-gradient(circle, rgba(122, 255, 0, 0.15) 0%, rgba(19, 26, 19, 0) 70%)",
            top: "-100px",
            left: "100px",
            display: "flex"
          }}
        />
        
        {/* Contenido principal */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10,
          }}
        >
          <div
            style={{
              fontSize: 110,
              fontWeight: 900,
              color: "#7aff00",
              letterSpacing: "-0.05em",
              marginBottom: 20,
            }}
          >
            Chronos-Dev
          </div>
          
          <div
            style={{
              fontSize: 42,
              fontWeight: 500,
              color: "#ffffff",
              letterSpacing: "0.02em",
              opacity: 0.9,
            }}
          >
            Software Development & AI Integration
          </div>
          
          <div
            style={{
              display: "flex",
              marginTop: 80,
              padding: "16px 40px",
              background: "rgba(122, 255, 0, 0.1)",
              border: "2px solid rgba(122, 255, 0, 0.3)",
              borderRadius: "100px",
              color: "#7aff00",
              fontSize: 32,
              fontWeight: 600,
            }}
          >
            chronos-dev.com
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
