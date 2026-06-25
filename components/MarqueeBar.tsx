const items = [
  "Desarrollo E-commerce",
  "Landing Pages",
  "Chatbots con IA",
  "Automatización Python",
  "Next.js 15",
  "Vercel",
  "Claude API",
  "Mantenimiento Web",
  "Neon Database",
  "Desarrollo E-commerce",
  "Landing Pages",
  "Chatbots con IA",
  "Automatización Python",
  "Next.js 15",
  "Vercel",
  "Claude API",
  "Mantenimiento Web",
  "Neon Database",
];

function DiamondSep() {
  return (
    <svg
      width="8" height="8" viewBox="0 0 8 8"
      fill="var(--color-deep)"
      style={{ flexShrink: 0, opacity: 0.7 }}
      aria-hidden="true"
    >
      <path d="M4 0L8 4L4 8L0 4Z" />
    </svg>
  );
}

export default function MarqueeBar() {
  return (
    <div
      style={{
        background: "var(--color-primary)",
        padding: "13px 0",
        overflow: "hidden",
        whiteSpace: "nowrap",
      }}
    >
      <div className="marquee-track">
        {items.map(function (item, i) {
          return (
            <span
              key={i}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 12,
                fontSize: 12,
                fontWeight: 700,
                color: "var(--color-deep)",
                letterSpacing: 1,
                padding: "0 18px",
              }}
            >
              {item}
              <DiamondSep />
            </span>
          );
        })}
      </div>
    </div>
  );
}
