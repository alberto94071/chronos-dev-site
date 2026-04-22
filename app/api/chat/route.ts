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
    console.log("API Key present:", !!apiKey, "Length:", apiKey.length);

    // Array para almacenar el historial validado
    const geminiMessages = [];
    let lastRole = "";

    // Iteramos para agrupar roles repetidos y asegurar el orden user -> model
    for (const m of messages) {
      const role = m.role === "assistant" ? "model" : "user";

      // Evitar que el historial empiece con 'model'
      if (geminiMessages.length === 0 && role === "model") continue;

      // Si el rol es igual al anterior, concatenamos el texto al último mensaje
      if (role === lastRole) {
        geminiMessages[geminiMessages.length - 1].parts[0].text += `\n\n${m.content}`;
      } else {
        // Si el rol es diferente, lo agregamos como un nuevo bloque
        geminiMessages.push({
          role: role,
          parts: [{ text: m.content }],
        });
        lastRole = role;
      }
    }

    // Necesitamos al menos un mensaje válido
    if (geminiMessages.length === 0) {
      return NextResponse.json({ text: "¡Hola! ¿En qué puedo ayudarte hoy?" });
    }

    console.log("Sending to Gemini, valid messages count:", geminiMessages.length);
    
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] }, // Corregido a camelCase
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