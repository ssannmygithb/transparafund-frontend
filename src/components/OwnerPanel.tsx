import { useState } from "react"
import { useAccount, useReadContract } from "wagmi"
import { QUEST_BOARD_ADDRESS, questBoardAbi } from "../config/contracts"
import { useQuestActions } from "../hooks/useQuestActions"
import { PlusIcon, SpinnerIcon } from "./icons"

/**
 * Owner-only panel for adding quests. Renders nothing unless the connected
 * account is the contract owner (read from QuestBoard.owner()).
 */
export function OwnerPanel() {
  const { address } = useAccount()
  const { data: owner } = useReadContract({
    address: QUEST_BOARD_ADDRESS,
    abi: questBoardAbi,
    functionName: "owner",
  })

  const { addQuest, isPending, isConfirming, isSuccess, error } = useQuestActions()
  const [title, setTitle] = useState("")
  const [reward, setReward] = useState("10")

  const isOwner =
    address && owner && address.toLowerCase() === (owner as string).toLowerCase()
  if (!isOwner) return null

  const busy = isPending || isConfirming

  function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim()) return
    addQuest(title.trim(), BigInt(reward || "0"))
  }

  return (
    <section className="owner-panel">
      <div className="section-head">
        <h2>Owner Console</h2>
        <span className="section-sub">You own this contract — add a new quest.</span>
      </div>
      <form className="owner-form" onSubmit={submit}>
        <input
          className="input grow"
          placeholder="Quest title (e.g. Follow us on X)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          className="input reward-input"
          type="number"
          min="0"
          value={reward}
          onChange={(e) => setReward(e.target.value)}
        />
        <span className="input-suffix">QST</span>
        <button className="btn btn-primary" disabled={busy || !title.trim()}>
          {busy ? <SpinnerIcon className="ic-sm" /> : <PlusIcon className="ic-sm" />}
          {isPending ? "Confirm…" : isConfirming ? "Mining…" : "Add Quest"}
        </button>
      </form>
      {isSuccess && <p className="owner-ok">Quest added ✓</p>}
      {error && <p className="quest-error">{error.message.split("\n")[0].slice(0, 120)}</p>}
    </section>
  )
}
