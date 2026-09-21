import type { Anecdote } from "@/data/types";

export function Anecdotes({ anecdotes }: { anecdotes: Anecdote[] }) {
  return (
    <div style={{ marginTop: "2.5rem", display: "grid", gap: "1rem" }}>
      {anecdotes.map((a, i) => (
        <article
          key={a.hook}
          className="card"
          style={{ padding: "1.5rem", display: "grid", gridTemplateColumns: "auto 1fr", gap: "1.25rem", alignItems: "start" }}
        >
          <span className="display" style={{ fontSize: "1.75rem", color: "var(--color-line)" }}>
            {String(i + 1).padStart(2, "0")}
          </span>
          <div>
            <h3 className="display" style={{ fontSize: "1.1875rem" }}>{a.hook}</h3>
            <p style={{ color: "var(--color-muted)", marginTop: "0.5rem", fontSize: "0.9375rem", maxWidth: "62ch" }}>
              {a.body}
            </p>
            {a.source ? (
              <p style={{ fontSize: "0.6875rem", color: "var(--color-muted)", marginTop: "0.625rem" }}>
                Source : {a.source.url ? (
                  <a href={a.source.url} target="_blank" rel="noopener noreferrer nofollow" className="link-underline">{a.source.label}</a>
                ) : a.source.label}
              </p>
            ) : null}
          </div>
        </article>
      ))}
    </div>
  );
}
