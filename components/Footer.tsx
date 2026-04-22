export default function Footer() {
  return (
    <footer className="border-t border-ink/10 bg-ink text-sand/90 mt-16">
      <div className="max-w-6xl mx-auto px-5 py-10 grid md:grid-cols-3 gap-6 text-sm">
        <div>
          <p className="font-display text-xl mb-2 text-sand">The Sovereign Classroom</p>
          <p className="opacity-80">An interactive companion to Dr. Rohan Jowallah's keynote on Caribbean-authentic assessment in the age of artificial intelligence.</p>
        </div>
        <div>
          <p className="uppercase tracking-wider text-xs opacity-70 mb-2">Frameworks</p>
          <ul className="space-y-1 opacity-90">
            <li>SALF — Sovereign AI Leadership Framework</li>
            <li>CARE — Consider · Analyse · Reflect · Evaluate</li>
            <li>CRAFT — Context · Role · Action · Format · Threshold</li>
            <li>ACRE — Accuracy · Completeness · Relevance · Equity</li>
          </ul>
        </div>
        <div>
          <p className="uppercase tracking-wider text-xs opacity-70 mb-2">Attribution</p>
          <p className="opacity-80 leading-relaxed">SALF, CARE, CRAFT, and ACRE are proprietary frameworks of <span className="font-semibold text-sand">© Dr. Rohan Jowallah, 2025–2026</span>. Cite explicitly in any institutional or scholarly use.</p>
          <p className="opacity-60 mt-3 text-xs">From <em>Sovereign Intelligence: A Caribbean Framework for AI Leadership in Education and Policy</em> (IGI Global, 2026).</p>
        </div>
      </div>
      <div className="border-t border-sand/10 py-4 text-center text-xs opacity-70">Lead from here. Lead from who you are. Lead from what you know.</div>
    </footer>
  );
}

