"use client";
import { useState } from "react";
import PdfLayout from "@/components/pdf/PdfLayout";
import FileDropzone from "@/components/pdf/FileDropzone";

export default function PdfToWordPage() {
  var [file, setFile] = useState<File | null>(null);
  var [status, setStatus] = useState<"idle" | "loading" | "done">("idle");
  var [resultUrl, setResultUrl] = useState("");

  async function convert(files: File[]) {
    var f = files[0];
    if (!f) return;
    setFile(f);
    setStatus("loading");

    try {
      // Extract text with pdfjs
      var pdfjsLib = await import("pdfjs-dist");
      pdfjsLib.GlobalWorkerOptions.workerSrc = "https://unpkg.com/pdfjs-dist@" + pdfjsLib.version + "/build/pdf.worker.min.mjs";
      var buf = await f.arrayBuffer();
      var pdf = await pdfjsLib.getDocument({ data: buf }).promise;

      var allText = "";
      for (var i = 1; i <= pdf.numPages; i++) {
        var page = await pdf.getPage(i);
        var content = await page.getTextContent();
        var pageText = content.items.map(function(item: any) { return item.str; }).join(" ");
        allText += pageText + "\n\n";
      }

      // Generate docx
      var { Document, Packer, Paragraph, TextRun } = await import("docx");
      var paragraphs = allText.split("\n\n").filter(function(p) { return p.trim(); }).map(function(p) {
        return new Paragraph({
          children: [new TextRun({ text: p.trim(), size: 24 })],
          spacing: { after: 200 },
        });
      });

      var doc = new Document({
        sections: [{ children: paragraphs }],
      });

      var blob = await Packer.toBlob(doc);
      setResultUrl(URL.createObjectURL(blob));
      setStatus("done");
    } catch (e) {
      console.error(e);
      alert("Error al convertir el PDF");
      setStatus("idle");
    }
  }

  function reset() {
    if (resultUrl) URL.revokeObjectURL(resultUrl);
    setFile(null);
    setStatus("idle");
    setResultUrl("");
  }

  var outputName = file ? file.name.replace(/\.pdf$/i, ".docx") : "output.docx";

  return (
    <PdfLayout title="PDF a Word" description="Extrae el texto de un PDF y genera un documento .docx editable.">
      <div style={{ background: "#1a2a1a", border: "1px solid var(--color-border)", borderRadius: 6, padding: "12px 16px", marginBottom: 24, fontSize: 12, color: "var(--color-muted)" }}>
        💡 La conversión preserva el texto pero no el formato visual complejo (columnas, tablas, estilos). Ideal para extraer contenido editable.
      </div>

      {status === "idle" && <FileDropzone onFiles={convert} label="Sube tu PDF para convertir a Word" />}

      {status === "loading" && (
        <div style={{ textAlign: "center", padding: 40 }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>⏳</div>
          <div style={{ fontSize: 15, color: "var(--color-text)" }}>Extrayendo texto y generando Word...</div>
        </div>
      )}

      {status === "done" && (
        <div style={{ textAlign: "center", padding: "40px 0" }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>✅</div>
          <div style={{ fontSize: 18, fontWeight: 700, color: "var(--color-text)", marginBottom: 4 }}>Convertido a Word</div>
          <div style={{ fontSize: 13, color: "var(--color-muted)", marginBottom: 20 }}>{outputName}</div>
          <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
            <a href={resultUrl} download={outputName} style={{ background: "var(--color-primary)", color: "var(--color-deep)", padding: "12px 28px", fontSize: 13, fontWeight: 700, textDecoration: "none" }}>Descargar .docx →</a>
            <button onClick={reset} style={{ background: "transparent", color: "var(--color-muted)", border: "1px solid var(--color-border)", padding: "12px 20px", fontSize: 13, cursor: "pointer" }}>Nuevo</button>
          </div>
        </div>
      )}
    </PdfLayout>
  );
}
