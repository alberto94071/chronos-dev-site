"use client";
import { useState } from "react";
import PdfLayout from "@/components/pdf/PdfLayout";
import FileDropzone from "@/components/pdf/FileDropzone";

export default function ProtectPage() {
  var [file, setFile] = useState<File | null>(null);
  var [password, setPassword] = useState("");
  var [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  var [resultUrl, setResultUrl] = useState("");
  var [errorMsg, setErrorMsg] = useState("");

  function loadFile(files: File[]) {
    setFile(files[0] || null);
  }

  async function protect() {
    if (!file || !password) return;
    setStatus("loading");
    try {
      var { PDFDocument } = await import("pdf-lib");
      var buf = await file.arrayBuffer();
      var doc = await PDFDocument.load(buf);
      var bytes = await doc.save({ userPassword: password, ownerPassword: password } as any);
      var blob = new Blob([bytes as BlobPart], { type: "application/pdf" });
      setResultUrl(URL.createObjectURL(blob));
      setStatus("done");
    } catch (e: any) {
      console.error(e);
      setErrorMsg("Error al proteger: " + (e.message || "archivo no compatible"));
      setStatus("error");
    }
  }

  function reset() {
    if (resultUrl) URL.revokeObjectURL(resultUrl);
    setFile(null);
    setPassword("");
    setStatus("idle");
    setResultUrl("");
    setErrorMsg("");
  }

  return (
    <PdfLayout title="Proteger PDF" description="Agrega una contraseña a tu PDF para que solo las personas autorizadas puedan abrirlo.">
      {!file && <FileDropzone onFiles={loadFile} />}

      {file && status === "idle" && (
        <div style={{ maxWidth: 400 }}>
          <div style={{ fontSize: 13, color: "var(--color-muted)", marginBottom: 16 }}>
            Archivo: <span style={{ color: "var(--color-primary)" }}>{file.name}</span>
          </div>
          <div style={{ marginBottom: 8, fontSize: 12, color: "var(--color-text)", fontWeight: 700 }}>Contraseña de protección</div>
          <input
            type="password"
            value={password}
            onChange={function(e) { setPassword(e.target.value); }}
            placeholder="Escribe una contraseña..."
            style={{
              width: "100%", background: "var(--color-deep)", border: "1px solid var(--color-border)",
              color: "var(--color-text)", padding: "12px 14px", fontSize: 14, marginBottom: 20, borderRadius: 4, outline: "none",
            }}
          />
          <div style={{ display: "flex", gap: 12 }}>
            <button onClick={protect} disabled={!password}
              style={{ background: password ? "var(--color-primary)" : "var(--color-border)", color: "var(--color-deep)", border: "none", padding: "12px 28px", fontSize: 13, fontWeight: 700, cursor: password ? "pointer" : "not-allowed" }}>
              Proteger PDF →
            </button>
            <button onClick={reset} style={{ background: "transparent", color: "var(--color-muted)", border: "1px solid var(--color-border)", padding: "12px 20px", fontSize: 13, cursor: "pointer" }}>Cancelar</button>
          </div>
        </div>
      )}

      {status === "loading" && <div style={{ textAlign: "center", padding: 40 }}><div style={{ fontSize: 15, color: "var(--color-text)" }}>Protegiendo...</div></div>}

      {status === "done" && (
        <div style={{ textAlign: "center", padding: "40px 0" }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>🔒</div>
          <div style={{ fontSize: 18, fontWeight: 700, color: "var(--color-text)", marginBottom: 16 }}>PDF protegido con contraseña</div>
          <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
            <a href={resultUrl} download={"protected_" + (file?.name || "output.pdf")} style={{ background: "var(--color-primary)", color: "var(--color-deep)", padding: "12px 28px", fontSize: 13, fontWeight: 700, textDecoration: "none" }}>Descargar →</a>
            <button onClick={reset} style={{ background: "transparent", color: "var(--color-muted)", border: "1px solid var(--color-border)", padding: "12px 20px", fontSize: 13, cursor: "pointer" }}>Nuevo</button>
          </div>
        </div>
      )}

      {status === "error" && (
        <div style={{ textAlign: "center", padding: 40 }}>
          <div style={{ fontSize: 14, color: "#ff6b6b", marginBottom: 16 }}>{errorMsg}</div>
          <button onClick={reset} style={{ background: "var(--color-primary)", color: "var(--color-deep)", border: "none", padding: "10px 24px", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>Intentar de nuevo</button>
        </div>
      )}
    </PdfLayout>
  );
}
