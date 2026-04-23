"use client";
import { useState } from "react";
import PdfLayout from "@/components/pdf/PdfLayout";
import FileDropzone from "@/components/pdf/FileDropzone";

export default function RotatePage() {
  var [file, setFile] = useState<File | null>(null);
  var [totalPages, setTotalPages] = useState(0);
  var [rotations, setRotations] = useState<number[]>([]);
  var [status, setStatus] = useState<"idle" | "loading" | "done">("idle");
  var [resultUrl, setResultUrl] = useState("");

  async function loadFile(files: File[]) {
    var f = files[0];
    if (!f) return;
    var pdfjsLib = await import("pdfjs-dist");
    pdfjsLib.GlobalWorkerOptions.workerSrc = "https://unpkg.com/pdfjs-dist@" + pdfjsLib.version + "/build/pdf.worker.min.mjs";
    var buf = await f.arrayBuffer();
    var pdf = await pdfjsLib.getDocument({ data: buf }).promise;
    setFile(f);
    setTotalPages(pdf.numPages);
    setRotations(new Array(pdf.numPages).fill(0));
  }

  function rotatePage(idx: number) {
    setRotations(function(prev) {
      var next = prev.slice();
      next[idx] = (next[idx] + 90) % 360;
      return next;
    });
  }

  function rotateAll() {
    setRotations(function(prev) { return prev.map(function(r) { return (r + 90) % 360; }); });
  }

  async function apply() {
    if (!file) return;
    setStatus("loading");
    try {
      var { PDFDocument, degrees } = await import("pdf-lib");
      var buf = await file.arrayBuffer();
      var doc = await PDFDocument.load(buf);
      var pages = doc.getPages();
      for (var i = 0; i < pages.length; i++) {
        if (rotations[i] !== 0) {
          pages[i].setRotation(degrees(pages[i].getRotation().angle + rotations[i]));
        }
      }
      var bytes = await doc.save();
      var blob = new Blob([bytes], { type: "application/pdf" });
      setResultUrl(URL.createObjectURL(blob));
      setStatus("done");
    } catch (e) {
      console.error(e);
      alert("Error al rotar el PDF");
      setStatus("idle");
    }
  }

  function reset() {
    if (resultUrl) URL.revokeObjectURL(resultUrl);
    setFile(null);
    setTotalPages(0);
    setRotations([]);
    setStatus("idle");
    setResultUrl("");
  }

  return (
    <PdfLayout title="Rotar PDF" description="Rota páginas individuales o todas a la vez. Haz clic en una página para rotarla 90°.">
      {!file && <FileDropzone onFiles={loadFile} />}

      {file && status === "idle" && (
        <div>
          <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap", alignItems: "center" }}>
            <span style={{ fontSize: 13, color: "var(--color-muted)" }}>{file.name} — {totalPages} páginas</span>
            <button onClick={rotateAll} style={{ background: "var(--color-surface)", color: "var(--color-primary)", border: "1px solid var(--color-border)", padding: "6px 14px", fontSize: 11, cursor: "pointer" }}>
              Rotar todas 90° →
            </button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(80px, 1fr))", gap: 10, marginBottom: 24 }}>
            {rotations.map(function(rot, i) {
              return (
                <button key={i} onClick={function() { rotatePage(i); }}
                  style={{ background: "var(--color-surface)", border: rot !== 0 ? "2px solid var(--color-primary)" : "1px solid var(--color-border)", borderRadius: 6, padding: "14px 0", cursor: "pointer", textAlign: "center", transition: "all 0.15s" }}>
                  <div style={{ fontSize: 24, transform: "rotate(" + rot + "deg)", transition: "transform 0.3s", marginBottom: 4 }}>📄</div>
                  <div style={{ fontSize: 11, color: "var(--color-text)" }}>Pág {i + 1}</div>
                  {rot !== 0 && <div style={{ fontSize: 9, color: "var(--color-primary)", fontFamily: "JetBrains Mono, monospace" }}>{rot}°</div>}
                </button>
              );
            })}
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            <button onClick={apply} style={{ background: "var(--color-primary)", color: "var(--color-deep)", border: "none", padding: "12px 28px", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>Aplicar rotación →</button>
            <button onClick={reset} style={{ background: "transparent", color: "var(--color-muted)", border: "1px solid var(--color-border)", padding: "12px 20px", fontSize: 13, cursor: "pointer" }}>Nuevo</button>
          </div>
        </div>
      )}

      {status === "loading" && <div style={{ textAlign: "center", padding: 40 }}><div style={{ fontSize: 15, color: "var(--color-text)" }}>Aplicando rotación...</div></div>}

      {status === "done" && (
        <div style={{ textAlign: "center", padding: "40px 0" }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>✅</div>
          <div style={{ fontSize: 18, fontWeight: 700, color: "var(--color-text)", marginBottom: 16 }}>PDF rotado</div>
          <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
            <a href={resultUrl} download="rotated.pdf" style={{ background: "var(--color-primary)", color: "var(--color-deep)", padding: "12px 28px", fontSize: 13, fontWeight: 700, textDecoration: "none" }}>Descargar →</a>
            <button onClick={reset} style={{ background: "transparent", color: "var(--color-muted)", border: "1px solid var(--color-border)", padding: "12px 20px", fontSize: 13, cursor: "pointer" }}>Nuevo</button>
          </div>
        </div>
      )}
    </PdfLayout>
  );
}
