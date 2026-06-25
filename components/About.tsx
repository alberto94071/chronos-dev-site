"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const tabs = ["About", "Servicios", "Stack", "Skills"];

function SparkleIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="var(--color-primary)" style={{ marginBottom: 16 }} aria-hidden="true">
      <path d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z" />
    </svg>
  );
}

export default function About() {
  const [active, setActive] = useState("About");
  const [barsVisible, setBarsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(function () {
    if (!ref.current) return;
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) { entry.target.classList.add("visible"); observer.unobserve(entry.target); }
        });
      },
      { threshold: 0.1 }
    );
    ref.current.querySelectorAll(".aos").forEach(function (el) { observer.observe(el); });
    return function () { observer.disconnect(); };
  }, []);

  useEffect(function () {
    if (active === "Skills") {
      setBarsVisible(false);
      var t = setTimeout(function () { setBarsVisible(true); }, 80);
      return function () { clearTimeout(t); };
    }
  }, [active]);

  return (
    <section id="about" ref={ref} className="sec-pad" style={{ borderBottom: "1px solid var(--color-border)" }}>

      {/* HEADER */}
      <div className="aos" style={{ textAlign: "center", marginBottom: 48 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, justifyContent: "center", marginBottom: 10 }}>
          <div style={{ height: 1, width: 40, background: "var(--color-primary)" }} />
          <span style={{ fontFamily: "Georgia, serif", fontStyle: "italic", color: "var(--color-primary)", fontSize: 14 }}>Quiénes somos</span>
          <div style={{ height: 1, width: 40, background: "var(--color-primary)" }} />
        </div>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
          <SparkleIcon />
        </div>
        <p className="aos d1" style={{ fontSize: 18, color: "var(--color-muted)", lineHeight: 1.6, maxWidth: 680, margin: "0 auto 28px" }}>
          Somos especialistas en desarrollo web y automatización con IA, listos para
          construir la solución digital que tu negocio necesita.
        </p>
        {/* TABS */}
        <div className="aos d2" style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" }}>
          {tabs.map(function (tab) {
            var on = tab === active;
            return (
              <button
                key={tab}
                onClick={function () { setActive(tab); }}
                style={{
                  padding: "10px 22px",
                  border: on ? "1px solid var(--color-primary)" : "1px solid var(--color-border)",
                  background: on ? "var(--color-primary)" : "transparent",
                  color: on ? "var(--color-deep)" : "var(--color-muted)",
                  fontSize: 11, letterSpacing: 1.5, textTransform: "uppercase",
                  cursor: "pointer", fontWeight: on ? 700 : 400,
                  transition: "all 0.2s",
                }}
                onMouseEnter={function(e) { if (!on) { e.currentTarget.style.borderColor = "rgba(122,255,0,0.4)"; e.currentTarget.style.color = "var(--color-text)"; } }}
                onMouseLeave={function(e) { if (!on) { e.currentTarget.style.borderColor = "var(--color-border)"; e.currentTarget.style.color = "var(--color-muted)"; } }}
              >
                {tab}
              </button>
            );
          })}
        </div>
      </div>

      {/* TAB CONTENT — key forces remount + fade on switch */}
      <div key={active} style={{ animation: "tabFade 0.35s ease" }}>

        {active === "About" && (
          <div className="grid-2col" style={{ alignItems: "center" }}>
            <div style={{
              background: "var(--color-surface)",
              border: "1px solid var(--color-border)",
              borderRadius: 4,
              height: 420,
              position: "relative",
            }}>
              <Image
                src="/avatar.png"
                alt="Chronos-Dev"
                fill
                sizes="(max-width:768px) 100vw, 50vw"
                style={{
                  objectFit: "contain",
                  objectPosition: "center center",
                  filter: "drop-shadow(0 0 30px #7aff0066)",
                  mixBlendMode: "screen",
                  padding: "16px",
                }}
              />
              <div style={{ position: "absolute", bottom: 14, left: 14, background: "var(--color-primary)", color: "var(--color-deep)", fontSize: 9, fontWeight: 700, padding: "3px 8px", letterSpacing: 1, textTransform: "uppercase" }}>
                Chronos-Dev · Guatemala
              </div>
            </div>
            <div>
              <h3 style={{ fontSize: 24, fontWeight: 700, color: "var(--color-text)", marginBottom: 10 }}>Personal Info</h3>
              <p style={{ fontSize: 13, color: "var(--color-muted)", lineHeight: 1.7, marginBottom: 24 }}>
                Somos una agencia de desarrollo web y automatización con IA basada en Guatemala City.
                Construimos soluciones digitales que generan resultados reales para negocios locales y remotos.
              </p>
              <div className="cards-2col">
                {[
                  { label: "Email",          value: "contacto@chronos-dev.com", hi: true },
                  { label: "WhatsApp",        value: "(+502) 5502-6862",         hi: false },
                  { label: "Ubicación",       value: "Guatemala City, GT",       hi: false },
                  { label: "Disponibilidad",  value: "● Disponible ahora",       hi: true },
                ].map(function (c) {
                  return (
                    <div key={c.label} style={{ background: "var(--color-deep)", padding: "16px 18px" }}>
                      <div style={{ fontSize: 10, color: "var(--color-muted)", marginBottom: 5, letterSpacing: 0.5 }}>{c.label}</div>
                      <div style={{ fontSize: 13, color: c.hi ? "var(--color-primary)" : "var(--color-text)", fontWeight: 500 }}>{c.value}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {active === "Servicios" && (
          <div className="grid-services">
            {[
              { n:"01", cat:"E-commerce",    name:"Tienda en línea completa",           desc:"Catálogo, carrito, checkout WhatsApp o tarjeta, panel admin." },
              { n:"02", cat:"Web Design",    name:"Landing page profesional",           desc:"Rápida, responsive, optimizada para conversión." },
              { n:"03", cat:"IA",            name:"Chatbot con inteligencia artificial", desc:"Asistente virtual 24/7 para tu web o WhatsApp. Claude API." },
              { n:"04", cat:"Automatización", name:"Flujos Python + IA",               desc:"Scripts que eliminan trabajo manual y generan reportes." },
              { n:"05", cat:"Soporte",       name:"Mantenimiento mensual",              desc:"Actualizaciones, soporte técnico y optimización continua." },
            ].map(function (s) {
              return (
                <div
                  key={s.n}
                  style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", padding: "20px 18px", transition: "border-color 0.2s, box-shadow 0.2s" }}
                  onMouseEnter={function(e) { e.currentTarget.style.borderColor = "rgba(122,255,0,0.3)"; e.currentTarget.style.boxShadow = "0 0 20px rgba(122,255,0,0.05)"; }}
                  onMouseLeave={function(e) { e.currentTarget.style.borderColor = "var(--color-border)"; e.currentTarget.style.boxShadow = "none"; }}
                >
                  <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 12, color: "var(--color-primary)", marginBottom: 8 }}>{s.n}</div>
                  <div style={{ fontSize: 9, color: "var(--color-primary)", letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 6 }}>{s.cat}</div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: "var(--color-text)", marginBottom: 8 }}>{s.name}</div>
                  <div style={{ fontSize: 12, color: "var(--color-muted)", lineHeight: 1.6 }}>{s.desc}</div>
                </div>
              );
            })}
          </div>
        )}

        {active === "Stack" && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            {["Next.js 15","React 19","TypeScript","Python","Claude API","Neon PostgreSQL","Cloudinary","NextAuth.js v5","Vercel","Tailwind CSS","Resend","Stripe","Zustand","Node.js"].map(function (tech) {
              return (
                <span
                  key={tech}
                  style={{
                    background: "var(--color-primary-ghost, #7aff0015)",
                    color: "var(--color-primary)",
                    border: "1px solid var(--color-glow, #7aff0033)",
                    fontSize: 11, padding: "8px 16px",
                    fontFamily: "JetBrains Mono, monospace",
                    transition: "background 0.2s, box-shadow 0.2s",
                    cursor: "default",
                  }}
                  onMouseEnter={function(e) { e.currentTarget.style.background = "rgba(122,255,0,0.12)"; e.currentTarget.style.boxShadow = "0 0 12px rgba(122,255,0,0.1)"; }}
                  onMouseLeave={function(e) { e.currentTarget.style.background = "var(--color-primary-ghost, #7aff0015)"; e.currentTarget.style.boxShadow = "none"; }}
                >
                  {tech}
                </span>
              );
            })}
          </div>
        )}

        {active === "Skills" && (
          <div className="grid-skills">
            {[
              { skill: "Next.js / React",          level: 95 },
              { skill: "Python / Automatización",   level: 88 },
              { skill: "PostgreSQL / Neon",         level: 82 },
              { skill: "IA / Claude API",           level: 90 },
              { skill: "UI/UX Design",              level: 78 },
              { skill: "DevOps / Vercel",           level: 85 },
            ].map(function (s, i) {
              return (
                <div key={s.skill}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, fontSize: 13 }}>
                    <span style={{ color: "var(--color-text)" }}>{s.skill}</span>
                    <span style={{ color: "var(--color-primary)", fontFamily: "JetBrains Mono, monospace", fontSize: 11 }}>{s.level}%</span>
                  </div>
                  <div style={{ height: 4, background: "var(--color-border)", borderRadius: 2 }}>
                    <div
                      className="skill-bar-fill"
                      style={{
                        height: "100%",
                        width: barsVisible ? s.level + "%" : "0%",
                        background: "linear-gradient(90deg, var(--color-primary), var(--color-neon))",
                        borderRadius: 2,
                        transition: "width 1.2s cubic-bezier(0.4,0,0.2,1)",
                        transitionDelay: i * 0.12 + "s",
                        boxShadow: barsVisible ? "0 0 8px rgba(122,255,0,0.3)" : "none",
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* AWARDS */}
      <div className="aos" style={{ marginTop: 64 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingBottom: 20, borderBottom: "1px solid var(--color-border)" }}>
          <div style={{ fontSize: 24, fontWeight: 700, color: "var(--color-text)" }}>Logros & Proyectos</div>
          <div style={{ fontSize: 12, color: "var(--color-primary)", cursor: "pointer" }}>Ver mi trabajo →</div>
        </div>
        {[
          { name: "Vestidos MYSY",       cat: "E-commerce · Next.js",  year: "2024" },
          { name: "Textiles Tuanis GT",  cat: "Catálogo Web · PWA",    year: "2024" },
          { name: "R Fragancias",        cat: "E-commerce Lujo · IA",  year: "2024" },
          { name: "OCR Automatización",  cat: "Python · Claude API",   year: "2024" },
        ].map(function (a, i) {
          return (
            <div
              key={a.name}
              className={"grid-awards aos d" + (i + 1)}
              style={{ transition: "background 0.2s, padding-left 0.2s", paddingLeft: 0 }}
              onMouseEnter={function(e) { e.currentTarget.style.background = "var(--color-surface)"; e.currentTarget.style.paddingLeft = "12px"; }}
              onMouseLeave={function(e) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.paddingLeft = "0"; }}
            >
              <div style={{ fontSize: 16, color: "var(--color-text)" }}>{a.name}</div>
              <div className="award-cat" style={{ fontSize: 14, color: "var(--color-muted)" }}>{a.cat}</div>
              <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 14, color: "var(--color-text)" }}>{a.year}</div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
