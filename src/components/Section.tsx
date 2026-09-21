export function SectionHeading({
  eyebrow,
  title,
  lede,
  id,
}: {
  eyebrow?: string;
  title: string;
  lede?: string;
  id?: string;
}) {
  return (
    <div id={id} style={{ maxWidth: "68ch", scrollMarginTop: "5rem" }}>
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h2
        className="display"
        style={{ fontSize: "clamp(1.75rem, 5vw, 2.75rem)", marginTop: eyebrow ? "0.75rem" : 0 }}
      >
        {title}
      </h2>
      {lede ? <p className="lede" style={{ marginTop: "1rem" }}>{lede}</p> : null}
    </div>
  );
}
