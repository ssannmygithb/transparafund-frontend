import { useAccount } from "wagmi"
import type { Quest } from "../hooks/useQuests"
import { useQuestActions } from "../hooks/useQuestActions"
import { CheckIcon, CoinIcon, SpinnerIcon } from "./icons"

export function QuestCard({ quest, index }: { quest: Quest; index: number }) {
  const { isConnected } = useAccount()
  const { completeQuest, isPending, isConfirming, isSuccess, error } = useQuestActions()

  const busy = isPending || isConfirming
  const done = quest.completed || isSuccess

  // Friendly label for the action button across the whole tx lifecycle.
  let label = "Complete Quest"
  if (isPending) label = "Confirm in wallet…"
  else if (isConfirming) label = "Mining…"
  else if (done) label = "Completed"
  else if (!quest.active) label = "Inactive"
  else if (!isConnected) label = "Connect to play"

  const disabled = !isConnected || !quest.active || done || busy

  return (
    <article className={`quest-card ${done ? "is-done" : ""} ${!quest.active ? "is-inactive" : ""}`}>
      <div className="quest-top">
        <span className="quest-index">#{index}</span>
        <span className="reward-chip">
          <CoinIcon className="ic-sm" />
          {quest.reward.toString()} QST
        </span>
      </div>

      <h3 className="quest-title">{quest.title}</h3>

      <div className="quest-foot">
        {done ? (
          <span className="done-badge">
            <CheckIcon className="ic-sm" /> Done
          </span>
        ) : (
          <button
            className="btn btn-primary btn-full"
            disabled={disabled}
            onClick={() => completeQuest(quest.id)}
          >
            {busy && <SpinnerIcon className="ic-sm" />}
            {label}
          </button>
        )}
      </div>

      {error && <p className="quest-error">{shortError(error.message)}</p>}
    </article>
  )
}

/** Trim long revert dumps to the human-readable reason. */
function shortError(msg: string): string {
  const m = msg.match(/reason:\s*(.+)/i) ?? msg.match(/reverted with[^:]*:\s*(.+)/i)
  if (m) return m[1].split("\n")[0]
  if (msg.toLowerCase().includes("user rejected")) return "Transaction rejected."
  return msg.split("\n")[0].slice(0, 120)
}
