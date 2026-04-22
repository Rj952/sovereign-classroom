"use client";
import { useMemo, useState } from "react";
import Section from "@/components/Section";
import Likert from "@/components/Likert";
import ResultBand from "@/components/ResultBand";
import AiFeedback from "@/components/AiFeedback";

type Dim = { key: "accuracy" | "completeness" | "relevance" | "equity"; title: string; question: string; probes: string[]; lowFix: string; };

const dims: Dim[] = [
  { key: "accuracy", title: "Accuracy", question: "Does this assessment measure what we claim — or does it also measure familiarity with AI tools, internet access, or first-language fluency in academic English?", probes: ["Would a multilingual student writing in Caribbean English be penalised for style rather than thinking?", "Is an AI-detection score treated as evidence of misconduct rather than a flag for conversation?", "Does the rubric measure the intended competency, or proxies for it?"], lowFix: "Replace the AI-detection flag with a brief oral conversation. Revise rubric language so Caribbean English is explicitly acceptable." },
  { key: "completeness", title: "Completeness", question: "Does it capture the full range of competencies we value — including oral tradition, community knowledge, and embodied expertise?", probes: ["Can a student with strong oral reasoning and weak written polish demonstrate mastery?", "Is community or family knowledge treated as legitimate evidence?", "Is written text the only mode of assessment, or are alternatives valid?"], lowFix: "Add a viva voce, process portfolio, or community-engaged component." },
  { key: "relevance", title: "Relevance", question: "Is this anchored in problems meaningful to Caribbean students — or do we default to European or North American exemplars as if they were universal?", probes: ["Are the cases, datasets, and examples from the Caribbean?", "Would a student from the region feel this task speaks to their professional future?", "Do cited authors include Caribbean scholars?"], lowFix: "Swap out one imported case for a Caribbean equivalent. Add a required Caribbean citation." },
  { key: "equity", title: "Equity", question: "Who is most likely to be disadvantaged — and is that a product of genuine learning differences or structural inequities in the design itself?", probes: ["Does the task assume reliable internet, paid software, or a quiet study environment?", "Are students with caring responsibilities, part-time work, or disability treated fairly in time allocation?", "Does the scoring rubric translate cultural variation as deficit?"], lowFix: "Offer offline-compatible options. Extend timeframes where structural context warrants." },
];

