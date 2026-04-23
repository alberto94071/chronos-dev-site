"use client";
import { useState } from "react";
import PdfLayout from "@/components/pdf/PdfLayout";
import FileDropzone from "@/components/pdf/FileDropzone";

export default function SplitPage() {
  var [file, setFile] = useState<File | null>(null);
  var [totalPages, setTotalPages] = useState(0);
  var [selected, setSelected] = useState<Set<number>>(new Set());
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
    setSelected(new Set());
  }

  function togglePage(n: number) {
    setSelected(function(prev) {
      var next = new Set(prev);
      if (next.has(n)) next.delete(n);
      else next.add(n);
      return next;
    });
  }

  function selectAll() {
    var all = new Set<number>();
    for (var i = 1; i <= totalPages; i++) all.add(i);
    setSelected(all);
  }

  async function splitPdf() {
    if (!file || selected.size === 0) return;
    setStatus("loading");
    try {
      var { PDFDocument } = await import("pdf-lib");
      var buf = await file.arrayBuffer();
      var src = await PDFDocument.load(buf);
      var out = await PDFDocument.create();
      var indices = Array.from(selected).sort(function(a, b) { return a - b; });
      var pages = await out.copyPages(src, indices.map(function(n) { return n - 1; }));
      for (var i = 0; i < pages.length; i++) out.addPage(pages[i]);
      var bytes = await out.save();
      var blob = new Blob([bytes as BlobPart], { type: "application/pdf" });
      setResultUrl(URL.createObjectURL(blob));
      setStatus("done");
    } catch (e) {
      console.error(e);
      alert("Error al dividir el PDF");
      setStatus("idle");
    }
  }

  function reset() {
    if (resultUrl) URL.revokeObjectURL(resultUrl);
    setFile(null);
    setTotalPages(0);
    setSelected(new Set());
    setStatus("idle");
    setResultUrl("");
  }

  return (
    <PdfLayout title="Dividir PDF" description="Extrae páginas específicas de un PDF. Selecciona las que necesitas.">
      {!file && <FileDropzone onFiles={loadFile} />}

      {file && status === "idle" && (
        <div>
          <div style={{ fontSize: 13, color: "var(--color-muted)", marginBottom: 12 }}>
            <span style={{ color: "var(--color-primary)" }}>{file.name}</span> — {totalPages} páginas · {selected.size} seleccionadas
          </div>
          <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
            <button onClick={selectAll} style={{ background: "var(--color-surface)", color: "var(--color-primary)", border: "1px solid var(--color-border)", padding: "6px 14px", fontSize: 11, cursor: "pointer" }}>Seleccionar todas</button>
            <button onClick={function() { setSelected(new Set()); }} style={{ background: "var(--color-surface)", color: "var(--color-muted)", border: "1px solid var(--color-border)", padding: "6px 14px", fontSize: 11, cursor: "pointer" }}>Limpiar selección</button>
          </div>
          {/* PAGE GRID */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(60px, 1fr))", gap: 8, marginBottom: 24 }}>
            {Array.from({ length: totalPages }, function(_, i) {
              var n = i + 1;
              var isSelected = selected.has(n);
              return (
                <button key={n} onClick={function() { togglePage(n); }}
                  style={{
                    background: isSelected ? "var(--color-primary)" : "var(--color-surface)",
                    color: isSelected ? "var(--color-deep)" : "var(--color-text)",
                    border: "1px solid " + (isSelected ? "var(--color-primary)" : "var(--color-border)"),
                    padding: "12px 0", fontSize: 14, fontWeight: 700, cursor: "pointer", borderRadius: 4,
                    transition: "all 0.15s",
                  }}>
                  {n}
                </button>
              );
            })}
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            <button onClick={splitPdf} disabled={selected.size === 0}
              style={{ background: selected.size > 0 ? "var(--color-primary)" : "var(--color-border)", color: "var(--color-deep)", border: "none", padding: "12px 28px", fontSize: 13, fontWeight: 700, cursor: selected.size > 0 ? "pointer" : "not-allowed" }}>
              Extraer {selected.size} páginas →
            </button>
            <button onClick={reset} style={{ background: "transparent", color: "var(--color-muted)", border: "1px solid var(--color-border)", padding: "12px 20px", fontSize: 13, cursor: "pointer" }}>Nuevo archivo</button>
          </div>
        </div>
      )}

      {status === "loading" && (
        <div style={{ textAlign: "center", padding: 40 }}>
          <div style={{ fontSize: 15, color: "var(--color-text)" }}>Extrayendo páginas...</div>
        </div>
      )}

      {status === "done" && (
        <div style={{ textAlign: "center", padding: "40px 0" }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>✅</div>
          <div style={{ fontSize: 18, fontWeight: 700, color: "var(--color-text)", marginBottom: 16 }}>Páginas extraídas</div>
          <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
            <a href={resultUrl} download="split.pdf" style={{ background: "var(--color-primary)", color: "var(--color-deep)", padding: "12px 28px", fontSize: 13, fontWeight: 700, textDecoration: "none" }}>Descargar PDF →</a>
            <button onClick={reset} style={{ background: "transparent", color: "var(--color-muted)", border: "1px solid var(--color-border)", padding: "12px 20px", fontSize: 13, cursor: "pointer" }}>Nuevo</button>
          </div>
        </div>
      )}
    </PdfLayout>
  );
}
