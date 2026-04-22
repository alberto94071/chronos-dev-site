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

    const apiKey = process.env.GROQ_API_KEY || "";

    const groqMessages = [
      { role: "system", content: SYSTEM_PROMPT },
      ...messages.map((m: { role: string; content: string }) => ({
        role: m.role === "assistant" ? "assistant" : "user",
        content: m.content,
      })),
    ];

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + apiKey,
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          messages: groqMessages,
          max_tokens: 300,
          temperature: 0.7,
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
      data.choices?.[0]?.message?.content ||
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
