import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `Eres el asistente virtual de Chronos-Dev, una agencia de software y automatización con IA basada en Guatemala City.

Tu trabajo es:
1. Saludar al visitante de forma amigable
2. Entender qué necesita su negocio
3. Dar información útil y concisa sobre los servicios de Chronos-Dev
4. Cuando el visitante muestra interés real, invitarlo a continuar la conversación por WhatsApp

SERVICIOS:
- Tienda en línea completa (E-commerce): desde Q6,000
- Landing page profesional: desde Q2,500
- Chatbot con IA: desde Q3,000
- Automatización Python: precio variable
- Mantenimiento mensual: precio variable

REGLAS:
- Responde SIEMPRE en español
- Sé directo, amable y profesional
- Máximo 3-4 oraciones por respuesta
- NO inventes precios más allá de los rangos dados
- Cuando el visitante quiera precio exacto o contratar, incluye [WHATSAPP_CTA] al final`;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { messages } = body;

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Invalid messages" }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY || "";

    // Convert to Gemini format — assistant → model
    let geminiMessages = messages.map((m: { role: string; content: string }) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

    // Fix 1: Remove leading model messages — Gemini requires starting with "user"
    while (geminiMessages.length > 0 && geminiMessages[0].role === "model") {
      geminiMessages.shift();
    }

    // Fix 2: Merge consecutive same-role messages — Gemini requires strict alternation
    const merged: { role: string; parts: { text: string }[] }[] = [];
    for (const msg of geminiMessages) {
      const last = merged[merged.length - 1];
      if (last && last.role === msg.role) {
        // Append to previous message instead of adding duplicate role
        last.parts[0].text += "\n" + msg.parts[0].text;
      } else {
        merged.push({ ...msg, parts: [{ text: msg.parts[0].text }] });
      }
    }
    geminiMessages = merged;

    if (geminiMessages.length === 0) {
      return NextResponse.json({ text: "¡Hola! ¿En qué puedo ayudarte hoy?" });
    }

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite:generateContent?key=" + apiKey,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          // Fix 3: correct property name is systemInstruction (camelCase)
          systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
          contents: geminiMessages,
          generationConfig: { maxOutputTokens: 300, temperature: 0.7 },
        }),
      }
    );

    if (!response.ok) {
      const err = await response.text();
      console.error("Gemini error status:", response.status, "body:", err);
      return NextResponse.json(
        { text: "Hubo un problema. Por favor contáctanos directamente por WhatsApp 👇" },
        { status: 200 }
      );
    }

    const data = await response.json();
    const text: string =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Lo siento, hubo un error. Escríbenos directamente a WhatsApp.";

    return NextResponse.json({ text });
  } catch (error) {
    console.error("Chat error:", error);
    return NextResponse.json(
      { text: "Hubo un problema. Contáctanos directamente por WhatsApp 👇" },
      { status: 200 }
    );
  }
}
