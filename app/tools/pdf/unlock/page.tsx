"use client";
import { useState } from "react";
import PdfLayout from "@/components/pdf/PdfLayout";
import FileDropzone from "@/components/pdf/FileDropzone";

export default function UnlockPage() {
  var [file, setFile] = useState<File | null>(null);
  var [password, setPassword] = useState("");
  var [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  var [resultUrl, setResultUrl] = useState("");
  var [errorMsg, setErrorMsg] = useState("");

  function loadFile(files: File[]) {
    setFile(files[0] || null);
  }

  async function unlock() {
    if (!file || !password) return;
    setStatus("loading");
    try {
      var { PDFDocument } = await import("pdf-lib");
      var buf = await file.arrayBuffer();
      var doc = await PDFDocument.load(buf, { password: password });
      // Save without password
      var bytes = await doc.save();
      var blob = new Blob([bytes as BlobPart], { type: "application/pdf" });
      setResultUrl(URL.createObjectURL(blob));
      setStatus("done");
    } catch (e: any) {
      console.error(e);
      if (e.message && e.message.includes("password")) {
        setErrorMsg("Contraseña incorrecta. Verifica e intenta de nuevo.");
      } else {
        setErrorMsg("Error al desbloquear: " + (e.message || "archivo no compatible"));
      }
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
    <PdfLayout title="Desbloquear PDF" description="Ingresa la contraseña de un PDF protegido para generar una copia sin restricciones.">
      {!file && <FileDropzone onFiles={loadFile} />}

      {file && (status === "idle" || status === "error") && (
        <div style={{ maxWidth: 400 }}>
          <div style={{ fontSize: 13, color: "var(--color-muted)", marginBottom: 16 }}>
            Archivo: <span style={{ color: "var(--color-primary)" }}>{file.name}</span>
          </div>
          {errorMsg && <div style={{ fontSize: 13, color: "#ff6b6b", marginBottom: 12 }}>{errorMsg}</div>}
          <div style={{ marginBottom: 8, fontSize: 12, color: "var(--color-text)", fontWeight: 700 }}>Contraseña del PDF</div>
          <input
            type="password"
            value={password}
            onChange={function(e) { setPassword(e.target.value); }}
            onKeyDown={function(e) { if (e.key === "Enter" && password) unlock(); }}
            placeholder="Ingresa la contraseña..."
            style={{
              width: "100%", background: "var(--color-deep)", border: "1px solid var(--color-border)",
              color: "var(--color-text)", padding: "12px 14px", fontSize: 14, marginBottom: 20, borderRadius: 4, outline: "none",
            }}
          />
          <div style={{ display: "flex", gap: 12 }}>
            <button onClick={unlock} disabled={!password}
              style={{ background: password ? "var(--color-primary)" : "var(--color-border)", color: "var(--color-deep)", border: "none", padding: "12px 28px", fontSize: 13, fontWeight: 700, cursor: password ? "pointer" : "not-allowed" }}>
              Desbloquear →
            </button>
            <button onClick={reset} style={{ background: "transparent", color: "var(--color-muted)", border: "1px solid var(--color-border)", padding: "12px 20px", fontSize: 13, cursor: "pointer" }}>Cancelar</button>
          </div>
        </div>
      )}

      {status === "loading" && <div style={{ textAlign: "center", padding: 40 }}><div style={{ fontSize: 15, color: "var(--color-text)" }}>Desbloqueando...</div></div>}

      {status === "done" && (
        <div style={{ textAlign: "center", padding: "40px 0" }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>🔓</div>
          <div style={{ fontSize: 18, fontWeight: 700, color: "var(--color-text)", marginBottom: 16 }}>PDF desbloqueado</div>
          <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
            <a href={resultUrl} download={"unlocked_" + (file?.name || "output.pdf")} style={{ background: "var(--color-primary)", color: "var(--color-deep)", padding: "12px 28px", fontSize: 13, fontWeight: 700, textDecoration: "none" }}>Descargar →</a>
            <button onClick={reset} style={{ background: "transparent", color: "var(--color-muted)", border: "1px solid var(--color-border)", padding: "12px 20px", fontSize: 13, cursor: "pointer" }}>Nuevo</button>
          </div>
        </div>
      )}
    </PdfLayout>
  );
}
