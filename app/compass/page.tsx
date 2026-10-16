"use client";
import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import AiFeedback from "@/components/AiFeedback";
import whoseImg from "@/components/whose.jpg";

type Key = "knowledge" | "language" | "data" | "pedagogy" | "future";
type Q = { key: Key; title: string; label: string; color: string; low: string; high: string; tool: string; href: string; move: string };

const qs: Q[] = [
  { key: "knowledge", title: "Whose knowledge?", label: "KNOWLEDGE", color: "#D62839", low: "Others define it", high: "We define and produce it", tool: "CARE", href: "/care", move: "Rewrite one task so students must draw on Caribbean scholars, community knowledge or lived experience. CARE shows you where to start." },
  { key: "language", title: "Whose language?", label: "LANGUAGE", color: "#6B3FA0", low: "Others' languages dominate", high: "Our languages shape learning", tool: "ACRE", href: "/acre", move: "Make Caribbean English and Creole explicitly acceptable in one rubric, and assess the thinking, not the code. ACRE audits the rest." },
  { key: "data", title: "Whose data?", label: "DATA", color: "#1F5FAD", low: "Others own and control it", high: "We own and govern it", tool: "SALF", href: "/salf", move: "Find out where student work goes when it enters an AI tool, and who owns it. SALF gives you the five questions to put to your institution." },
  { key: "pedagogy", title: "Whose pedagogy?", label: "PEDAGOGY", color: "#2E7D4F", low: "Imported models dominate", high: "Our contexts and values shape it", tool: "CRAFT", href: "/craft", move: "Design one assessment anchored in a real Caribbean context, with an oral defence. CRAFT walks you through it." },
  { key: "future", title: "Whose future?", label: "FUTURE", color: "#B07D00", low: "Others decide for us", high: "Our people set the direction", tool: "SALF", href: "/salf", move: "Put students and community voices into the next AI policy conversation. SALF frames that discussion." },
];

const levels = ["", "Lowest", "Limited", "Shared", "Strong", "Highest"];
const stages = ["Captured", "Dependent", "Adapting", "Navigating", "Sovereign"];
const stageFills = ["#3A4560", "#4E4A6E", "#6B3FA0", "#0B7373", "#F4B400"];

// Radar geometry: a pentagon with Knowledge at the top, going clockwise.
const CX = 180, CY = 175, R = 120;
function pt(i: number, r: number) {
  const a = ((-90 + 72 * i) * Math.PI) / 180;
  return { x: Math.round((CX + r * Math.cos(a)) * 10) / 10, y: Math.round((CY + r * Math.sin(a)) * 10) / 10 };
}
const ring = (lvl: number) => qs.map((_, i) => { const p = pt(i, (R * lvl) / 5); return `${p.x},${p.y}`; }).join(" ");
const axes = qs.map((_, i) => { const p = pt(i, R); return `M${CX} ${CY}L${p.x} ${p.y}`; }).join("");
const labelAnchors = ["middle", "start", "start", "end", "end"] as const;
const labels = qs.map((_, i) => pt(i, R + 22));
labels[0].y -= 2; labels[2].y += 14; labels[3].y += 14; labels[1].x += 4; labels[4].x -= 4;

function stageIndex(avg: number) {
  return avg < 1.8 ? 0 : avg < 2.6 ? 1 : avg < 3.4 ? 2 : avg < 4.2 ? 3 : 4;
}

const pill = "inline-flex items-center gap-2 min-h-[46px] px-5 rounded-full font-bold text-[15px] transition-colors";

