import Link from "next/link";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export var metadata: Metadata = {
  title: "Herramientas PDF | Chronos-Dev",
  description: "Suite completa de herramientas PDF gratis. Unir, dividir, rotar, comprimir, proteger y más. 100% en tu navegador.",
};

var tools = [
  { href: "/tools/pdf/merge", icon: "📑", name: "Unir PDFs", desc: "Combina múltiples PDFs en uno solo" },
  { href: "/tools/pdf/split", icon: "✂️", name: "Dividir PDF", desc: "Extrae páginas específicas de un PDF" },
  { href: "/tools/pdf/rotate", icon: "🔄", name: "Rotar PDF", desc: "Rota páginas individuales o todas" },
  { href: "/tools/pdf/compress", icon: "📦", name: "Comprimir PDF", desc: "Reduce el tamaño de tu PDF" },
  { href: "/tools/pdf/pdf-to-word", icon: "📝", name: "PDF a Word", desc: "Convierte PDF a documento editable" },
  { href: "/tools/pdf/protect", icon: "🔒", name: "Proteger PDF", desc: "Agrega contraseña a tu PDF" },
  { href: "/tools/pdf/unlock", icon: "🔓", name: "Desbloquear PDF", desc: "Quita la contraseña de un PDF" },
];

export default function PdfHubPage() {
  return (
    <main>
      <Navbar />

      <section style={{ background: "var(--color-deep)", borderBottom: "1px solid var(--color-border)", padding: "64px 24px 56px", textAlign: "center" }}>
        <Link href="/tools" style={{ fontSize: 12, color: "var(--color-primary)", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 20 }}>
          ← Volver a herramientas
        </Link>
        <h1 style={{ fontSize: "clamp(28px,5vw,48px)", fontWeight: 700, color: "var(--color-text)", lineHeight: 1.1, marginBottom: 12 }}>
          Suite de herramientas <span style={{ color: "var(--color-primary)" }}>PDF</span>
        </h1>
        <p style={{ fontSize: 15, color: "var(--color-muted)", maxWidth: 500, margin: "0 auto" }}>
          Todo lo que necesitas para trabajar con PDFs. Gratis, sin registro, 100% en tu navegador.
        </p>
        <div style={{ marginTop: 16, fontSize: 10, color: "var(--color-muted)", fontFamily: "JetBrains Mono, monospace" }}>
          🔒 Tus archivos nunca salen de tu dispositivo
        </div>
      </section>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "60px 24px 80px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: 16 }}>
          {tools.map(function(tool) {
            return (
              <Link
                key={tool.href}
                href={tool.href}
                style={{
                  background: "var(--color-surface)",
                  border: "1px solid var(--color-border)",
                  borderRadius: 8,
                  padding: "28px 24px",
                  textDecoration: "none",
                  transition: "border-color 0.2s, transform 0.2s",
                  display: "block",
                }}
              >
                <div style={{ fontSize: 32, marginBottom: 12 }}>{tool.icon}</div>
                <div style={{ fontSize: 16, fontWeight: 700, color: "var(--color-text)", marginBottom: 6 }}>{tool.name}</div>
                <div style={{ fontSize: 13, color: "var(--color-muted)", lineHeight: 1.5 }}>{tool.desc}</div>
                <div style={{ marginTop: 16, fontSize: 11, color: "var(--color-primary)", fontWeight: 700 }}>Usar herramienta →</div>
              </Link>
            );
          })}
        </div>
      </div>

      <Footer />
    </main>
  );
}
