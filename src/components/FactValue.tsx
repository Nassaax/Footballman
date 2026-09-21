import type { Fact } from "@/data/types";
import { formatDate, isVerified } from "@/lib/format";

/**
 * Rendu unique de toute donnée susceptible de changer.
 * Une donnée non vérifiée n'est jamais présentée comme un fait.
 */
export function FactValue<T>({
  fact,
  render,
  className,
  showMeta = true,
}: {
  fact: Fact<T>;
  render?: (value: T) => React.ReactNode;
  className?: string;
  showMeta?: boolean;
}) {
  const ok = isVerified(fact);

  return (
    <span className={className} style={{ display: "block" }}>
      {ok ? (
        <span>{render ? render(fact.value as T) : String(fact.value)}</span>
      ) : (
        <span style={{ color: "var(--color-muted)", fontStyle: "italic" }}>
          Information à confirmer
        </span>
      )}
      {fact.note ? (
        <span style={{ display: "block", fontSize: "0.75rem", color: "var(--color-muted)", marginTop: 2 }}>
          {fact.note}
        </span>
      ) : null}
      {showMeta && ok && (fact.source || fact.lastVerified) ? (
        <span style={{ display: "block", fontSize: "0.6875rem", color: "var(--color-muted)", marginTop: 4 }}>
          {fact.source?.url ? (
            <a href={fact.source.url} target="_blank" rel="noopener noreferrer nofollow" className="link-underline">
              {fact.source.label}
            </a>
          ) : (
            fact.source?.label
          )}
          {fact.lastVerified ? ` · vérifié le ${formatDate(fact.lastVerified)}` : null}
        </span>
      ) : null}
    </span>
  );
}

export function FactList({ fact }: { fact: Fact<string[]> }) {
  if (!isVerified(fact)) return <FactValue fact={fact} />;
  return (
    <span style={{ display: "block" }}>
      <ul style={{ display: "grid", gap: "0.375rem", paddingLeft: "1.1rem", listStyle: "disc" }}>
        {(fact.value as string[]).map((item) => (
          <li key={item} style={{ fontSize: "0.9375rem" }}>{item}</li>
        ))}
      </ul>
      {fact.note ? (
        <span style={{ display: "block", fontSize: "0.75rem", color: "var(--color-muted)", marginTop: 6 }}>{fact.note}</span>
      ) : null}
      {fact.source || fact.lastVerified ? (
        <span style={{ display: "block", fontSize: "0.6875rem", color: "var(--color-muted)", marginTop: 4 }}>
          {fact.source?.label}
          {fact.lastVerified ? ` · vérifié le ${formatDate(fact.lastVerified)}` : null}
        </span>
      ) : null}
    </span>
  );
}
