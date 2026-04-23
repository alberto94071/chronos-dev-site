import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";

export const metadata: Metadata = {
  title: "Contacto | Chronos-Dev",
  description: "Habla con nuestro asistente IA o escríbenos directamente. Te ayudamos a encontrar la solución digital perfecta para tu negocio.",
};

const WHATSAPP = "https://wa.me/50250000000?text=Hola%20Chronos-Dev%2C%20me%20interesa%20un%20proyecto";

export default function ContactPage() {
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
        {/* PCB BG */}
        <svg style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", opacity: 0.05, pointerEvents: "none" }}>
          <defs>
            <pattern id="pcb3" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M0 30 H60 M30 0 V60" stroke="#7aff00" strokeWidth="0.5" />
              <circle cx="30" cy="30" r="2" fill="#7aff00" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#pcb3)" />
        </svg>

        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "inline-block", background: "var(--color-primary)", color: "var(--color-deep)", fontSize: 11, fontWeight: 700, padding: "4px 14px", letterSpacing: 2, textTransform: "uppercase", marginBottom: 20 }}>
            Respuesta inmediata
          </div>
          <h1 style={{ fontSize: "clamp(28px,5vw,52px)", fontWeight: 700, color: "var(--color-text)", lineHeight: 1.1, marginBottom: 16 }}>
            Hablemos sobre
            <br />
            <span style={{ color: "var(--color-primary)" }}>tu proyecto</span>
          </h1>
          <p style={{ fontSize: 15, color: "var(--color-muted)", maxWidth: 520, margin: "0 auto 32px" }}>
            Cuéntale a nuestro asistente qué necesitas y te conectará con el equipo directamente por WhatsApp con toda la info lista.
          </p>

          {/* QUICK CONTACT OPTIONS */}
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "#25d366",
                color: "#fff",
                padding: "12px 24px",
                fontSize: 13,
                fontWeight: 700,
                textDecoration: "none",
                borderRadius: 4,
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp directo
            </a>
            <a
              href="mailto:chronosdev@gmail.com"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "transparent",
                color: "var(--color-primary)",
                border: "1px solid var(--color-primary)",
                padding: "12px 24px",
                fontSize: 13,
                fontWeight: 700,
                textDecoration: "none",
                borderRadius: 4,
              }}
            >
              chronosdev@gmail.com
            </a>
          </div>
        </div>
      </section>

      {/* CHAT + INFO */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "60px 24px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 360px",
            gap: 48,
            alignItems: "start",
          }}
          className="contact-layout"
        >
          {/* CHAT */}
          <div>
            <div style={{ marginBottom: 24 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                <div style={{ height: 1, width: 32, background: "var(--color-primary)" }} />
                <span style={{ fontFamily: "Georgia, serif", fontStyle: "italic", color: "var(--color-primary)", fontSize: 14 }}>
                  Asistente IA
                </span>
              </div>
              <h2 style={{ fontSize: "clamp(20px,3vw,28px)", fontWeight: 700, color: "var(--color-text)" }}>
                Cuéntanos qué necesitas
              </h2>
            </div>
            <ChatWidget />
          </div>

          {/* INFO */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
              <div style={{ height: 1, width: 32, background: "var(--color-primary)" }} />
              <span style={{ fontFamily: "Georgia, serif", fontStyle: "italic", color: "var(--color-primary)", fontSize: 14 }}>
                Info de contacto
              </span>
            </div>

            {[
              { icon: "📍", label: "Ubicación", value: "Guatemala City, Guatemala" },
              { icon: "📧", label: "Email", value: "chronosdev@gmail.com" },
              { icon: "💬", label: "WhatsApp", value: "(+502) 0000-0000" },
              { icon: "🕐", label: "Horario", value: "Lun–Vie 8am–6pm (GT)" },
            ].map((item) => (
              <div
                key={item.label}
                style={{
                  background: "var(--color-surface)",
                  border: "1px solid var(--color-border)",
                  borderRadius: 4,
                  padding: "16px 18px",
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                }}
              >
                <span style={{ fontSize: 20 }}>{item.icon}</span>
                <div>
                  <div style={{ fontSize: 10, color: "var(--color-muted)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 2 }}>
                    {item.label}
                  </div>
                  <div style={{ fontSize: 14, color: "var(--color-text)" }}>{item.value}</div>
                </div>
              </div>
            ))}

            {/* SERVICES QUICK LIST */}
            <div
              style={{
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
                borderRadius: 4,
                padding: "20px 18px",
                marginTop: 8,
              }}
            >
              <div style={{ fontSize: 12, fontWeight: 700, color: "var(--color-text)", marginBottom: 12, letterSpacing: 0.5 }}>
                Servicios y precios base
              </div>
              {[
                { name: "E-commerce", price: "desde Q6,000" },
                { name: "Landing page", price: "desde Q2,500" },
                { name: "Chatbot IA", price: "desde Q3,000" },
                { name: "Automatización", price: "precio variable" },
              ].map((s) => (
                <div
                  key={s.name}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "8px 0",
                    borderBottom: "1px solid var(--color-border)",
                    fontSize: 13,
                  }}
                >
                  <span style={{ color: "var(--color-muted)" }}>{s.name}</span>
                  <span style={{ color: "var(--color-primary)", fontFamily: "JetBrains Mono, monospace", fontSize: 12 }}>
                    {s.price}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .contact-layout {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

      <Footer />
    </main>
  );
}
