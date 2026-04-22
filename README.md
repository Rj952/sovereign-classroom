# The Sovereign Classroom

> An interactive companion to Dr. Rohan Jowallah's keynote on Caribbean-authentic assessment in the age of artificial intelligence.

Four interactive tools — **SALF**, **CARE**, **CRAFT**, and **ACRE** — for faculty, department chairs, and academic leaders to design, audit, and govern assessment from a position of Caribbean sovereignty.

Live site: *(add Vercel URL here after deploy)*

---

## What this app does

- **SALF — Sovereign AI Leadership Framework.** Five questions to ask before your institution adopts any AI assessment policy: Sovereignty, Accountability, Literacy, Fairness, Sustainability.
- **CARE — Consider · Analyse · Reflect · Evaluate.** A thinking diagnostic that reveals, in three minutes, how much of your existing assessment a large language model can complete.
- **CRAFT — Context · Role · Action · Format · Threshold.** A step-by-step wizard that produces a Caribbean-anchored assessment brief AI cannot convincingly fake.
- **ACRE — Accuracy · Completeness · Relevance · Equity.** An equity audit with concrete redesign suggestions targeted at the weakest dimensions.

All data stays in the browser. No login. No tracking. No API keys required.

---

## Run locally

```bash
npm install
npm run dev
# open http://localhost:3000
```

Requires Node 18+ (Node 20+ recommended).

Build for production:

```bash
npm run build
npm start
```

---

## Deploy to Vercel

**One-click deploy (easiest):**

1. Push this repo to GitHub.
2. Go to <https://vercel.com/new> and click "Import Project".
3. Select this repository. Vercel auto-detects Next.js — no configuration needed.
4. Click "Deploy". You'll have a live URL in about 60 seconds.

**Vercel CLI (alternative):**

```bash
npm i -g vercel
vercel
# follow prompts; answer "yes" to link
vercel --prod
```

No environment variables are required — the app is fully static at runtime (rule-based scoring, no external API calls). If you add live AI feedback later, set your key in the Vercel dashboard under *Settings → Environment Variables*.

---

## Project structure

```
app/
  layout.tsx          # shared layout, nav, footer
  page.tsx            # landing page
  about/              # background, argument, principles
  salf/               # SALF policy check
  care/               # CARE thinking diagnostic
  craft/              # CRAFT assessment designer (wizard)
  acre/               # ACRE equity audit
components/
  Nav.tsx Footer.tsx
  FrameworkCard.tsx Section.tsx
  Likert.tsx ResultBand.tsx
tailwind.config.ts    # Caribbean palette (sea, sun, palm, coral, sand, ink)
```

---

## Attribution

SALF, CARE, CRAFT, and ACRE are proprietary frameworks © **Dr. Rohan Jowallah**, 2025–2026. They are presented most fully in *Sovereign Intelligence: A Caribbean Framework for AI Leadership in Education and Policy* (IGI Global, 2026).

Please cite explicitly in any institutional documents, scholarship, or derivative work:

> Jowallah, R. (2026). *Sovereign Intelligence: A Caribbean Framework for AI Leadership in Education and Policy*. IGI Global.

The frameworks may be used inside your institution for the purposes of assessment redesign, policy development, and faculty development. Commercial re-distribution or rebranding of the frameworks themselves requires written permission from the author.

---

## Credits

- Application design & build: Claude (Anthropic) on behalf of Dr. Rohan Jowallah, April 2026.
- Keynote source: *The Sovereign Classroom*, Dr. Rohan Jowallah, 2026.

---

*Lead from here. Lead from who you are. Lead from what you know.*
