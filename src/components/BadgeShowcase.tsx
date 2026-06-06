import { QUEST_BADGE_ADDRESS } from "../config/contracts"
import { useBadgeMetadata } from "../hooks/useBadge"
import { usePlayerStats } from "../hooks/usePlayerStats"
import { formatCount } from "../lib/format"
import { IpfsImage } from "./IpfsImage"
import { LockIcon, SparkleIcon } from "./icons"

export function BadgeShowcase() {
  const { badgeAwarded, completedCount, milestone } = usePlayerStats()
  const { data: badge } = useBadgeMetadata()

  const done = Number(completedCount ?? 0n)
  const goal = Number(milestone)
  const pct = Math.min(100, goal > 0 ? Math.round((done / goal) * 100) : 0)
  const hasImage = !!badge?.image

  return (
    <section className="badge-section">
      <div className="badge-art">
        {hasImage ? (
          <>
            <IpfsImage
              uri={badge!.image}
              alt={badge!.name}
              className={`badge-img ${badgeAwarded ? "" : "is-locked"}`}
            />
            {!badgeAwarded && (
              <div className="badge-lock-overlay">
                <LockIcon className="ic-lg" />
              </div>
            )}
          </>
        ) : (
          <div className="badge-locked">
            <LockIcon className="ic-lg" />
          </div>
        )}
      </div>

      <div className="badge-info">
        <span className="badge-kicker">
          <SparkleIcon className="ic-sm" /> Milestone Reward
        </span>
        <h2>{badge?.name ?? "Quest Badge"}</h2>
        <p className="badge-desc">
          {badgeAwarded ? (
            <>
              Unlocked — this NFT is in your wallet.{" "}
              <a
                href={`https://sepolia.etherscan.io/token/${QUEST_BADGE_ADDRESS}`}
                target="_blank"
                rel="noreferrer"
                className="inline-link"
              >
                View on Etherscan ↗
              </a>
            </>
          ) : (
            `Complete ${goal} quests to mint this badge automatically.`
          )}
        </p>

        {!badgeAwarded && (
          <div className="progress">
            <div className="progress-track">
              <div className="progress-fill" style={{ width: `${pct}%` }} />
            </div>
            <span className="progress-label">
              {formatCount(completedCount)} / {goal} quests
            </span>
          </div>
        )}
      </div>
    </section>
  )
}
