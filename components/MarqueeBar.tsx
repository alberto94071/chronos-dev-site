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
                gap: 10,
                fontSize: 12,
                fontWeight: 700,
                color: "var(--color-deep)",
                letterSpacing: 1,
                padding: "0 18px",
              }}
            >
              {item}
              <span style={{ fontSize: 16, color: "var(--color-deep)", fontWeight: 400 }}>✦</span>
            </span>
          );
        })}
      </div>
    </div>
  );
}
