"use client";

import { useState } from "react";
import { track } from "@/lib/analytics";

/** Partage social. TikTok et Instagram n'exposent pas d'URL de partage web : on copie le lien. */
export function ShareBar({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
      track("share", { network: "copy", title });
    } catch {
      setCopied(false);
    }
  };

  const nativeShare = async () => {
    if (!navigator.share) return copy();
    try {
      await navigator.share({ title, url });
      track("share", { network: "native", title });
    } catch {
      /* partage annulé */
    }
  };

  const networks = [
    { id: "whatsapp", label: "WhatsApp", href: `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}` },
    { id: "facebook", label: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}` },
  ];

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", alignItems: "center" }}>
      <span className="eyebrow" style={{ marginRight: "0.25rem" }}>Partager</span>

      <button type="button" className="btn btn-ghost" style={{ minHeight: 40 }} onClick={nativeShare}>
        Partager
      </button>

      {networks.map((n) => (
        <a
          key={n.id}
          href={n.href}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-ghost"
          style={{ minHeight: 40 }}
          onClick={() => track("share", { network: n.id, title })}
        >
          {n.label}
        </a>
      ))}

      <button type="button" className="btn btn-ghost" style={{ minHeight: 40 }} onClick={copy}>
        {copied ? "Lien copié" : "Copier le lien"}
      </button>

      <span style={{ fontSize: "0.75rem", color: "var(--color-muted)" }}>
        Pour TikTok et Instagram : copiez le lien et collez-le dans votre publication.
      </span>
    </div>
  );
}
