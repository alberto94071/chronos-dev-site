import Link from "next/link";
import Navbar from "@/components/Navbar";

type Props = {
  title: string;
  description: string;
  children: React.ReactNode;
};

export default function PdfLayout(props: Props) {
  return (
    <main>
      <Navbar />
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "40px 24px 80px" }}>
        {/* BACK */}
        <Link href="/tools" style={{ fontSize: 12, color: "var(--color-primary)", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 24 }}>
          ← Volver a herramientas
        </Link>
        <h1 style={{ fontSize: "clamp(24px,4vw,36px)", fontWeight: 700, color: "var(--color-text)", marginBottom: 8 }}>
          {props.title}
        </h1>
        <p style={{ fontSize: 14, color: "var(--color-muted)", marginBottom: 32, lineHeight: 1.7 }}>
          {props.description}
        </p>
        {props.children}
      </div>
    </main>
  );
}
