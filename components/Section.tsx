type Props = { eyebrow?: string; title: string; subtitle?: string; accent?: string; children?: React.ReactNode; };

export default function Section({ eyebrow, title, subtitle, accent = "text-sea", children }: Props) {
  return (
    <header className="mb-8">
      {eyebrow && (<p className={`font-display font-bold text-sm tracking-[0.16em] uppercase ${accent} mb-3`}>{eyebrow}</p>)}
      <h1 className="font-display font-black uppercase text-[34px] md:text-[52px] text-ink leading-[1.05]">{title}</h1>
      {subtitle && (<p className="mt-5 text-ink/80 text-lg md:text-[19px] leading-relaxed max-w-2xl">{subtitle}</p>)}
      {children}
    </header>
  );
}

