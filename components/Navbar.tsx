"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const WHATSAPP = "https://wa.me/50250000000?text=Hola%20Chronos-Dev%2C%20me%20interesa%20un%20proyecto";

// Desktop nav — primary links only
const desktopLinks = [
  { href: "/#about", label: "Nosotros" },
  { href: "/#projects", label: "Proyectos" },
  { href: "/#services", label: "Servicios" },
  { href: "/tools", label: "Herramientas" },
  { href: "/contact", label: "Contacto" },
];

// Mobile nav — all links
const mobileLinks = [
  { href: "/#about", label: "Nosotros" },
  { href: "/#projects", label: "Proyectos" },
  { href: "/#services", label: "Servicios" },
  { href: "/#process", label: "Proceso" },
  { href: "/tools", label: "Herramientas ✦" },
  { href: "/contact", label: "Contacto" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    function onScroll() { setScrolled(window.scrollY > 10); }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close drawer on route change
  useEffect(() => { setOpen(false); }, [pathname]);

  function handleNav(e: React.MouseEvent, href: string) {
    e.preventDefault();
    setOpen(false);
    if (href.startsWith("/") && !href.includes("#")) {
      window.location.href = href;
      return;
    }
    if (href.includes("#")) {
      const hash = href.split("#")[1];
      const isHome = pathname === "/";
      if (!isHome) {
        window.location.href = href;
        return;
      }
      const el = document.getElementById(hash);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <>
      <nav
        style={{
          background: scrolled ? "var(--color-deep)" : "var(--color-deep)",
          borderBottom: "1px solid var(--color-border)",
          position: "sticky",
          top: 0,
          zIndex: 100,
          height: 60,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 20px",
          boxShadow: scrolled ? "0 2px 20px #00000044" : "none",
          transition: "box-shadow 0.2s",
        }}
      >
        {/* LOGO */}
        <Link
          href="/"
          style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", flexShrink: 0 }}
        >
          <svg width="32" height="32" viewBox="0 0 52 52" fill="none">
            <circle cx="26" cy="26" r="24" stroke="#7aff00" strokeWidth="1.5" opacity=".6" />
            <circle cx="26" cy="26" r="17" stroke="#7aff00" strokeWidth="1" opacity=".4" />
            <circle cx="26" cy="26" r="10" stroke="#39ff14" strokeWidth="1" opacity=".7" />
            <circle cx="26" cy="26" r="4" fill="#39ff14" />
            <line x1="26" y1="2" x2="26" y2="9" stroke="#7aff00" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M9 18 L14 26 L9 34" stroke="#7aff00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </svg>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, letterSpacing: 1, color: "var(--color-text)", lineHeight: 1.1 }}>
              CHRONOS <span style={{ color: "var(--color-primary)" }}>DEV</span>
            </div>
            <div style={{ fontSize: 7, letterSpacing: 2, textTransform: "uppercase", color: "var(--color-muted)" }}>
              Software & AI
            </div>
          </div>
        </Link>

        {/* DESKTOP LINKS */}
        <div
          style={{ display: "flex", gap: 24, alignItems: "center" }}
          className="nav-desktop"
        >
          {desktopLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={(e) => handleNav(e, l.href)}
              style={{
                fontSize: 11,
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                color: l.href === "/contact" ? "var(--color-primary)" : "var(--color-muted)",
                textDecoration: "none",
                transition: "color 0.2s",
                fontWeight: l.href === "/contact" ? 700 : 400,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-text)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = l.href === "/contact" ? "var(--color-primary)" : "var(--color-muted)")}
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
              padding: "10px 20px",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: 1,
              textDecoration: "none",
              whiteSpace: "nowrap",
            }}
          >
            Let&apos;s Talk →
          </a>
        </div>

        {/* MOBILE BURGER */}
        <button
          onClick={() => setOpen(!open)}
          className="nav-burger"
          aria-label="Menu"
          style={{
            width: 40,
            height: 40,
            border: "1px solid var(--color-border)",
            background: open ? "var(--color-surface)" : "transparent",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 5,
            cursor: "pointer",
            transition: "background 0.2s",
            flexShrink: 0,
          }}
        >
          <span style={{ width: 16, height: 1.5, background: open ? "var(--color-primary)" : "var(--color-text)", display: "block", transition: "all 0.2s", transform: open ? "rotate(45deg) translate(3px, 3px)" : "none" }} />
          <span style={{ width: 16, height: 1.5, background: open ? "var(--color-primary)" : "var(--color-text)", display: "block", transition: "all 0.2s", opacity: open ? 0 : 1 }} />
          <span style={{ width: 16, height: 1.5, background: open ? "var(--color-primary)" : "var(--color-text)", display: "block", transition: "all 0.2s", transform: open ? "rotate(-45deg) translate(3px, -3px)" : "none" }} />
        </button>
      </nav>

      {/* MOBILE DRAWER */}
      {open && (
        <div
          style={{
            position: "fixed",
            top: 60,
            left: 0,
            right: 0,
            bottom: 0,
            background: "var(--color-deep)",
            borderTop: "1px solid var(--color-border)",
            zIndex: 99,
            display: "flex",
            flexDirection: "column",
            overflowY: "auto",
          }}
          className="nav-burger"
        >
          <div style={{ flex: 1, padding: "8px 0" }}>
            {mobileLinks.map((l, i) => (
              <a
                key={l.href}
                href={l.href}
                onClick={(e) => handleNav(e, l.href)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "18px 24px",
                  fontSize: 15,
                  fontWeight: l.href === "/contact" ? 700 : 400,
                  color: l.href === "/contact" ? "var(--color-primary)" : "var(--color-text)",
                  textDecoration: "none",
                  borderBottom: "1px solid var(--color-border)",
                  letterSpacing: 0.5,
                }}
              >
                {l.label}
                <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" style={{ opacity: 0.5 }}>
                  <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 01.708 0l6 6a.5.5 0 010 .708l-6 6a.5.5 0 01-.708-.708L10.293 8 4.646 2.354a.5.5 0 010-.708z" />
                </svg>
              </a>
            ))}
          </div>

          {/* MOBILE CTA */}
          <div style={{ padding: "20px 24px 32px" }}>
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "block",
                background: "var(--color-primary)",
                color: "var(--color-deep)",
                padding: "16px",
                fontSize: 14,
                fontWeight: 700,
                textDecoration: "none",
                textAlign: "center",
                letterSpacing: 1,
              }}
            >
              Hablemos por WhatsApp →
            </a>
          </div>
        </div>
      )}

      <style>{`
        .nav-desktop { display: flex !important; }
        .nav-burger { display: none !important; }
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-burger { display: flex !important; }
        }
      `}</style>
    </>
  );
}
