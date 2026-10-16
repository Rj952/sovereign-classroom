import Image from "next/image";
import Link from "next/link";
import { IslandField, IslandPicker, IslandSummary } from "@/components/IslandContext";
import heroImg from "@/components/hero.jpg";
import togetherImg from "@/components/together.jpg";

const eyebrow = "font-display font-bold text-sm tracking-[0.16em] uppercase";
const bigHeading = "font-display font-black uppercase leading-[1.05]";

const tools = [
  { href: "/salf", acronym: "SALF", expansion: "Sovereign AI Leadership", line: "Five questions before your institution adopts any AI policy.", tone: "bg-sea text-white" },
  { href: "/care", acronym: "CARE", expansion: "Consider · Analyse · Reflect · Evaluate", line: "How much of the thinking can AI do for your students?", tone: "bg-palm text-white" },
  { href: "/craft", acronym: "CRAFT", expansion: "Context · Role · Action · Format · Threshold", line: "Design a task anchored here — one AI cannot convincingly fake.", tone: "bg-sun text-ink" },
  { href: "/acre", acronym: "ACRE", expansion: "Accuracy · Context · Relevance · Equity", line: "Accurate is not enough. Accurate for whom?", tone: "bg-coral text-white" },
];

const stages = [
  { name: "Captured", tone: "bg-[#3A4560]", h: "min-h-[70px]" },
  { name: "Dependent", tone: "bg-[#4E4A6E]", h: "min-h-[92px]" },
  { name: "Adapting", tone: "bg-iris", h: "min-h-[114px]" },
  { name: "Navigating", tone: "bg-sea", h: "min-h-[136px]" },
  { name: "Sovereign", tone: "bg-sun text-ink", h: "min-h-[158px]" },
];

