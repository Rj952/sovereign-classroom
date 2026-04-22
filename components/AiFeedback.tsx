"use client";
import { useState } from "react";

type Props = {
  systemPrompt: string;
  userPrompt: string;
  disabled?: boolean;
  buttonLabel?: string;
  accent?: string;
  helperText?: string;
};

export default function AiFeedback({ systemPrompt, userPrompt, disabled, buttonLabel = "Get AI feedback", accent = "bg-sea", helperText }: Props) {
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  async function generate() {
    if (!userPrompt || userPrompt.trim().length < 10) {
      setError("Please complete the form above before generating feedback.");
      return;
    }
    setLoading(true);
    setError("");
    setOutput("");
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ system: systemPrompt, prompt: userPrompt }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || `Request failed (${res.status})`);
      setOutput(data.text || "(No response generated.)");
    } catch (e: any) {
      setError(e.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-8 rounded-2xl border border-ink/10 bg-white p-6 shadow-soft">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <p className="font-display text-xl text-ink">AI-generated reflection</p>
          <p className="text-sm text-ink/60 mt-1">{helperText || "Personalized feedback grounded in Caribbean pedagogical context."}</p>
        </div>
        <button onClick={generate} disabled={loading || disabled} className={`px-5 py-2.5 rounded-full text-sand text-sm font-medium ${accent} disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-95 transition-opacity no-print`}>
          {loading ? "Generating..." : buttonLabel}
        </button>
      </div>
      {error && (
        <div className="mt-4 p-3 rounded-lg bg-coral/10 border border-coral/30 text-sm text-ink">
          <strong>Error:</strong> {error}
        </div>
      )}
      {loading && (
        <div className="mt-4 flex items-center gap-2 text-ink/60 text-sm">
          <span className="inline-block w-2 h-2 rounded-full bg-sea animate-pulse" />
          <span>Claude is reading your inputs and reflecting...</span>
        </div>
      )}
      {output && (
        <div className="mt-5 p-5 rounded-xl bg-sand/40 border border-ink/5">
          <div className="prose-caribbean whitespace-pre-wrap text-ink/90 leading-relaxed text-[15px]">{output}</div>
        </div>
      )}
      <p className="mt-4 text-xs text-ink/45">Powered by Claude (Anthropic). Inputs are sent to Anthropic's API for generation only — nothing is stored.</p>
    </div>
  );
}

