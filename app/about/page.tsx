import Link from "next/link";

export default function AboutPage() {
  return (
    <article className="max-w-3xl mx-auto px-5 py-12 prose-caribbean">
      <p className="inline-block bg-ink/5 text-ink/70 px-3 py-1 rounded-full text-xs uppercase tracking-wider mb-5">About</p>
      <h1 className="font-display text-4xl md:text-5xl text-ink mb-6">A blueprint, not a lament.</h1>
      <p className="text-ink/85 leading-relaxed text-lg">The Sovereign Classroom is a companion application to the keynote of the same name by <strong>Dr. Rohan Jowallah</strong>. It translates four proprietary frameworks — SALF, CARE, CRAFT, and ACRE — into interactive tools educators can use to redesign assessment for authenticity in the age of artificial intelligence.</p>
      <h2 className="font-display text-2xl mt-10 mb-3 text-ink">The central argument</h2>
      <p className="text-ink/85 leading-relaxed">The Caribbean is not behind the global AI curve. The Caribbean is being asked to drive in someone else's lane, at someone else's speed, toward someone else's destination. Assessment policy is one of the primary sites where sovereignty is either exercised or surrendered. Every assessment encodes a decision about whose knowledge counts and what kind of thinking we believe our students are capable of.</p>
      <h2 className="font-display text-2xl mt-10 mb-3 text-ink">The three traps</h2>
      <ul className="space-y-3 text-ink/85 list-none p-0">
        <li className="rounded-xl bg-white border border-ink/10 p-4"><strong className="text-coral">The Detection Trap.</strong> Spending institutional money to deploy AI-detection tools that disproportionately flag non-native English speakers and Caribbean English writers. Epistemic injustice dressed as academic integrity.</li>
        <li className="rounded-xl bg-white border border-ink/10 p-4"><strong className="text-coral">The Compliance Trap.</strong> Adopting AI frameworks imported from contexts that were never designed for Caribbean pedagogical traditions, student populations, or resource realities.</li>
        <li className="rounded-xl bg-white border border-ink/10 p-4"><strong className="text-coral">The Imagination Trap.</strong> Assuming that because AI can produce a convincing essay, the essay is no longer a valid assessment form. If a large language model can complete your assessment — with no lived experience, no cultural memory, no stake in the outcome — what, exactly, were you measuring?</li>
      </ul>
      <h2 className="font-display text-2xl mt-10 mb-3 text-ink">The four principles</h2>
      <ol className="space-y-2 text-ink/85 list-decimal list-inside">
        <li>Assess the irreplaceable.</li>
        <li>Dialogue over detection.</li>
        <li>Govern with Caribbean values.</li>
        <li>Lead the global conversation.</li>
      </ol>
      <h2 className="font-display text-2xl mt-10 mb-3 text-ink">How to use this app</h2>
      <p className="text-ink/85 leading-relaxed">Each of the four tools below is self-contained and takes 5–15 minutes. There is no login, no data collection, no server-side storage. Your responses stay in your browser. At the end of each tool you can print or export your brief for a department meeting or committee.</p>
      <div className="mt-6 grid sm:grid-cols-2 gap-3">
        <Link href="/salf" className="rounded-xl bg-sea text-white p-4 hover:opacity-95"><p className="font-display text-lg">SALF</p><p className="text-sm opacity-90">Five questions to ask before your institution adopts any AI policy.</p></Link>
        <Link href="/care" className="rounded-xl bg-palm text-white p-4 hover:opacity-95"><p className="font-display text-lg">CARE</p><p className="text-sm opacity-90">A thinking diagnostic for your existing assessments.</p></Link>
        <Link href="/craft" className="rounded-xl bg-sun text-ink p-4 hover:opacity-95"><p className="font-display text-lg">CRAFT</p><p className="text-sm opacity-90">Design a Caribbean-anchored assessment from scratch.</p></Link>
        <Link href="/acre" className="rounded-xl bg-coral text-white p-4 hover:opacity-95"><p className="font-display text-lg">ACRE</p><p className="text-sm opacity-90">Run an equity audit on an assessment you already use.</p></Link>
      </div>
      <h2 className="font-display text-2xl mt-12 mb-3 text-ink">Attribution & citation</h2>
      <p className="text-ink/85 leading-relaxed">SALF, CARE, CRAFT, and ACRE are proprietary frameworks © <strong>Dr. Rohan Jowallah</strong>, 2025–2026. Please cite explicitly in any institutional documents, research, or derivative work. The frameworks are developed most fully in <em>Sovereign Intelligence: A Caribbean Framework for AI Leadership in Education and Policy</em> (IGI Global, 2026).</p>
      <blockquote className="mt-10 border-l-4 border-sun pl-5 text-ink/80 italic">Lead from here. Lead from who you are. Lead from what you know.</blockquote>
    </article>
  );
}

