"use client";
import { useState } from "react";

const WHATSAPP =
  "https://wa.me/50255026862?text=Hola%20Chronos-Dev%2C%20me%20interesa%20automatizar%20generaci%C3%B3n%20de%20descripciones%20para%20mis%20productos";

const CATEGORIES = [
  "Ropa y moda",
  "Tecnología y electrónica",
  "Alimentos y bebidas",
  "Hogar y decoración",
  "Belleza y cuidado personal",
  "Deportes y fitness",
  "Servicios",
  "Arte y artesanías",
  "Juguetes y niños",
  "Otro",
];

const TONES = [
  { value: "Profesional", label: "Profesional" },
  { value: "Casual y amigable", label: "Casual y amigable" },
  { value: "Persuasivo y urgente", label: "Persuasivo y urgente" },
  { value: "Lujoso y exclusivo", label: "Lujoso y exclusivo" },
  { value: "Técnico y detallado", label: "Técnico y detallado" },
];

const PLATFORMS = [
  "Tienda en línea",
  "Facebook / Instagram",
  "Amazon / Marketplace",
  "Menú de restaurante",
  "Catálogo PDF",
  "Otro",
];

type Descriptions = { short: string; medium: string; long: string };
type Status = "idle" | "loading" | "done" | "error";

const VARIATIONS: { key: keyof Descriptions; label: string; badge: string; hint: string }[] = [
  { key: "short", label: "Corta", badge: "20–30 palabras", hint: "Para badges, etiquetas o cards pequeñas" },
  { key: "medium", label: "Media", badge: "50–80 palabras", hint: "Para tarjetas de producto o redes sociales" },
  { key: "long", label: "Completa", badge: "120–160 palabras", hint: "Para página de detalle o catálogo" },
];

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  function handleCopy() {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }
  return (
    <button
      onClick={handleCopy}
      style={{
        background: copied ? "var(--color-primary)" : "var(--color-surface)",
        color: copied ? "var(--color-deep)" : "var(--color-primary)",
        border: "1px solid var(--color-primary)",
        padding: "6px 14px",
        fontSize: 10,
        fontWeight: 700,
        fontFamily: "JetBrains Mono, monospace",
        letterSpacing: 1,
        cursor: "pointer",
        transition: "background 0.2s, color 0.2s",
        whiteSpace: "nowrap",
      }}
    >
      {copied ? "✓ COPIADO" : "COPIAR"}
    </button>
  );
}

