type Props = { eyebrow?: string; title: string; subtitle?: string; accent?: string; children?: React.ReactNode; };

export default function Section({ eyebrow, title, subtitle, accent = "text-sea", children }: Props) {
  return (
    <header className="mb-8">
      {eyebrow && (<p className={`inline-block uppercase tracking-wider text-xs font-semibold ${accent} mb-2`}>{eyebrow}</p>)}
      <h1 className="font-display text-3xl md:text-5xl text-ink leading-tight">{title}</h1>
      {subtitle && (<p className="mt-4 text-ink/75 text-lg leading-relaxed max-w-2xl">{subtitle}</p>)}
      {children}
    </header>
  );
}

