import type { TimelineEvent } from "@/data/types";

export function Timeline({ events }: { events: TimelineEvent[] }) {
  return (
    <ol style={{ marginTop: "2.5rem", display: "grid", gap: 0 }}>
      {events.map((event, i) => (
        <li
          key={`${event.year}-${event.title}`}
          style={{
            display: "grid",
            gridTemplateColumns: "4.5rem 1fr",
            gap: "1.25rem",
            paddingBottom: i === events.length - 1 ? 0 : "2rem",
            position: "relative",
          }}
        >
          <div style={{ position: "relative" }}>
            <span className="display" style={{ fontSize: "1.125rem", color: "var(--color-accent)" }}>
              {event.year}
            </span>
            {i < events.length - 1 ? (
              <span
                aria-hidden="true"
                style={{
                  position: "absolute",
                  left: "0.28rem",
                  top: "1.9rem",
                  bottom: "-2rem",
                  width: 1,
                  background: "var(--color-line)",
                }}
              />
            ) : null}
          </div>

          <div style={{ paddingBottom: "0.25rem" }}>
            <h3 style={{ fontWeight: 600, fontSize: "1.0625rem" }}>{event.title}</h3>
            {event.date ? (
              <p style={{ fontSize: "0.75rem", color: "var(--color-muted)", marginTop: 2 }}>{event.date}</p>
            ) : null}
            <p style={{ color: "var(--color-muted)", fontSize: "0.9375rem", marginTop: "0.5rem", maxWidth: "58ch" }}>
              {event.description}
            </p>
            {event.source ? (
              <p style={{ fontSize: "0.6875rem", color: "var(--color-muted)", marginTop: "0.5rem" }}>
                {event.source.url ? (
                  <a href={event.source.url} target="_blank" rel="noopener noreferrer nofollow" className="link-underline">
                    {event.source.label}
                  </a>
                ) : (
                  event.source.label
                )}
              </p>
            ) : null}
          </div>
        </li>
      ))}
    </ol>
  );
}
