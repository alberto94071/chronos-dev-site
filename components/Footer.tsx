"use client";

var socials = [
  { label: "Facebook", href: "https://facebook.com/chronos_dev_" },
  { label: "Instagram", href: "https://instagram.com/chronos_dev_" },
  { label: "WhatsApp", href: "https://wa.me/50255026862" },
  { label: "LinkedIn", href: "#" },
];

export default function Footer() {
  return (
    <footer className="sec-pad" style={{ paddingBottom: 0 }}>
      {/* BIG TEXT */}
      <div
        className="footer-big"
        style={{ fontSize: "clamp(32px,8vw,64px)", fontWeight: 700, color: "var(--color-border)", letterSpacing: -2, lineHeight: 1, marginBottom: 32 }}
      >
        Get In Touch
      </div>

      {/* FOOTER GRID */}
      <div className="footer-grid">
        {/* LEFT */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
            <svg width="32" height="32" viewBox="0 0 52 52" fill="none">
              <circle cx="26" cy="26" r="24" stroke="#7aff00" strokeWidth="1.5" opacity=".6"/>
              <circle cx="26" cy="26" r="17" stroke="#7aff00" strokeWidth="1" opacity=".4"/>
              <circle cx="26" cy="26" r="10" stroke="#39ff14" strokeWidth="1" opacity=".7"/>
              <circle cx="26" cy="26" r="4" fill="#39ff14"/>
              <line x1="26" y1="2" x2="26" y2="9" stroke="#7aff00" strokeWidth="2.5" strokeLinecap="round"/>
              <path d="M9 18 L14 26 L9 34" stroke="#7aff00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
            </svg>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: "var(--color-text)" }}>
                CHRONOS <span style={{ color: "var(--color-primary)" }}>DEV</span>
              </div>
              <div style={{ fontSize: 8, letterSpacing: 2, textTransform: "uppercase", color: "var(--color-muted)", marginTop: 1 }}>
                Software & AI Integration
              </div>
            </div>
          </div>
          <p style={{ fontSize: 13, color: "var(--color-muted)", lineHeight: 1.7, marginBottom: 12 }}>
            <strong style={{ color: "var(--color-text)", fontWeight: 500 }}>Agencia de desarrollo web</strong> y software en <strong>Guatemala</strong> y <strong>San Marcos</strong>.<br/>
            Especialistas en crear la <strong style={{ color: "var(--color-text)", fontWeight: 500 }}>página web para tu negocio</strong>, sistemas a la medida y automatización con IA.
          </p>
          <div style={{ fontSize: 14, color: "var(--color-primary)", marginBottom: 6 }}>contacto@chronos-dev.com</div>
          <div style={{ fontSize: 13, color: "var(--color-muted)" }}>Guatemala City, Guatemala</div>
        </div>

        {/* RIGHT — SOCIALS */}
        <div className="grid-soc">
          {socials.map(function (s) {
            return (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 13, color: "var(--color-muted)", padding: "10px 0", borderBottom: "1px solid var(--color-border)", textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={function (e) { e.currentTarget.style.color = "var(--color-primary)"; }}
                onMouseLeave={function (e) { e.currentTarget.style.color = "var(--color-muted)"; }}
              >
                {s.label}
                <svg width="11" height="11" viewBox="0 0 16 16" fill="currentColor">
                  <path fillRule="evenodd" d="M14 2.5a.5.5 0 00-.5-.5h-6a.5.5 0 000 1h4.793L2.146 13.146a.5.5 0 00.708.708L13 3.707V8.5a.5.5 0 001 0v-6z"/>
                </svg>
              </a>
            );
          })}
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div style={{ borderTop: "1px solid var(--color-border)", padding: "14px 0", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
        <span style={{ fontSize: 11, color: "var(--color-border)" }}>
          © 2025 <span style={{ color: "var(--color-primary)" }}>Chronos-Dev.</span> Todos los derechos reservados.
        </span>
        <div style={{ display: "flex", gap: 16 }}>
          {["Términos", "Privacidad"].map(function (link) {
            return (
              <a key={link} href="#" style={{ fontSize: 11, color: "var(--color-border)", textDecoration: "none", cursor: "pointer" }}
                onMouseEnter={function (e) { e.currentTarget.style.color = "var(--color-primary)"; }}
                onMouseLeave={function (e) { e.currentTarget.style.color = "var(--color-border)"; }}
              >
                {link}
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
}
