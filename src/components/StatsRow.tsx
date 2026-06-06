import type { ReactNode } from "react"
import { usePlayerStats } from "../hooks/usePlayerStats"
import { formatCount, formatToken } from "../lib/format"
import { CheckIcon, CoinIcon, TargetIcon, TrophyIcon } from "./icons"

function StatCard({
  icon,
  label,
  value,
  hint,
  accent,
}: {
  icon: ReactNode
  label: string
  value: string
  hint?: string
  accent?: "emerald" | "gold"
}) {
  return (
    <div className={`stat-card ${accent ? `accent-${accent}` : ""}`}>
      <div className="stat-icon">{icon}</div>
      <div className="stat-body">
        <span className="stat-label">{label}</span>
        <span className="stat-value">{value}</span>
        {hint && <span className="stat-hint">{hint}</span>}
      </div>
    </div>
  )
}

export function StatsRow() {
  const s = usePlayerStats()
  const progress = `${formatCount(s.completedCount)} / ${s.milestone.toString()} to badge`

  return (
    <section className="stats-row">
      <StatCard
        icon={<CoinIcon />}
        label="QST Balance"
        value={`${formatToken(s.qstBalance)} ${s.symbol}`}
        hint="Earned from quests"
        accent="emerald"
      />
      <StatCard icon={<TargetIcon />} label="Points" value={formatCount(s.points)} hint="Lifetime score" />
      <StatCard
        icon={<CheckIcon />}
        label="Quests Completed"
        value={formatCount(s.completedCount)}
        hint={progress}
      />
      <StatCard
        icon={<TrophyIcon />}
        label="Badges"
        value={formatCount(s.badgeCount)}
        hint={s.badgeAwarded ? "Milestone reached 🎖️" : "Locked"}
        accent="gold"
      />
    </section>
  )
}
