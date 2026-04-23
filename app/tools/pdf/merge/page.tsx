"use client";
import { useState } from "react";
import PdfLayout from "@/components/pdf/PdfLayout";
import FileDropzone from "@/components/pdf/FileDropzone";

type PdfFile = { file: File; name: string; pages: number };

export default function MergePage() {
  var [files, setFiles] = useState<PdfFile[]>([]);
  var [status, setStatus] = useState<"idle" | "loading" | "done">("idle");
  var [resultUrl, setResultUrl] = useState("");

  async function addFiles(newFiles: File[]) {
    var pdfjsLib = await import("pdfjs-dist");
    pdfjsLib.GlobalWorkerOptions.workerSrc = "https://unpkg.com/pdfjs-dist@" + pdfjsLib.version + "/build/pdf.worker.min.mjs";

    var entries: PdfFile[] = [];
    for (var i = 0; i < newFiles.length; i++) {
      var f = newFiles[i];
      if (f.type !== "application/pdf") continue;
      try {
        var buf = await f.arrayBuffer();
        var pdf = await pdfjsLib.getDocument({ data: buf }).promise;
        entries.push({ file: f, name: f.name, pages: pdf.numPages });
      } catch (e) {
        console.error("Error reading", f.name, e);
      }
    }
    setFiles(function(prev) { return prev.concat(entries); });
  }

  function removeFile(idx: number) {
    setFiles(function(prev) { return prev.filter(function(_, i) { return i !== idx; }); });
  }

  function moveFile(idx: number, dir: number) {
    setFiles(function(prev) {
      var arr = prev.slice();
      var newIdx = idx + dir;
      if (newIdx < 0 || newIdx >= arr.length) return arr;
      var temp = arr[idx];
      arr[idx] = arr[newIdx];
      arr[newIdx] = temp;
      return arr;
    });
  }

  async function merge() {
    if (files.length < 2) return;
    setStatus("loading");
    try {
      var { PDFDocument } = await import("pdf-lib");
      var merged = await PDFDocument.create();

      for (var i = 0; i < files.length; i++) {
        var buf = await files[i].file.arrayBuffer();
        var doc = await PDFDocument.load(buf);
        var pages = await merged.copyPages(doc, doc.getPageIndices());
        for (var j = 0; j < pages.length; j++) {
          merged.addPage(pages[j]);
        }
      }

      var bytes = await merged.save();
      var blob = new Blob([bytes], { type: "application/pdf" });
      var url = URL.createObjectURL(blob);
      setResultUrl(url);
      setStatus("done");
    } catch (e) {
      console.error(e);
      setStatus("idle");
      alert("Error al unir los archivos");
    }
  }

  function reset() {
    if (resultUrl) URL.revokeObjectURL(resultUrl);
    setFiles([]);
    setStatus("idle");
    setResultUrl("");
  }

  return (
    <PdfLayout title="Unir PDFs" description="Combina múltiples archivos PDF en uno solo. Reordena antes de unir.">
      {status === "idle" && files.length === 0 && (
        <FileDropzone onFiles={addFiles} multiple={true} label="Arrastra tus PDFs aquí" sublabel="Puedes subir múltiples archivos PDF" />
      )}

      {files.length > 0 && status !== "done" && (
        <div>
          {/* FILE LIST */}
          <div style={{ border: "1px solid var(--color-border)", borderRadius: 6, overflow: "hidden", marginBottom: 20 }}>
            {files.map(function(f, i) {
              return (
                <div key={i} style={{ display: "flex", alignItems: "center", padding: "12px 16px", borderBottom: i < files.length - 1 ? "1px solid var(--color-border)" : undefined, gap: 12 }}>
                  <span style={{ fontSize: 11, color: "var(--color-primary)", fontFamily: "JetBrains Mono, monospace", width: 24 }}>{i + 1}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, color: "var(--color-text)", fontWeight: 500 }}>{f.name}</div>
                    <div style={{ fontSize: 11, color: "var(--color-muted)" }}>{f.pages} páginas</div>
                  </div>
                  <button onClick={function() { moveFile(i, -1); }} disabled={i === 0} style={{ background: "none", border: "1px solid var(--color-border)", color: "var(--color-muted)", padding: "4px 8px", cursor: "pointer", fontSize: 11, opacity: i === 0 ? 0.3 : 1 }}>↑</button>
                  <button onClick={function() { moveFile(i, 1); }} disabled={i === files.length - 1} style={{ background: "none", border: "1px solid var(--color-border)", color: "var(--color-muted)", padding: "4px 8px", cursor: "pointer", fontSize: 11, opacity: i === files.length - 1 ? 0.3 : 1 }}>↓</button>
                  <button onClick={function() { removeFile(i); }} style={{ background: "none", border: "1px solid #ff4444", color: "#ff4444", padding: "4px 8px", cursor: "pointer", fontSize: 11 }}>✕</button>
                </div>
              );
            })}
          </div>

          {/* ADD MORE + MERGE */}
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <FileDropzone onFiles={addFiles} multiple={true} label="+ Agregar más PDFs" sublabel="" />
          </div>
          <div style={{ marginTop: 20, display: "flex", gap: 12 }}>
            <button onClick={merge} disabled={files.length < 2 || status === "loading"}
              style={{ background: "var(--color-primary)", color: "var(--color-deep)", border: "none", padding: "12px 28px", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>
              {status === "loading" ? "Uniendo..." : "Unir " + files.length + " PDFs →"}
            </button>
            <button onClick={reset} style={{ background: "transparent", color: "var(--color-muted)", border: "1px solid var(--color-border)", padding: "12px 20px", fontSize: 13, cursor: "pointer" }}>
              Limpiar
            </button>
          </div>
        </div>
      )}

      {status === "done" && (
        <div style={{ textAlign: "center", padding: "40px 0" }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>✅</div>
          <div style={{ fontSize: 18, fontWeight: 700, color: "var(--color-text)", marginBottom: 16 }}>PDFs unidos exitosamente</div>
          <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
            <a href={resultUrl} download="merged.pdf" style={{ background: "var(--color-primary)", color: "var(--color-deep)", padding: "12px 28px", fontSize: 13, fontWeight: 700, textDecoration: "none" }}>
              Descargar PDF →
            </a>
            <button onClick={reset} style={{ background: "transparent", color: "var(--color-muted)", border: "1px solid var(--color-border)", padding: "12px 20px", fontSize: 13, cursor: "pointer" }}>
              Nuevo
            </button>
          </div>
        </div>
      )}
    </PdfLayout>
  );
}