export default function DescriptionGenerator() {
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [features, setFeatures] = useState("");
  const [tone, setTone] = useState(TONES[0].value);
  const [platform, setPlatform] = useState(PLATFORMS[0]);
  const [language, setLanguage] = useState<"es" | "en">("es");
  const [status, setStatus] = useState<Status>("idle");
  const [descriptions, setDescriptions] = useState<Descriptions | null>(null);
  const [error, setError] = useState("");

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "var(--color-deep)",
    border: "1px solid var(--color-border)",
    borderRadius: 4,
    color: "var(--color-text)",
    fontSize: 14,
    padding: "11px 14px",
    outline: "none",
    transition: "border-color 0.2s",
    fontFamily: "inherit",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: 11,
    fontWeight: 700,
    color: "var(--color-muted)",
    letterSpacing: 1.5,
    textTransform: "uppercase",
    marginBottom: 6,
    fontFamily: "JetBrains Mono, monospace",
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!productName.trim() || !features.trim()) return;
    setStatus("loading");
    setDescriptions(null);
    setError("");

    try {
      const res = await fetch("/api/descriptions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productName, category, features, tone, platform, language }),
      });
      const data = await res.json();
      if (!res.ok || data.error) {
        setError(data.error || "Error al generar descripciones");
        setStatus("error");
        return;
      }
      setDescriptions(data);
      setStatus("done");
    } catch {
      setError("Error de conexión. Intenta de nuevo.");
      setStatus("error");
    }
  }

  function reset() {
    setStatus("idle");
    setDescriptions(null);
    setError("");
  }

  return (
    <div style={{ maxWidth: 820, margin: "0 auto" }}>
      {/* FORM */}
      <form onSubmit={handleSubmit}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }} className="desc-grid">
          {/* Product name */}
          <div style={{ gridColumn: "1 / -1" }}>
            <label style={labelStyle}>Nombre del producto *</label>
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="Ej: Camisa de lino premium para hombre"
              required
              style={inputStyle}
              onFocus={(e) => (e.currentTarget.style.borderColor = "var(--color-primary)")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "var(--color-border)")}
            />
          </div>

          {/* Category */}
          <div>
            <label style={labelStyle}>Categoría</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={{ ...inputStyle, cursor: "pointer" }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "var(--color-primary)")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "var(--color-border)")}
            >
              {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>

          {/* Tone */}
          <div>
            <label style={labelStyle}>Tono</label>
            <select
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              style={{ ...inputStyle, cursor: "pointer" }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "var(--color-primary)")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "var(--color-border)")}
            >
              {TONES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
            </select>
          </div>

          {/* Platform */}
          <div>
            <label style={labelStyle}>Plataforma destino</label>
            <select
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
              style={{ ...inputStyle, cursor: "pointer" }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "var(--color-primary)")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "var(--color-border)")}
            >
              {PLATFORMS.map((p) => <option key={p}>{p}</option>)}
            </select>
          </div>

          {/* Language */}
          <div>
            <label style={labelStyle}>Idioma de salida</label>
            <div style={{ display: "flex", gap: 8 }}>
              {(["es", "en"] as const).map((l) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => setLanguage(l)}
                  style={{
                    flex: 1,
                    padding: "11px 0",
                    border: `1px solid ${language === l ? "var(--color-primary)" : "var(--color-border)"}`,
                    background: language === l ? "var(--color-primary-ghost)" : "var(--color-deep)",
                    color: language === l ? "var(--color-primary)" : "var(--color-muted)",
                    fontSize: 13,
                    fontWeight: 700,
                    cursor: "pointer",
                    borderRadius: 4,
                    transition: "all 0.2s",
                  }}
                >
                  {l === "es" ? "Español" : "English"}
                </button>
              ))}
            </div>
          </div>

          {/* Features */}
          <div style={{ gridColumn: "1 / -1" }}>
            <label style={labelStyle}>Características y detalles *</label>
            <textarea
              value={features}
              onChange={(e) => setFeatures(e.target.value)}
              required
              rows={4}
              placeholder={"Ej: Tela 100% lino natural, corte slim fit, disponible en 5 colores,\nlavable a máquina, botones de nácar, precio Q350"}
              style={{
                ...inputStyle,
                resize: "vertical",
                lineHeight: 1.6,
                minHeight: 100,
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "var(--color-primary)")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "var(--color-border)")}
            />
            <div style={{ fontSize: 11, color: "var(--color-muted)", marginTop: 5, fontFamily: "JetBrains Mono, monospace" }}>
              Más detalles = mejores descripciones
            </div>
          </div>
        </div>

        <div style={{ marginTop: 24 }}>
          <button
            type="submit"
            disabled={status === "loading" || !productName.trim() || !features.trim()}
            style={{
              background: status === "loading" ? "var(--color-surface)" : "var(--color-primary)",
              color: status === "loading" ? "var(--color-muted)" : "var(--color-deep)",
              border: "none",
              padding: "14px 32px",
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: 1,
              cursor: status === "loading" ? "not-allowed" : "pointer",
              transition: "background 0.2s, color 0.2s",
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            {status === "loading" ? (
              <>
                <span style={{ display: "flex", gap: 5 }}>
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      style={{
                        width: 6, height: 6, borderRadius: "50%",
                        background: "var(--color-primary)",
                        display: "inline-block",
                        animation: "descPulse 1.2s ease infinite",
                        animationDelay: `${i * 0.2}s`,
                      }}
                    />
                  ))}
                </span>
                Generando descripciones...
              </>
            ) : (
              "Generar descripciones →"
            )}
          </button>
        </div>
      </form>

      {/* RESULTS */}
      {status === "done" && descriptions && (
        <div style={{ marginTop: 48 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 28 }}>
            <div style={{ height: 1, width: 32, background: "var(--color-primary)" }} />
            <span style={{ fontFamily: "Georgia, serif", fontStyle: "italic", color: "var(--color-primary)", fontSize: 14 }}>
              3 variaciones generadas
            </span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {VARIATIONS.map(({ key, label, badge, hint }) => (
              <div
                key={key}
                style={{
                  background: "var(--color-surface)",
                  border: "1px solid var(--color-border)",
                  borderRadius: 6,
                  padding: "24px",
                }}
              >
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, marginBottom: 14, flexWrap: "wrap" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 13, fontWeight: 700, color: "var(--color-text)" }}>
                      {label}
                    </span>
                    <span style={{
                      background: "var(--color-deep)",
                      color: "var(--color-primary)",
                      border: "1px solid var(--color-border)",
                      fontSize: 9,
                      padding: "2px 8px",
                      fontFamily: "JetBrains Mono, monospace",
                      letterSpacing: 1,
                    }}>
                      {badge}
                    </span>
                    <span style={{ fontSize: 11, color: "var(--color-muted)" }}>{hint}</span>
                  </div>
                  <CopyButton text={descriptions[key]} />
                </div>
                <p style={{
                  fontSize: 14,
                  color: "var(--color-text)",
                  lineHeight: 1.75,
                  margin: 0,
                  borderLeft: "2px solid var(--color-primary)",
                  paddingLeft: 16,
                }}>
                  {descriptions[key]}
                </p>
              </div>
            ))}
          </div>

          {/* ACTIONS */}
          <div style={{ marginTop: 20, display: "flex", gap: 10, flexWrap: "wrap" }}>
            <button
              onClick={reset}
              style={{
                background: "transparent",
                color: "var(--color-muted)",
                border: "1px solid var(--color-border)",
                padding: "10px 20px",
                fontSize: 12,
                cursor: "pointer",
                transition: "border-color 0.2s, color 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--color-text)";
                e.currentTarget.style.color = "var(--color-text)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--color-border)";
                e.currentTarget.style.color = "var(--color-muted)";
              }}
            >
              Generar de nuevo
            </button>
            <button
              onClick={handleSubmit as any}
              style={{
                background: "var(--color-primary-ghost)",
                color: "var(--color-primary)",
                border: "1px solid rgba(122,255,0,0.3)",
                padding: "10px 20px",
                fontSize: 12,
                fontWeight: 700,
                cursor: "pointer",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(122,255,0,0.2)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "var(--color-primary-ghost)")}
            >
              Nueva variación →
            </button>
          </div>

          {/* CTA */}
          <div style={{
            marginTop: 32,
            background: "var(--color-deep)",
            border: "1px solid var(--color-border)",
            borderRadius: 6,
            padding: "24px 28px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 16,
          }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "var(--color-text)", marginBottom: 4 }}>
                ¿Tienes cientos de productos?
              </div>
              <div style={{ fontSize: 12, color: "var(--color-muted)", lineHeight: 1.6 }}>
                Chronos-Dev automatiza la generación masiva de descripciones conectada directamente a tu catálogo.
              </div>
            </div>
            <a
              href={WHATSAPP}
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
                transition: "opacity 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              Automatizar mi catálogo →
            </a>
          </div>
        </div>
      )}

      {/* ERROR */}
      {status === "error" && (
        <div style={{ marginTop: 32, textAlign: "center", padding: "32px 24px", border: "1px solid var(--color-border)", borderRadius: 6 }}>
          <div style={{ fontSize: 13, color: "#ff6b6b", marginBottom: 16 }}>{error}</div>
          <button
            onClick={reset}
            style={{
              background: "var(--color-primary)",
              color: "var(--color-deep)",
              border: "none",
              padding: "10px 24px",
              fontSize: 12,
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Intentar de nuevo
          </button>
        </div>
      )}

      <style>{`
        @keyframes descPulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.3); }
        }
        @media (max-width: 640px) {
          .desc-grid { grid-template-columns: 1fr !important; }
          .desc-grid > div[style*="1 / -1"] { grid-column: 1 !important; }
        }
      `}</style>
    </div>
  );
}
