"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Wordmark } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";

const links = [
  { href: "/stades", label: "Stades" },
  { href: "/carte", label: "Carte" },
  { href: "/favoris", label: "Favoris" },
  { href: "/a-propos", label: "Méthode" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        borderBottom: `1px solid ${solid ? "var(--color-line)" : "transparent"}`,
        background: solid
          ? "color-mix(in srgb, var(--color-bg) 88%, transparent)"
          : "transparent",
        backdropFilter: solid ? "saturate(150%) blur(14px)" : undefined,
        transition: "background-color .25s, border-color .25s",
      }}
    >
      <div className="shell" style={{ display: "flex", alignItems: "center", gap: "1rem", height: 64 }}>
        <Link href="/" aria-label="Stadia Belgica — accueil">
          <Wordmark />
        </Link>

        <nav aria-label="Navigation principale" className="desktop-nav">
          {links.map((l) => {
            const active = pathname === l.href || pathname.startsWith(`${l.href}/`);
            return (
              <Link
                key={l.href}
                href={l.href}
                style={{
                  padding: "0.5rem 0.875rem",
                  borderRadius: 999,
                  fontSize: "0.9rem",
                  fontWeight: 500,
                  color: active ? "var(--color-text)" : "var(--color-muted)",
                  background: active ? "var(--color-surface-2)" : "transparent",
                }}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        <div className="header-actions">
          <Link
            href="/recherche"
            className="btn btn-ghost"
            style={{ minHeight: 40, width: 40, padding: 0 }}
            aria-label="Rechercher"
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden="true">
              <circle cx="11" cy="11" r="6.5" />
              <path d="m16 16 4.5 4.5" strokeLinecap="round" />
            </svg>
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
