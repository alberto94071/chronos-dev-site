"use client";
import { useState, useRef } from "react";

const WHATSAPP = "https://wa.me/50255026862?text=Hola%20Chronos-Dev%2C%20me%20interesa%20automatizar%20este%20tipo%20de%20proceso%20en%20mi%20empresa";

type Status = "idle" | "loading" | "done" | "error";

export default function OcrTool() {
  const [status, setStatus] = useState<Status>("idle");
  const [result, setResult] = useState("");
  const [fileName, setFileName] = useState("");
  const [progress, setProgress] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File) {
    setFileName(file.name);
    setStatus("loading");
    setResult("");
    setProgress("Iniciando...");

    try {
      const isPDF = file.type === "application/pdf";
      if (isPDF) {
        await extractFromPDF(file);
      } else {
        await extractFromImage(file);
      }
    } catch (err: any) {
      console.error(err);
      setStatus("error");
      setResult("Error al procesar: " + (err.message || "intenta de nuevo."));
    }
  }

  async function extractFromPDF(file: File) {
    setProgress("Cargando PDF...");
    const arrayBuffer = await file.arrayBuffer();

    const pdfjsLib = await import("pdfjs-dist");

    // Use dynamic version to avoid mismatch
    pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

    setProgress("Leyendo páginas...");
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    let allText = "";
    const total = pdf.numPages;

    for (let i = 1; i <= total; i++) {
      setProgress(`Extrayendo página ${i} de ${total}...`);
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      const pageText = content.items
        .map((item: any) => item.str)
        .join(" ")
        .trim();
      if (pageText) allText += `--- Página ${i} ---\n${pageText}\n\n`;
    }

    setResult(allText.trim() || "No se encontró texto. El PDF puede ser una imagen escaneada — sube una foto de la página en su lugar.");
    setStatus("done");
  }

  async function extractFromImage(file: File) {
    setProgress("Cargando Tesseract...");
    const Tesseract = await import("tesseract.js");

    const worker = await Tesseract.createWorker(["spa", "eng"], 1, {
      logger: (m: any) => {
        if (m.status === "recognizing text") {
          const pct = Math.round(m.progress * 100);
          setProgress(`Reconociendo texto... ${pct}%`);
        } else if (m.status === "loading tesseract core") {
          setProgress("Cargando motor OCR...");
        } else if (m.status === "initializing api") {
          setProgress("Inicializando...");
        }
      },
    });

    const url = URL.createObjectURL(file);
    const { data: { text } } = await worker.recognize(url);
    await worker.terminate();
    URL.revokeObjectURL(url);

    setResult(text.trim() || "No se detectó texto en la imagen.");
    setStatus("done");
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  }

  function copyText() {
    navigator.clipboard.writeText(result);
  }

  function reset() {
    setStatus("idle");
    setResult("");
    setFileName("");
    setProgress("");
    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <div style={{ maxWidth: 800, margin: "0 auto" }}>

      {/* UPLOAD AREA */}
      {status === "idle" && (
        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => inputRef.current?.click()}
          style={{
            border: "2px dashed var(--color-border)",
            borderRadius: 8,
            padding: "60px 40px",
            textAlign: "center",
            cursor: "pointer",
            transition: "border-color 0.2s, background 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "var(--color-primary)";
            e.currentTarget.style.background = "#7aff0015";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "var(--color-border)";
            e.currentTarget.style.background = "transparent";
          }}
        >
          <div style={{ fontSize: 48, marginBottom: 16 }}>📄</div>
          <div style={{ fontSize: 18, fontWeight: 700, color: "var(--color-text)", marginBottom: 8 }}>
            Arrastra tu archivo aquí
          </div>
          <div style={{ fontSize: 13, color: "var(--color-muted)", marginBottom: 4 }}>
            PDF con texto · PNG · JPG · JPEG · WEBP
          </div>
          <div style={{ fontSize: 11, color: "var(--color-primary)", marginBottom: 20, fontFamily: "JetBrains Mono, monospace" }}>
            Sin límite de tamaño · Sin servidor · 100% privado
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
            {progress}
          </div>
          <div style={{ fontSize: 13, color: "var(--color-primary)", marginBottom: 24, fontFamily: "JetBrains Mono, monospace" }}>
            {fileName}
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: 8 }}>
            {[0, 1, 2].map((i) => (
              <div key={i} style={{
                width: 10, height: 10, borderRadius: "50%",
                background: "var(--color-primary)",
                animation: "pulse 1.2s ease infinite",
                animationDelay: `${i * 0.2}s`,
              }} />
            ))}
          </div>
          <style>{`@keyframes pulse{0%,100%{opacity:0.3;transform:scale(1)}50%{opacity:1;transform:scale(1.3)}}`}</style>
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
              <button
                onClick={copyText}
                style={{ background: "var(--color-surface)", color: "var(--color-primary)", border: "1px solid var(--color-primary)", padding: "7px 16px", fontSize: 11, cursor: "pointer", fontWeight: 700 }}
              >
                Copiar texto
              </button>
              <button
                onClick={reset}
                style={{ background: "transparent", color: "var(--color-muted)", border: "1px solid var(--color-border)", padding: "7px 16px", fontSize: 11, cursor: "pointer" }}
              >
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
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              style={{ background: "var(--color-primary)", color: "var(--color-deep)", padding: "11px 22px", fontSize: 12, fontWeight: 700, textDecoration: "none", whiteSpace: "nowrap" }}
            >
              Automatizar mi empresa →
            </a>
          </div>
        </div>
      )}

      {/* ERROR */}
      {status === "error" && (
        <div style={{ textAlign: "center", padding: 40 }}>
          <div style={{ fontSize: 14, color: "#ff6b6b", marginBottom: 16 }}>{result}</div>
          <button
            onClick={reset}
            style={{ background: "var(--color-primary)", color: "var(--color-deep)", border: "none", padding: "10px 24px", fontSize: 12, fontWeight: 700, cursor: "pointer" }}
          >
            Intentar de nuevo
          </button>
        </div>
      )}
    </div>
  );
}
