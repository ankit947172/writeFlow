// src/app/api/generate/route.ts
import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "API Key is missing" },
        { status: 500 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);

    // ✅ UPDATED: Using the specific model from your allowed list
    // Use the Flash Experimental model (High free tier limits)
    // Use the generic 'latest' alias which is usually most permissive for free keys
    const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

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
  } catch (error: any) {
    console.error("❌ Generator Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to generate content" },
      { status: 500 }
    );
  }
}
