"use client";

type Props = { name: string; value: number; onChange: (v: number) => void; lowLabel?: string; highLabel?: string; min?: number; max?: number; };

export default function Likert({ name, value, onChange, lowLabel = "Not at all", highLabel = "Strongly", min = 0, max = 4 }: Props) {
  const steps = [];
  for (let i = min; i <= max; i++) steps.push(i);
  return (
    <div className="mt-3">
      <div role="radiogroup" aria-label={name} className="flex flex-wrap items-center gap-2">
        {steps.map((s) => {
          const selected = s === value;
          return (
            <button key={s} role="radio" aria-checked={selected} type="button" onClick={() => onChange(s)} className={`w-12 h-12 rounded-full border-2 font-display font-black text-lg transition-colors ${selected ? "bg-ink text-sun border-ink" : "bg-sand text-ink border-[#D8D0BF] hover:border-ink"}`}>{s}</button>
          );
        })}
      </div>
      <div className="flex justify-between gap-4 text-sm text-[#3D4657] mt-2 px-1">
        <span>{lowLabel}</span>
        <span>{highLabel}</span>
      </div>
    </div>
  );
}

