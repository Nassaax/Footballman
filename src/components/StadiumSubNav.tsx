"use client";

import { useEffect, useState } from "react";

/** Sommaire collant de la fiche stade. Défile horizontalement sur mobile. */
export function StadiumSubNav({ anchors }: { anchors: { id: string; label: string }[] }) {
  const [active, setActive] = useState(anchors[0]?.id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );
    for (const a of anchors) {
      const el = document.getElementById(a.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [anchors]);

  return (
    <nav
      aria-label="Sommaire de la fiche"
      style={{
        position: "sticky",
        top: 64,
        zIndex: 40,
        borderBottom: "1px solid var(--color-line)",
        background: "color-mix(in srgb, var(--color-bg) 90%, transparent)",
        backdropFilter: "saturate(150%) blur(12px)",
      }}
    >
      <div className="rail" style={{ paddingBlock: "0.625rem", gap: "0.375rem" }}>
        {anchors.map((a) => (
          <a
            key={a.id}
            href={`#${a.id}`}
            style={{
              padding: "0.375rem 0.75rem",
              borderRadius: 999,
              fontSize: "0.8125rem",
              fontWeight: 600,
              whiteSpace: "nowrap",
              color: active === a.id ? "var(--color-bg)" : "var(--color-muted)",
              background: active === a.id ? "var(--color-text)" : "transparent",
            }}
          >
            {a.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
