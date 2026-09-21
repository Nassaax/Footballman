/** Marque : une arche de tribune vue en coupe, dans un carré. */
export function Logo({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
      <rect width="32" height="32" rx="8" fill="currentColor" />
      <path
        d="M6 23.5V17c0-5.52 4.48-10 10-10s10 4.48 10 10v6.5"
        fill="none"
        stroke="var(--color-bg)"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <path
        d="M11 23.5v-6a5 5 0 0 1 10 0v6"
        fill="none"
        stroke="var(--color-bg)"
        strokeWidth="2.4"
        strokeLinecap="round"
        opacity="0.55"
      />
      <rect x="6" y="24.6" width="20" height="2.4" rx="1.2" fill="var(--color-bg)" />
    </svg>
  );
}

export function Wordmark({ size = 28 }: { size?: number }) {
  return (
    <span className="flex items-center gap-2.5">
      <span style={{ color: "var(--color-text)", display: "flex" }}>
        <Logo size={size} />
      </span>
      <span className="display" style={{ fontSize: "1.05rem", letterSpacing: "-0.02em" }}>
        Stadia<span style={{ color: "var(--color-accent)" }}>&nbsp;Belgica</span>
      </span>
    </span>
  );
}