export default function HomePage() {
  return (
    <div>
      <section className="bg-ink text-sand">
        <div className="max-w-6xl mx-auto px-5 md:px-8 pt-14 pb-16 md:pt-16 md:pb-20 flex flex-wrap gap-12 items-center">
          <div className="flex-[999_1_520px] min-w-0">
            <p className={`${eyebrow} text-sun mb-5`}>Caribbean-authentic teaching &amp; assessment in the age of AI</p>
            <h1 className="font-display font-black uppercase text-4xl sm:text-5xl md:text-[64px] leading-none">
              Emancipation was declared.<br />
              <span className="text-sun">Sovereignty must be designed.</span>
            </h1>
            <p className="mt-7 text-lg md:text-[21px] leading-relaxed max-w-[620px] text-[#E9E2D3]">
              AI will not hand us sovereignty. No company, no app, no update will. Tools for Caribbean educators, departments and ministries to design, audit and govern learning — on our terms.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="#tools" className="inline-flex items-center gap-2.5 min-h-[52px] px-6 rounded-full bg-sun text-ink font-bold text-[17px] hover:bg-[#FFC933] transition-colors">
                Choose a tool
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </Link>
              <Link href="/acre" className="inline-flex items-center min-h-[52px] px-6 rounded-full border-2 border-sand text-sand font-bold text-[17px] hover:bg-sand/10 transition-colors">
                Audit one assessment
              </Link>
            </div>
            <p className="mt-7 text-[15px] text-[#B9C2D0]">Frameworks by Dr. Rohan Jowallah, Ed.D., FHEA · The University of the West Indies</p>
          </div>
          <div className="relative flex-[1_1_380px] min-h-[420px] md:min-h-[520px] rounded-[28px] border-4 border-sun overflow-hidden">
            <Image src={heroImg} alt="Caribbean learners with arms around each other, facing a sunrise over the islands and an open book" fill priority sizes="(min-width: 1024px) 480px, 100vw" className="object-cover object-[center_30%]" />
          </div>
        </div>
      </section>

      <section aria-labelledby="island-h" className="bg-sun text-ink">
        <div className="max-w-6xl mx-auto px-5 md:px-8 py-8 flex flex-wrap gap-6 items-center">
          <div className="flex-[1_1_260px]">
            <h2 id="island-h" className="font-display font-black uppercase text-2xl">Where are you teaching?</h2>
            <p className="mt-1.5">Examples and AI feedback follow your choice. Write in Caribbean English or Creole — every tool welcomes it.</p>
          </div>
          <div className="flex-[999_1_640px]">
            <IslandPicker />
          </div>
          <IslandSummary />
        </div>
      </section>

      <section aria-labelledby="q-h" className="max-w-6xl mx-auto px-5 md:px-8 pt-20 pb-10">
        <p className={`${eyebrow} text-coral`}>Before any tool</p>
        <h2 id="q-h" className={`${bigHeading} text-3xl md:text-[44px] mt-2.5 mb-9`}>Three questions we have always had to ask</h2>
        <div className="grid gap-5 md:grid-cols-3">
          {[
            { n: "1", q: "Who designed the system?", c: "border-coral text-coral" },
            { n: "2", q: "Whose knowledge counted?", c: "border-sea text-sea" },
            { n: "3", q: "For whose future is the learner being prepared?", c: "border-palm text-palm" },
          ].map((x) => (
            <div key={x.n} className={`bg-white rounded-[20px] p-7 border-t-8 ${x.c}`}>
              <p className="font-display font-black text-5xl">{x.n}</p>
              <p className="mt-2 font-display font-extrabold text-2xl text-ink">{x.q}</p>
            </div>
          ))}
        </div>
        <ol aria-label="Timeline" className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 border-t-[3px] border-ink">
          <li className="pt-4 pr-5"><p className="font-display font-black text-3xl">1835</p><p className="mt-1 leading-snug">Schooling for the newly freed — designed elsewhere, for someone else&apos;s economy.</p></li>
          <li className="pt-4 pr-5"><p className="font-display font-black text-3xl">1838</p><p className="mt-1 leading-snug">Emancipation declared. It did not design our schools. We had to.</p></li>
          <li className="pt-4 pr-5"><p className="font-display font-black text-3xl">1972</p><p className="mt-1 leading-snug">CXC. We stopped sitting other people&apos;s examinations.</p></li>
          <li className="pt-4 pr-5"><p className="font-display font-black text-3xl text-coral">2026</p><p className="mt-1 leading-snug">The algorithm is the new syllabus. Who writes it?</p></li>
        </ol>
      </section>

      <section id="tools" aria-labelledby="tools-h" className="max-w-6xl mx-auto px-5 md:px-8 pt-14 pb-10 scroll-mt-24">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-7">
          <div>
            <p className={`${eyebrow} text-iris`}>The Jowallah Frameworks</p>
            <h2 id="tools-h" className={`${bigHeading} text-3xl md:text-[44px] mt-2.5`}>Five tools. One sovereign practice.</h2>
          </div>
          <p className="max-w-[420px] text-[17px] leading-relaxed">Each takes 5–15 minutes and ends in a brief you can take to your department or committee.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <div className="flex flex-col gap-2.5 rounded-[22px] p-6 min-h-[260px] bg-iris text-white">
            <span className="self-start text-xs font-bold tracking-[0.12em] uppercase bg-sun text-ink px-2.5 py-1 rounded-full">Coming soon</span>
            <span className="font-display font-black text-[34px]">COMPASS</span>
            <span className="text-sm font-bold tracking-wide uppercase opacity-90">Knowledge · Language · Data · Pedagogy · Future</span>
            <span className="leading-snug">Five &ldquo;whose?&rdquo; questions. See your shape. Circle your lowest point.</span>
          </div>
          {tools.map((t) => (
            <Link key={t.href} href={t.href} className={`flex flex-col gap-2.5 rounded-[22px] p-6 min-h-[260px] hover:-translate-y-0.5 transition-transform ${t.tone}`}>
              <span className="font-display font-black text-[34px] mt-[30px]">{t.acronym}</span>
              <span className="text-sm font-bold tracking-wide uppercase opacity-95">{t.expansion}</span>
              <span className="leading-snug">{t.line}</span>
            </Link>
          ))}
        </div>
        <p className="mt-4 text-[15px] text-[#4A5568]">Also in the family, coming next: <strong>RISE Literacy</strong> (Read critically · Inquire creatively · Solve collaboratively · Engage locally and globally) · <strong>AI-READY Institutions</strong> · <strong>Jowallah Governance Wheel</strong></p>
      </section>

      <section aria-labelledby="cont-h" className="max-w-6xl mx-auto px-5 md:px-8 pt-10 pb-16">
        <div className="bg-ink text-sand rounded-[28px] p-8 md:p-10">
          <h2 id="cont-h" className="font-display font-black uppercase text-3xl">Captured to sovereign</h2>
          <p className="mt-2 mb-7 text-lg text-[#D9D2C3] max-w-[720px]">Every tool places you on one continuum — a journey every Caribbean institution must navigate deliberately, not by default.</p>
          <ol className="grid gap-2.5 grid-cols-2 sm:grid-cols-5 items-end">
            {stages.map((s, i) => (
              <li key={s.name} className={`rounded-[14px] p-4 ${s.tone} ${s.h}`}>
                <p className="text-[13px] opacity-80">Stage {i + 1}</p>
                <p className="font-display font-extrabold text-xl">{s.name}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="ex-h" className="bg-white">
        <div className="max-w-6xl mx-auto px-5 md:px-8 py-16 md:py-[72px] flex flex-wrap gap-10 items-center">
          <div className="flex-[1_1_380px]">
            <p className={`${eyebrow} text-sea`}>Example in practice · <IslandField field="name" /></p>
            <h2 id="ex-h" className={`${bigHeading} text-3xl md:text-[44px] mt-2.5 mb-4`}>The bias becomes<br />the curriculum.</h2>
            <p className="text-lg leading-relaxed">A literacy unit where students prompt an AI in <IslandField field="lang" /> and in English, compare the outputs, and write a critique. The tool stops being a threat and becomes the text.</p>
            <Link href="/craft" className="inline-flex items-center mt-6 min-h-[48px] px-5 rounded-full bg-ink text-sand font-bold hover:bg-sea transition-colors">Build this with CRAFT</Link>
          </div>
          <div className="flex-[1_1_460px] grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div className="bg-sand rounded-[18px] p-5 border-2 border-sea">
              <p className="text-[13px] font-bold tracking-[0.1em] uppercase text-sea">Prompt A</p>
              <p className="mt-2 font-serif italic text-[21px] leading-snug">&ldquo;Write a short story in <IslandField field="lang" />.&rdquo;</p>
            </div>
            <div className="bg-sand rounded-[18px] p-5 border-2 border-ink">
              <p className="text-[13px] font-bold tracking-[0.1em] uppercase">Prompt B</p>
              <p className="mt-2 font-serif italic text-[21px] leading-snug">&ldquo;Write the same story in English.&rdquo;</p>
            </div>
            <div className="sm:col-span-2 bg-ink text-sand rounded-[18px] p-5">
              <p className="text-[13px] font-bold tracking-[0.1em] uppercase text-sun">Then the students ask</p>
              <p className="mt-2 text-lg leading-relaxed">Which version sounds like home? What did the machine get wrong — and why? Whose language was it trained to respect?</p>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="ws-h" className="max-w-6xl mx-auto px-5 md:px-8 py-16 md:py-[72px]">
        <div className="flex flex-wrap rounded-[28px] overflow-hidden bg-ink text-sand">
          <div className="relative flex-[1_1_440px] min-h-[300px] md:min-h-[380px]">
            <Image src={togetherImg} alt="Five people with arms around each other looking out at the islands, with Caribbean flags" fill sizes="(min-width: 1024px) 560px, 100vw" className="object-cover object-[center_60%]" />
          </div>
          <div className="flex-[1_1_440px] p-8 md:p-11">
            <p className={`${eyebrow} text-sun`}>Workshop mode · Coming soon</p>
            <h2 id="ws-h" className={`${bigHeading} text-3xl md:text-[40px] mt-2.5 mb-3.5`}>Sovereignty cannot be built alone.</h2>
            <p className="text-lg leading-relaxed text-[#E1DACB]">Put a room code on the screen. Your faculty join on their phones, answer anonymously, and watch the room&apos;s shape appear live. Export one report for the department.</p>
          </div>
        </div>
      </section>

      <section aria-label="Proverb" className="bg-palm text-sand">
        <div className="max-w-4xl mx-auto px-5 md:px-8 py-16 text-center">
          <p className="font-serif italic font-medium text-3xl md:text-[44px] leading-tight">&ldquo;One one cocoa full basket.&rdquo;</p>
          <p className="mt-3.5 text-lg">One assessment. This semester. Not everything — one thing.</p>
        </div>
      </section>
    </div>
  );
}
