"use client";
import { useEffect, useRef, useState } from "react";

type Project = {
  id: string;
  cat: string;
  name: string;
  desc: string;
  bg: string;
  accentColor: string;
  tech: string[];
  url: string;
  icon: React.ReactNode;
  image?: string;
};

var projects: Project[] = [
  {
    id: "mysy",
    cat: "E-commerce · Moda",
    name: "Vestidos MYSY",
    desc: "Tienda de moda guatemalteca con catálogo completo, checkout por WhatsApp y panel de administración.",
    bg: "#130a10", accentColor: "#e891c0",
    tech: ["Next.js 15", "Neon DB", "Cloudinary", "WhatsApp"],
    url: "https://vestidos-mysy.vercel.app",
    image: "/projects/mysy.png",
    icon: (
      <svg width="64" height="64" viewBox="0 0 70 70" fill="none">
        <path d="M22 16L10 55l25-8 25 8L48 16Z" fill="#e891c015" stroke="#e891c0" strokeWidth="1.2" />
        <circle cx="35" cy="10" r="6" fill="#e891c025" />
      </svg>
    ),
  },
  {
    id: "tuanis",
    cat: "Textiles Guatemaltecos",
    name: "Textiles Tuanis GT",
    desc: "Catálogo de textiles tradicionales guatemaltecos con diseño inspirado en la cultura local y colores Mayas.",
    bg: "#061008", accentColor: "#4aaa5a",
    tech: ["Next.js 15", "Neon DB", "PWA", "WhatsApp"],
    url: "https://textilestuanis.vercel.app",
    image: "/projects/tuanis.png",
    icon: (
      <svg width="64" height="64" viewBox="0 0 70 70" fill="none">
        <rect x="12" y="12" width="46" height="46" rx="3" fill="#1a4a2415" stroke="#4aaa5a" strokeWidth="1.2" />
        <line x1="12" y1="29" x2="58" y2="29" stroke="#4aaa5a22" />
        <line x1="12" y1="41" x2="58" y2="41" stroke="#4aaa5a22" />
        <line x1="29" y1="12" x2="29" y2="58" stroke="#4aaa5a22" />
        <line x1="41" y1="12" x2="41" y2="58" stroke="#4aaa5a22" />
      </svg>
    ),
  },
  {
    id: "fragancias",
    cat: "Perfumería · Lujo",
    name: "R Fragancias",
    desc: "E-commerce de perfumería de lujo con precios duales GTQ/USD, geolocalización automática y mercado GT + EE.UU.",
    bg: "#05020c", accentColor: "#aa77ee",
    tech: ["Next.js 15", "Dual Market", "Geolocation", "Neon DB"],
    url: "https://rfragancias.vercel.app/",
    image: "/projects/fragancias.png",
    icon: (
      <svg width="64" height="64" viewBox="0 0 70 70" fill="none">
        <rect x="28" y="28" width="14" height="28" rx="3" fill="#7030aa15" stroke="#aa77ee" strokeWidth="1.2" />
        <rect x="31" y="18" width="8" height="12" rx="2" fill="#aa77ee22" />
        <path d="M29 16 Q35 10 41 16" stroke="#aa77ee" strokeWidth="1.2" fill="none" />
      </svg>
    ),
  },
  {
    id: "quiniela",
    cat: "App · Deportes",
    name: "Quiniela Mundial 2026",
    desc: "App de quinielas para el Mundial 2026. Tabla de posiciones en tiempo real, predicciones de partidos y competencia entre amigos.",
    bg: "#030e0a", accentColor: "#00e676",
    tech: ["Cloudflare Pages", "JavaScript", "Mundial 2026", "Real-time"],
    url: "https://quiniela-mundial.pages.dev/tabla",
    image: "/projects/quiniela.png",
    icon: (
      <svg width="64" height="64" viewBox="0 0 70 70" fill="none">
        <circle cx="35" cy="35" r="26" fill="#00e67615" stroke="#00e676" strokeWidth="1.2" />
        <path d="M35 9C35 9 28 18 20 18C20 30 26 42 35 47C44 42 50 30 50 18C42 18 35 9 35 9Z" fill="#00e67620" stroke="#00e676" strokeWidth="1" />
        <circle cx="35" cy="35" r="4" fill="#00e676" />
        <path d="M20 18 L35 35 M50 18 L35 35 M35 47 L35 35" stroke="#00e67644" strokeWidth="1" />
      </svg>
    ),
  },
  {
    id: "chatbot",
    cat: "IA · Chatbot",
    name: "Chatbot con IA",
    desc: "Asistente virtual inteligente entrenado con información del negocio, disponible 24/7 en web o WhatsApp.",
    bg: "#05060e", accentColor: "#3a7aaa",
    tech: ["Claude API", "Next.js", "WhatsApp", "24/7"],
    url: "/contact",
    image: "/projects/chatbot.png",
    icon: (
      <svg width="64" height="64" viewBox="0 0 70 70" fill="none">
        <rect x="8" y="16" width="32" height="22" rx="4" fill="#1a3a5a15" stroke="#3a7aaa" strokeWidth="1.2" />
        <rect x="12" y="23" width="20" height="3" rx="1.5" fill="#3a7aaa3a" />
        <path d="M8 38 L16 50 L16 38Z" fill="#3a7aaa" />
        <rect x="34" y="30" width="26" height="18" rx="3" fill="#1a4a1a15" stroke="#4aaa5a" strokeWidth="1.2" />
        <rect x="38" y="37" width="16" height="3" rx="1.5" fill="#4aaa5a3a" />
        <path d="M60 48 L52 48 L52 57Z" fill="#4aaa5a" />
      </svg>
    ),
  },
];

