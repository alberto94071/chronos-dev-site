"use client";
import { useEffect, useRef, useState } from "react";

var testimonials = [
  { quote: "Chronos-Dev entregó nuestra tienda en tiempo récord. El diseño quedó exactamente como lo imaginábamos y las ventas por WhatsApp crecieron desde el primer día.", name: "María Sofía", role: "Dueña · Vestidos MYSY" },
  { quote: "Necesitaba una tienda que vendiera en Guatemala y en Estados Unidos al mismo tiempo. Chronos-Dev lo hizo posible con geolocalización automática y precios en GTQ y USD.", name: "Propietario", role: "R Fragancias · Perfumería de Lujo" },
  { quote: "El catálogo web para nuestros textiles guatemaltecos quedó hermoso. Profesional, rápido y con todo el sabor cultural que queríamos mostrar al mundo.", name: "Equipo Tuanis", role: "Textiles Tuanis GT" },
];

export default function Testimonial() {
  var [active, setActive] = useState(0);
  var ref = useRef<HTMLElement>(null);

  useEffect(function () {
    if (!ref.current) return;
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add("visible"); observer.unobserve(entry.target); }
      });
    }, { threshold: 0.1 });
    ref.current.querySelectorAll(".aos").forEach(function (el) { observer.observe(el); });
    return function () { observer.disconnect(); };
  }, []);

  var t = testimonials[active];

  return (
    <section ref={ref} id="testimonial" className="sec-pad" style={{ borderBottom: "1px solid var(--color-border)" }}>
      <div style={{ textAlign: "center", marginBottom: 52 }}>
        <div className="aos" style={{ display: "flex", alignItems: "center", gap: 10, justifyContent: "center", marginBottom: 10 }}>
          <div style={{ height: 1, width: 40, background: "var(--color-primary)" }} />
          <span style={{ fontFamily: "Georgia, serif", fontStyle: "italic", color: "var(--color-primary)", fontSize: 14 }}>Testimonial</span>
          <div style={{ height: 1, width: 40, background: "var(--color-primary)" }} />
        </div>
        <h2 className="aos d1" style={{ fontSize: "clamp(22px,4vw,30px)", fontWeight: 700, color: "var(--color-text)" }}>
          Palabras de clientes satisfechos
        </h2>
      </div>

      <div className="test-wrap">
        {/* FLOATING PHOTOS LEFT */}
        <div className="test-float">
          {[80, 64].map(function (size) {
            return (
              <div key={size} style={{ width: size, height: size, borderRadius: size === 64 ? 8 : "50%", background: "var(--color-surface)", border: "2px solid var(--color-border)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="32" height="32" viewBox="0 0 60 60" fill="var(--color-border)">
                  <path d="M30 5a25 25 0 100 50A25 25 0 0030 5zm0 10a10 10 0 110 20 10 10 0 010-20zm0 24c-6.6 0-12.5 3-16.3 7.7A22 22 0 0030 52c4.7 0 9-1.5 12.5-4A19.5 19.5 0 0030 39z"/>
                </svg>
              </div>
            );
          })}
        </div>

        {/* TESTIMONIAL */}
        <div className="aos d2" style={{ maxWidth: 560 }}>
          <div style={{ display: "flex", gap: 5, marginBottom: 20 }}>
            {[1,2,3,4,5].map(function (s) {
              return (
                <svg key={s} width="18" height="18" viewBox="0 0 16 16" fill="var(--color-primary)">
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                </svg>
              );
            })}
          </div>
          <p style={{ fontSize: 15, color: "var(--color-muted)", lineHeight: 1.8, fontStyle: "italic", marginBottom: 20 }}>
            &ldquo;{t.quote}&rdquo;
          </p>
          <div style={{ fontSize: 16, fontWeight: 700, color: "var(--color-primary)" }}>{t.name}</div>
          <div style={{ fontSize: 12, color: "var(--color-muted)", marginTop: 2 }}>{t.role}</div>
          <div style={{ display: "flex", gap: 8, marginTop: 20 }}>
            {testimonials.map(function (_, i) {
              return (
                <button key={i} onClick={function () { setActive(i); }}
                  style={{ width: 10, height: 10, borderRadius: "50%", background: i === active ? "var(--color-primary)" : "var(--color-border)", border: "none", cursor: "pointer", transition: "background 0.2s" }}
                />
              );
            })}
          </div>
        </div>

        {/* FLOATING PHOTO RIGHT */}
        <div className="test-float-r">
          <div style={{ width: 80, height: 80, borderRadius: "50%", background: "var(--color-surface)", border: "2px solid var(--color-border)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="40" height="40" viewBox="0 0 60 60" fill="var(--color-border)">
              <path d="M30 5a25 25 0 100 50A25 25 0 0030 5zm0 10a10 10 0 110 20 10 10 0 010-20zm0 24c-6.6 0-12.5 3-16.3 7.7A22 22 0 0030 52c4.7 0 9-1.5 12.5-4A19.5 19.5 0 0030 39z"/>
            </svg>
          </div>
        </div>
      </div>

      {/* CLIENTS */}
      <div style={{ marginTop: 64, textAlign: "center" }}>
        <div style={{ fontSize: 13, color: "var(--color-muted)", letterSpacing: 0.5, marginBottom: 28 }}>
          Negocios que confían en Chronos-Dev
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 36, flexWrap: "wrap" }}>
          {["MYSY Fashion", "Textiles Tuanis", "R Fragancias", "Instituto Lab"].map(function (c) {
            return <span key={c} style={{ fontSize: 15, fontWeight: 700, color: "var(--color-border)", letterSpacing: 0.5 }}>{c}</span>;
          })}
        </div>
      </div>
    </section>
  );
}
