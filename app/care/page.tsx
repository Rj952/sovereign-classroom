"use client";
import { useMemo, useState } from "react";
import Section from "@/components/Section";
import Likert from "@/components/Likert";
import ResultBand from "@/components/ResultBand";
import AiFeedback from "@/components/AiFeedback";

type Dim = { key: "consider" | "analyse" | "reflect" | "evaluate"; title: string; question: string; examples: string[]; };

const dims: Dim[] = [
  { key: "consider", title: "Consider", question: "Is the topic worth thinking about — in a way that matters to this student, in this place, at this moment?", examples: ["Anchors in a problem the student will actually face in Caribbean professional life", "Connects to community, family, place, or lived experience", "Asks a question the student has a genuine stake in answering"] },
  { key: "analyse", title: "Analyse", question: "Are we asking students to break apart complexity — or just recall and reproduce?", examples: ["Requires decomposing a case, text, dataset, or phenomenon into parts", "Demands comparison across competing explanations or frameworks", "Cannot be satisfied by a well-written summary"] },
  { key: "reflect", title: "Reflect", question: "Are we asking students to examine their own assumptions and growth?", examples: ["Student must name a prior belief and how their thinking shifted", "Positions the student inside the argument, not above it", "Invites acknowledgement of uncertainty, tension, or change"] },
  { key: "evaluate", title: "Evaluate", question: "Are we asking students to make reasoned judgements, with evidence, in context?", examples: ["Student must choose between options and defend the choice", "Weighs trade-offs rather than treating one answer as obvious", "Contextualises the judgement in specific Caribbean realities"] },
];

export default function CAREPage() {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [title, setTitle] = useState("");
  const score = useMemo(() => { const v = dims.map((d) => answers[d.key] ?? 0); return v.reduce((a, b) => a + b, 0) / (dims.length * 4); }, [answers]);
  const answered = Object.keys(answers).length;
  const complete = answered === dims.length;
  const weakest = useMemo(() => { if (!complete) return null; let m: Dim | null = null; let mv = 5; for (const d of dims) { const v = answers[d.key] ?? 0; if (v < mv) { mv = v; m = d; } } return m; }, [answers, complete]);

  const aiPrompt = useMemo(() => {
    const lines = dims.map(d => `- ${d.title}: ${answers[d.key] ?? 0}/4`).join("
");
    return `A Caribbean university faculty member has used the CARE framework (Consider, Analyse, Reflect, Evaluate) to diagnose how AI-replaceable an existing assessment is. Higher scores = more irreducibly human thinking.

Assessment${title ? `: "${title}"` : ""}.

Scores:
${lines}
Overall AI-resistance: ${Math.round(score*100)}%

In 3 short paragraphs, give them: (1) what these scores reveal about how a large language model could complete this task, (2) the SINGLE most-impactful redesign move targeting their weakest dimension — make it concrete and Caribbean-anchored, (3) a sample reworded prompt sentence they could try this semester. Be direct, kind, and specific.`;
  }, [answers, title, score]);

  return (
    <div className="max-w-3xl mx-auto px-5 py-10">
      <Section eyebrow="CARE · Consider · Analyse · Reflect · Evaluate" accent="text-palm" title="What kind of thinking does this assessment actually demand?" subtitle="Name an assessment you currently give. Score it honestly. The CARE diagnostic tells you — in under three minutes — how much of the thinking an AI system can do for your students." />
      <label className="block mb-6"><span className="text-xs uppercase tracking-wider text-ink/60">Assessment being diagnosed (optional)</span><input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g., ECON 2001 mid-term essay" className="mt-1 w-full rounded-xl border border-ink/15 bg-white p-3 text-ink focus:border-palm" /></label>
      <div className="space-y-6">
        {dims.map((d, i) => (
          <article key={d.key} className="rounded-2xl bg-white border border-ink/10 shadow-soft p-6">
            <div className="flex items-baseline gap-3"><span className="text-palm font-display text-2xl">{i + 1}</span><h2 className="font-display text-xl text-ink">{d.title}</h2></div>
            <p className="mt-2 text-ink/85">{d.question}</p>
            <ul className="mt-3 space-y-1 text-sm text-ink/65 list-disc pl-5">{d.examples.map((ex, j) => (<li key={j}>{ex}</li>))}</ul>
            <Likert name={d.title} value={answers[d.key] ?? 0} onChange={(v) => setAnswers({ ...answers, [d.key]: v })} lowLabel="Minimal / AI can handle this" highLabel="Strong / requires a human" />
          </article>
        ))}
      </div>
      {answered > 0 && (
        <section className="mt-10">
          <h2 className="font-display text-2xl mb-4 text-ink">{complete ? `AI-replaceability reading${title ? ` — ${title}` : ""}` : `Preliminary reading (${answered}/4)`}</h2>
          <ResultBand score={score} bands={[
            { min: 0, tone: "coral", label: "A large language model could largely complete this", message: "Redesign around the weakest dimension." },
            { min: 35, tone: "sun", label: "Partially AI-resistant", message: "Strengthen the weakest dimension by anchoring to Caribbean context." },
            { min: 65, tone: "palm", label: "Substantially human work", message: "Protect what works." },
            { min: 85, tone: "sea", label: "Irreducibly human", message: "This measures what students carry. Document it; share it." },
          ]} />
          {complete && weakest && (
            <div className="mt-6 rounded-2xl bg-ink text-sand p-5">
              <p className="uppercase tracking-wider text-xs opacity-70">Weakest dimension</p>
              <p className="font-display text-2xl mt-1">{weakest.title}</p>
              <p className="mt-2 opacity-90">Start the redesign here. Rewrite the task so {weakest.title.toLowerCase()} becomes unavoidable.</p>
            </div>
          )}
          {complete && (
            <AiFeedback systemPrompt="You are a Caribbean assessment design expert and university teacher. You give faculty short, concrete advice rooted in Caribbean realities (CXC traditions, regional examples, multilingual student populations). You never give generic feedback." userPrompt={aiPrompt} accent="bg-palm" buttonLabel="Generate CARE redesign with AI" helperText="Claude will read your CARE scores and suggest the highest-impact redesign move." />
          )}
          <p className="mt-6 text-xs text-ink/60 italic">CARE © Dr. Rohan Jowallah, 2025. Cite explicitly in any institutional use.</p>
        </section>
      )}
    </div>
  );
}

