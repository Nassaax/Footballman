"use client";

import { useEffect, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";
import Link from "next/link";
import type { Club, Stadium } from "@/data/types";
import { formatNumber, isVerified } from "@/lib/format";
import { track } from "@/lib/analytics";

type Marker = { stadium: Stadium; club: Club; coTenants: Club[] };

/**
 * Carte interactive. Leaflet + tuiles OpenStreetMap : open source, sans clé
 * d'API et sans coût. Le module Leaflet n'est chargé qu'au montage côté client.
 */
export function BelgiumMap({ markers }: { markers: Marker[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<Marker | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let disposed = false;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let map: any = null;

    (async () => {
      try {
        const L = await import("leaflet");
        if (disposed || !containerRef.current) return;

        map = L.map(containerRef.current, {
          center: [50.62, 4.55],
          zoom: 8,
          scrollWheelZoom: false,
          attributionControl: true,
        });

        L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 18,
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        }).addTo(map);

        for (const marker of markers) {
          const icon = L.divIcon({
            className: "",
            html: `<span style="display:block;width:16px;height:16px;border-radius:999px;background:${marker.club.colors.primary};border:2.5px solid #fff;box-shadow:0 1px 6px rgba(0,0,0,.45)"></span>`,
            iconSize: [16, 16],
            iconAnchor: [8, 8],
          });

          L.marker([marker.stadium.latitude, marker.stadium.longitude], {
            icon,
            title: `${marker.stadium.name} — ${marker.club.name}`,
            keyboard: true,
            alt: marker.stadium.name,
          })
            .addTo(map)
            .on("click", () => {
              setSelected(marker);
              track("map_marker_click", { stadiumId: marker.stadium.id });
            });
        }

        map.fitBounds(
          markers.map((m) => [m.stadium.latitude, m.stadium.longitude] as [number, number]),
          { padding: [40, 40] },
        );
      } catch {
        setFailed(true);
      }
    })();

    return () => {
      disposed = true;
      map?.remove();
    };
  }, [markers]);

  return (
    <div className="grid-two" style={{ alignItems: "start", gap: "1.5rem" }}>
      <div
        className="card"
        style={{ overflow: "hidden", position: "relative", padding: 0 }}
      >
        <div
          ref={containerRef}
          style={{ height: "min(70svh, 560px)", width: "100%" }}
          role="application"
          aria-label="Carte des stades de Jupiler Pro League"
        />
        {failed ? (
          <p style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", padding: "2rem", textAlign: "center" }}>
            La carte n'a pas pu se charger. Vous pouvez parcourir la liste ci-contre.
          </p>
        ) : null}
      </div>

      <div>
        {selected ? (
          <article className="card" style={{ padding: "1.5rem" }}>
            <p className="eyebrow">{selected.stadium.city}</p>
            <h2 className="display" style={{ fontSize: "1.5rem", marginTop: "0.5rem" }}>
              {selected.stadium.name}
            </h2>
            <p style={{ color: "var(--color-muted)", fontSize: "0.9375rem", marginTop: "0.25rem" }}>
              {selected.club.name}
              {selected.coTenants.length > 0 ? ` & ${selected.coTenants.map((c) => c.name).join(", ")}` : ""}
            </p>
            <p style={{ fontSize: "0.9375rem", marginTop: "0.875rem" }}>{selected.stadium.tagline}</p>
            {isVerified(selected.stadium.capacity) ? (
              <p style={{ fontSize: "0.8125rem", color: "var(--color-muted)", marginTop: "0.5rem" }}>
                {formatNumber(selected.stadium.capacity.value as number)} places
              </p>
            ) : null}
            <Link href={`/stades/${selected.stadium.slug}`} className="btn btn-primary" style={{ marginTop: "1.25rem" }}>
              Ouvrir la fiche
            </Link>
          </article>
        ) : (
          <p className="card" style={{ padding: "1.5rem", fontSize: "0.9375rem", color: "var(--color-muted)" }}>
            Touchez un point sur la carte pour voir le stade, puis ouvrez sa fiche.
          </p>
        )}

        <ul style={{ marginTop: "1.5rem", display: "grid", gap: "1px", background: "var(--color-line)", border: "1px solid var(--color-line)", borderRadius: "var(--radius-md)", overflow: "hidden" }}>
          {markers.map((m) => (
            <li key={m.stadium.id}>
              <button
                type="button"
                onClick={() => setSelected(m)}
                style={{
                  width: "100%",
                  textAlign: "left",
                  padding: "0.75rem 1rem",
                  background: selected?.stadium.id === m.stadium.id ? "var(--color-surface-2)" : "var(--color-surface)",
                  border: 0,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  color: "var(--color-text)",
                }}
              >
                <span
                  aria-hidden="true"
                  style={{ width: 10, height: 10, borderRadius: 999, background: m.club.colors.primary, flex: "0 0 auto" }}
                />
                <span style={{ fontSize: "0.875rem", fontWeight: 600 }}>{m.stadium.name}</span>
                <span style={{ fontSize: "0.75rem", color: "var(--color-muted)", marginLeft: "auto" }}>{m.stadium.city}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
