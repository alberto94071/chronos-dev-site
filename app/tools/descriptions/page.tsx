import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DescriptionGenerator from "@/components/DescriptionGenerator";

export const metadata: Metadata = {
  title: "Generador de Descripciones de Productos con IA | Chronos-Dev",
  description:
    "Crea descripciones profesionales para tus productos en segundos con inteligencia artificial. Gratis, sin registro. Perfecto para tiendas en línea, redes sociales y catálogos.",
  keywords: [
    "generador de descripciones de productos",
    "descripcion de producto con ia",
    "copywriting automatico guatemala",
    "descripciones para tienda en linea",
    "ia para ecommerce",
  ],
  openGraph: {
    title: "Generador de Descripciones con IA | Chronos-Dev",
    description: "Genera 3 variaciones de descripción para tu producto en segundos. Gratis.",
    url: "https://www.chronos-dev.com/tools/descriptions",
  },
  alternates: { canonical: "/tools/descriptions" },
};

export default function DescriptionsPage() {
  return (
    <main>
      <Navbar />

      {/* HERO */}
      <section
        style={{
          background: "var(--color-deep)",
          borderBottom: "1px solid var(--color-border)",
          padding: "64px 24px 56px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Grid background */}
        <svg
          style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", opacity: 0.04, pointerEvents: "none" }}
          aria-hidden
        >
          <defs>
            <pattern id="grid-desc" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M0 30 H60 M30 0 V60" stroke="#7aff00" strokeWidth="0.5" />
              <circle cx="30" cy="30" r="1.5" fill="#7aff00" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-desc)" />
        </svg>

        <div style={{ position: "relative", zIndex: 1 }}>
          <Link
            href="/tools"
            style={{
              fontSize: 12,
              color: "var(--color-primary)",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              marginBottom: 20,
              fontFamily: "JetBrains Mono, monospace",
              transition: "opacity 0.2s",
            }}
          >
            ← Volver a herramientas
          </Link>

          <div
            style={{
              display: "inline-block",
              background: "var(--color-primary)",
              color: "var(--color-deep)",
              fontSize: 10,
              fontWeight: 700,
              padding: "4px 14px",
              letterSpacing: 2,
              textTransform: "uppercase",
              marginBottom: 20,
              fontFamily: "JetBrains Mono, monospace",
            }}
          >
            100% Gratis · Powered by IA
          </div>

          <h1
            style={{
              fontSize: "clamp(26px, 5vw, 50px)",
              fontWeight: 700,
              color: "var(--color-text)",
              lineHeight: 1.1,
              marginBottom: 14,
            }}
          >
            Generador de descripciones
            <br />
            <span style={{ color: "var(--color-primary)" }}>de productos con IA</span>
          </h1>

          <p
            style={{
              fontSize: 15,
              color: "var(--color-muted)",
              maxWidth: 520,
              margin: "0 auto 24px",
              lineHeight: 1.7,
            }}
          >
            Ingresa los datos de tu producto y recibe 3 variaciones de descripción
            — corta, media y completa — listas para copiar y usar.
          </p>

          {/* Feature tags */}
          <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" }}>
            {["Español + English", "5 tonos", "6 plataformas", "Sin registro"].map((tag) => (
              <span
                key={tag}
                style={{
                  background: "var(--color-surface)",
                  color: "var(--color-primary)",
                  border: "1px solid var(--color-border)",
                  fontSize: 10,
                  padding: "4px 12px",
                  fontFamily: "JetBrains Mono, monospace",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* TOOL */}
      <div style={{ maxWidth: 940, margin: "0 auto", padding: "72px 24px 96px" }}>

        {/* Section label */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 36 }}>
          <div style={{ height: 1, width: 32, background: "var(--color-primary)" }} />
          <span
            style={{
              fontFamily: "Georgia, serif",
              fontStyle: "italic",
              color: "var(--color-primary)",
              fontSize: 14,
            }}
          >
            Completa el formulario
          </span>
        </div>

        <DescriptionGenerator />

        {/* HOW IT WORKS */}
        <div style={{ marginTop: 96 }}>
          <div style={{ height: 1, background: "var(--color-border)", marginBottom: 72 }} />

          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                justifyContent: "center",
                marginBottom: 10,
              }}
            >
              <div style={{ height: 1, width: 40, background: "var(--color-border)" }} />
              <span
                style={{
                  fontFamily: "Georgia, serif",
                  fontStyle: "italic",
                  color: "var(--color-muted)",
                  fontSize: 14,
                }}
              >
                ¿Cómo funciona?
              </span>
              <div style={{ height: 1, width: 40, background: "var(--color-border)" }} />
            </div>
            <h2
              style={{
                fontSize: "clamp(18px, 3vw, 26px)",
                fontWeight: 700,
                color: "var(--color-text)",
              }}
            >
              3 pasos, 3 descripciones
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 1,
              background: "var(--color-border)",
              border: "1px solid var(--color-border)",
            }}
            className="how-grid"
          >
            {[
              {
                step: "01",
                title: "Describe tu producto",
                body: "Ingresa el nombre, categoría, características clave y el tono que quieres comunicar.",
              },
              {
                step: "02",
                title: "La IA genera las variaciones",
                body: "Nuestro modelo analiza tu producto y crea 3 versiones optimizadas para distintos formatos.",
              },
              {
                step: "03",
                title: "Copia y usa",
                body: "Selecciona la versión que más te convenga y pégala directamente en tu tienda, publicación o catálogo.",
              },
            ].map(({ step, title, body }) => (
              <div
                key={step}
                style={{
                  background: "var(--color-surface)",
                  padding: "32px 28px",
                }}
              >
                <div
                  style={{
                    fontSize: 11,
                    fontFamily: "JetBrains Mono, monospace",
                    color: "var(--color-primary)",
                    marginBottom: 12,
                    letterSpacing: 2,
                  }}
                >
                  {step}
                </div>
                <div
                  style={{
                    fontSize: 15,
                    fontWeight: 700,
                    color: "var(--color-text)",
                    marginBottom: 8,
                  }}
                >
                  {title}
                </div>
                <div
                  style={{
                    fontSize: 13,
                    color: "var(--color-muted)",
                    lineHeight: 1.65,
                  }}
                >
                  {body}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .how-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <Footer />
    </main>
  );
}
