"use client";
import { useEffect, useRef } from "react";

export default function CustomCursor() {
  var dotRef = useRef<HTMLDivElement>(null);
  var ringRef = useRef<HTMLDivElement>(null);

  useEffect(function () {
    if (typeof window === "undefined") return;
    if ("ontouchstart" in window) return;
    var mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;
    var desktopMq = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!desktopMq.matches) return;

    var mx = -100, my = -100;
    var rx = -100, ry = -100;
    var rW = 30, rH = 30;
    var rafId: number;

    function onMove(e: MouseEvent) {
      mx = e.clientX;
      my = e.clientY;
    }

    function tick() {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      if (dotRef.current) {
        dotRef.current.style.transform = "translate(" + (mx - 3) + "px," + (my - 3) + "px)";
      }
      if (ringRef.current) {
        ringRef.current.style.transform = "translate(" + (rx - rW / 2) + "px," + (ry - rH / 2) + "px)";
      }
      rafId = requestAnimationFrame(tick);
    }

    function onOver(e: MouseEvent) {
      var t = e.target as Element;
      if (t.closest("a,button,[role='button'],label,[style*='cursor: pointer']")) {
        if (!ringRef.current) return;
        ringRef.current.style.width = "44px";
        ringRef.current.style.height = "44px";
        ringRef.current.style.borderColor = "var(--color-primary)";
        rW = 44; rH = 44;
      }
    }
    function onOut(e: MouseEvent) {
      var t = e.target as Element;
      if (t.closest("a,button,[role='button'],label,[style*='cursor: pointer']")) {
        if (!ringRef.current) return;
        ringRef.current.style.width = "30px";
        ringRef.current.style.height = "30px";
        ringRef.current.style.borderColor = "rgba(122,255,0,0.4)";
        rW = 30; rH = 30;
      }
    }

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    rafId = requestAnimationFrame(tick);

    return function () {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} style={{
        position: "fixed", top: 0, left: 0,
        width: 6, height: 6, borderRadius: "50%",
        background: "var(--color-primary)",
        boxShadow: "0 0 8px var(--color-primary)",
        pointerEvents: "none", zIndex: 9999,
        willChange: "transform",
      }} />
      <div ref={ringRef} style={{
        position: "fixed", top: 0, left: 0,
        width: 30, height: 30, borderRadius: "50%",
        border: "1px solid rgba(122,255,0,0.4)",
        pointerEvents: "none", zIndex: 9998,
        willChange: "transform",
        transition: "width 0.18s, height 0.18s, border-color 0.18s",
      }} />
      <style>{`
        @media (hover: hover) and (pointer: fine) {
          *, *::before, *::after { cursor: none !important; }
        }
      `}</style>
    </>
  );
}
