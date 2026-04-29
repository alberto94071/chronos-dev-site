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
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" fill="rgba(122,255,0,0.1)" stroke="var(--color-primary)" />
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
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: rgba(122, 255, 0, 0.15);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(122, 255, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 30px rgba(122, 255, 0, 0.3);
          cursor: pointer;
          z-index: 999;
          text-decoration: none;
          transition: transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.3s;
          animation: chatPulse 3s infinite;
        }
        .chat-float:hover {
          transform: scale(1.1) translateY(-4px);
          box-shadow: 0 8px 40px rgba(122, 255, 0, 0.5);
          border: 1px solid rgba(122, 255, 0, 0.8);
        }
        @keyframes chatPulse {
          0%, 100% { box-shadow: 0 4px 30px rgba(122, 255, 0, 0.3); }
          50% { box-shadow: 0 4px 40px rgba(122, 255, 0, 0.6), 0 0 0 10px rgba(122, 255, 0, 0.1); }
        }

        .chat-tooltip {
          position: absolute;
          right: 76px;
          bottom: 8px;
          background: rgba(19, 26, 19, 0.85);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(122, 255, 0, 0.3);
          color: var(--color-text);
          padding: 12px 36px 12px 16px;
          white-space: nowrap;
          border-radius: 12px;
          transition: opacity 0.4s cubic-bezier(0.2, 0.8, 0.2, 1), transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
          pointer-events: auto;
          display: flex;
          flex-direction: column;
          gap: 4px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
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
          background: rgba(19, 26, 19, 0.85);
          border-right: 1px solid rgba(122, 255, 0, 0.3);
          border-bottom: 1px solid rgba(122, 255, 0, 0.3);
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
