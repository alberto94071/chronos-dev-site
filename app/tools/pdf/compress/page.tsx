"use client";
import { useState } from "react";
import PdfLayout from "@/components/pdf/PdfLayout";
import FileDropzone from "@/components/pdf/FileDropzone";

function formatSize(bytes: number) {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(2) + " MB";
}

export default function CompressPage() {
  var [file, setFile] = useState<File | null>(null);
  var [originalSize, setOriginalSize] = useState(0);
  var [compressedSize, setCompressedSize] = useState(0);
  var [status, setStatus] = useState<"idle" | "loading" | "done">("idle");
  var [resultUrl, setResultUrl] = useState("");

  function loadFile(files: File[]) {
    var f = files[0];
    if (!f) return;
    setFile(f);
    setOriginalSize(f.size);
  }

  async function compress() {
    if (!file) return;
    setStatus("loading");
    try {
      var { PDFDocument } = await import("pdf-lib");
      var buf = await file.arrayBuffer();
      var doc = await PDFDocument.load(buf);

      // Re-save the PDF - pdf-lib removes unused objects and optimizes structure
      var bytes = await doc.save();
      var blob = new Blob([bytes as BlobPart], { type: "application/pdf" });
      setCompressedSize(blob.size);
      setResultUrl(URL.createObjectURL(blob));
      setStatus("done");
    } catch (e) {
      console.error(e);
      alert("Error al comprimir el PDF");
      setStatus("idle");
    }
  }

  function reset() {
    if (resultUrl) URL.revokeObjectURL(resultUrl);
    setFile(null);
    setOriginalSize(0);
    setCompressedSize(0);
    setStatus("idle");
    setResultUrl("");
  }

  var reduction = originalSize > 0 ? Math.round((1 - compressedSize / originalSize) * 100) : 0;

  return (
    <PdfLayout title="Comprimir PDF" description="Reduce el tamaño de tu PDF optimizando su estructura interna.">
      {!file && <FileDropzone onFiles={loadFile} />}

      {file && status === "idle" && (
        <div style={{ textAlign: "center", padding: "40px 0" }}>
          <div style={{ fontSize: 13, color: "var(--color-muted)", marginBottom: 8 }}>
            Archivo: <span style={{ color: "var(--color-primary)" }}>{file.name}</span>
          </div>
          <div style={{ fontSize: 24, fontWeight: 700, color: "var(--color-text)", marginBottom: 24 }}>
            Tamaño original: {formatSize(originalSize)}
          </div>
          <button onClick={compress} style={{ background: "var(--color-primary)", color: "var(--color-deep)", border: "none", padding: "12px 28px", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>
            Comprimir PDF →
          </button>
        </div>
      )}

      {status === "loading" && <div style={{ textAlign: "center", padding: 40 }}><div style={{ fontSize: 15, color: "var(--color-text)" }}>Comprimiendo...</div></div>}

      {status === "done" && (
        <div style={{ textAlign: "center", padding: "40px 0" }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>✅</div>
          <div style={{ display: "flex", gap: 32, justifyContent: "center", marginBottom: 24, flexWrap: "wrap" }}>
            <div>
              <div style={{ fontSize: 11, color: "var(--color-muted)", textTransform: "uppercase", letterSpacing: 1 }}>Original</div>
              <div style={{ fontSize: 20, fontWeight: 700, color: "var(--color-text)" }}>{formatSize(originalSize)}</div>
            </div>
            <div style={{ fontSize: 24, color: "var(--color-primary)", alignSelf: "center" }}>→</div>
            <div>
              <div style={{ fontSize: 11, color: "var(--color-muted)", textTransform: "uppercase", letterSpacing: 1 }}>Comprimido</div>
              <div style={{ fontSize: 20, fontWeight: 700, color: "var(--color-primary)" }}>{formatSize(compressedSize)}</div>
            </div>
            <div>
              <div style={{ fontSize: 11, color: "var(--color-muted)", textTransform: "uppercase", letterSpacing: 1 }}>Reducción</div>
              <div style={{ fontSize: 20, fontWeight: 700, color: reduction > 0 ? "#4aaa5a" : "#ff6b6b" }}>{reduction > 0 ? reduction + "%" : "Sin cambio"}</div>
            </div>
          </div>
          {reduction <= 0 && (
            <div style={{ fontSize: 12, color: "var(--color-muted)", marginBottom: 16 }}>
              El PDF ya estaba optimizado. La compresión en el browser tiene límites — archivos con muchas imágenes se comprimen mejor con herramientas de servidor.
            </div>
          )}
          <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
            <a href={resultUrl} download={"compressed_" + (file?.name || "output.pdf")} style={{ background: "var(--color-primary)", color: "var(--color-deep)", padding: "12px 28px", fontSize: 13, fontWeight: 700, textDecoration: "none" }}>Descargar →</a>
            <button onClick={reset} style={{ background: "transparent", color: "var(--color-muted)", border: "1px solid var(--color-border)", padding: "12px 20px", fontSize: 13, cursor: "pointer" }}>Nuevo</button>
          </div>
        </div>
      )}
    </PdfLayout>
  );
}
