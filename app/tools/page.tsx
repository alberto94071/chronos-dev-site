import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import OcrTool from "@/components/OcrTool";
import ChatWidget from "@/components/ChatWidget";

export const metadata: Metadata = {
  title: "Herramientas Gratuitas | Chronos-Dev",
  description: "Extrae texto de PDFs e imágenes gratis. Habla con nuestro asistente IA para conocer cómo automatizar tu negocio.",
};

export default function ToolsPage() {
  return (
    <main>
      <Navbar />

      {/* HERO */}
      <section style={{
        background: "var(--color-deep)",
        borderBottom: "1px solid var(--color-border)",
        padding: "64px 56px 56px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* PCB BG */}
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
            100% Gratis
          </div>
          <h1 style={{ fontSize: "clamp(28px,5vw,52px)", fontWeight: 700, color: "var(--color-text)", lineHeight: 1.1, marginBottom: 16 }}>
            Herramientas Digitales
            <br />
            <span style={{ color: "var(--color-primary)" }}>Sin costo</span>
          </h1>
          <p style={{ fontSize: 15, color: "var(--color-muted)", maxWidth: 560, margin: "0 auto" }}>
            Extrae texto de tus documentos al instante o habla con nuestro asistente IA.
            Sin registro, sin límites, sin trucos.
          </p>
        </div>
      </section>

      {/* TOOLS */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "80px 56px", display: "flex", flexDirection: "column", gap: 80 }}>

        {/* OCR TOOL */}
        <div>
          <div style={{ marginBottom: 40 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
              <div style={{ height: 1, width: 32, background: "var(--color-primary)" }} />
              <span style={{ fontFamily: "Georgia, serif", fontStyle: "italic", color: "var(--color-primary)", fontSize: 14 }}>
                Herramienta 01
              </span>
            </div>
            <h2 style={{ fontSize: "clamp(24px,4vw,36px)", fontWeight: 700, color: "var(--color-text)", marginBottom: 10 }}>
              Extractor de texto PDF e imágenes
            </h2>
            <p style={{ fontSize: 14, color: "var(--color-muted)", maxWidth: 560, lineHeight: 1.7 }}>
              Sube cualquier PDF o imagen y obtén el texto extraído al instante.
              Funciona con documentos escaneados, facturas, contratos, fotos de pizarrón — lo que sea.
            </p>
            <div style={{ display: "flex", gap: 12, marginTop: 16, flexWrap: "wrap" }}>
              {["PDF", "PNG", "JPG", "JPEG", "WEBP", "Español + Inglés", "Sin registro"].map(function (tag) {
                return (
                  <span key={tag} style={{ background: "var(--color-surface)", color: "var(--color-primary)", border: "1px solid var(--color-border)", fontSize: 10, padding: "4px 10px", fontFamily: "JetBrains Mono, monospace" }}>
                    {tag}
                  </span>
                );
              })}
            </div>
          </div>
          <OcrTool />
        </div>

        {/* DIVIDER */}
        <div style={{ height: 1, background: "var(--color-border)" }} />

        {/* CHAT */}
        <div>
          <div style={{ marginBottom: 40 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
              <div style={{ height: 1, width: 32, background: "var(--color-primary)" }} />
              <span style={{ fontFamily: "Georgia, serif", fontStyle: "italic", color: "var(--color-primary)", fontSize: 14 }}>
                Herramienta 02
              </span>
            </div>
            <h2 style={{ fontSize: "clamp(24px,4vw,36px)", fontWeight: 700, color: "var(--color-text)", marginBottom: 10 }}>
              Asistente IA de Chronos-Dev
            </h2>
            <p style={{ fontSize: 14, color: "var(--color-muted)", maxWidth: 560, lineHeight: 1.7 }}>
              Habla con nuestro asistente para saber qué solución digital necesita tu negocio.
              Te explica opciones, precios y te conecta con nuestro equipo cuando estés listo.
            </p>
            <div style={{ display: "flex", gap: 12, marginTop: 16, flexWrap: "wrap" }}>
              {["Claude AI", "Respuesta inmediata", "24/7", "Conecta a WhatsApp"].map(function (tag) {
                return (
                  <span key={tag} style={{ background: "var(--color-surface)", color: "var(--color-primary)", border: "1px solid var(--color-border)", fontSize: 10, padding: "4px 10px", fontFamily: "JetBrains Mono, monospace" }}>
                    {tag}
                  </span>
                );
              })}
            </div>
          </div>
          <ChatWidget />
        </div>

      </div>

      <Footer />
    </main>
  );
}
