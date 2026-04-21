"use client";
import { useEffect, useRef } from "react";

const WHATSAPP = "https://wa.me/50250000000?text=Hola%20Chronos-Dev%2C%20me%20interesa%20un%20proyecto";

var services = [
  { n:"01", cat:"E-commerce", name:"Tienda en línea completa", desc:"Catálogo, carrito, checkout por WhatsApp o tarjeta. Panel admin incluido." },
  { n:"02", cat:"Web Design", name:"Landing page de alto impacto", desc:"Páginas rápidas, responsivas y optimizadas para convertir visitas en clientes." },
  { n:"03", cat:"Inteligencia Artificial", name:"Chatbot con IA para tu negocio", desc:"Asistente virtual entrenado con la info de tu negocio. 24/7 en web o WhatsApp." },
  { n:"04", cat:"Automatización", name:"Flujos Python + IA a medida", desc:"Scripts que procesan datos, generan reportes y eliminan trabajo manual." },
  { n:"05", cat:"Soporte mensual", name:"Mantenimiento y actualizaciones", desc:"Soporte continuo, actualizaciones y optimización para mantener tu sitio activo." },
];

var process = [
  { n:"01", title:"Concepto", desc:"Analizamos tu negocio y objetivos para definir la mejor estrategia digital.", bullets:["Revisión de branding","Investigación de competencia","Definición de estrategia"] },
  { n:"02", title:"Diseño", desc:"Creamos el diseño visual completo basado en tu identidad de marca.", bullets:["Wireframes y mockups","Tipografía y colores","Revisión y ajustes"] },
  { n:"03", title:"Desarrollo", desc:"Implementamos con las mejores tecnologías y lanzamos en producción.", bullets:["Next.js + Vercel","Pruebas exhaustivas","Lanzamiento y soporte"] },
];

