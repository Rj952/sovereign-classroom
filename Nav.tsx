"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/salf", label: "SALF" },
  { href: "/care", label: "CARE" },
  { href: "/craft", label: "CRAFT" },
  { href: "/acre", label: "ACRE" },
  { href: "/about", label: "About" },
];

export default function Nav() {
  const pathname = usePathname();
  return (
    <nav className="sticky top-0 z-40 backdrop-blur bg-sand/80 border-b border-ink/10">
      <div className="max-w-6xl mx-auto px-5 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <span
            className="inline-block w-7 h-7 rounded-full"
            style={{
              background:
                "conic-gradient(from 40deg, #E3A93B, #1F6B4B, #0B7B8A, #C9543D, #E3A93B)",
            }}
            aria-hidden
          />
          <span className="font-display text-ink text-lg md:text-xl font-semibold group-hover:text-sea transition-colors">
            The Sovereign Classroom
          </span>
        </Link>
        <ul className="flex items-center gap-1 md:gap-2 text-sm">
          {links.map((l) => {
            const active = pathname === l.href;
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={`px-3 py-1.5 rounded-full transition-colors ${
                    active
                      ? "bg-ink text-sand"
                      : "text-ink/80 hover:bg-ink/10"
                  }`}
                >
                  {l.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
