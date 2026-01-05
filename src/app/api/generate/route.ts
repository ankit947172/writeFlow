import { NextRequest, NextResponse } from "next/server";
import { model } from "../../../lib/gemini";

export async function POST(req: NextRequest) {
  try {
    const { topic, tone } = await req.json();

    if (!topic) {
      return NextResponse.json({ error: "Topic is required" }, { status: 400 });
    }

    const prompt = `
      Act as a Senior SEO Content Strategist.
      Task: Write a comprehensive, SEO-optimized blog post about "${topic}".
      Tone: ${tone || "Professional"}.
      Requirements:
      1. Catchy Title (H1).
      2. Engaging Introduction.
      3. Proper Markdown (H2, H3, bullets).
      4. Conclusion.
      Format output in clean Markdown.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ content: text });
  } catch (error) {
    console.error("Gemini Error:", error);
    return NextResponse.json({ error: "Failed to generate" }, { status: 500 });
  }
}
