"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";

const WHATSAPP = "https://wa.me/50250000000?text=Hola%20Chronos-Dev%2C%20me%20interesa%20un%20proyecto";

export default function Hero() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(function () {
    if (!rootRef.current) return;
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    var els = rootRef.current.querySelectorAll(".aos");
    els.forEach(function (el) { observer.observe(el); });
    return function () { observer.disconnect(); };
  }, []);

  return (
    <section
      ref={rootRef}
      style={{
        position: "relative",
        minHeight: 640,
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        borderBottom: "1px solid var(--color-border)",
      }}
    >
      {/* PCB BACKGROUND */}
      <svg
        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", opacity: 0.07, pointerEvents: "none" }}
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <pattern id="pcb" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M0 30 H60 M30 0 V60" stroke="#7aff00" strokeWidth="0.5" />
            <circle cx="30" cy="30" r="2" fill="#7aff00" />
            <circle cx="0"  cy="0"  r="1.5" fill="#7aff0066" />
            <circle cx="60" cy="60" r="1.5" fill="#7aff0066" />
            <circle cx="60" cy="0"  r="1"   fill="#7aff0033" />
            <circle cx="0"  cy="60" r="1"   fill="#7aff0033" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#pcb)" />
      </svg>

      {/* CONCENTRIC CIRCLES */}
      <div style={{ position: "absolute", top: "50%", left: "35%", transform: "translate(-50%,-50%)", opacity: 0.12, pointerEvents: "none" }}>
        <svg width="600" height="600" viewBox="0 0 600 600" fill="none" stroke="#7aff00" aria-hidden="true">
          {[28,56,84,112,140,168,196,224,252,278].map(function (r) {
            return <circle key={r} cx="300" cy="300" r={r} />;
          })}
        </svg>
      </div>

      {/* LEFT BAR — hidden mobile */}
      <div
        className="hero-bars"
        style={{
          position: "absolute",
          left: 0, top: 0, bottom: 0,
          width: 44,
          borderRight: "1px solid var(--color-border)",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "24px 0",
        }}
      >
        <span className="vtext" style={{ color: "var(--color-muted)", fontSize: 9 }}>
          (+502) 0000-0000
        </span>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
          <span className="vtext">Scroll Down</span>
          <div style={{ width: 1, height: 52, background: "var(--color-border)", position: "relative" }}>
            <div style={{ position: "absolute", bottom: -5, left: -3, width: 7, height: 7, borderRight: "1px solid var(--color-border)", borderBottom: "1px solid var(--color-border)", transform: "rotate(45deg)" }} />
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="hero-content-pad" style={{ position: "relative", zIndex: 3, flex: 1, maxWidth: "55%" }}>
        {/* AVAILABILITY */}
        <div className="aos d1" style={{ marginBottom: 10 }}>
          <div style={{ fontSize: 12, color: "var(--color-muted)" }}>Currently Available For Freelance</div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 2, fontSize: 12 }}>
            <span style={{ color: "var(--color-primary)" }}>Worldwide</span>
            <span style={{ color: "var(--color-primary)", fontSize: 16 }}>↗</span>
          </div>
        </div>

        {/* DIVIDER */}
        <div style={{ width: 160, height: 1, background: "var(--color-border)", margin: "14px 0 22px" }} />

        {/* HEADLINE */}
        <h1 style={{ margin: 0, padding: 0, marginBottom: 36 }}>
          <span
            className="aos d2 hero-h1"
            style={{ display: "block", fontSize: "clamp(42px,6.5vw,88px)", fontWeight: 700, color: "var(--color-text)", lineHeight: 1, letterSpacing: -2 }}
          >
            Desarrollo Web &
          </span>
          <span
            className="aos d3 hero-h1"
            style={{ display: "block", fontSize: "clamp(44px,7vw,96px)", fontWeight: 700, lineHeight: 1, letterSpacing: -2 }}
          >
            <span className="text-fill-outer">
              Automatización
              <span className="text-fill-inner">Automatización</span>
            </span>
          </span>
        </h1>

        {/* SUBTITLE */}
        <p
          className="aos d4"
          style={{ fontSize: 14, color: "var(--color-muted)", lineHeight: 1.7, maxWidth: 420, marginBottom: 32 }}
        >
          Agencia de software e IA en Guatemala. Tiendas en línea, chatbots
          inteligentes y automatización para negocios que quieren crecer en serio.
        </p>

        {/* CTA */}
        <div className="aos d5" style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: "var(--color-primary)",
              color: "var(--color-deep)",
              padding: "13px 28px",
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: 1,
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            Hablemos →
          </a>
          <a
            href="#projects"
            onClick={function (e) {
              e.preventDefault();
              var el = document.querySelector("#projects");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            style={{
              background: "transparent",
              color: "var(--color-primary)",
              border: "1px solid var(--color-primary)",
              padding: "13px 28px",
              fontSize: 12,
              letterSpacing: 1,
              textDecoration: "none",
            }}
          >
            Ver proyectos
          </a>
        </div>
      </div>

      {/* AVATAR — hidden on mobile */}
      <div
        className="hero-photo-wrap"
        style={{
          position: "absolute",
          right: 204,
          bottom: -140,
          top: 0,
          width: "100%",
          maxWidth: 1080,
          zIndex: 2,
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "flex-end",
        }}
      >
        <div style={{ position: "relative", width: "100%", height: "110%" }}>
          <Image
            src="/avatar.png"
            alt="Chronos-Dev Developer"
            fill
            sizes="(max-width:1200px) 50vw, 680px"
            style={{
              objectFit: "contain",
              objectPosition: "bottom right",
              filter: "drop-shadow(0 0 48px #7aff00aa)",
              mixBlendMode: "screen",
            }}
            priority
          />
        </div>
      </div>

      {/* RIGHT BAR — hidden on mobile */}
      <div
        className="hero-bars"
        style={{
          position: "absolute",
          right: 0, top: 0, bottom: 0,
          width: 44,
          borderLeft: "1px solid var(--color-border)",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 12,
          padding: "14px 0",
        }}
      >
        <span className="vtext" style={{ marginBottom: 6 }}>Follow Me</span>
        {[
          { label: "FB", path: "M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" },
          { label: "IG", path: "M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 00-1.417.923A3.927 3.927 0 00.42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 001.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 00-.923-1.417A3.911 3.911 0 0013.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 01-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 01-.92-.598 2.48 2.48 0 01-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 100 1.92.96.96 0 000-1.92zm-4.27 1.122a4.109 4.109 0 100 8.217 4.109 4.109 0 000-8.217zm0 1.441a2.667 2.667 0 110 5.334 2.667 2.667 0 010-5.334z" },
          { label: "WA", path: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" },
        ].map(function (soc) {
          return (
            <a
              key={soc.label}
              href="#"
              aria-label={soc.label}
              style={{
                width: 30, height: 30,
                borderRadius: "50%",
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
                display: "flex", alignItems: "center", justifyContent: "center",
                textDecoration: "none",
              }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="var(--color-muted)">
                <path d={soc.path} />
              </svg>
            </a>
          );
        })}
      </div>
    </section>
  );
}
