"use client";
import { useMemo, useState } from "react";
import Section from "@/components/Section";
import AiFeedback from "@/components/AiFeedback";

type Field = { key: "context" | "role" | "action" | "format" | "threshold"; title: string; prompt: string; placeholder: string; hint: string; example: string; };

const fields: Field[] = [
  { key: "context", title: "Context", prompt: "Where does this task take place? Whose problem is being solved? Name the specific Caribbean setting.", placeholder: "e.g., Advising the Jamaican Ministry of Finance.", hint: "A real institution, a real policy window, a real community.", example: "Advising the Jamaican Ministry of Finance on lessons from 2008 as they develop a national digital currency policy." },
  { key: "role", title: "Role", prompt: "Who is the student being asked to become?", placeholder: "e.g., An economic analyst with expertise in Caribbean financial systems.", hint: "Roles invite stance, voice, and authority.", example: "An economic analyst with expertise in Caribbean financial systems and SIDS economies." },
  { key: "action", title: "Action", prompt: "What, exactly, is the student being asked to produce?", placeholder: "e.g., Draft a 1,500-word policy brief.", hint: "Action verbs with teeth: advise, decide, defend, reconcile.", example: "Draft a 1,500-word policy brief identifying three lessons from 2008 and applying each to Jamaica\u0027s digital currency risk profile." },
  { key: "format", title: "Format", prompt: "What shape must the work take? Format signals the audience and the stakes.", placeholder: "e.g., Policy brief with executive summary.", hint: "Policy briefs, ministerial memos, oral defences.", example: "Policy brief with executive summary, three-lesson analysis, evidence-based recommendations." },
  { key: "threshold", title: "Threshold", prompt: "What must be true of the work for it to count? This is the AI-resistance clause.", placeholder: "e.g., Must draw on Caribbean data, cite Caribbean sources.", hint: "Threshold separates a task AI can fake from a task requiring lived knowledge.", example: "Must draw on Caribbean-specific data, cite at least two Caribbean scholars, and reflect Jamaica\u0027s regulatory history." },
];

