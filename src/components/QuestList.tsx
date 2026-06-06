import { useQuests } from "../hooks/useQuests"
import { QuestCard } from "./QuestCard"

export function QuestList() {
  const { quests, isLoading } = useQuests()

  return (
    <section className="quest-section">
      <div className="section-head">
        <h2>Quests</h2>
        <span className="section-sub">Complete a quest to earn QST. Hit the milestone for a badge.</span>
      </div>

      {isLoading ? (
        <div className="quest-grid">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="quest-card skeleton-card" />
          ))}
        </div>
      ) : quests.length === 0 ? (
        <div className="empty">No quests yet. The owner can add the first one below.</div>
      ) : (
        <div className="quest-grid">
          {quests.map((q) => (
            <QuestCard key={q.id} quest={q} index={q.id} />
          ))}
        </div>
      )}
    </section>
  )
}
