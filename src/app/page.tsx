"use client";

import { useState } from "react";
import { Sparkles, Loader2, PenTool, LayoutTemplate } from "lucide-react";
import ReactMarkdown from "react-markdown";

export default function Home() {
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState("Professional");
  const [isLoading, setIsLoading] = useState(false);
  const [generatedContent, setGeneratedContent] = useState("");

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;

    setIsLoading(true);
    setGeneratedContent("");

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, tone }),
      });

      const data = await response.json();
      if (response.ok) setGeneratedContent(data.content);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans p-8">
      <div className="max-w-4xl mx-auto">
        <header className="flex items-center gap-2 mb-12">
          <div className="bg-indigo-600 p-2 rounded text-white">
            <PenTool size={20} />
          </div>
          <h1 className="text-2xl font-bold">Writeflow</h1>
        </header>

        <form
          onSubmit={handleGenerate}
          className="bg-white p-4 rounded-xl shadow-lg border border-slate-200 flex gap-4 mb-12"
        >
          <input
            className="flex-1 outline-none text-lg"
            placeholder="Enter a topic (e.g., 'Benefits of Yoga')"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
          <select
            value={tone}
            onChange={(e) => setTone(e.target.value)}
            className="bg-slate-100 rounded px-3 outline-none"
          >
            <option>Professional</option>
            <option>Casual</option>
            <option>Witty</option>
          </select>
          <button
            disabled={isLoading}
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 disabled:opacity-50"
          >
            {isLoading ? <Loader2 className="animate-spin" /> : <Sparkles />}
          </button>
        </form>

        {generatedContent && (
          <article className="prose prose-slate max-w-none bg-white p-8 rounded-xl shadow border border-slate-200">
            <ReactMarkdown>{generatedContent}</ReactMarkdown>
          </article>
        )}
      </div>
    </div>
  );
}
