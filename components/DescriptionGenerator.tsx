"use client";
import { useState, useEffect, useRef } from "react";

const WHATSAPP =
  "https://wa.me/50255026862?text=Hola%20Chronos-Dev%2C%20me%20interesa%20automatizar%20generaci%C3%B3n%20de%20descripciones%20para%20mis%20productos";

const CATEGORIES = [
  "Ropa y moda", "Tecnología y electrónica", "Alimentos y bebidas",
  "Hogar y decoración", "Belleza y cuidado personal", "Deportes y fitness",
  "Servicios", "Arte y artesanías", "Juguetes y niños", "Otro",
];
const TONES = [
  { value: "Profesional", label: "Profesional" },
  { value: "Casual y amigable", label: "Casual y amigable" },
  { value: "Persuasivo y urgente", label: "Persuasivo y urgente" },
  { value: "Lujoso y exclusivo", label: "Lujoso y exclusivo" },
  { value: "Técnico y detallado", label: "Técnico y detallado" },
];
const PLATFORMS = [
  "Tienda en línea", "Facebook / Instagram", "Amazon / Marketplace",
  "Menú de restaurante", "Catálogo PDF", "Otro",
];
const LOADING_STEPS = [
  "Analizando tu producto...",
  "Generando variaciones de copy...",
  "Optimizando para la plataforma...",
  "Revisando tono y estilo...",
  "Preparando resultados...",
];

type Descriptions = { short: string; medium: string; long: string };
type Status = "idle" | "loading" | "done" | "error";
type Tab = "short" | "medium" | "long";

const TABS: { key: Tab; label: string; badge: string; hint: string }[] = [
  { key: "short",  label: "Corta",    badge: "~25 palabras",  hint: "Badges · etiquetas · highlights" },
  { key: "medium", label: "Media",    badge: "~65 palabras",  hint: "Tarjetas · redes sociales" },
  { key: "long",   label: "Completa", badge: "~140 palabras", hint: "Página de detalle · catálogo" },
];

function wordCount(s: string) {
  return s.trim().split(/\s+/).filter(Boolean).length;
}

function CopyButton({ text }: { text: string }) {
  const [state, setState] = useState<"idle" | "copied">("idle");
  function handleCopy() {
    navigator.clipboard.writeText(text);
    setState("copied");
    setTimeout(() => setState("idle"), 2000);
  }
  return (
    <button
      onClick={handleCopy}
      aria-label="Copiar descripción"
      style={{
        position: "relative",
        overflow: "hidden",
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        background: state === "copied" ? "rgba(122,255,0,0.15)" : "transparent",
        color: state === "copied" ? "var(--color-primary)" : "var(--color-muted)",
        border: `1px solid ${state === "copied" ? "var(--color-primary)" : "var(--color-border)"}`,
        padding: "7px 16px",
        fontSize: 11,
        fontWeight: 700,
        fontFamily: "JetBrains Mono, monospace",
        letterSpacing: 1,
        cursor: "pointer",
        borderRadius: 4,
        transition: "all 0.25s cubic-bezier(0.2,0.8,0.2,1)",
        whiteSpace: "nowrap",
      }}
    >
      {state === "copied" ? (
        <>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          COPIADO
        </>
      ) : (
        <>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
          COPIAR
        </>
      )}
    </button>
  );
}

