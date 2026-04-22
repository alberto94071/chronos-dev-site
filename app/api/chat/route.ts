import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `Eres el asistente virtual de Chronos-Dev, una agencia de software y automatización con IA basada en Guatemala City.

Tu trabajo es:
1. Saludar al visitante de forma amigable
2. Entender qué necesita su negocio
3. Dar información útil y concisa sobre los servicios de Chronos-Dev
4. Cuando el visitante muestra interés real, invitarlo a continuar la conversación por WhatsApp para darle un presupuesto personalizado

SERVICIOS QUE OFRECE CHRONOS-DEV:
- Tienda en línea completa (E-commerce): desde Q6,000 — catálogo, checkout WhatsApp o tarjeta, panel admin
- Landing page profesional: desde Q2,500 — rápida, responsive, optimizada para conversión
- Chatbot con IA: desde Q3,000 — asistente 24/7 para tu web o WhatsApp usando Claude API
- Automatización Python: precio variable — OCR, Google Sheets, flujos de trabajo
- Mantenimiento mensual: precio variable — soporte, actualizaciones, optimización

REGLAS:
- Responde SIEMPRE en español
- Sé directo, amable y profesional
- Máximo 3-4 oraciones por respuesta
- Cuando el visitante quiera precio exacto o esté listo para contratar, dile que lo mandarás a WhatsApp
- NO inventes precios específicos más allá de los rangos dados
- Si preguntan algo que no es sobre los servicios, redirecciona amablemente
- Cuando sea momento de pasar a WhatsApp, incluye exactamente este texto al final: [WHATSAPP_CTA]

EJEMPLOS DE CUÁNDO USAR [WHATSAPP_CTA]:
- Cuando piden presupuesto exacto
- Cuando dicen "quiero contratar" o "me interesa"
- Cuando ya explicaste el servicio y el visitante pregunta cómo proceder
- Después de 4-5 mensajes de conversación productiva`;

export async function POST(req: NextRequest) {
  try {
    var body = await req.json();
    var { messages } = body;

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Invalid messages" }, { status: 400 });
    }

    var response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY || "",
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 300,
        system: SYSTEM_PROMPT,
        messages: messages,
      }),
    });

    if (!response.ok) {
      var err = await response.text();
      console.error("Anthropic error:", err);
      return NextResponse.json({ error: "API error" }, { status: 500 });
    }

    var data = await response.json();
    var text = data.content?.[0]?.text || "Lo siento, hubo un error. Por favor escríbenos directamente a WhatsApp.";

    return NextResponse.json({ text });
  } catch (error) {
    console.error("Chat error:", error);
    return NextResponse.json(
      { text: "Hubo un problema. Por favor contáctanos directamente por WhatsApp 👇" },
      { status: 200 }
    );
  }
}
