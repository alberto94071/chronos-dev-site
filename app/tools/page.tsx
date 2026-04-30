import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import OcrTool from "@/components/OcrTool";

export const metadata: Metadata = {
  title: "Herramientas Gratuitas | Chronos-Dev",
  description: "Extrae texto de PDFs e imágenes gratis. Sin registro, sin límites.",
};

const comingSoon = [
  { icon: "🤖", name: "Generador de contratos", desc: "Crea contratos básicos para tu negocio en segundos con IA." },
  { icon: "📊", name: "Analizador de datos CSV", desc: "Sube tu hoja de cálculo y obtén insights automáticos." },
  { icon: "🖼️", name: "Optimizador de imágenes", desc: "Comprime y convierte imágenes para web sin perder calidad." },
  { icon: "✍️", name: "Generador de descripciones", desc: "Crea descripciones de productos para tu tienda en línea." },
  { icon: "📧", name: "Redactor de emails", desc: "Genera correos profesionales para clientes y proveedores." },
  { icon: "🔍", name: "Auditor SEO básico", desc: "Analiza tu página y obtén recomendaciones de mejora." },
];

export default function ToolsPage() {
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
        <svg style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", opacity: 0.05, pointerEvents: "none" }}>
          <defs>
            <pattern id="pcb2" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M0 30 H60 M30 0 V60" stroke="#7aff00" strokeWidth="0.5" />
              <circle cx="30" cy="30" r="2" fill="#7aff00" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#pcb2)" />
        </svg>

        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "inline-block", background: "var(--color-primary)", color: "var(--color-deep)", fontSize: 11, fontWeight: 700, padding: "4px 14px", letterSpacing: 2, textTransform: "uppercase", marginBottom: 20 }}>
            100% Gratis · Sin registro
          </div>
          <h1 style={{ fontSize: "clamp(28px,5vw,52px)", fontWeight: 700, color: "var(--color-text)", lineHeight: 1.1, marginBottom: 16 }}>
            Herramientas Digitales
            <br />
            <span style={{ color: "var(--color-primary)" }}>para tu negocio</span>
          </h1>
          <p style={{ fontSize: 15, color: "var(--color-muted)", maxWidth: 560, margin: "0 auto" }}>
            Herramientas útiles que puedes usar ahora mismo, sin crear cuenta ni pagar nada.
            Más herramientas nuevas cada semana.
          </p>
        </div>
      </section>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "80px 24px" }}>

        {/* OCR TOOL */}
        <div style={{ marginBottom: 80 }}>
          <div style={{ marginBottom: 36 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
              <div style={{ height: 1, width: 32, background: "var(--color-primary)" }} />
              <span style={{ fontFamily: "Georgia, serif", fontStyle: "italic", color: "var(--color-primary)", fontSize: 14 }}>
                Extractor de texto con OCR
              </span>
            </div>
            <h2 style={{ fontSize: "clamp(22px,4vw,34px)", fontWeight: 700, color: "var(--color-text)", marginBottom: 10 }}>
              Extractor de texto PDF e imágenes
            </h2>
            <p style={{ fontSize: 14, color: "var(--color-muted)", maxWidth: 560, lineHeight: 1.7 }}>
              Sube cualquier PDF o imagen y obtén el texto extraído al instante.
              Funciona con documentos escaneados, facturas, contratos, fotos de pizarrón — lo que sea.
            </p>
            <div style={{ display: "flex", gap: 10, marginTop: 14, flexWrap: "wrap" }}>
              {["PDF", "PNG", "JPG", "JPEG", "WEBP", "Español + Inglés", "Sin límite"].map((tag) => (
                <span
                  key={tag}
                  style={{
                    background: "var(--color-surface)",
                    color: "var(--color-primary)",
                    border: "1px solid var(--color-border)",
                    fontSize: 10,
                    padding: "4px 10px",
                    fontFamily: "JetBrains Mono, monospace",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <OcrTool />
        </div>

        {/* DIVIDER */}
        <div style={{ height: 1, background: "var(--color-border)", marginBottom: 80 }} />

        {/* PDF SUITE — HERRAMIENTA 02 */}
        <div style={{ marginBottom: 80 }}>
          <div style={{ marginBottom: 36 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
              <div style={{ height: 1, width: 32, background: "var(--color-primary)" }} />
              <span style={{ fontFamily: "Georgia, serif", fontStyle: "italic", color: "var(--color-primary)", fontSize: 14 }}>
                Gestor de PDF's
              </span>
            </div>
            <h2 style={{ fontSize: "clamp(22px,4vw,34px)", fontWeight: 700, color: "var(--color-text)", marginBottom: 10 }}>
              Suite de herramientas PDF
            </h2>
            <p style={{ fontSize: 14, color: "var(--color-muted)", maxWidth: 560, lineHeight: 1.7 }}>
              Unir, dividir, rotar, comprimir, convertir a Word, proteger y desbloquear PDFs.
              Todo corre en tu navegador — tus archivos nunca salen de tu dispositivo.
            </p>
            <div style={{ display: "flex", gap: 10, marginTop: 14, flexWrap: "wrap" }}>
              {["7 herramientas", "Sin límite", "100% privado", "Sin servidor"].map((tag) => (
                <span
                  key={tag}
                  style={{
                    background: "var(--color-surface)",
                    color: "var(--color-primary)",
                    border: "1px solid var(--color-border)",
                    fontSize: 10,
                    padding: "4px 10px",
                    fontFamily: "JetBrains Mono, monospace",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* MINI GRID */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 12 }}>
            {[
              { href: "/tools/pdf/merge", icon: "📑", name: "Unir PDFs" },
              { href: "/tools/pdf/split", icon: "✂️", name: "Dividir PDF" },
              { href: "/tools/pdf/rotate", icon: "🔄", name: "Rotar PDF" },
              { href: "/tools/pdf/compress", icon: "📦", name: "Comprimir PDF" },
              { href: "/tools/pdf/pdf-to-word", icon: "📝", name: "PDF a Word" },
              { href: "/tools/pdf/protect", icon: "🔒", name: "Proteger PDF" },
              { href: "/tools/pdf/unlock", icon: "🔓", name: "Desbloquear PDF" },
            ].map((tool) => (
              <a
                key={tool.href}
                href={tool.href}
                style={{
                  background: "var(--color-surface)",
                  border: "1px solid var(--color-border)",
                  borderRadius: 6,
                  padding: "20px 18px",
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  transition: "border-color 0.2s",
                }}
              >
                <span style={{ fontSize: 24 }}>{tool.icon}</span>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "var(--color-text)" }}>{tool.name}</div>
                  <div style={{ fontSize: 10, color: "var(--color-primary)", fontFamily: "JetBrains Mono, monospace", marginTop: 2 }}>Usar →</div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* DIVIDER */}
        <div style={{ height: 1, background: "var(--color-border)", marginBottom: 80 }} />

        {/* COMING SOON */}
        <div>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, justifyContent: "center", marginBottom: 10 }}>
              <div style={{ height: 1, width: 40, background: "var(--color-border)" }} />
              <span style={{ fontFamily: "Georgia, serif", fontStyle: "italic", color: "var(--color-muted)", fontSize: 14 }}>
                Próximamente
              </span>
              <div style={{ height: 1, width: 40, background: "var(--color-border)" }} />
            </div>
            <h2 style={{ fontSize: "clamp(20px,3vw,28px)", fontWeight: 700, color: "var(--color-text)", marginBottom: 8 }}>
              Más herramientas en camino
            </h2>
            <p style={{ fontSize: 14, color: "var(--color-muted)" }}>
              Estamos construyendo nuevas herramientas cada semana. Vuelve pronto.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 16,
            }}
            className="tools-grid"
          >
            {comingSoon.map((tool) => (
              <div
                key={tool.name}
                style={{
                  background: "var(--color-surface)",
                  border: "1px solid var(--color-border)",
                  borderRadius: 6,
                  padding: "24px 20px",
                  opacity: 0.6,
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* COMING SOON BADGE */}
                <div
                  style={{
                    position: "absolute",
                    top: 12,
                    right: 12,
                    background: "var(--color-border)",
                    color: "var(--color-muted)",
                    fontSize: 8,
                    padding: "2px 6px",
                    letterSpacing: 1,
                    textTransform: "uppercase",
                    fontFamily: "JetBrains Mono, monospace",
                  }}
                >
                  Pronto
                </div>
                <div style={{ fontSize: 28, marginBottom: 12 }}>{tool.icon}</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "var(--color-text)", marginBottom: 6 }}>
                  {tool.name}
                </div>
                <div style={{ fontSize: 12, color: "var(--color-muted)", lineHeight: 1.6 }}>
                  {tool.desc}
                </div>
              </div>
            ))}
          </div>

          {/* SUGGEST CTA */}
          <div
            style={{
              marginTop: 40,
              background: "var(--color-deep)",
              border: "1px solid var(--color-border)",
              borderRadius: 6,
              padding: "28px 32px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 16,
            }}
          >
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: "var(--color-text)", marginBottom: 4 }}>
                ¿Qué herramienta te gustaría ver aquí?
              </div>
              <div style={{ fontSize: 13, color: "var(--color-muted)" }}>
                Dinos qué necesitas y lo construimos.
              </div>
            </div>
            <a
              href="https://wa.me/50255026862?text=Hola%20Chronos-Dev%2C%20me%20gustar%C3%ADa%20sugerir%20una%20herramienta%20para%20la%20p%C3%A1gina"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: "var(--color-primary)",
                color: "var(--color-deep)",
                padding: "12px 24px",
                fontSize: 12,
                fontWeight: 700,
                textDecoration: "none",
                whiteSpace: "nowrap",
              }}
            >
              Sugerir herramienta →
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .tools-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 480px) {
          .tools-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <Footer />
    </main>
  );
}