export default function ACREPage() {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [title, setTitle] = useState("");
  const [paste, setPaste] = useState("");
  const score = useMemo(() => { const v = dims.map((d) => answers[d.key] ?? 0); return v.reduce((a, b) => a + b, 0) / (dims.length * 4); }, [answers]);
  const answered = Object.keys(answers).length;
  const complete = answered === dims.length;
  const weaknesses = useMemo(() => dims.filter((d) => (answers[d.key] ?? 5) <= 2).sort((a, b) => (answers[a.key] ?? 0) - (answers[b.key] ?? 0)), [answers]);

  const aiPrompt = useMemo(() => {
    const lines = dims.map(d => `- ${d.title}: ${answers[d.key] ?? 0}/4${notes[d.key] ? ` — note: ${notes[d.key]}` : ""}`).join("
");
    return `A Caribbean university faculty member has audited an assessment using the ACRE framework (Accuracy, Completeness, Relevance, Equity). Higher = stronger.

Assessment${title ? `: "${title}"` : ""}${paste ? `\n\nPrompt text they shared:\n${paste}` : ""}

Scores:
${lines}
Overall: ${Math.round(score*100)}%

In 3 short paragraphs, give them: (1) what these scores reveal about who is being disadvantaged by this design, (2) the SINGLE highest-impact equity revision they should make first — concrete and Caribbean-anchored, (3) one specific rubric line they could rewrite, with sample wording. Be candid, kind, specific.`;
  }, [answers, notes, title, paste, score]);

  return (
    <div className="max-w-3xl mx-auto px-5 py-10">
      <Section eyebrow="ACRE · Accuracy · Completeness · Relevance · Equity" accent="text-coral" title="Audit one assessment. This semester." subtitle="You do not need to redesign every assessment tonight. Apply ACRE to one. Just one. See what it shows you. That discomfort is the beginning of the redesign." />
      <div className="grid md:grid-cols-2 gap-4 mb-8">
        <label className="block"><span className="text-xs uppercase tracking-wider text-ink/60">Assessment name</span><input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g., HIST 3020 Final Essay" className="mt-1 w-full rounded-xl border border-ink/15 bg-white p-3 text-ink focus:border-coral" /></label>
        <label className="block"><span className="text-xs uppercase tracking-wider text-ink/60">Paste the prompt (optional)</span><textarea value={paste} onChange={(e) => setPaste(e.target.value)} rows={3} className="mt-1 w-full rounded-xl border border-ink/15 bg-white p-3 text-sm text-ink focus:border-coral" /></label>
      </div>
      <div className="space-y-6">
        {dims.map((d, i) => (
          <article key={d.key} className="rounded-2xl bg-white border border-ink/10 shadow-soft p-6">
            <div className="flex items-baseline gap-3"><span className="text-coral font-display text-2xl">{i + 1}</span><h2 className="font-display text-xl text-ink">{d.title}</h2></div>
            <p className="mt-2 text-ink/85">{d.question}</p>
            <ul className="mt-3 space-y-1 text-sm text-ink/65 list-disc pl-5">{d.probes.map((p, j) => (<li key={j}>{p}</li>))}</ul>
            <Likert name={d.title} value={answers[d.key] ?? 0} onChange={(v) => setAnswers({ ...answers, [d.key]: v })} lowLabel="Weak" highLabel="Strong" />
            <label className="block mt-4"><span className="text-xs uppercase tracking-wider text-ink/60">Evidence / note (optional)</span><textarea value={notes[d.key] ?? ""} onChange={(e) => setNotes({ ...notes, [d.key]: e.target.value })} rows={2} className="mt-1 w-full rounded-xl border border-ink/15 bg-sand/40 p-3 text-sm text-ink focus:border-coral focus:bg-white" /></label>
          </article>
        ))}
      </div>
      {answered > 0 && (
        <section className="mt-10">
          <h2 className="font-display text-2xl mb-4 text-ink">{complete ? `Equity audit${title ? ` — ${title}` : ""}` : `Preliminary reading (${answered}/4)`}</h2>
          <ResultBand score={score} bands={[
            { min: 0, tone: "coral", label: "Structural redesign needed", message: "Treat this as urgent redesign." },
            { min: 35, tone: "sun", label: "Significant revision warranted", message: "Target lowest-scoring dimensions." },
            { min: 65, tone: "palm", label: "Solid, with targeted refinements", message: "Sharpen one dimension per semester." },
            { min: 85, tone: "sea", label: "Caribbean-authentic assessment", message: "Document and share." },
          ]} />
          {complete && weaknesses.length > 0 && (
            <div className="mt-6 rounded-2xl bg-ink text-sand p-6">
              <p className="uppercase tracking-wider text-xs opacity-70 mb-3">Redesign starting points</p>
              <ol className="space-y-4">{weaknesses.map((w, i) => (<li key={w.key}><p className="font-display text-lg">{i + 1}. {w.title}</p><p className="text-sand/85 text-sm mt-1">{w.lowFix}</p></li>))}</ol>
            </div>
          )}
          {complete && (
            <AiFeedback systemPrompt="You are a Caribbean equity auditor for academic assessments. You read assessment audits and recommend the single highest-impact equity revision, with sample rubric wording. You always reference the user's actual scores and any pasted prompt text." userPrompt={aiPrompt} accent="bg-coral" buttonLabel="Generate ACRE redesign with AI" helperText="Claude will read your audit and propose one concrete rubric rewrite." />
          )}
          <p className="mt-6 text-xs text-ink/60 italic">ACRE © Dr. Rohan Jowallah, 2025. Cite explicitly in any institutional use.</p>
        </section>
      )}
    </div>
  );
}

