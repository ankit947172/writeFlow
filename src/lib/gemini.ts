import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("Missing GEMINI_API_KEY environment variable");
}

export const genAI = new GoogleGenerativeAI(apiKey);

// We are using the specific model from your list
export const model = genAI.getGenerativeModel({
  model: "gemini-3-flash-preview",
});