function SkeletonCard() {
  return (
    <div style={{ border: "1px solid var(--color-border)", borderRadius: 8, padding: 24, overflow: "hidden" }}>
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <div className="skeleton-pulse" style={{ width: 60, height: 16, borderRadius: 4 }} />
        <div className="skeleton-pulse" style={{ width: 90, height: 16, borderRadius: 4 }} />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <div className="skeleton-pulse" style={{ width: "100%", height: 14, borderRadius: 3 }} />
        <div className="skeleton-pulse" style={{ width: "88%", height: 14, borderRadius: 3 }} />
        <div className="skeleton-pulse" style={{ width: "94%", height: 14, borderRadius: 3 }} />
        <div className="skeleton-pulse" style={{ width: "70%", height: 14, borderRadius: 3 }} />
      </div>
    </div>
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
  const [activeTab, setActiveTab] = useState<Tab>("short");
  const [loadingStep, setLoadingStep] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const stepInterval = useRef<ReturnType<typeof setInterval> | null>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (status === "loading") {
      setLoadingStep(0);
      stepInterval.current = setInterval(() => {
        setLoadingStep(s => (s + 1) % LOADING_STEPS.length);
      }, 900);
    } else {
      if (stepInterval.current) clearInterval(stepInterval.current);
    }
    return () => { if (stepInterval.current) clearInterval(stepInterval.current); };
  }, [status]);

  useEffect(() => {
    if (status === "done") {
      setRevealed(false);
      requestAnimationFrame(() => setTimeout(() => setRevealed(true), 50));
      setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
    }
  }, [status]);

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "var(--color-deep)",
    border: "1px solid var(--color-border)",
    borderRadius: 6,
    color: "var(--color-text)",
    fontSize: 14,
    padding: "12px 14px",
    outline: "none",
    transition: "border-color 0.2s, box-shadow 0.2s",
    fontFamily: "inherit",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: 10,
    fontWeight: 700,
    color: "var(--color-muted)",
    letterSpacing: 2,
    textTransform: "uppercase",
    marginBottom: 7,
    fontFamily: "JetBrains Mono, monospace",
  };

  function onFocus(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    e.currentTarget.style.borderColor = "var(--color-primary)";
    e.currentTarget.style.boxShadow = "0 0 0 3px rgba(122,255,0,0.12)";
  }
  function onBlur(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    e.currentTarget.style.borderColor = "var(--color-border)";
    e.currentTarget.style.boxShadow = "none";
  }

  async function handleSubmit(e?: React.FormEvent) {
    if (e) e.preventDefault();
    if (!productName.trim() || !features.trim()) return;
    setStatus("loading");
    setDescriptions(null);
    setError("");
    setActiveTab("short");

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
    setRevealed(false);
  }

  const currentDesc = descriptions?.[activeTab] ?? "";
  const tabIdx = TABS.findIndex(t => t.key === activeTab);

  return (
    <div style={{ maxWidth: 820, margin: "0 auto" }}>

      {/* ── FORM ── */}
      <form onSubmit={handleSubmit}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }} className="desc-grid">

          {/* Product name */}
          <div style={{ gridColumn: "1 / -1" }}>
            <label htmlFor="productName" style={labelStyle}>Nombre del producto *</label>
            <input
              id="productName"
              type="text"
              value={productName}
              onChange={e => setProductName(e.target.value)}
              placeholder="Ej: Camisa de lino premium para hombre"
              required
              style={inputStyle}
              onFocus={onFocus}
              onBlur={onBlur}
            />
          </div>

          {/* Category */}
          <div>
            <label htmlFor="category" style={labelStyle}>Categoría</label>
            <select id="category" value={category} onChange={e => setCategory(e.target.value)}
              style={{ ...inputStyle, cursor: "pointer" }} onFocus={onFocus} onBlur={onBlur}>
              {CATEGORIES.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>

          {/* Tone */}
          <div>
            <label htmlFor="tone" style={labelStyle}>Tono</label>
            <select id="tone" value={tone} onChange={e => setTone(e.target.value)}
              style={{ ...inputStyle, cursor: "pointer" }} onFocus={onFocus} onBlur={onBlur}>
              {TONES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
            </select>
          </div>

          {/* Platform */}
          <div>
            <label htmlFor="platform" style={labelStyle}>Plataforma destino</label>
            <select id="platform" value={platform} onChange={e => setPlatform(e.target.value)}
              style={{ ...inputStyle, cursor: "pointer" }} onFocus={onFocus} onBlur={onBlur}>
              {PLATFORMS.map(p => <option key={p}>{p}</option>)}
            </select>
          </div>

          {/* Language */}
          <div>
            <label style={labelStyle}>Idioma de salida</label>
            <div style={{ display: "flex", gap: 8, height: 46 }}>
              {(["es", "en"] as const).map(l => (
                <button key={l} type="button" onClick={() => setLanguage(l)} style={{
                  flex: 1,
                  border: `1px solid ${language === l ? "var(--color-primary)" : "var(--color-border)"}`,
                  background: language === l ? "rgba(122,255,0,0.08)" : "var(--color-deep)",
                  color: language === l ? "var(--color-primary)" : "var(--color-muted)",
                  fontSize: 13, fontWeight: 700, cursor: "pointer", borderRadius: 6,
                  transition: "all 0.2s cubic-bezier(0.2,0.8,0.2,1)",
                  boxShadow: language === l ? "0 0 0 1px rgba(122,255,0,0.2) inset" : "none",
                }}>
                  {l === "es" ? "Español" : "English"}
                </button>
              ))}
            </div>
          </div>

          {/* Features */}
          <div style={{ gridColumn: "1 / -1" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 7 }}>
              <label htmlFor="features" style={labelStyle}>Características y detalles *</label>
              <span style={{ fontSize: 10, color: features.length > 20 ? "var(--color-primary)" : "var(--color-muted)", fontFamily: "JetBrains Mono, monospace", transition: "color 0.2s" }}>
                {features.length > 0 ? `${wordCount(features)} palabras` : "0 palabras"}
              </span>
            </div>
            <textarea id="features" value={features} onChange={e => setFeatures(e.target.value)}
              required rows={4}
              placeholder={"Ej: Tela 100% lino natural, corte slim fit, disponible en 5 colores,\nlavable a máquina, botones de nácar, precio Q350"}
              style={{ ...inputStyle, resize: "vertical", lineHeight: 1.65, minHeight: 108 }}
              onFocus={onFocus} onBlur={onBlur}
            />
            <div style={{ fontSize: 10, color: "var(--color-muted)", marginTop: 5, fontFamily: "JetBrains Mono, monospace" }}>
              Más detalles = mejores descripciones
            </div>
          </div>
        </div>

        {/* Submit button */}
        <div style={{ marginTop: 24 }}>
          <button
            type="submit"
            disabled={status === "loading" || !productName.trim() || !features.trim()}
            className="gen-btn"
            style={{
              position: "relative",
              overflow: "hidden",
              background: status === "loading" ? "var(--color-surface)" : "var(--color-primary)",
              color: status === "loading" ? "var(--color-muted)" : "var(--color-deep)",
              border: "none",
              padding: "14px 36px",
              fontSize: 13, fontWeight: 800, letterSpacing: 0.5,
              cursor: status === "loading" ? "not-allowed" : "pointer",
              borderRadius: 6,
              transition: "transform 0.2s, box-shadow 0.2s, background 0.2s",
              display: "inline-flex", alignItems: "center", gap: 10,
            }}
          >
            {status === "loading" ? (
              <>
                <span style={{ display: "inline-flex", gap: 4 }}>
                  {[0, 1, 2].map(i => (
                    <span key={i} style={{
                      width: 5, height: 5, borderRadius: "50%",
                      background: "var(--color-primary)", display: "inline-block",
                      animation: "descPulse 1s ease infinite",
                      animationDelay: `${i * 0.18}s`,
                    }} />
                  ))}
                </span>
                Generando...
              </>
            ) : (
              <>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
                Generar descripciones
              </>
            )}
          </button>
        </div>
      </form>

      {/* ── LOADING STATE ── */}
      {status === "loading" && (
        <div style={{ marginTop: 48 }}>
          {/* AI status message */}
          <div style={{
            display: "flex", alignItems: "center", gap: 12, marginBottom: 28,
            padding: "14px 18px",
            background: "rgba(122,255,0,0.04)",
            border: "1px solid rgba(122,255,0,0.15)",
            borderRadius: 8,
          }}>
            <div style={{ position: "relative", width: 10, height: 10, flexShrink: 0 }}>
              <span style={{
                position: "absolute", inset: 0, borderRadius: "50%",
                background: "var(--color-primary)",
                animation: "pingPulse 1.2s ease infinite",
              }} />
              <span style={{
                position: "absolute", inset: 0, borderRadius: "50%",
                background: "var(--color-primary)",
              }} />
            </div>
            <span key={loadingStep} style={{
              fontSize: 13, color: "var(--color-primary)",
              fontFamily: "JetBrains Mono, monospace",
              transition: "opacity 0.4s",
              animation: "tabFadeIn 0.3s ease",
            }}>
              {LOADING_STEPS[loadingStep]}
            </span>
          </div>

          {/* Skeleton cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        </div>
      )}

      {/* ── RESULTS ── */}
      {status === "done" && descriptions && (
        <div
          ref={resultsRef}
          style={{
            marginTop: 48,
            opacity: revealed ? 1 : 0,
            transform: revealed ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.5s cubic-bezier(0.2,0.8,0.2,1), transform 0.5s cubic-bezier(0.2,0.8,0.2,1)",
          }}
        >
          {/* Section label */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20, flexWrap: "wrap", gap: 10 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--color-primary)", boxShadow: "0 0 8px var(--color-primary)" }} />
              <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, color: "var(--color-primary)", letterSpacing: 2, textTransform: "uppercase" }}>
                3 variaciones listas
              </span>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={reset} style={{
                background: "transparent", color: "var(--color-muted)",
                border: "1px solid var(--color-border)", padding: "7px 14px",
                fontSize: 11, cursor: "pointer", borderRadius: 4,
                transition: "all 0.2s", fontFamily: "JetBrains Mono, monospace",
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--color-text)"; e.currentTarget.style.color = "var(--color-text)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--color-border)"; e.currentTarget.style.color = "var(--color-muted)"; }}
              >
                ← Nuevo producto
              </button>
              <button onClick={() => handleSubmit()} style={{
                background: "rgba(122,255,0,0.08)", color: "var(--color-primary)",
                border: "1px solid rgba(122,255,0,0.3)", padding: "7px 14px",
                fontSize: 11, fontWeight: 700, cursor: "pointer", borderRadius: 4,
                transition: "background 0.2s", fontFamily: "JetBrains Mono, monospace",
              }}
                onMouseEnter={e => (e.currentTarget.style.background = "rgba(122,255,0,0.15)")}
                onMouseLeave={e => (e.currentTarget.style.background = "rgba(122,255,0,0.08)")}
              >
                ↻ Regenerar
              </button>
            </div>
          </div>

          {/* Tab bar */}
          <div style={{
            display: "flex",
            borderBottom: "1px solid var(--color-border)",
            marginBottom: 0,
            gap: 0,
          }}>
            {TABS.map((tab, i) => {
              const active = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  style={{
                    padding: "12px 20px",
                    background: "transparent",
                    border: "none",
                    borderBottom: active ? "2px solid var(--color-primary)" : "2px solid transparent",
                    color: active ? "var(--color-text)" : "var(--color-muted)",
                    fontSize: 13,
                    fontWeight: active ? 700 : 400,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    transition: "all 0.2s",
                    marginBottom: "-1px",
                    animationDelay: `${i * 0.08}s`,
                  }}
                  className="tab-btn"
                >
                  {tab.label}
                  <span style={{
                    fontSize: 9,
                    fontFamily: "JetBrains Mono, monospace",
                    background: active ? "rgba(122,255,0,0.15)" : "var(--color-surface)",
                    color: active ? "var(--color-primary)" : "var(--color-muted)",
                    padding: "2px 6px",
                    borderRadius: 3,
                    letterSpacing: 0.5,
                    transition: "all 0.2s",
                  }}>
                    {tab.badge}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Tab content */}
          <div
            key={activeTab}
            style={{
              background: "var(--color-surface)",
              border: "1px solid var(--color-border)",
              borderTop: "none",
              borderRadius: "0 0 8px 8px",
              padding: "28px",
              animation: "tabFadeIn 0.25s cubic-bezier(0.2,0.8,0.2,1)",
            }}
          >
            {/* Meta row */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20, flexWrap: "wrap", gap: 8 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 11, color: "var(--color-muted)" }}>
                  {TABS[tabIdx]?.hint}
                </span>
                <span style={{
                  fontSize: 9,
                  fontFamily: "JetBrains Mono, monospace",
                  color: "var(--color-primary)",
                  background: "rgba(122,255,0,0.08)",
                  border: "1px solid rgba(122,255,0,0.2)",
                  padding: "2px 7px", borderRadius: 3,
                }}>
                  {wordCount(currentDesc)} palabras
                </span>
              </div>
              <CopyButton text={currentDesc} />
            </div>

            {/* Description text */}
            <div style={{
              fontSize: 15,
              color: "var(--color-text)",
              lineHeight: 1.8,
              borderLeft: "2px solid var(--color-primary)",
              paddingLeft: 20,
            }}>
              {currentDesc}
            </div>
          </div>

          {/* CTA */}
          <div style={{
            marginTop: 28,
            background: "var(--color-deep)",
            border: "1px solid var(--color-border)",
            borderRadius: 8,
            padding: "24px 28px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 16,
            position: "relative",
            overflow: "hidden",
          }}>
            <div style={{
              position: "absolute", top: -40, right: -40,
              width: 140, height: 140, borderRadius: "50%",
              background: "radial-gradient(circle, rgba(122,255,0,0.06) 0%, transparent 70%)",
              pointerEvents: "none",
            }} />
            <div style={{ position: "relative" }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: "var(--color-text)", marginBottom: 5 }}>
                ¿Tienes cientos de productos?
              </div>
              <div style={{ fontSize: 12, color: "var(--color-muted)", lineHeight: 1.6 }}>
                Automatizamos la generación masiva conectada a tu catálogo o tienda.
              </div>
            </div>
            <a
              href={WHATSAPP} target="_blank" rel="noopener noreferrer"
              style={{
                position: "relative",
                background: "var(--color-primary)", color: "var(--color-deep)",
                padding: "12px 24px", fontSize: 12, fontWeight: 800,
                textDecoration: "none", whiteSpace: "nowrap", borderRadius: 4,
                transition: "transform 0.2s, box-shadow 0.2s",
                display: "inline-block",
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(122,255,0,0.35)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}
            >
              Automatizar mi catálogo →
            </a>
          </div>
        </div>
      )}

      {/* ── ERROR ── */}
      {status === "error" && (
        <div style={{
          marginTop: 32, textAlign: "center", padding: "36px 24px",
          border: "1px solid rgba(255,107,107,0.3)", borderRadius: 8,
          background: "rgba(255,107,107,0.04)",
        }}>
          <div style={{ fontSize: 13, color: "#ff6b6b", marginBottom: 16 }}>{error}</div>
          <button onClick={reset} style={{
            background: "var(--color-primary)", color: "var(--color-deep)",
            border: "none", padding: "10px 28px", fontSize: 12, fontWeight: 700,
            cursor: "pointer", borderRadius: 4,
          }}>
            Intentar de nuevo
          </button>
        </div>
      )}

      {/* ── STYLES ── */}
      <style>{`
        @keyframes descPulse {
          0%,100% { opacity:0.25; transform:scale(1); }
          50% { opacity:1; transform:scale(1.4); }
        }
        @keyframes shimmerAnim {
          0% { background-position: -400px 0; }
          100% { background-position: 400px 0; }
        }
        @keyframes pingPulse {
          0% { transform:scale(1); opacity:0.8; }
          100% { transform:scale(2.2); opacity:0; }
        }
        @keyframes tabFadeIn {
          from { opacity:0; transform:translateY(6px); }
          to { opacity:1; transform:translateY(0); }
        }

        .skeleton-pulse {
          background: linear-gradient(90deg, var(--color-surface) 25%, rgba(122,255,0,0.06) 50%, var(--color-surface) 75%);
          background-size: 400px 100%;
          animation: shimmerAnim 1.4s ease infinite;
        }

        .gen-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(122,255,0,0.4);
        }
        .gen-btn:active:not(:disabled) {
          transform: translateY(0);
          box-shadow: none;
        }
        .tab-btn:hover {
          color: var(--color-text) !important;
        }

        @media (max-width: 640px) {
          .desc-grid { grid-template-columns: 1fr !important; }
          .desc-grid > div[style*="1 / -1"] { grid-column: 1 !important; }
        }
        @media (prefers-reduced-motion: reduce) {
          .skeleton-pulse, .gen-btn, .tab-btn { animation: none !important; transition: none !important; }
        }
      `}</style>
    </div>
  );
}
