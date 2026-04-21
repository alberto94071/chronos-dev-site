"use client";
import { useState } from "react";
import Link from "next/link";

const WHATSAPP = "https://wa.me/50250000000?text=Hola%20Chronos-Dev%2C%20me%20interesa%20un%20proyecto";

const links = [
  { href: "#about", label: "Nosotros" },
  { href: "#projects", label: "Proyectos" },
  { href: "#services", label: "Servicios" },
  { href: "#process", label: "Proceso" },
  { href: "#contact", label: "Contacto" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  function handleScroll(e: React.MouseEvent, href: string) {
    e.preventDefault();
    setOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <nav
      style={{
        background: "var(--color-deep)",
        borderBottom: "1px solid var(--color-border)",
        position: "sticky",
        top: 0,
        zIndex: 100,
        height: 60,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 32px",
      }}
    >
      {/* LOGO */}
      <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
        <svg width="32" height="32" viewBox="0 0 52 52" fill="none">
          <circle cx="26" cy="26" r="24" stroke="#7aff00" strokeWidth="1.5" opacity=".6" />
          <circle cx="26" cy="26" r="17" stroke="#7aff00" strokeWidth="1" opacity=".4" />
          <circle cx="26" cy="26" r="10" stroke="#39ff14" strokeWidth="1" opacity=".7" />
          <circle cx="26" cy="26" r="4" fill="#39ff14" />
          <circle cx="26" cy="26" r="7" fill="#39ff1420" />
          <line x1="26" y1="2" x2="26" y2="9" stroke="#7aff00" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M9 18 L14 26 L9 34" stroke="#7aff00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
        <div>
          <div style={{ fontSize: 16, fontWeight: 700, letterSpacing: 1, color: "var(--color-text)" }}>
            CHRONOS <span style={{ color: "var(--color-primary)" }}>DEV</span>
          </div>
          <div style={{ fontSize: 8, letterSpacing: 2, textTransform: "uppercase", color: "var(--color-muted)", marginTop: 1 }}>
            Software & AI Integration
          </div>
        </div>
      </Link>

      {/* DESKTOP LINKS */}
      <div style={{ display: "flex", gap: 28, alignItems: "center" }} className="hidden md:flex">
        {links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            onClick={(e) => handleScroll(e, l.href)}
            style={{
              fontSize: 11,
              letterSpacing: "1.5px",
              textTransform: "uppercase",
              color: "var(--color-muted)",
              textDecoration: "none",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-text)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-muted)")}
          >
            {l.label}
          </a>
        ))}
        <a
          href={WHATSAPP}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            background: "var(--color-primary)",
            color: "var(--color-deep)",
            border: "none",
            padding: "10px 22px",
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: 1,
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          Let&apos;s Talk →
        </a>
      </div>

      {/* MOBILE BURGER */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: 40,
          height: 40,
          border: "1px solid var(--color-border)",
          background: "transparent",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 5,
          cursor: "pointer",
        }}
        className="md:hidden"
        aria-label="Menu"
      >
        <span style={{ width: 16, height: 1.5, background: "var(--color-text)", display: "block" }} />
        <span style={{ width: 16, height: 1.5, background: "var(--color-text)", display: "block" }} />
        <span style={{ width: 16, height: 1.5, background: "var(--color-text)", display: "block" }} />
      </button>

      {/* MOBILE MENU */}
      {open && (
        <div
          style={{
            position: "fixed",
            top: 60,
            left: 0,
            right: 0,
            background: "var(--color-deep)",
            borderBottom: "1px solid var(--color-border)",
            padding: "20px 32px",
            display: "flex",
            flexDirection: "column",
            gap: 16,
            zIndex: 99,
          }}
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={(e) => handleScroll(e, l.href)}
              style={{
                fontSize: 13,
                letterSpacing: "1px",
                textTransform: "uppercase",
                color: "var(--color-text)",
                textDecoration: "none",
                padding: "8px 0",
                borderBottom: "1px solid var(--color-border)",
              }}
            >
              {l.label}
            </a>
          ))}
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: "var(--color-primary)",
              color: "var(--color-deep)",
              padding: "12px 20px",
              fontSize: 12,
              fontWeight: 700,
              textDecoration: "none",
              textAlign: "center",
            }}
          >
            Let&apos;s Talk →
          </a>
        </div>
      )}
    </nav>
  );
}