export default function Services() {
  var ref = useRef<HTMLElement>(null);
  useEffect(function () {
    if (!ref.current) return;
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add("visible"); observer.unobserve(entry.target); }
      });
    }, { threshold: 0.1 });
    ref.current.querySelectorAll(".aos").forEach(function (el) { observer.observe(el); });
    return function () { observer.disconnect(); };
  }, []);

  return (
    <section ref={ref}>

      {/* ── SERVICES ── */}
      <div id="services" className="sec-pad" style={{ borderBottom: "1px solid var(--color-border)" }}>
        <div style={{ textAlign: "center", marginBottom: 52 }}>
          <div className="aos" style={{ display: "flex", alignItems: "center", gap: 10, justifyContent: "center", marginBottom: 10 }}>
            <div style={{ height: 1, width: 40, background: "var(--color-primary)" }} />
            <span style={{ fontFamily: "Georgia, serif", fontStyle: "italic", color: "var(--color-primary)", fontSize: 14 }}>Services That I Provide</span>
            <div style={{ height: 1, width: 40, background: "var(--color-primary)" }} />
          </div>
          <h2 className="aos d1" style={{ fontSize: "clamp(22px,4vw,32px)", fontWeight: 700, color: "var(--color-text)", lineHeight: 1.2, maxWidth: 600, margin: "0 auto" }}>
            Soluciones especializadas para el crecimiento de tu negocio
          </h2>
        </div>
        <div style={{ borderTop: "1px solid var(--color-border)" }}>
          {services.map(function (s, i) {
            return (
              <div key={s.n} className={"aos d" + (i + 1)}
                style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "26px 0", borderBottom: "1px solid var(--color-border)", cursor: "pointer", transition: "padding-left 0.2s" }}
                onMouseEnter={function (e) { e.currentTarget.style.paddingLeft = "12px"; }}
                onMouseLeave={function (e) { e.currentTarget.style.paddingLeft = "0"; }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                  <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 12, color: "var(--color-primary)", minWidth: 24 }}>{s.n}</span>
                  <div>
                    <div style={{ fontSize: 9, color: "var(--color-primary)", letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 4 }}>{s.cat}</div>
                    <div style={{ fontSize: "clamp(16px,3vw,21px)", fontWeight: 700, color: "var(--color-text)" }}>{s.name}</div>
                  </div>
                </div>
                <div className="svc-right">
                  <div style={{ fontSize: 13, color: "var(--color-muted)", maxWidth: 260, textAlign: "right", lineHeight: 1.6 }}>{s.desc}</div>
                  <div style={{ width: 40, height: 40, borderRadius: "50%", border: "1px solid var(--color-border)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <svg width="13" height="13" viewBox="0 0 16 16" fill="var(--color-primary)">
                      <path fillRule="evenodd" d="M14 2.5a.5.5 0 00-.5-.5h-6a.5.5 0 000 1h4.793L2.146 13.146a.5.5 0 00.708.708L13 3.707V8.5a.5.5 0 001 0v-6z"/>
                    </svg>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── PROCESS ── */}
      <div id="process" className="sec-pad" style={{ borderBottom: "1px solid var(--color-border)" }}>
        <div style={{ textAlign: "center", marginBottom: 52 }}>
          <div className="aos" style={{ display: "flex", alignItems: "center", gap: 10, justifyContent: "center", marginBottom: 10 }}>
            <div style={{ height: 1, width: 40, background: "var(--color-primary)" }} />
            <span style={{ fontFamily: "Georgia, serif", fontStyle: "italic", color: "var(--color-primary)", fontSize: 14 }}>Working Process</span>
            <div style={{ height: 1, width: 40, background: "var(--color-primary)" }} />
          </div>
          <h2 className="aos d1" style={{ fontSize: "clamp(22px,4vw,30px)", fontWeight: 700, color: "var(--color-text)" }}>
            Tu sitio web ideal en solo unos pocos pasos
          </h2>
        </div>
        <div className="grid-3col">
          {process.map(function (p, i) {
            return (
              <div key={p.n} className={"aos aosZ d" + (i + 1)} style={{ background: "var(--color-deep)", padding: "32px 28px" }}>
                <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 20, color: "var(--color-primary)", marginBottom: 8 }}>{p.n}</div>
                <div style={{ fontSize: 22, fontWeight: 700, color: "var(--color-text)", marginBottom: 10 }}>{p.title}</div>
                <p style={{ fontSize: 13, color: "var(--color-muted)", lineHeight: 1.6, marginBottom: 20 }}>{p.desc}</p>
                <ul style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {p.bullets.map(function (b) {
                    return (
                      <li key={b} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "var(--color-muted)", listStyle: "none" }}>
                        <div style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--color-primary)", flexShrink: 0 }} />
                        {b}
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── CONTACT ── */}
      <div id="contact" className="sec-pad grid-2col-40" style={{ borderBottom: "1px solid var(--color-border)", alignItems: "center" }}>
        <div className="aos aosX">
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
            <div style={{ height: 1, width: 30, background: "var(--color-primary)" }} />
            <span style={{ fontFamily: "Georgia, serif", fontStyle: "italic", color: "var(--color-primary)", fontSize: 14 }}>Need a Project?</span>
          </div>
          <div style={{ fontSize: "clamp(26px,4vw,36px)", fontWeight: 700, color: "var(--color-text)", lineHeight: 1.2, marginBottom: 32 }}>
            Trabajemos juntos.
            <br />
            Agenda una reunión.
          </div>
          {[
            { icon: "M0 4a2 2 0 012-2h12a2 2 0 012 2v8a2 2 0 01-2 2H2a2 2 0 01-2-2V4zm2-1a1 1 0 00-1 1v.217l7 4.2 7-4.2V4a1 1 0 00-1-1H2zm13 2.383l-4.708 2.825L15 11.105V5.383zm-.034 6.876l-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 002 13h12a1 1 0 00.966-.741zM1 11.105l4.708-2.897L1 5.383v5.722z", label:"Email", value:"chronosdev@gmail.com" },
            { icon: "M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 018 14.58a31.481 31.481 0 01-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0110 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 002 6c0 4.314 6 10 6 10z M8 8a2 2 0 100-4 2 2 0 000 4zm0 1a3 3 0 100-6 3 3 0 000 6z", label:"Ubicación", value:"Guatemala City, Guatemala" },
          ].map(function (item) {
            return (
              <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 14, padding: "16px 0", borderBottom: "1px solid var(--color-border)" }}>
                <div style={{ width: 36, height: 36, borderRadius: "50%", background: "var(--color-primary)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="var(--color-deep)"><path d={item.icon}/></svg>
                </div>
                <div>
                  <div style={{ fontSize: 10, color: "var(--color-muted)", marginBottom: 2, letterSpacing: 0.5, textTransform: "uppercase" }}>{item.label}</div>
                  <div style={{ fontSize: 14, color: "var(--color-text)" }}>{item.value}</div>
                </div>
              </div>
            );
          })}
          <div style={{ marginTop: 28 }}>
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer"
              style={{ background: "var(--color-primary)", color: "var(--color-deep)", padding: "13px 28px", fontSize: 12, fontWeight: 700, letterSpacing: 1, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6 }}
            >
              Escribir por WhatsApp →
            </a>
          </div>
        </div>

        <div className="aos aosR" style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", borderRadius: 4, height: 320, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
          <svg width="100" height="100" viewBox="0 0 100 100" fill="var(--color-border)">
            <rect x="15" y="20" width="70" height="60" rx="2"/>
            <rect x="20" y="25" width="60" height="10" rx="1" fill="var(--color-surface)"/>
            <rect x="20" y="40" width="40" height="5" rx="1" fill="var(--color-surface)"/>
            <rect x="20" y="50" width="50" height="5" rx="1" fill="var(--color-surface)"/>
            <rect x="20" y="60" width="30" height="5" rx="1" fill="var(--color-surface)"/>
          </svg>
          <div style={{ position: "absolute", bottom: 14, right: 14, background: "var(--color-primary)", color: "var(--color-deep)", fontSize: 9, fontWeight: 700, padding: "3px 8px", letterSpacing: 1 }}>
            Disponible ahora
          </div>
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", opacity: 0.08, pointerEvents: "none" }}>
            <svg width="280" height="280" viewBox="0 0 280 280" fill="none" stroke="#7aff00">
              {[20,40,60,80,100,120].map(function (r) { return <circle key={r} cx="140" cy="140" r={r}/>; })}
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
