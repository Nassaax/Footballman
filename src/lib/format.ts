import type { Fact } from "@/data/types";

export const TO_CONFIRM = "Information à confirmer";

export function factText<T>(fact: Fact<T>, render?: (v: T) => string): string {
  if (fact.status !== "verified" || fact.value === null) return TO_CONFIRM;
  return render ? render(fact.value) : String(fact.value);
}

export function isVerified<T>(fact: Fact<T>): boolean {
  return fact.status === "verified" && fact.value !== null;
}

export function formatNumber(n: number): string {
  return new Intl.NumberFormat("fr-BE").format(n);
}

export function formatDate(iso?: string): string {
  if (!iso) return TO_CONFIRM;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return new Intl.DateTimeFormat("fr-BE", { day: "numeric", month: "long", year: "numeric" }).format(d);
}

export function slugLabel(s: string): string {
  return s.replace(/-/g, " ");
}
