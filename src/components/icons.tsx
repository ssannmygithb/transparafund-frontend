/** Tiny inline-SVG icon set — keeps the bundle lean and fully styleable. */
type P = { className?: string }
const base = { width: 20, height: 20, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const }

export const WalletIcon = ({ className }: P) => (
  <svg {...base} className={className}><path d="M3 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v1" /><path d="M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2H6" /><circle cx="16" cy="13" r="1.2" fill="currentColor" stroke="none" /></svg>
)
export const CoinIcon = ({ className }: P) => (
  <svg {...base} className={className}><circle cx="12" cy="12" r="8" /><path d="M12 8v8M9.5 10.5h3.5a1.5 1.5 0 0 1 0 3H9.5" /></svg>
)
export const TrophyIcon = ({ className }: P) => (
  <svg {...base} className={className}><path d="M7 4h10v3a5 5 0 0 1-10 0V4Z" /><path d="M7 5H4v1a3 3 0 0 0 3 3M17 5h3v1a3 3 0 0 1-3 3" /><path d="M10 13.5V16h4v-2.5M8 20h8M10 20v-2h4v2" /></svg>
)
export const CheckIcon = ({ className }: P) => (
  <svg {...base} className={className}><path d="m5 12 4.5 4.5L19 7" /></svg>
)
export const TargetIcon = ({ className }: P) => (
  <svg {...base} className={className}><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="4" /><circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" /></svg>
)
export const SparkleIcon = ({ className }: P) => (
  <svg {...base} className={className}><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18" /></svg>
)
export const PlusIcon = ({ className }: P) => (
  <svg {...base} className={className}><path d="M12 5v14M5 12h14" /></svg>
)
export const SpinnerIcon = ({ className }: P) => (
  <svg {...base} className={className} style={{ animation: "spin 0.8s linear infinite" }}><path d="M12 3a9 9 0 1 0 9 9" /></svg>
)
export const LinkIcon = ({ className }: P) => (
  <svg {...base} className={className}><path d="M10 14a4 4 0 0 0 5.66 0l3-3a4 4 0 0 0-5.66-5.66l-1.5 1.5" /><path d="M14 10a4 4 0 0 0-5.66 0l-3 3a4 4 0 1 0 5.66 5.66l1.5-1.5" /></svg>
)
export const LockIcon = ({ className }: P) => (
  <svg {...base} className={className}><rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></svg>
)
