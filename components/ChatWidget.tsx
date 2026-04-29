"use client";
import { useState, useRef, useEffect } from "react";

const WHATSAPP_BASE = "https://wa.me/50250000000?text=";
const WHATSAPP_DEFAULT = WHATSAPP_BASE + encodeURIComponent("Hola Chronos-Dev, vengo del chat de la página y me interesa un proyecto.");

type Message = {
  role: "user" | "assistant";
  content: string;
};

var WELCOME = "¡Hola! 👋 Soy el asistente de Chronos-Dev.\n\n¿En qué puedo ayudarte hoy? Cuéntame sobre tu negocio o qué tipo de solución digital necesitas.";

export default function ChatWidget() {
  var [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: WELCOME },
  ]);
  var [input, setInput] = useState("");
  var [loading, setLoading] = useState(false);
  var [showWA, setShowWA] = useState(false);
  var [waText, setWaText] = useState(WHATSAPP_DEFAULT);
  var bottomRef = useRef<HTMLDivElement>(null);
  var inputRef = useRef<HTMLInputElement>(null);

  useEffect(function () {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function send() {
    var text = input.trim();
    if (!text || loading) return;

    var newMessages: Message[] = [...messages, { role: "user", content: text }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      var res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.map(function (m) {
            return { role: m.role, content: m.content };
          }),
        }),
      });

      var data = await res.json();
      var responseText: string = data.text || "Lo siento, hubo un error.";

      // Check if bot wants to redirect to WhatsApp
      var hasWACta = responseText.includes("[WHATSAPP_CTA]");
      var cleanText = responseText.replace("[WHATSAPP_CTA]", "").trim();

      setMessages(function (prev) {
        return [...prev, { role: "assistant", content: cleanText }];
      });

      if (hasWACta) {
        // Build personalized WhatsApp message from conversation
        var summary = newMessages
          .filter(function (m) { return m.role === "user"; })
          .map(function (m) { return m.content; })
          .join(". ");
        var waMsg = "Hola Chronos-Dev, vengo del chat de la página. " + summary.slice(0, 200);
        setWaText(WHATSAPP_BASE + encodeURIComponent(waMsg));
        setShowWA(true);
      }
    } catch {
      setMessages(function (prev) {
        return [...prev, { role: "assistant", content: "Hubo un problema de conexión. Por favor contáctanos por WhatsApp." }];
      });
      setShowWA(true);
    }

    setLoading(false);
    inputRef.current?.focus();
  }

  return (
    <div style={{
      maxWidth: 680,
      margin: "0 auto",
      background: "rgba(19, 26, 19, 0.75)",
      backdropFilter: "blur(16px)",
      WebkitBackdropFilter: "blur(16px)",
      border: "1px solid rgba(122, 255, 0, 0.15)",
      borderRadius: 12,
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      height: 520,
      boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.3)",
    }}>
      {/* HEADER */}
      <div style={{
        background: "rgba(0, 0, 0, 0.2)",
        borderBottom: "1px solid rgba(122, 255, 0, 0.1)",
        padding: "16px 20px",
        display: "flex",
        alignItems: "center",
        gap: 12,
      }}>
        <div style={{ position: "relative" }}>
          <svg width="36" height="36" viewBox="0 0 52 52" fill="none">
            <circle cx="26" cy="26" r="24" stroke="#7aff00" strokeWidth="1.5" opacity=".6" />
            <circle cx="26" cy="26" r="10" stroke="#39ff14" strokeWidth="1" opacity=".7" />
            <circle cx="26" cy="26" r="4" fill="#39ff14" />
          </svg>
          <div style={{ position: "absolute", bottom: 1, right: 1, width: 10, height: 10, background: "#00e676", borderRadius: "50%", border: "2px solid var(--color-deep)" }} />
        </div>
        <div>
          <div style={{ fontSize: 14, fontWeight: 700, color: "var(--color-text)" }}>Chronos-Dev Bot</div>
          <div style={{ fontSize: 11, color: "var(--color-primary)" }}>● En línea · Respuesta inmediata</div>
        </div>
        <div style={{ marginLeft: "auto", fontSize: 11, color: "var(--color-muted)", textAlign: "right" }}>
          Powered by<br />
          <span style={{ color: "var(--color-primary)", fontFamily: "JetBrains Mono, monospace" }}>Claude AI</span>
        </div>
      </div>

      {/* MESSAGES */}
      <div style={{
        flex: 1,
        overflowY: "auto",
        padding: "20px 20px 8px",
        display: "flex",
        flexDirection: "column",
        gap: 14,
      }}>
        {messages.map(function (msg, i) {
          var isBot = msg.role === "assistant";
          return (
            <div key={i} className="msg-enter" style={{
              display: "flex",
              gap: 10,
              flexDirection: isBot ? "row" : "row-reverse",
              alignItems: "flex-end",
            }}>
              {isBot && (
                <div style={{ width: 28, height: 28, borderRadius: "50%", background: "var(--color-surface)", border: "1px solid var(--color-border)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <svg width="14" height="14" viewBox="0 0 52 52" fill="none">
                    <circle cx="26" cy="26" r="10" stroke="#7aff00" strokeWidth="1.5" />
                    <circle cx="26" cy="26" r="4" fill="#7aff00" />
                  </svg>
                </div>
              )}
              <div style={{
                maxWidth: "75%",
                background: isBot ? "rgba(255, 255, 255, 0.04)" : "rgba(122, 255, 0, 0.15)",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
                border: isBot ? "1px solid rgba(255, 255, 255, 0.08)" : "1px solid rgba(122, 255, 0, 0.3)",
                color: isBot ? "var(--color-text)" : "var(--color-primary)",
                padding: "12px 16px",
                borderRadius: isBot ? "0 16px 16px 16px" : "16px 0 16px 16px",
                fontSize: 13,
                lineHeight: 1.6,
                whiteSpace: "pre-wrap",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
              }}>
                {msg.content}
              </div>
            </div>
          );
        })}

        {/* TYPING INDICATOR */}
        {loading && (
          <div style={{ display: "flex", gap: 10, alignItems: "flex-end" }}>
            <div style={{ width: 28, height: 28, borderRadius: "50%", background: "var(--color-surface)", border: "1px solid var(--color-border)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <svg width="14" height="14" viewBox="0 0 52 52" fill="none">
                <circle cx="26" cy="26" r="10" stroke="#7aff00" strokeWidth="1.5" />
                <circle cx="26" cy="26" r="4" fill="#7aff00" />
              </svg>
            </div>
            <div style={{ background: "var(--color-surface)", padding: "12px 16px", borderRadius: "0 12px 12px 12px", display: "flex", gap: 5 }}>
              {[0, 1, 2].map(function (i) {
                return (
                  <div key={i} style={{
                    width: 7, height: 7, borderRadius: "50%", background: "var(--color-primary)",
                    animation: "typingDot 1.2s ease infinite",
                    animationDelay: (i * 0.2) + "s",
                    opacity: 0.4,
                  }} />
                );
              })}
            </div>
          </div>
        )}

        {/* WHATSAPP CTA */}
        {showWA && (
          <div style={{
            background: "#1a2e1a",
            border: "1px solid #25d36633",
            borderRadius: 8,
            padding: "16px 20px",
            textAlign: "center",
          }}>
            <div style={{ fontSize: 13, color: "var(--color-text)", marginBottom: 12, fontWeight: 500 }}>
              ¡Perfecto! Continúa la conversación con nuestro equipo 👇
            </div>
            <a
              href={waText}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                background: "#25d366",
                color: "#fff",
                padding: "12px 24px",
                borderRadius: 6,
                fontSize: 13,
                fontWeight: 700,
                textDecoration: "none",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Continuar en WhatsApp
            </a>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* INPUT */}
      <div style={{
        borderTop: "1px solid rgba(122, 255, 0, 0.1)",
        padding: "14px 16px",
        display: "flex",
        gap: 10,
        background: "rgba(0, 0, 0, 0.2)",
      }}>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={function (e) { setInput(e.target.value); }}
          onKeyDown={function (e) { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
          placeholder="Escribe tu mensaje..."
          style={{
            flex: 1,
            background: "rgba(0, 0, 0, 0.3)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            color: "var(--color-text)",
            fontSize: 13,
            padding: "12px 16px",
            borderRadius: 8,
            outline: "none",
            transition: "border 0.2s",
          }}
          onFocus={function (e) { e.target.style.border = "1px solid rgba(122, 255, 0, 0.5)"; }}
          onBlur={function (e) { e.target.style.border = "1px solid rgba(255, 255, 255, 0.1)"; }}
          disabled={loading}
        />
        <button
          onClick={send}
          disabled={loading || !input.trim()}
          style={{
            background: input.trim() && !loading ? "var(--color-primary)" : "rgba(255,255,255,0.05)",
            color: input.trim() && !loading ? "var(--color-deep)" : "rgba(255,255,255,0.3)",
            border: "none",
            width: 44,
            height: 44,
            borderRadius: 8,
            cursor: input.trim() && !loading ? "pointer" : "not-allowed",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.3s",
            flexShrink: 0,
            boxShadow: input.trim() && !loading ? "0 0 15px rgba(122, 255, 0, 0.4)" : "none",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M15.964.686a.5.5 0 00-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 00-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 00.886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 00-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z" />
          </svg>
        </button>
      </div>

      <style>{`
        @keyframes msgEnter {
          from { opacity: 0; transform: translateY(10px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .msg-enter {
          animation: msgEnter 0.3s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }
        @keyframes typingDot {
          0%, 100% { opacity: 0.3; transform: translateY(0); }
          50% { opacity: 1; transform: translateY(-3px); }
        }
      `}</style>
    </div>
  );
}
