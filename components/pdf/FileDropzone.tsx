"use client";
import { useState, useRef } from "react";

type Props = {
  onFiles: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
  label?: string;
  sublabel?: string;
};

export default function FileDropzone(props: Props) {
  var accept = props.accept || ".pdf";
  var multiple = props.multiple || false;
  var [hover, setHover] = useState(false);
  var inputRef = useRef<HTMLInputElement>(null);

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setHover(false);
    var files = Array.from(e.dataTransfer.files);
    if (files.length > 0) props.onFiles(files);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    var files = Array.from(e.target.files || []);
    if (files.length > 0) props.onFiles(files);
    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <div
      onDrop={handleDrop}
      onDragOver={function(e) { e.preventDefault(); setHover(true); }}
      onDragLeave={function() { setHover(false); }}
      onClick={function() { if (inputRef.current) inputRef.current.click(); }}
      style={{
        border: hover ? "2px dashed var(--color-primary)" : "2px dashed var(--color-border)",
        borderRadius: 8, padding: "48px 32px", textAlign: "center", cursor: "pointer",
        background: hover ? "#7aff0010" : "transparent", transition: "all 0.2s",
      }}
    >
      <div style={{ fontSize: 40, marginBottom: 12 }}>📄</div>
      <div style={{ fontSize: 16, fontWeight: 700, color: "var(--color-text)", marginBottom: 6 }}>
        {props.label || "Arrastra tu archivo aquí"}
      </div>
      <div style={{ fontSize: 12, color: "var(--color-muted)", marginBottom: 16 }}>
        {props.sublabel || (multiple ? "Puedes subir múltiples archivos" : "O haz clic para seleccionar")}
      </div>
      <div style={{ display: "inline-flex", background: "var(--color-primary)", color: "var(--color-deep)", padding: "9px 20px", fontSize: 11, fontWeight: 700, letterSpacing: 1 }}>
        {multiple ? "Seleccionar archivos →" : "Seleccionar archivo →"}
      </div>
      <input ref={inputRef} type="file" accept={accept} multiple={multiple} style={{ display: "none" }} onChange={handleChange} />
      <div style={{ marginTop: 16, fontSize: 10, color: "var(--color-muted)", fontFamily: "JetBrains Mono, monospace" }}>
        🔒 Tus archivos se procesan localmente · Nunca salen de tu dispositivo
      </div>
    </div>
  );
}
