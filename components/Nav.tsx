"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/compass", label: "Compass" },
  { href: "/salf", label: "SALF" },
  { href: "/care", label: "CARE" },
  { href: "/craft", label: "CRAFT" },
  { href: "/acre", label: "ACRE" },
  { href: "/about", label: "About" },
];

export function Logo() {
  return (
    <svg width="34" height="34" viewBox="0 0 34 34" aria-hidden="true">
      <circle cx="17" cy="17" r="16" fill="#F4B400" />
      <path d="M1 17h32" stroke="#0B1A30" strokeWidth="2" />
      <path d="M5 23c4-3 8-3 12 0s8 3 12 0" stroke="#0B7373" strokeWidth="3" fill="none" />
      <path d="M5 28c4-3 8-3 12 0s8 3 12 0" stroke="#0B7373" strokeWidth="3" fill="none" />
    </svg>
  );
}

export default function Nav() {
  const pathname = usePathname();
  return (
    <nav aria-label="Main" className="sticky top-0 z-40">
      <div className="bg-ink text-sand">
        <div className="max-w-6xl mx-auto px-5 md:px-8 py-3 flex flex-wrap items-center justify-between gap-3">
          <Link href="/" className="flex items-center gap-3 text-sand">
            <Logo />
            <span className="font-display font-extrabold text-lg md:text-xl">The Sovereign Classroom</span>
          </Link>
          <ul className="flex items-center gap-1 text-[15px] font-semibold w-full sm:w-auto overflow-x-auto whitespace-nowrap -mx-1 px-1 sm:mx-0 sm:px-0">
            {links.map((l) => {
              const active = pathname === l.href;
              return (
                <li key={l.href}>
                  <Link href={l.href} className={`inline-flex items-center min-h-[40px] px-3.5 rounded-full transition-colors ${active ? "bg-sun text-ink" : "text-sand hover:bg-sand/10"}`}>
                    {l.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="madras" aria-hidden />
    </nav>
  );
}
