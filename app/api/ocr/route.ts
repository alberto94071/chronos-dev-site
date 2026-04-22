import { NextRequest, NextResponse } from "next/server";

export const maxDuration = 30;

export async function POST(req: NextRequest) {
  try {
    var apiKey = process.env.GEMINI_API_KEY || "";
    if (!apiKey) {
      return NextResponse.json({ error: "API key not configured" }, { status: 500 });
    }

    var formData = await req.formData();
    var file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    var bytes = await file.arrayBuffer();
    var base64 = Buffer.from(bytes).toString("base64");
    var mimeType = file.type || "image/jpeg";

    // For PDFs we use a different prompt strategy
    var isPDF = mimeType === "application/pdf";

    var prompt = isPDF
      ? `Extrae TODO el texto de este documento PDF de forma exacta y ordenada. 
         Mantén la estructura original: párrafos, listas, tablas, encabezados.
         Si hay tablas, represéntalas con | separadores.
         No agregues comentarios propios, solo el texto extraído.`
      : `Extrae TODO el texto visible en esta imagen de forma exacta.
         Mantén el orden de lectura natural (de arriba a abajo, izquierda a derecha).
         Si hay tablas, represéntalas con | separadores.
         Si hay texto en diferentes idiomas, extráelos todos.
         No agregues comentarios propios, solo el texto extraído.`;

    var response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" + apiKey,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                { text: prompt },
                {
                  inline_data: {
                    mime_type: mimeType,
                    data: base64,
                  },
                },
              ],
            },
          ],
          generationConfig: {
            maxOutputTokens: 4096,
            temperature: 0,
          },
        }),
      }
    );

    if (!response.ok) {
      var errText = await response.text();
      console.error("Gemini OCR error:", errText);
      return NextResponse.json({ error: "OCR failed" }, { status: 500 });
    }

    var data = await response.json();
    var text: string =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No se pudo extraer texto del archivo.";

    return NextResponse.json({ text });
  } catch (error) {
    console.error("OCR route error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
