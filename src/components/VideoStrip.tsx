"use client";

import { useState } from "react";
import type { Video } from "@/data/types";

/**
 * « Vivez le stade » : vidéos verticales, chargées uniquement au clic
 * (aucune iframe tierce avant interaction — performance et vie privée).
 */
export function VideoStrip({ videos, stadiumName }: { videos: Video[]; stadiumName: string }) {
  const [playing, setPlaying] = useState<string | null>(null);

  if (videos.length === 0) {
    return (
      <div className="card" style={{ marginTop: "2.5rem", padding: "2rem", textAlign: "center" }}>
        <p style={{ fontWeight: 600 }}>Nos vidéos du {stadiumName} arrivent.</p>
        <p style={{ color: "var(--color-muted)", fontSize: "0.9375rem", marginTop: "0.5rem" }}>
          Nous ne republions pas de vidéos dont nous n'avons pas les droits. Cette section accueillera
          nos propres captations verticales ainsi que les contenus officiels des clubs.
        </p>
      </div>
    );
  }

  return (
    <div className="rail" style={{ marginTop: "2.5rem", paddingInline: 0 }}>
      {videos.map((video) => {
        const isPlaying = playing === video.id;
        return (
          <div
            key={video.id}
            style={{
              width: "min(72vw, 280px)",
              aspectRatio: video.vertical === false ? "16 / 9" : "9 / 16",
              borderRadius: "var(--radius-md)",
              overflow: "hidden",
              background: "var(--color-surface-2)",
              border: "1px solid var(--color-line)",
              position: "relative",
            }}
          >
            {isPlaying && video.provider === "youtube" ? (
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1`}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture"
                allowFullScreen
                style={{ width: "100%", height: "100%", border: 0 }}
              />
            ) : (
              <button
                type="button"
                onClick={() => setPlaying(video.id)}
                style={{
                  width: "100%",
                  height: "100%",
                  display: "grid",
                  placeItems: "center",
                  gap: "0.75rem",
                  background: "transparent",
                  border: 0,
                  cursor: "pointer",
                  color: "var(--color-text)",
                  padding: "1rem",
                }}
              >
                <span
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 999,
                    border: "1px solid var(--color-line)",
                    display: "grid",
                    placeItems: "center",
                  }}
                  aria-hidden="true"
                >
                  ▶
                </span>
                <span style={{ fontSize: "0.875rem", fontWeight: 600, textAlign: "center" }}>{video.title}</span>
                {video.credit ? (
                  <span style={{ fontSize: "0.6875rem", color: "var(--color-muted)" }}>{video.credit}</span>
                ) : null}
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}