export default function CRAFTPage() {
  const [values, setValues] = useState<Record<string, string>>({});
  const [step, setStep] = useState(0);
  const [showExample, setShowExample] = useState(false);
  const field = fields[step];
  const isLast = step === fields.length - 1;
  const totalFilled = fields.filter((fe) => (values[fe.key] ?? "").trim().length > 20).length;
  const complete = totalFilled === fields.length;
  const aiResistanceScore = useMemo(() => {
    const signals = ["caribbean","jamaica","trinidad","barbados","guyana","bahamas","haiti","cite","local","community","lived","specific","oral","defence","viva","ministry","policy"];
    let hits = 0;
    for (const fl of fields) { const v = (values[fl.key] ?? "").toLowerCase(); for (const s of signals) if (v.includes(s)) hits += 1; }
    const lengthBonus = fields.reduce((a, fl) => a + Math.min(1, (values[fl.key]?.length ?? 0) / 120), 0);
    return Math.min(1, hits / 10 + lengthBonus / fields.length);
  }, [values]);

  const aiPrompt = useMemo(() => {
    let p = "A faculty member has designed an assessment using the CRAFT framework (Context, Role, Action, Format, Threshold). Estimated AI-resistance: " + Math.round(aiResistanceScore*100) + "%.\n\nTHEIR BRIEF:\n\n";
    for (const fl of fields) { p += fl.title.toUpperCase() + ":\n" + (values[fl.key] || "(empty)") + "\n\n"; }
    p += "In 3 short paragraphs: (1) frank critique of how well this brief would resist a large language model, (2) ONE specific addition to THRESHOLD that would substantially increase AI-resistance, anchored in the Caribbean context they\u0027ve named, (3) one viva voce question they could ask the student to verify the work is theirs. Be concrete; reference their actual content.";
    return p;
  }, [values, aiResistanceScore]);

  return (
    <div className="max-w-3xl mx-auto px-5 py-10">
      <Section eyebrow="CRAFT · Context · Role · Action · Format · Threshold" accent="text-sun" title="Design an assessment AI cannot convincingly fake." subtitle="Five steps. Ten minutes. At the end you will have a Caribbean-anchored brief you can print." />
      <div className="flex items-center gap-1 mb-8">{fields.map((fl, i) => (<div key={fl.key} className={"flex-1 h-2 rounded-full " + (i < step ? "bg-sun" : i === step ? "bg-ink" : "bg-ink/10")} />))}</div>
      <article className="rounded-2xl bg-white border border-ink/10 shadow-soft p-6 md:p-8">
        <p className="uppercase text-xs tracking-wider text-ink/60 mb-1">Step {step + 1} of {fields.length}</p>
        <h2 className="font-display text-3xl text-ink">{field.title}</h2>
        <p className="mt-2 text-ink/80">{field.prompt}</p>
        <p className="mt-1 text-sm text-ink/55">{field.hint}</p>
        <textarea value={values[field.key] ?? ""} onChange={(e) => setValues({ ...values, [field.key]: e.target.value })} placeholder={field.placeholder} rows={5} className="mt-4 w-full rounded-xl border border-ink/15 bg-sand/40 p-4 text-ink focus:border-sun focus:bg-white" />
        <button type="button" onClick={() => setShowExample(!showExample)} className="mt-3 text-sm text-sea hover:underline">{showExample ? "Hide" : "Show"} Jamaica worked example</button>
        {showExample && (
          <div className="mt-2 text-sm bg-sand/60 border border-ink/10 rounded-xl p-4 text-ink/80">
            <p className="uppercase text-xs tracking-wider text-ink/60 mb-1">From the keynote</p>
            <p>{field.example}</p>
            <button type="button" onClick={() => { setValues({ ...values, [field.key]: field.example }); setShowExample(false); }} className="mt-3 text-xs text-sea underline">Use this example</button>
          </div>
        )}
        <div className="mt-6 flex items-center justify-between">
          <button type="button" onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0} className="px-4 py-2 rounded-full text-sm border border-ink/20 text-ink/80 disabled:opacity-40 hover:bg-ink/5">← Back</button>
          {isLast ? (
            <button type="button" onClick={() => { document.getElementById("craft-brief")?.scrollIntoView({behavior:"smooth"}); }} disabled={!complete} className="px-5 py-2 rounded-full text-sm bg-ink text-sand disabled:opacity-40 hover:bg-sun hover:text-ink">See your brief ↓</button>
          ) : (
            <button type="button" onClick={() => setStep(Math.min(fields.length - 1, step + 1))} className="px-5 py-2 rounded-full text-sm bg-ink text-sand hover:bg-sun hover:text-ink">Next →</button>
          )}
        </div>
      </article>
      {complete && (
        <section id="craft-brief" className="mt-12">
          <h2 className="font-display text-2xl text-ink mb-4">Your CRAFT brief</h2>
          <article className="rounded-2xl bg-white border border-ink/10 shadow-soft p-6 md:p-8 space-y-5">
            {fields.map((fl) => (<div key={fl.key}><p className="uppercase tracking-wider text-xs text-sun font-semibold">{fl.title}</p><p className="mt-1 text-ink leading-relaxed whitespace-pre-wrap">{values[fl.key]}</p></div>))}
          </article>
          <div className="mt-6 rounded-2xl bg-ink text-sand p-5">
            <div className="flex items-baseline justify-between"><p className="font-display text-xl">Estimated AI-resistance</p><p className="text-sand/80 text-sm">{Math.round(aiResistanceScore * 100)}%</p></div>
            <div className="h-2 rounded-full bg-sand/15 mt-3 overflow-hidden"><div className="h-full bg-sun transition-all" style={{ width: Math.round(aiResistanceScore * 100) + "%" }} /></div>
          </div>
          <AiFeedback systemPrompt="You are a Caribbean assessment design expert. You read assessment briefs critically and suggest concrete, single-paragraph improvements. You always reference the specific Caribbean content the user has provided." userPrompt={aiPrompt} accent="bg-sun text-ink" buttonLabel="Generate CRAFT critique with AI" helperText="Claude will critique your brief and suggest one specific Threshold addition + a viva voce question." />
          <p className="mt-6 text-xs text-ink/60 italic">CRAFT © Dr. Rohan Jowallah, 2025. Cite explicitly.</p>
        </section>
      )}
    </div>
  );
}

