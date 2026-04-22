import FrameworkCard from "@/components/FrameworkCard";
import Link from "next/link";

export default function HomePage() {
  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.12] pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 15% 20%, #0B7B8A 0, transparent 40%), radial-gradient(circle at 80% 30%, #E3A93B 0, transparent 35%), radial-gradient(circle at 50% 85%, #1F6B4B 0, transparent 45%)",
          }}
          aria-hidden
        />
        <div className="relative max-w-5xl mx-auto px-5 pt-16 md:pt-24 pb-12">
          <p className="inline-block bg-ink/5 text-ink/70 px-3 py-1 rounded-full text-xs uppercase tracking-wider mb-5">
            A companion to the keynote by Dr. Rohan Jowallah
          </p>
          <h1 className="font-display text-4xl md:text-6xl font-semibold leading-[1.05] text-ink">
            Caribbean-authentic assessment<br />
            in the age of AI.
          </h1>
          <p className="mt-6 text-lg md:text-xl text-ink/80 max-w-3xl leading-relaxed">
            Assessment is never just a measurement tool. It is a statement of
            who we trust. This is an interactive workshop for educators to
            design, audit, and govern assessment with the Sovereign
            Classroom&rsquo;s four frameworks &mdash; grounded in Caribbean
            pedagogical traditions.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/craft"
              className="inline-flex items-center gap-2 bg-ink text-sand px-5 py-3 rounded-full font-medium hover:bg-sea transition-colors"
            >
              Design an assessment → CRAFT
            </Link>
            <Link
              href="/acre"
              className="inline-flex items-center gap-2 bg-sun/90 text-ink px-5 py-3 rounded-full font-medium hover:bg-sun transition-colors"
            >
              Audit an existing assessment → ACRE
            </Link>
          </div>
          <blockquote className="mt-12 border-l-4 border-sun pl-5 max-w-3xl text-ink/75 italic">
            &ldquo;AI can write <em>about</em> Jamaica. It cannot write{" "}
            <em>from</em> Jamaica.&rdquo;
            <span className="block not-italic mt-2 text-sm text-ink/60">
              — The Sovereign Classroom keynote, 2026
            </span>
          </blockquote>
        </div>
      </section>

      {/* FRAMEWORK GRID */}
      <section className="max-w-6xl mx-auto px-5 mt-6 md:mt-10">
        <h2 className="font-display text-3xl md:text-4xl mb-2 text-ink">
          Four frameworks. One sovereign practice.
        </h2>
        <p className="text-ink/70 max-w-2xl mb-8">
          Move through any of the four tools below. Each produces a short,
          printable brief you can take into your department meeting this week.
        </p>
        <div className="grid md:grid-cols-2 gap-5">
          <FrameworkCard
            acronym="SALF"
            expansion="Sovereign AI Leadership Framework"
            description="Five foundational questions to ask before your institution adopts any AI governance policy — Sovereignty, Accountability, Literacy, Fairness, Sustainability."
            href="/salf"
            accent="bg-sea"
          />
          <FrameworkCard
            acronym="CARE"
            expansion="Consider · Analyse · Reflect · Evaluate"
            description="A thinking diagnostic. Applied honestly to an assessment, CARE quickly reveals which tasks a large language model can complete with ease — and which demand something irreducibly human."
            href="/care"
            accent="bg-palm"
          />
          <FrameworkCard
            acronym="CRAFT"
            expansion="Context · Role · Action · Format · Threshold"
            description="An assessment design scaffold. Walk step-by-step through a Caribbean-anchored brief your students can complete — and AI cannot convincingly simulate."
            href="/craft"
            accent="bg-sun text-ink"
          />
          <FrameworkCard
            acronym="ACRE"
            expansion="Accuracy · Completeness · Relevance · Equity"
            description="An equity audit. Score an existing assessment against four structural questions, with Caribbean-authenticity feedback and concrete redesign suggestions."
            href="/acre"
            accent="bg-coral"
          />
        </div>
      </section>

      {/* INVITATION / CLOSER */}
      <section className="max-w-4xl mx-auto px-5 mt-20 mb-10">
        <div className="rounded-3xl bg-ink text-sand p-8 md:p-12 shadow-soft">
          <h3 className="font-display text-2xl md:text-3xl mb-4">
            One assessment. This semester.
          </h3>
          <p className="opacity-90 leading-relaxed">
            You do not need to redesign every assessment tonight. Apply ACRE to
            one. Just one. See what it shows you. That discomfort is the
            beginning of the redesign.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/about"
              className="inline-flex items-center gap-2 border border-sand/30 text-sand px-4 py-2 rounded-full text-sm hover:bg-sand/10 transition-colors"
            >
              About the frameworks
            </Link>
            <Link
              href="/acre"
              className="inline-flex items-center gap-2 bg-sun text-ink px-4 py-2 rounded-full text-sm hover:bg-sun/90 transition-colors"
            >
              Start with ACRE →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
