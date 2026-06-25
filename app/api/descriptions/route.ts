import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `Eres un experto en copywriting y marketing digital. Tu tarea es generar descripciones de productos para negocios en Guatemala y Latinoamérica.

REGLAS:
- Responde SIEMPRE en el idioma que te pidan (español o inglés)
- No uses emojis en las descripciones
- Las descripciones deben ser persuasivas, claras y orientadas a ventas
- Adapta el tono exactamente al solicitado
- No inventes características que no se mencionaron
- Cada variación debe ser distinta en estructura, no solo en longitud

FORMATO DE RESPUESTA (JSON estricto, sin markdown):
{
  "short": "Descripción corta de 1 oración (20-30 palabras). Ideal para badges o etiquetas.",
  "medium": "Descripción media de 2-3 oraciones (50-80 palabras). Ideal para tarjetas de producto.",
  "long": "Descripción larga de 4-6 oraciones (120-160 palabras). Ideal para página de detalle del producto."
}`;

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

Recuerda: responde SOLO con el JSON, sin texto adicional ni markdown.`;

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "openai/gpt-oss-20b",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: userPrompt },
        ],
        max_tokens: 700,
        temperature: 0.75,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error("Groq error:", response.status, err);
      return NextResponse.json({ error: "Error al generar descripciones" }, { status: 502 });
    }

    const data = await response.json();
    let raw = data.choices?.[0]?.message?.content || "";

    // Strip markdown code fences if the model wraps the JSON
    raw = raw.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "").trim();

    // Extract JSON object even if there's surrounding text
    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.error("No JSON found in response:", raw);
      return NextResponse.json({ error: "Error al procesar respuesta" }, { status: 500 });
    }

    let parsed: { short?: string; medium?: string; long?: string };
    try {
      parsed = JSON.parse(jsonMatch[0]);
    } catch {
      console.error("JSON parse error:", jsonMatch[0]);
      return NextResponse.json({ error: "Error al procesar respuesta" }, { status: 500 });
    }

    if (!parsed.short || !parsed.medium || !parsed.long) {
      return NextResponse.json({ error: "Respuesta incompleta del modelo" }, { status: 500 });
    }

    return NextResponse.json(parsed);
  } catch (error) {
    console.error("Descriptions error:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
