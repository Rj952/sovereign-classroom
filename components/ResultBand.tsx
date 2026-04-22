type Band = { min: number; label: string; tone: "sea" | "palm" | "sun" | "coral"; message: string; };

type Props = { score: number; bands: Band[]; };

const toneMap: Record<string, string> = {
  sea: "bg-sea/10 border-sea/30 text-ink",
  palm: "bg-palm/10 border-palm/30 text-ink",
  sun: "bg-sun/15 border-sun/40 text-ink",
  coral: "bg-coral/10 border-coral/30 text-ink",
};

export default function ResultBand({ score, bands }: Props) {
  const pct = Math.round(score * 100);
  const current = [...bands].reverse().find((b) => pct >= b.min) ?? bands[0];
  return (
    <div className={`rounded-2xl border p-5 ${toneMap[current.tone]}`} role="status" aria-live="polite">
      <div className="flex items-baseline justify-between">
        <p className="font-display text-2xl">{current.label}</p>
        <p className="text-sm font-semibold text-ink/70">{pct}%</p>
      </div>
      <div className="h-2 rounded-full bg-ink/10 mt-3 overflow-hidden">
        <div className="h-full bg-ink/70 transition-all" style={{ width: `${pct}%` }} />
      </div>
      <p className="mt-4 text-ink/85 leading-relaxed">{current.message}</p>
    </div>
  );
}