export default function Projects() {
  var ref = useRef<HTMLElement>(null);
  var [demo, setDemo] = useState<string | null>(null);

  useEffect(function () {
    if (!ref.current) return;
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05 }
    );
    ref.current.querySelectorAll(".aos").forEach(function (el) {
      observer.observe(el);
    });
    return function () { observer.disconnect(); };
  }, []);

  return (
    <section id="projects" ref={ref} className="sec-pad" style={{ borderBottom: "1px solid var(--color-border)" }}>

      {/* HEADER */}
      <div style={{ textAlign: "center", marginBottom: 52 }}>
        <div className="aos" style={{ display: "flex", alignItems: "center", gap: 10, justifyContent: "center", marginBottom: 10 }}>
          <div style={{ height: 1, width: 40, background: "var(--color-primary)" }} />
          <span style={{ fontFamily: "Georgia, serif", fontStyle: "italic", color: "var(--color-primary)", fontSize: 14 }}>
            Complete Project
          </span>
          <div style={{ height: 1, width: 40, background: "var(--color-primary)" }} />
        </div>
        <h2 className="aos d1" style={{ fontSize: "clamp(22px,4vw,30px)", fontWeight: 700, color: "var(--color-text)", lineHeight: 1.25 }}>
          Mira mi trabajo — prueba los proyectos
          <br />
          en vivo directamente aquí
        </h2>
      </div>

      {/* GRID */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        border: "1px solid var(--color-border)",
        borderRadius: 4,
        overflow: "hidden",
      }} className="projects-grid-main">
        {projects.map(function (p, i) {
          return (
            <div
              key={p.id}
              onClick={function () { setDemo(p.id); }}
              style={{
                cursor: "pointer",
                borderRight: i % 3 !== 2 ? "1px solid var(--color-border)" : undefined,
                borderBottom: i < projects.length - (projects.length % 3 || 3) ? "1px solid var(--color-border)" : undefined,
                transition: "background 0.25s, box-shadow 0.25s",
              }}
              onMouseEnter={function (e) {
                e.currentTarget.style.background = "var(--color-surface)";
                e.currentTarget.style.boxShadow = "inset 0 2px 0 0 " + p.accentColor;
              }}
              onMouseLeave={function (e) {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div className="project-img-container" style={{ height: 190, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", background: p.bg, overflow: "hidden" }}>
                <span style={{ position: "absolute", top: 10, left: 10, fontSize: 9, color: "var(--color-primary)", letterSpacing: 1.5, textTransform: "uppercase", border: "1px solid #7aff0033", background: "#7aff0015", padding: "2px 7px", zIndex: 2 }}>
                  {p.cat}
                </span>

                {p.image ? (
                  <img src={p.image} alt={p.name} className="project-image" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.65, transition: "opacity 0.3s, transform 0.5s ease" }} />
                ) : (
                  p.icon
                )}

                <span style={{ position: "absolute", bottom: 8, right: 10, fontSize: 9, color: p.accentColor, fontFamily: "JetBrains Mono, monospace", zIndex: 2 }}>
                  Click →
                </span>
              </div>
              <div style={{ padding: "16px 20px", borderTop: "1px solid var(--color-border)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                  <div style={{ fontSize: 9, color: "var(--color-primary)", letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 4 }}>{p.cat}</div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: "var(--color-text)" }}>{p.name}</div>
                </div>
                <div style={{ width: 34, height: 34, borderRadius: "50%", border: "1px solid var(--color-border)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="var(--color-primary)">
                    <path fillRule="evenodd" d="M14 2.5a.5.5 0 00-.5-.5h-6a.5.5 0 000 1h4.793L2.146 13.146a.5.5 0 00.708.708L13 3.707V8.5a.5.5 0 001 0v-6z" />
                  </svg>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* MORE WORK */}
      <div className="aos d4" style={{ textAlign: "center", marginTop: 40 }}>
        <button
          style={{ width: 108, height: 108, borderRadius: "50%", background: "var(--color-primary)", border: "none", cursor: "pointer", display: "inline-flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 4, transition: "transform 0.2s, box-shadow 0.2s" }}
          onMouseEnter={function (e) { e.currentTarget.style.transform = "scale(1.08)"; e.currentTarget.style.boxShadow = "0 0 32px rgba(122,255,0,0.35)"; }}
          onMouseLeave={function (e) { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "none"; }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="var(--color-deep)">
            <path fillRule="evenodd" d="M1 8a.5.5 0 01.5-.5h11.793l-3.147-3.146a.5.5 0 01.708-.708l4 4a.5.5 0 010 .708l-4 4a.5.5 0 01-.708-.708L13.293 8.5H1.5A.5.5 0 011 8z" />
          </svg>
          <span style={{ fontSize: 9, color: "var(--color-deep)", fontWeight: 700, textAlign: "center", lineHeight: 1.3 }}>Ver más<br />proyectos</span>
        </button>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .projects-grid-main { grid-template-columns: 1fr !important; }
          .projects-grid-main > div { border-right: none !important; border-bottom: 1px solid var(--color-border) !important; }
        }
        @media (min-width: 481px) and (max-width: 768px) {
          .projects-grid-main { grid-template-columns: 1fr 1fr !important; }
          .projects-grid-main > div:nth-child(odd) { border-right: 1px solid var(--color-border) !important; }
        }
        .projects-grid-main > div:hover .project-image {
          opacity: 1 !important;
          transform: scale(1.05);
        }
      `}</style>

      {/* DEMO OVERLAY */}
      {demo && (
        <div
          style={{ position: "fixed", inset: 0, background: "#000000cc", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 200, padding: 16, animation: "modalBackdropIn 0.2s ease" }}
          onClick={function (e) { if (e.target === e.currentTarget) setDemo(null); }}
        >
          <div style={{ background: "var(--color-deep)", border: "1px solid var(--color-border)", borderRadius: 8, width: "100%", maxWidth: 680, overflow: "hidden", animation: "modalCardIn 0.3s cubic-bezier(0.2,0.8,0.2,1)" }}>
            {/* BROWSER BAR */}
            <div style={{ background: "var(--color-surface)", padding: "9px 14px", display: "flex", alignItems: "center", borderBottom: "1px solid var(--color-border)" }}>
              <button onClick={function () { setDemo(null); }} style={{ width: 12, height: 12, borderRadius: "50%", background: "#ff5f57", border: "none", cursor: "pointer", fontSize: 8, color: "#500" }}>✕</button>
              <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#febc2e", marginLeft: 5 }} />
              <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#28c840", marginLeft: 5 }} />
              <div style={{ flex: 1, background: "var(--color-deep)", border: "1px solid var(--color-border)", padding: "3px 10px", fontSize: 10, color: "var(--color-muted)", margin: "0 10px", fontFamily: "JetBrains Mono, monospace" }}>
                {projects.find(function (p) { return p.id === demo; })?.url}
              </div>
              <span style={{ fontSize: 8, color: "var(--color-primary)", background: "#7aff0015", border: "1px solid #7aff0033", padding: "2px 7px", letterSpacing: 1, textTransform: "uppercase" }}>demo</span>
            </div>

            {/* PROJECT IMAGE IN MODAL */}
            {(function () {
              var p = projects.find(function (x) { return x.id === demo; });
              if (!p || !p.image) return null;
              return (
                <div style={{ height: 180, background: p.bg, position: "relative", overflow: "hidden" }}>
                  <img src={p.image} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.6 }} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 30%, " + p.bg + " 100%)" }} />
                  <div style={{ position: "absolute", bottom: 12, left: 16, fontSize: 9, color: p.accentColor, fontFamily: "JetBrains Mono, monospace", letterSpacing: 2, textTransform: "uppercase", border: "1px solid " + p.accentColor + "44", padding: "2px 8px" }}>
                    {p.cat}
                  </div>
                </div>
              );
            })()}

            {/* CONTENT */}
            <div style={{ padding: 24 }}>
              {(function () {
                var p = projects.find(function (x) { return x.id === demo; });
                if (!p) return null;
                return (
                  <div>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
                      {p.tech.map(function (t) {
                        return <span key={t} style={{ background: "var(--color-surface)", color: "var(--color-primary)", border: "1px solid var(--color-border)", fontSize: 9, padding: "3px 8px", fontFamily: "JetBrains Mono, monospace" }}>{t}</span>;
                      })}
                    </div>
                    <h3 style={{ fontSize: 22, fontWeight: 700, color: "var(--color-text)", marginBottom: 10 }}>{p.name}</h3>
                    <p style={{ fontSize: 14, color: "var(--color-muted)", lineHeight: 1.7, marginBottom: 20 }}>{p.desc}</p>
                    <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
                      <a
                        href={p.url}
                        target={p.url.startsWith("http") ? "_blank" : "_self"}
                        rel="noopener noreferrer"
                        style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "var(--color-primary)", color: "var(--color-deep)", padding: "10px 22px", fontSize: 12, fontWeight: 700, textDecoration: "none", transition: "transform 0.2s" }}
                        onMouseEnter={function(e) { e.currentTarget.style.transform = "translateY(-2px)"; }}
                        onMouseLeave={function(e) { e.currentTarget.style.transform = "none"; }}
                      >
                        {p.url.startsWith("http") ? "Ver en vivo →" : "Ir a contacto →"}
                      </a>
                      <button
                        onClick={function() { setDemo(null); }}
                        style={{ fontSize: 12, color: "var(--color-muted)", background: "none", border: "1px solid var(--color-border)", padding: "10px 16px", cursor: "pointer", transition: "color 0.2s" }}
                        onMouseEnter={function(e) { e.currentTarget.style.color = "var(--color-text)"; }}
                        onMouseLeave={function(e) { e.currentTarget.style.color = "var(--color-muted)"; }}
                      >
                        Cerrar
                      </button>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
