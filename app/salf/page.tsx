"use client";
import { useMemo, useState } from "react";
import Section from "@/components/Section";
import Likert from "@/components/Likert";
import ResultBand from "@/components/ResultBand";
import AiFeedback from "@/components/AiFeedback";

type Domain = { key: "sovereignty" | "accountability" | "literacy" | "fairness" | "sustainability"; title: string; question: string; prompt: string; guidance: string; };

const domains: Domain[] = [
  { key: "sovereignty", title: "Sovereignty", question: "Does this policy reflect our institutional values and Caribbean pedagogical traditions?", prompt: "Think about where this policy came from. Was it written here? Adapted from a North American or European template?", guidance: "Score high when the policy explicitly names Caribbean values and cites Caribbean scholars." },
  { key: "accountability", title: "Accountability", question: "Who is responsible when AI-assisted assessments produce inequitable outcomes?", prompt: "Trace the chain: if a student is wrongly flagged, who is the human accountable? Name them.", guidance: "Score high when the policy names specific offices and appeals processes." },
  { key: "literacy", title: "Literacy", question: "Are faculty supported to understand how AI tools actually work before designing policies about them?", prompt: "Have we given faculty the time, training, and resources to understand these systems?", guidance: "Score high when the policy is paired with a funded faculty development programme." },
  { key: "fairness", title: "Fairness", question: "Does this policy distribute the benefits and burdens of AI equitably?", prompt: "Who bears the cost of implementation errors? Who has easy access to approved tools?", guidance: "Score high when the policy explicitly addresses language, access, disability, and economic differences." },
  { key: "sustainability", title: "Sustainability", question: "Is this a policy we can maintain — or are we building an arms race we cannot win?", prompt: "Is the institution committing resources it will actually have in three years?", guidance: "Score high when the policy invests in pedagogy, not perpetual vendor subscription." },
];

export default function SALFPage() {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [notes, setNotes] = useState<Record<string, string>>({});
  const score = useMemo(() => { const v = domains.map((d) => answers[d.key] ?? 0); return v.reduce((a, b) => a + b, 0) / (domains.length * 4); }, [answers]);
  const answered = Object.keys(answers).length;
  const complete = answered === domains.length;

  const aiPrompt = useMemo(() => {
    const lines = domains.map(d => `- ${d.title}: ${answers[d.key] ?? 0}/4${notes[d.key] ? ` — note: ${notes[d.key]}` : ""}`).join("
");
    return `A faculty member is auditing an AI assessment policy at their Caribbean higher education institution using the SALF framework (Sovereignty, Accountability, Literacy, Fairness, Sustainability). Here are their scores (0=not at all, 4=fully):

${lines}

Overall score: ${Math.round(score*100)}%

In 3-4 short paragraphs, give them: (1) your specific read on what the scores reveal about the policy's sovereignty posture, (2) the ONE domain they should strengthen first with a concrete, institutionally-actionable suggestion rooted in Caribbean context, (3) one question they should raise at their next faculty meeting. Be warm but direct. Cite specific Caribbean examples where helpful.`;
  }, [answers, notes, score]);

  return (
    <div className="max-w-3xl mx-auto px-5 py-10">
      <Section eyebrow="SALF · Sovereign AI Leadership Framework" accent="text-sea" title="A policy check, not a compliance exercise." subtitle="Before you adopt any AI assessment policy — whether written at home or arriving pre-packaged from abroad — run it through these five foundational questions." />
      <div className="space-y-6">
        {domains.map((d, i) => (
          <article key={d.key} className="rounded-2xl bg-white border border-ink/10 shadow-soft p-6">
            <div className="flex items-baseline gap-3"><span className="text-sea font-display text-2xl">{i + 1}</span><h2 className="font-display text-xl text-ink">{d.title}</h2></div>
            <p className="mt-2 text-ink/85">{d.question}</p>
            <p className="mt-1 text-sm text-ink/60">{d.prompt}</p>
            <Likert name={d.title} value={answers[d.key] ?? 0} onChange={(v) => setAnswers({ ...answers, [d.key]: v })} lowLabel="Not at all" highLabel="Fully" />
            <details className="mt-3 text-sm text-ink/70"><summary className="cursor-pointer hover:text-sea">Guidance for scoring</summary><p className="mt-2">{d.guidance}</p></details>
            <label className="block mt-4"><span className="text-xs uppercase tracking-wider text-ink/60">Evidence / note (optional)</span><textarea value={notes[d.key] ?? ""} onChange={(e) => setNotes({ ...notes, [d.key]: e.target.value })} rows={2} className="mt-1 w-full rounded-xl border border-ink/15 bg-sand/40 p-3 text-sm text-ink focus:border-sea focus:bg-white" /></label>
          </article>
        ))}
      </div>
      {answered > 0 && (
        <section className="mt-10">
          <h2 className="font-display text-2xl mb-4 text-ink">{complete ? "Your SALF reading" : `Preliminary reading (${answered}/5)`}</h2>
          <ResultBand score={score} bands={[
            { min: 0, tone: "coral", label: "Sovereignty surrendered", message: "This policy is primarily executing someone else's framework. Before adopting, negotiate." },
            { min: 35, tone: "sun", label: "Partial sovereignty", message: "There are Caribbean fingerprints on this policy, but also significant imports." },
            { min: 65, tone: "palm", label: "Approaching sovereignty", message: "This policy shows genuine engagement with Caribbean traditions. Strengthen the weakest domain." },
            { min: 85, tone: "sea", label: "Sovereign practice", message: "This policy is a Caribbean framework in its own right. Consider publishing it." },
          ]} />
          {complete && (
            <AiFeedback systemPrompt="You are a Caribbean higher education policy advisor specializing in AI governance. You are grounded in Caribbean pedagogical traditions, intimately familiar with Jamaica, Trinidad, Barbados, Guyana, and other regional institutions. You give concrete, actionable advice that respects institutional realities (budget constraints, small-island contexts, diaspora student populations). Never generic." userPrompt={aiPrompt} accent="bg-sea" buttonLabel="Generate SALF advice with AI" helperText="Claude will read your scores and notes, then give you a targeted Caribbean-grounded response." />
          )}
          <p className="mt-6 text-xs text-ink/60 italic">SALF © Dr. Rohan Jowallah, 2026. Cite explicitly in any institutional use.</p>
        </section>
      )}
    </div>
  );
}