export default function CompassPage() {
  const [scores, setScores] = useState<Partial<Record<Key, number>>>({});
  const [action, setAction] = useState("");

  const scored = qs.filter((q) => scores[q.key]).length;
  const complete = scored === qs.length;
  const minScore = complete ? Math.min(...qs.map((q) => scores[q.key]!)) : 0;
  const lowestKeys = complete ? qs.filter((q) => scores[q.key] === minScore).map((q) => q.key) : [];
  const lowest = qs.find((q) => q.key === lowestKeys[0]);
  const avg = complete ? qs.reduce((s, q) => s + scores[q.key]!, 0) / qs.length : 0;
  const idx = complete ? stageIndex(avg) : -1;

  const dots = qs.map((q, i) => pt(i, (R * (scores[q.key] ?? 0)) / 5));
  const shape = dots.map((p) => `${p.x},${p.y}`).join(" ");

  const summary = qs.map((q) => `${q.title} ${scores[q.key] ?? "–"}/5`).join(", ");

  const aiPrompt = useMemo(() => {
    if (!complete || !lowest) return "";
    let p = "A Caribbean educator has scored their classroom or institution on Dr. Rohan Jowallah's Sovereign Learning Compass. Each question is scored 1 (others decide) to 5 (we decide).\n\n";
    p += qs.map((q) => `- ${q.title} ${scores[q.key]}/5 (1 = ${q.low}; 5 = ${q.high})`).join("\n");
    p += `\n\nAverage ${avg.toFixed(1)} of 5, which places them at the "${stages[idx]}" stage on the continuum Captured → Dependent → Adapting → Navigating → Sovereign.`;
    p += `\nTheir lowest point: ${lowestKeys.map((k) => qs.find((q) => q.key === k)!.title).join(" and ")}. Suggested next tool: ${lowest.tool}.`;
    if (action.trim()) p += `\nThe one action they plan to take this semester: "${action.trim()}"`;
    p += "\n\nIn 3 short paragraphs: (1) what this shape says about where they are and why the lowest point matters, (2) one concrete, Caribbean-anchored step they can take this semester on that lowest point (strengthen their own action if they gave one), (3) one question to put to a colleague when they turn and talk. Be candid, kind and specific.";
    return p;
  }, [complete, lowest, lowestKeys, scores, avg, idx, action]);

  const shareText = complete && lowest
    ? `Our Sovereign Learning Compass — ${summary}. Stage: ${stages[idx]} (average ${avg.toFixed(1)} of 5). Starting point: ${lowest.title}${action.trim() ? ` Our action this semester: ${action.trim()}` : ""} https://sovereign-classroom.vercel.app/compass`
    : "";

  return (
    <div>
      <section className="bg-ink text-sand">
        <div className="relative h-[150px] sm:h-[220px] no-print">
          <Image src={whoseImg} alt="Caribbean students looking out over a bay at sunset beneath five questions: whose knowledge, whose language, whose data, whose decision, whose future" fill priority sizes="100vw" className="object-cover object-[center_40%]" />
        </div>
        <div className="max-w-6xl mx-auto px-5 md:px-8 pt-9 pb-11 flex flex-wrap gap-8 items-end justify-between">
          <div className="flex-[999_1_520px] min-w-0">
            <p className="font-display font-bold text-sm tracking-[0.16em] uppercase text-[#C9A8F0]">The Sovereign Learning Compass</p>
            <h1 className="mt-2 font-display font-black uppercase text-5xl sm:text-[60px] leading-none">Where are <span className="text-sun">we?</span></h1>
            <p className="mt-4 text-lg md:text-[19px] leading-relaxed max-w-[640px] text-[#E1DACB]">Score your classroom or institution from 1 to 5 on five questions. Your answers draw a shape. Your lowest point is your starting point — not everything, one thing.</p>
          </div>
          <ol className="flex-[1_1_300px] flex flex-col gap-2 text-base">
            {["Score each question", "See your shape", "Circle your lowest point", "Turn and talk with a neighbour"].map((s, i) => (
              <li key={s} className="flex gap-3 items-center">
                <span className="flex-none w-[30px] h-[30px] rounded-full bg-sun text-ink grid place-items-center font-extrabold">{i + 1}</span>
                {s}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-5 md:px-8 pt-11 pb-16 flex flex-wrap gap-8 items-start">
        <div className="flex-[999_1_520px] min-w-0 flex flex-col gap-3.5">
          {qs.map((q) => {
            const isLowest = lowestKeys.includes(q.key);
            return (
              <fieldset key={q.key} className={`m-0 min-w-0 bg-white rounded-[22px] px-5 py-5 sm:px-6 border-2 ${isLowest ? "border-coral" : "border-[#E6DFCF]"}`}>
                <legend className="float-left w-full p-0 mb-1 flex flex-wrap items-center gap-3">
                  <span className="w-[18px] h-[18px] rounded-full" style={{ background: q.color }} aria-hidden />
                  <span className="font-display font-black text-xl sm:text-2xl uppercase">{q.title}</span>
                  {isLowest && <span className="ml-auto text-[13px] font-bold tracking-[0.08em] uppercase bg-coral text-white px-2.5 py-1 rounded-full">Your lowest point</span>}
                </legend>
                <div className="clear-both flex flex-wrap justify-between gap-2 text-[15px] text-[#3D4657] mb-3">
                  <span>1 = {q.low}</span>
                  <span>5 = {q.high}</span>
                </div>
                <div role="radiogroup" aria-label={q.title} className="grid grid-cols-5 gap-1.5 sm:gap-2">
                  {[1, 2, 3, 4, 5].map((n) => {
                    const on = scores[q.key] === n;
                    return (
                      <button
                        key={n}
                        type="button"
                        role="radio"
                        aria-checked={on}
                        onClick={() => setScores({ ...scores, [q.key]: n })}
                        className={`min-h-[64px] rounded-[14px] px-0.5 py-1.5 border-2 transition-colors ${on ? "text-white" : "bg-sand text-ink border-[#D8D0BF] hover:border-ink"}`}
                        style={on ? { background: q.color, borderColor: q.color } : undefined}
                      >
                        <span className="block font-display font-black text-[22px]">{n}</span>
                        <span className="block text-[11px] sm:text-xs font-semibold">{levels[n]}</span>
                      </button>
                    );
                  })}
                </div>
              </fieldset>
            );
          })}
        </div>

        <aside aria-label="Your compass" className="flex-[1_1_360px] min-w-0 flex flex-col gap-4">
          <div className="bg-white rounded-[24px] p-6 border-2 border-ink">
            <p className="font-display font-extrabold text-lg uppercase">Your shape</p>
            <svg viewBox="0 0 360 340" role="img" aria-label={`Compass shape: ${summary}`} className="w-full h-auto block mt-1.5">
              <polygon points={ring(5)} fill="#FAF4E8" stroke="#C8C0AE" strokeWidth="1" />
              {[4, 3, 2, 1].map((l) => <polygon key={l} points={ring(l)} fill="none" stroke="#DDD5C4" strokeWidth="1" />)}
              <path d={axes} stroke="#C8C0AE" strokeWidth="1" />
              {scored > 0 && <polygon points={shape} fill="#F4B400" fillOpacity="0.55" stroke="#0B1A30" strokeWidth="2.5" strokeLinejoin="round" />}
              {qs.map((q, i) => scores[q.key] ? (
                <circle key={q.key} cx={dots[i].x} cy={dots[i].y} r={lowestKeys.includes(q.key) ? 10 : 7} fill={q.color} stroke={lowestKeys.includes(q.key) ? "#0B1A30" : "#FFFFFF"} strokeWidth={lowestKeys.includes(q.key) ? 3 : 2} />
              ) : null)}
              {qs.map((q, i) => (
                <text key={q.key} x={labels[i].x} y={labels[i].y} textAnchor={labelAnchors[i]} fontFamily="Archivo, sans-serif" fontWeight="800" fontSize="14" fill="#0B1A30">{q.label}</text>
              ))}
            </svg>
            {!complete && <p className="mt-2 text-sm text-[#3D4657]">{scored} of 5 scored. Your shape grows as you answer.</p>}
          </div>

          <div className="bg-ink text-sand rounded-[24px] p-6">
            <p className="text-[13px] font-bold tracking-[0.12em] uppercase text-sun">Where you are on the continuum</p>
            <p className="mt-1.5 font-display font-black text-3xl sm:text-4xl uppercase">{complete ? stages[idx] : "—"}</p>
            <p className="mt-1 mb-4 text-[15px] text-[#C9CFDA]">{complete ? `Average ${avg.toFixed(1)} of 5` : "Score all five questions to see your stage"}</p>
            <div aria-hidden className="grid grid-cols-5 gap-1">
              {stages.map((s, i) => <div key={s} className="h-3 rounded-md" style={{ background: i <= idx ? stageFills[i] : "#2A3550" }} />)}
            </div>
            <div className="flex justify-between text-xs text-[#C9CFDA] mt-1.5"><span>Captured</span><span>Sovereign</span></div>
          </div>

          <div className="bg-white rounded-[24px] p-6 border-2 border-coral">
            <p className="text-[13px] font-bold tracking-[0.12em] uppercase text-coral">Your starting point</p>
            {complete && lowest ? (
              <>
                <p className="mt-1.5 font-display font-black text-[26px] uppercase">{lowest.title}</p>
                {lowestKeys.length > 1 && <p className="mt-1 text-sm text-[#3D4657]">Tied with {lowestKeys.slice(1).map((k) => qs.find((q) => q.key === k)!.title).join(" and ")}. Start with one.</p>}
                <p className="mt-2 text-base leading-relaxed">{lowest.move}</p>
                <Link href={lowest.href} className={`${pill} mt-4 bg-ink text-sand hover:bg-sea no-print`}>Open {lowest.tool}</Link>
              </>
            ) : (
              <p className="mt-2 text-base leading-relaxed">Score all five questions. Your lowest point becomes your starting point, with the tool that helps you move it.</p>
            )}
            <label className="block mt-5 text-sm font-bold">
              One action we can take this semester
              <textarea value={action} onChange={(e) => setAction(e.target.value)} rows={3} placeholder="e.g. Accept Jamaican Creole drafts in Unit 3 and assess the ideas, not the code." className="block w-full mt-1.5 p-3 rounded-xl border-2 border-[#C8C0AE] bg-sand font-normal text-[15px] text-ink focus:border-ink focus:outline-none" />
            </label>
            {complete && (
              <div className="flex flex-wrap gap-2.5 mt-3.5 no-print">
                <a href={`https://wa.me/?text=${encodeURIComponent(shareText)}`} target="_blank" rel="noopener noreferrer" className={`${pill} border-2 border-ink text-ink hover:bg-ink/10`}>Share on WhatsApp</a>
                <button type="button" onClick={() => window.print()} className={`${pill} border-2 border-ink text-ink hover:bg-ink/10`}>Print brief</button>
              </div>
            )}
          </div>
        </aside>

        {complete && (
          <div className="basis-full min-w-0 -mt-8">
            <AiFeedback
              systemPrompt="You are a reflective coach for Caribbean educators using Dr. Rohan Jowallah's Sovereign Learning Compass (Whose knowledge? Whose language? Whose data? Whose pedagogy? Whose future?). You read their scores, name what their shape shows, and help them take one concrete step on their lowest point this semester. You always reference their actual scores and stage."
              userPrompt={aiPrompt}
              accent="bg-iris"
              buttonLabel="Get an AI reflection"
              helperText="Claude will read your shape and suggest one step for this semester."
            />
          </div>
        )}
        <p className="basis-full text-xs text-ink/60 italic">The Sovereign Learning Compass © Dr. Rohan Jowallah, Ed.D., FHEA, 2026. Cite explicitly in any institutional use.</p>
      </div>
    </div>
  );
}
