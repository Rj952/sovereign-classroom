import Link from "next/link";

type Props = { acronym: string; expansion: string; description: string; href: string; accent: string; };

export default function FrameworkCard({ acronym, expansion, description, href, accent }: Props) {
  return (
    <Link href={href} className="group block rounded-2xl bg-white shadow-soft border border-ink/5 p-6 hover:-translate-y-0.5 transition-transform">
      <div className="flex items-center gap-3 mb-3">
        <span className={`inline-flex items-center justify-center w-11 h-11 rounded-xl text-white font-display text-lg ${accent}`} aria-hidden>{acronym[0]}</span>
        <div>
          <p className="font-display text-2xl leading-none">{acronym}</p>
          <p className="text-xs uppercase tracking-wider text-ink/60">{expansion}</p>
        </div>
      </div>
      <p className="text-sm text-ink/80 leading-relaxed">{description}</p>
      <p className="mt-4 text-sm font-medium text-sea group-hover:underline">Open the tool →</p>
    </Link>
  );
}

