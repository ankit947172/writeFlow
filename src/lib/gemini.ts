// src/lib/gemini.ts
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.error("❌ API Key is MISSING in .env.local");
}

const genAI = new GoogleGenerativeAI(apiKey || "DUMMY_KEY");

// FIX: 'gemini-pro' is the most reliable model for standard API keys
export const model = genAI.getGenerativeModel({
  model: "gemini-pro",
});
