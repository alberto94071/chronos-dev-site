import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `Eres un experto en copywriting y marketing digital. Tu tarea es generar descripciones de productos para negocios en Guatemala y Latinoamérica.

REGLAS:
- Responde SIEMPRE en el idioma que te pidan (español o inglés)
- No uses emojis en las descripciones
- Las descripciones deben ser persuasivas, claras y orientadas a ventas
- Adapta el tono exactamente al solicitado
- No inventes características que no se mencionaron
- Cada variación debe ser distinta en estructura, no solo en longitud

FORMATO DE RESPUESTA OBLIGATORIO (usa exactamente estas etiquetas, sin texto adicional antes ni después):
[SHORT]Descripción corta de 1 oración, 20-30 palabras, ideal para badges.[/SHORT]
[MEDIUM]Descripción media de 2-3 oraciones, 50-80 palabras, ideal para tarjetas de producto.[/MEDIUM]
[LONG]Descripción larga de 4-6 oraciones, 120-160 palabras, ideal para página de detalle.[/LONG]`;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { productName, category, features, tone, platform, language } = body;

    if (!productName || !features) {
      return NextResponse.json({ error: "Faltan datos del producto" }, { status: 400 });
    }

    const apiKey = process.env.GROQ_API_KEY || "";
    if (!apiKey) {
      return NextResponse.json({ error: "API no configurada" }, { status: 500 });
    }

    const lang = language === "en" ? "English" : "Español";
    const userPrompt = `Genera 3 variaciones de descripción para este producto:

Nombre: ${productName}
Categoría: ${category || "General"}
Características / detalles: ${features}
Tono: ${tone || "Profesional"}
Plataforma destino: ${platform || "Tienda en línea"}
Idioma de respuesta: ${lang}

Recuerda: usa EXACTAMENTE las etiquetas [SHORT]...[/SHORT], [MEDIUM]...[/MEDIUM] y [LONG]...[/LONG]. Sin texto adicional antes ni después.`;

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: userPrompt },
        ],
        max_tokens: 1000,
        temperature: 0.75,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error("Groq error:", response.status, err);
      return NextResponse.json({ error: "Error al generar descripciones" }, { status: 502 });
    }

    const data = await response.json();
    const raw: string = data.choices?.[0]?.message?.content || "";

    const extract = (tag: string) => {
      const m = raw.match(new RegExp(`\\[${tag}\\]([\\s\\S]*?)\\[\\/${tag}\\]`, "i"));
      return m ? m[1].trim() : "";
    };

    const short = extract("SHORT");
    const medium = extract("MEDIUM");
    const long = extract("LONG");

    if (!short || !medium || !long) {
      console.error("Missing tags in model response:", raw);
      return NextResponse.json({ error: "Respuesta incompleta del modelo" }, { status: 500 });
    }

    return NextResponse.json({ short, medium, long });
  } catch (error) {
    console.error("Descriptions error:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
