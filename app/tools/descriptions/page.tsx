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

      {/* ─────────────── HERO ─────────────── */}
      <section style={{
        background: "var(--color-deep)",
        borderBottom: "1px solid var(--color-border)",
        padding: "72px 24px 64px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}>

        {/* Dot grid */}
        <svg style={{ position:"absolute", inset:0, width:"100%", height:"100%", opacity:0.035, pointerEvents:"none" }} aria-hidden>
          <defs>
            <pattern id="dots-desc" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="1" fill="#7aff00" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots-desc)" />
        </svg>

        {/* Glow blob centro */}
        <div style={{
          position: "absolute",
          top: "50%", left: "50%",
          transform: "translate(-50%,-50%)",
          width: 600, height: 300,
          background: "radial-gradient(ellipse at center, rgba(122,255,0,0.07) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        {/* Glow blob izquierda */}
        <div style={{
          position: "absolute",
          top: 0, left: -100,
          width: 400, height: 400,
          background: "radial-gradient(circle, rgba(122,255,0,0.04) 0%, transparent 60%)",
          pointerEvents: "none",
        }} />

        {/* Floating particles */}
        <div className="hero-particle" style={{ top:"20%", left:"8%", animationDelay:"0s" }} />
        <div className="hero-particle" style={{ top:"60%", left:"15%", animationDelay:"1.5s" }} />
        <div className="hero-particle" style={{ top:"30%", right:"10%", animationDelay:"0.8s" }} />
        <div className="hero-particle hero-particle--lg" style={{ top:"70%", right:"18%", animationDelay:"2.2s" }} />
        <div className="hero-particle" style={{ top:"15%", right:"30%", animationDelay:"3s" }} />

        {/* Content */}
        <div style={{ position:"relative", zIndex:1, maxWidth: 640, margin:"0 auto" }}>

          <Link href="/tools" style={{
            fontSize: 11, color: "var(--color-muted)", textDecoration: "none",
            display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 28,
            fontFamily: "JetBrains Mono, monospace", letterSpacing: 1,
            transition: "color 0.2s",
          }}
            className="back-link"
          >
            ← HERRAMIENTAS
          </Link>

          {/* Live badge */}
          <div style={{ marginBottom: 24 }}>
            <span style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "rgba(122,255,0,0.06)",
              border: "1px solid rgba(122,255,0,0.2)",
              borderRadius: 100,
              padding: "6px 16px 6px 10px",
              fontSize: 11, color: "var(--color-primary)",
              fontFamily: "JetBrains Mono, monospace", letterSpacing: 1,
            }}>
              <span style={{
                width: 7, height: 7, borderRadius: "50%",
                background: "var(--color-primary)",
                boxShadow: "0 0 6px var(--color-primary)",
                animation: "livePulse 2s ease infinite",
                display: "inline-block",
                flexShrink: 0,
              }} />
              GRATIS · POWERED BY IA
            </span>
          </div>

          {/* Headline */}
          <h1 style={{
            fontSize: "clamp(28px, 5.5vw, 54px)",
            fontWeight: 800,
            lineHeight: 1.08,
            letterSpacing: "-0.02em",
            marginBottom: 18,
            color: "var(--color-text)",
          }}>
            Descripciones de producto{" "}
            <span style={{
              display: "inline-block",
              background: "linear-gradient(90deg, #7aff00 0%, #39ff14 50%, #a8ff3e 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              en segundos
            </span>
          </h1>

          <p style={{
            fontSize: 16,
            color: "var(--color-muted)",
            lineHeight: 1.75,
            marginBottom: 32,
          }}>
            Ingresa los datos de tu producto y recibe{" "}
            <span style={{ color: "var(--color-text)", fontWeight: 600 }}>3 variaciones</span>{" "}
            — corta, media y completa — optimizadas para tu plataforma y tono.
          </p>

          {/* Stats row */}
          <div style={{ display:"flex", gap:0, justifyContent:"center", flexWrap:"wrap" }}>
            {[
              { value:"3",       label:"variaciones" },
              { value:"5",       label:"tonos" },
              { value:"6",       label:"plataformas" },
              { value:"∞",       label:"sin límite" },
            ].map((stat, i) => (
              <div key={stat.label} style={{
                padding: "12px 24px",
                borderLeft: i === 0 ? "1px solid var(--color-border)" : "none",
                borderRight: "1px solid var(--color-border)",
                borderTop: "1px solid var(--color-border)",
                borderBottom: "1px solid var(--color-border)",
                textAlign: "center",
              }}>
                <div style={{ fontSize: 22, fontWeight: 800, color: "var(--color-primary)", lineHeight: 1 }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: 10, color: "var(--color-muted)", fontFamily: "JetBrains Mono, monospace", letterSpacing: 1, marginTop: 3 }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────── TOOL ─────────────── */}
      <div style={{ maxWidth: 940, margin: "0 auto", padding: "72px 24px 96px" }}>

        {/* Section label */}
        <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:40 }}>
          <div style={{ height:1, width:32, background:"var(--color-primary)" }} />
          <span style={{ fontFamily:"Georgia, serif", fontStyle:"italic", color:"var(--color-primary)", fontSize:14 }}>
            Completa el formulario
          </span>
        </div>

        <DescriptionGenerator />

        {/* ─────────────── HOW IT WORKS ─────────────── */}
        <div style={{ marginTop: 96 }}>
          <div style={{ height: 1, background: "var(--color-border)", marginBottom: 72 }} />

          <div style={{ textAlign:"center", marginBottom: 52 }}>
            <p style={{ fontSize:10, fontFamily:"JetBrains Mono, monospace", color:"var(--color-primary)", letterSpacing:3, textTransform:"uppercase", marginBottom:12 }}>
              Proceso
            </p>
            <h2 style={{ fontSize:"clamp(20px,3vw,30px)", fontWeight:800, color:"var(--color-text)", letterSpacing:"-0.02em" }}>
              3 pasos, 3 descripciones
            </h2>
          </div>

          {/* Steps */}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:1, background:"var(--color-border)", border:"1px solid var(--color-border)" }} className="how-grid">
            {[
              {
                n: "01",
                title: "Describe tu producto",
                body: "Nombre, categoría, características clave y el tono que quieres comunicar.",
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
                  </svg>
                ),
              },
              {
                n: "02",
                title: "La IA genera el copy",
                body: "El modelo analiza tu producto y crea 3 versiones optimizadas para distintos formatos.",
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2a10 10 0 110 20A10 10 0 0112 2z"/><path d="M12 8v4l3 3"/>
                  </svg>
                ),
              },
              {
                n: "03",
                title: "Copia y usa",
                body: "Selecciona la versión que más te convenga y pégala en tu tienda, publicación o catálogo.",
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                ),
              },
            ].map(({ n, title, body, icon }) => (
              <div key={n} style={{
                background: "var(--color-surface)",
                padding: "36px 28px",
                position: "relative",
                overflow: "hidden",
              }}>
                <div style={{
                  position: "absolute", bottom: -20, right: -10,
                  fontSize: 80, fontWeight: 900, lineHeight: 1,
                  color: "rgba(122,255,0,0.04)",
                  fontFamily: "JetBrains Mono, monospace",
                  userSelect: "none",
                  pointerEvents: "none",
                }}>
                  {n}
                </div>
                <div style={{
                  width: 40, height: 40, borderRadius: 8,
                  background: "rgba(122,255,0,0.08)",
                  border: "1px solid rgba(122,255,0,0.2)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  marginBottom: 20,
                }}>
                  {icon}
                </div>
                <div style={{
                  fontSize: 10, fontFamily: "JetBrains Mono, monospace",
                  color: "var(--color-primary)", letterSpacing: 2, marginBottom: 10,
                }}>
                  PASO {n}
                </div>
                <div style={{ fontSize: 15, fontWeight: 700, color: "var(--color-text)", marginBottom: 10 }}>
                  {title}
                </div>
                <div style={{ fontSize: 13, color: "var(--color-muted)", lineHeight: 1.7 }}>
                  {body}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .back-link:hover { color: var(--color-primary) !important; }

        .hero-particle {
          position: absolute;
          width: 4px; height: 4px;
          border-radius: 50%;
          background: var(--color-primary);
          opacity: 0.35;
          animation: floatParticle 6s ease-in-out infinite;
          pointer-events: none;
        }
        .hero-particle--lg {
          width: 6px; height: 6px;
          opacity: 0.2;
        }

        @keyframes floatParticle {
          0%,100% { transform: translateY(0px) translateX(0px); opacity: 0.35; }
          33%      { transform: translateY(-14px) translateX(6px); opacity: 0.6; }
          66%      { transform: translateY(8px) translateX(-4px); opacity: 0.25; }
        }
        @keyframes livePulse {
          0%,100% { box-shadow: 0 0 6px var(--color-primary); opacity:1; }
          50%      { box-shadow: 0 0 12px var(--color-primary); opacity:0.7; }
        }

        @media (max-width: 640px) {
          .how-grid { grid-template-columns: 1fr !important; }
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-particle { animation: none !important; }
        }
      `}</style>

      <Footer />
    </main>
  );
}
