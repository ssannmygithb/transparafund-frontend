/**
 * QuestBoard logo — a quest-marker pennant inside a tile.
 * Solid colors only (no gradients), crisp geometry.
 */
export function LogoMark({ size = 34 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none" aria-hidden>
      <rect x="0.5" y="0.5" width="35" height="35" rx="10" fill="#15171c" stroke="rgba(255,255,255,0.10)" />
      {/* flag pole */}
      <path d="M13 8.5 V27.5" stroke="#34d399" strokeWidth="2.4" strokeLinecap="round" />
      {/* pennant */}
      <path d="M13.6 9.2 H25.5 L21.8 13 L25.5 16.8 H13.6 Z" fill="#34d399" />
    </svg>
  )
}

export function Logo() {
  return (
    <div className="logo">
      <LogoMark />
      <div className="logo-text">
        <strong>
          Quest<span className="logo-accent">Board</span>
        </strong>
        <span className="logo-sub">Sepolia · learn-to-earn</span>
      </div>
    </div>
  )
}
