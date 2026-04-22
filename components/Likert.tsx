"use client";

type Props = { name: string; value: number; onChange: (v: number) => void; lowLabel?: string; highLabel?: string; min?: number; max?: number; };

export default function Likert({ name, value, onChange, lowLabel = "Not at all", highLabel = "Strongly", min = 0, max = 4 }: Props) {
  const steps = [];
  for (let i = min; i <= max; i++) steps.push(i);
  return (
    <div className="mt-3">
      <div role="radiogroup" aria-label={name} className="flex items-center gap-2">
        {steps.map((s) => {
          const selected = s === value;
          return (
            <button key={s} role="radio" aria-checked={selected} type="button" onClick={() => onChange(s)} className={`w-10 h-10 rounded-full border text-sm font-medium transition-all ${selected ? "bg-ink text-sand border-ink shadow-soft scale-105" : "bg-white text-ink/70 border-ink/20 hover:border-ink/50"}`}>{s}</button>
          );
        })}
      </div>
      <div className="flex justify-between text-xs text-ink/55 mt-1.5 px-1">
        <span>{lowLabel}</span>
        <span>{highLabel}</span>
      </div>
    </div>
  );
}

