"use client";
import { useState, useRef } from "react";

const WHATSAPP = "https://wa.me/50250000000?text=Hola%20Chronos-Dev%2C%20me%20interesa%20automatizar%20este%20tipo%20de%20proceso%20en%20mi%20empresa";

type Status = "idle" | "loading" | "done" | "error";

export default function OcrTool() {
  var [status, setStatus] = useState<Status>("idle");
  var [result, setResult] = useState("");
  var [fileName, setFileName] = useState("");
  var inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File) {
    setFileName(file.name);
    setStatus("loading");
    setResult("");

    try {
      var formData = new FormData();
      formData.append("file", file);

      var res = await fetch("/api/ocr", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Server error");
      }

      var data = await res.json();
      if (data.error) throw new Error(data.error);

      setResult(data.text || "No se encontró texto en el archivo.");
      setStatus("done");
    } catch (err) {
      console.error(err);
      setStatus("error");
      setResult("Error al procesar el archivo. Verifica que sea un PDF o imagen válida.");
    }
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    var file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    var file = e.target.files?.[0];
    if (file) handleFile(file);
  }

  function copyText() {
    navigator.clipboard.writeText(result);
  }

  function reset() {
    setStatus("idle");
    setResult("");
    setFileName("");
    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <div style={{ maxWidth: 800, margin: "0 auto" }}>

      {/* UPLOAD AREA */}
      {status === "idle" && (
        <div
          onDrop={handleDrop}
          onDragOver={function (e) { e.preventDefault(); }}
          onClick={function () { inputRef.current?.click(); }}
          style={{
            border: "2px dashed var(--color-border)",
            borderRadius: 8,
            padding: "60px 40px",
            textAlign: "center",
            cursor: "pointer",
            transition: "border-color 0.2s, background 0.2s",
          }}
          onMouseEnter={function (e) {
            e.currentTarget.style.borderColor = "var(--color-primary)";
            e.currentTarget.style.background = "#7aff0015";
          }}
          onMouseLeave={function (e) {
            e.currentTarget.style.borderColor = "var(--color-border)";
            e.currentTarget.style.background = "transparent";
          }}
        >
          <div style={{ fontSize: 48, marginBottom: 16 }}>📄</div>
          <div style={{ fontSize: 18, fontWeight: 700, color: "var(--color-text)", marginBottom: 8 }}>
            Arrastra tu archivo aquí
          </div>
          <div style={{ fontSize: 13, color: "var(--color-muted)", marginBottom: 20 }}>
            Soporta PDF, PNG, JPG, JPEG, WEBP — hasta 20MB
          </div>
          <div style={{ display: "inline-flex", background: "var(--color-primary)", color: "var(--color-deep)", padding: "10px 24px", fontSize: 12, fontWeight: 700, letterSpacing: 1 }}>
            Seleccionar archivo →
          </div>
          <input
            ref={inputRef}
            type="file"
            accept=".pdf,.png,.jpg,.jpeg,.webp"
            style={{ display: "none" }}
            onChange={handleInputChange}
          />
        </div>
      )}

      {/* LOADING */}
      {status === "loading" && (
        <div style={{ textAlign: "center", padding: "60px 40px" }}>
          <div style={{ fontSize: 40, marginBottom: 16 }}>🔍</div>
          <div style={{ fontSize: 15, fontWeight: 700, color: "var(--color-text)", marginBottom: 8 }}>
            Analizando documento con IA...
          </div>
          <div style={{ fontSize: 13, color: "var(--color-muted)", marginBottom: 24 }}>
            <span style={{ color: "var(--color-primary)" }}>{fileName}</span>
          </div>
          {/* Animated dots */}
          <div style={{ display: "flex", justifyContent: "center", gap: 8 }}>
            {[0, 1, 2].map(function (i) {
              return (
                <div key={i} style={{
                  width: 10, height: 10, borderRadius: "50%",
                  background: "var(--color-primary)",
                  animation: "pulse 1.2s ease infinite",
                  animationDelay: (i * 0.2) + "s",
                  opacity: 0.4,
                }} />
              );
            })}
          </div>
          <style>{`@keyframes pulse { 0%,100%{opacity:0.3;transform:scale(1)} 50%{opacity:1;transform:scale(1.3)} }`}</style>
        </div>
      )}

      {/* RESULT */}
      {status === "done" && (
        <div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12, flexWrap: "wrap", gap: 8 }}>
            <div style={{ fontSize: 13, color: "var(--color-muted)" }}>
              ✅ <span style={{ color: "var(--color-primary)" }}>{fileName}</span>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={copyText}
                style={{ background: "var(--color-surface)", color: "var(--color-primary)", border: "1px solid var(--color-primary)", padding: "7px 16px", fontSize: 11, cursor: "pointer", fontWeight: 700 }}>
                Copiar texto
              </button>
              <button onClick={reset}
                style={{ background: "transparent", color: "var(--color-muted)", border: "1px solid var(--color-border)", padding: "7px 16px", fontSize: 11, cursor: "pointer" }}>
                Nuevo archivo
              </button>
            </div>
          </div>

          <textarea
            readOnly
            value={result}
            style={{
              width: "100%", minHeight: 320,
              background: "var(--color-deep)",
              border: "1px solid var(--color-border)",
              color: "var(--color-text)",
              fontSize: 13, lineHeight: 1.7,
              padding: 20, borderRadius: 4,
              resize: "vertical",
              fontFamily: "JetBrains Mono, monospace",
              outline: "none",
            }}
          />

          <div style={{ marginTop: 20, background: "var(--color-surface)", border: "1px solid var(--color-border)", borderRadius: 4, padding: "20px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "var(--color-text)", marginBottom: 4 }}>
                ¿Quieres automatizar este proceso en tu empresa?
              </div>
              <div style={{ fontSize: 12, color: "var(--color-muted)" }}>
                Chronos-Dev crea sistemas que procesan documentos automáticamente con IA.
              </div>
            </div>
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer"
              style={{ background: "var(--color-primary)", color: "var(--color-deep)", padding: "11px 22px", fontSize: 12, fontWeight: 700, textDecoration: "none", whiteSpace: "nowrap" }}>
              Automatizar mi empresa →
            </a>
          </div>
        </div>
      )}

      {/* ERROR */}
      {status === "error" && (
        <div style={{ textAlign: "center", padding: 40 }}>
          <div style={{ fontSize: 14, color: "#ff6b6b", marginBottom: 16 }}>{result}</div>
          <button onClick={reset} style={{ background: "var(--color-primary)", color: "var(--color-deep)", border: "none", padding: "10px 24px", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>
            Intentar de nuevo
          </button>
        </div>
      )}
    </div>
  );
}
