"use client";

/**
 * Analytics respectueuse de la vie privée (Plausible, sans cookie).
 * Aucun événement n'est envoyé si NEXT_PUBLIC_PLAUSIBLE_DOMAIN n'est pas défini.
 */

type Props = Record<string, string | number | boolean>;

declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: Props }) => void;
  }
}

export type TrackedEvent =
  | "stadium_view"
  | "ticketing_click"
  | "transport_click"
  | "sponsor_click"
  | "affiliate_click"
  | "share"
  | "favorite_add"
  | "favorite_remove"
  | "search"
  | "map_marker_click"
  | "matchday_build"
  | "premium_interest";

export function track(event: TrackedEvent, props?: Props) {
  if (typeof window === "undefined") return;
  window.plausible?.(event, props ? { props } : undefined);
}
