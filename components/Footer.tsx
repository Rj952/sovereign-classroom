export default function Footer() {
  return (
    <footer>
      <div className="madras" aria-hidden />
      <div className="bg-ink text-[#D9D2C3]">
        <div className="max-w-6xl mx-auto px-5 md:px-8 py-10 grid md:grid-cols-3 gap-8 text-[15px] leading-relaxed">
          <div>
            <p className="font-display text-xl font-extrabold mb-2 text-sand">The Sovereign Classroom</p>
            <p>An interactive workshop by Dr. Rohan Jowallah on Caribbean-authentic assessment in the age of artificial intelligence. Built in the Caribbean, for the Caribbean.</p>
          </div>
          <div>
            <p className="uppercase tracking-wider text-xs text-sun font-bold mb-2">Frameworks</p>
            <ul className="space-y-1">
              <li>Compass — Knowledge · Language · Data · Pedagogy · Future</li>
              <li>SALF — Sovereign AI Leadership Framework</li>
              <li>CARE — Consider · Analyse · Reflect · Evaluate</li>
              <li>CRAFT — Context · Role · Action · Format · Threshold</li>
              <li>ACRE — Accuracy · Context · Relevance · Equity</li>
            </ul>
          </div>
          <div>
            <p className="uppercase tracking-wider text-xs text-sun font-bold mb-2">Attribution</p>
            <p>The Sovereign Learning Compass, SALF, CARE, CRAFT, and ACRE are proprietary frameworks of <span className="font-semibold text-sand">© Dr. Rohan Jowallah, Ed.D., FHEA, 2025–2026</span>. Cite explicitly in any institutional or scholarly use.</p>
          </div>
        </div>
        <div className="border-t border-sand/10 py-4 text-center text-xs">Lead from here. Lead from who you are. Lead from what you know.</div>
      </div>
    </footer>
  );
}
