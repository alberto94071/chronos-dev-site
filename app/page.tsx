"use client";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import MarqueeBar from "@/components/MarqueeBar";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Services from "@/components/Services";
import Testimonial from "@/components/Testimonial";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function Home() {
  const [progress, setProgress] = useState(0);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(function () {
    function handleScroll() {
      const el = document.documentElement;
      const scrolled = el.scrollTop;
      const total = el.scrollHeight - el.clientHeight;
      setProgress(total > 0 ? (scrolled / total) * 100 : 0);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return function () { window.removeEventListener("scroll", handleScroll); };
  }, []);

  // Show tooltip after 5 seconds
  useEffect(function () {
    const timer = setTimeout(function () { setShowTooltip(true); }, 5000);
    return function () { clearTimeout(timer); };
  }, []);

  return (
    <main>
      {/* SCROLL PROGRESS */}
      <div className="scroll-progress" style={{ width: progress + "%" }} />

      <Navbar />
      <Hero />
      <MarqueeBar />
      <About />
      <Projects />
      <Services />
      <Testimonial />
      <Footer />

      {/* CHATBOT FLOATING BUTTON */}
      <Link href="/contact" className="chat-float" aria-label="Habla con nuestro asistente IA">
        {/* TOOLTIP */}
        <div className="chat-tooltip" style={{ opacity: showTooltip ? 1 : 0 }}>
          <span>¿Tienes preguntas?</span>
          <strong>Prueba nuestro bot IA</strong>
          <button
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); setShowTooltip(false); }}
            style={{ position: "absolute", top: 4, right: 6, background: "none", border: "none", color: "var(--color-muted)", fontSize: 12, cursor: "pointer", lineHeight: 1 }}
          >
            ✕
          </button>
        </div>

        {/* ICON */}
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--color-deep)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" fill="var(--color-deep)" stroke="var(--color-deep)" />
          <circle cx="8" cy="10" r="1.2" fill="var(--color-primary)" />
          <circle cx="12" cy="10" r="1.2" fill="var(--color-primary)" />
          <circle cx="16" cy="10" r="1.2" fill="var(--color-primary)" />
        </svg>
      </Link>

      <style>{`
        .chat-float {
          position: fixed;
          bottom: 28px;
          right: 28px;
          width: 58px;
          height: 58px;
          border-radius: 50%;
          background: var(--color-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 24px #7aff0044;
          cursor: pointer;
          z-index: 999;
          text-decoration: none;
          transition: transform 0.2s, box-shadow 0.2s;
          animation: chatPulse 3s infinite;
        }
        .chat-float:hover {
          transform: scale(1.1);
          box-shadow: 0 6px 32px #7aff0066;
        }
        @keyframes chatPulse {
          0%, 100% { box-shadow: 0 4px 24px #7aff0044; }
          50% { box-shadow: 0 4px 32px #7aff0088, 0 0 0 10px #7aff0015; }
        }

        .chat-tooltip {
          position: absolute;
          right: 68px;
          bottom: 4px;
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          color: var(--color-text);
          padding: 10px 32px 10px 14px;
          white-space: nowrap;
          border-radius: 8px;
          transition: opacity 0.3s;
          pointer-events: auto;
          display: flex;
          flex-direction: column;
          gap: 2px;
          box-shadow: 0 4px 20px #00000044;
        }
        .chat-tooltip span {
          font-size: 11px;
          color: var(--color-muted);
        }
        .chat-tooltip strong {
          font-size: 13px;
          color: var(--color-primary);
          font-weight: 700;
        }
        .chat-tooltip::after {
          content: '';
          position: absolute;
          right: -6px;
          bottom: 18px;
          width: 12px;
          height: 12px;
          background: var(--color-surface);
          border-right: 1px solid var(--color-border);
          border-bottom: 1px solid var(--color-border);
          transform: rotate(-45deg);
        }

        @media (max-width: 768px) {
          .chat-float { bottom: 20px; right: 16px; width: 52px; height: 52px; }
          .chat-tooltip { right: 60px; bottom: 0; }
        }
      `}</style>
    </main>
  );
}
