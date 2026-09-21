"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/", label: "Accueil", d: "M4 11.5 12 4l8 7.5V20a1 1 0 0 1-1 1h-4v-6H9v6H5a1 1 0 0 1-1-1Z" },
  { href: "/stades", label: "Stades", d: "M3 19V9l9-5 9 5v10M7 19v-6h10v6" },
  { href: "/carte", label: "Carte", d: "M9 3 3 5.5v15L9 18l6 3 6-2.5v-15L15 6 9 3Zm0 0v15m6-12v15" },
  { href: "/favoris", label: "Favoris", d: "M12 20s-7-4.4-7-9.1A3.9 3.9 0 0 1 12 8.4 3.9 3.9 0 0 1 19 10.9C19 15.6 12 20 12 20Z" },
  { href: "/recherche", label: "Chercher", d: "M11 17.5a6.5 6.5 0 1 0 0-13 6.5 6.5 0 0 0 0 13ZM16 16l4.5 4.5" },
];

/** Navigation basse, mobile uniquement : 5 destinations, pas une de plus. */
export function BottomNav() {
  const pathname = usePathname();
  return (
    <nav
      aria-label="Navigation"
      className="safe-bottom only-mobile"
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 60,
        display: "grid",
        gridTemplateColumns: "repeat(5, 1fr)",
        borderTop: "1px solid var(--color-line)",
        background: "color-mix(in srgb, var(--color-bg) 92%, transparent)",
        backdropFilter: "saturate(150%) blur(14px)",
        paddingTop: "0.375rem",
      }}
    >
      {items.map((item) => {
        const active =
          item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 3,
              padding: "0.25rem 0",
              color: active ? "var(--color-accent)" : "var(--color-muted)",
              fontSize: "0.625rem",
              fontWeight: 600,
              letterSpacing: "0.01em",
            }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d={item.d} />
            </svg>
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
