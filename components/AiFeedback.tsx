"use client";
import { useState } from "react";
import { useIsland } from "@/components/IslandContext";
import { islandPromptContext } from "@/components/islands";

type Props = {
  systemPrompt: string;
  userPrompt: string;
  disabled?: boolean;
  buttonLabel?: string;
  accent?: string;
  helperText?: string;
};

// Claude replies in light Markdown. Render the common pieces (headings, lists, bold, italics)
// as React elements so readers never see raw ** or # marks, and no HTML is injected.
function renderInline(text: string): React.ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*|\*[^*\s][^*]*\*)/g).map((part, i) => {
    if (/^\*\*[^*]+\*\*$/.test(part)) return <strong key={i} className="font-bold text-ink">{part.slice(2, -2)}</strong>;
    if (/^\*[^*]+\*$/.test(part)) return <em key={i}>{part.slice(1, -1)}</em>;
    return part;
  });
}

function renderMarkdown(md: string): React.ReactNode[] {
  const blocks: React.ReactNode[] = [];
  let list: { ordered: boolean; items: string[] } | null = null;
  const flush = () => {
    if (!list) return;
    const items = list.items.map((it, i) => <li key={i}>{renderInline(it)}</li>);
    blocks.push(list.ordered
      ? <ol key={blocks.length} className="list-decimal pl-6 space-y-1.5">{items}</ol>
      : <ul key={blocks.length} className="list-disc pl-6 space-y-1.5">{items}</ul>);
    list = null;
  };
  for (const raw of md.split("\n")) {
    const line = raw.trim();
    const bullet = line.match(/^[-*•]\s+(.*)$/);
    const numbered = line.match(/^\d+[.)]\s+(.*)$/);
    if (bullet || numbered) {
      const ordered = !!numbered;
      if (list && list.ordered !== ordered) flush();
      if (!list) list = { ordered, items: [] };
      list.items.push((bullet || numbered)![1]);
      continue;
    }
    flush();
    if (!line || /^(-{3,}|\*{3,})$/.test(line)) continue;
    const heading = line.match(/^#{1,6}\s+(.*)$/);
    if (heading) {
      blocks.push(<p key={blocks.length} className="font-display font-extrabold text-ink text-base uppercase tracking-wide pt-1">{renderInline(heading[1].replace(/\*\*/g, ""))}</p>);
    } else {
      blocks.push(<p key={blocks.length}>{renderInline(line)}</p>);
    }
  }
  flush();
  return blocks;
}

export default function AiFeedback({ systemPrompt, userPrompt, disabled, buttonLabel = "Get AI feedback", accent = "bg-sea", helperText }: Props) {
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const { island } = useIsland();

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
        body: JSON.stringify({ system: systemPrompt + " " + islandPromptContext(island), prompt: userPrompt }),
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
          <p className="font-display font-extrabold text-xl text-ink">AI-generated reflection</p>
          <p className="text-sm text-ink/60 mt-1">{helperText || "Personalized feedback grounded in Caribbean pedagogical context."} Tailored to {island.name}.</p>
        </div>
        <button onClick={generate} disabled={loading || disabled} className={`min-h-[46px] px-5 rounded-full font-bold text-[15px] ${accent.includes("text-") ? "" : "text-white"} ${accent} disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-95 transition-opacity no-print`}>
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
          <div className="prose-caribbean text-ink/90 leading-relaxed text-[15px] space-y-3">{renderMarkdown(output)}</div>
        </div>
      )}
      <p className="mt-4 text-xs text-ink/45">Powered by Claude (Anthropic). Inputs are sent to Anthropic's API for generation only — nothing is stored.</p>
    </div>
  );
}

