import { parseAbi } from "viem"

/**
 * ┌─ TODO (P5) ────────────────────────────────────────────────────────┐
 * │ Paste YOUR deployed contract addresses below — find them in        │
 * │ questboard/ignition/deployments/<id>/deployed_addresses.json.      │
 * │ The ABIs are already provided; you don't need to edit them.        │
 * └─────────────────────────────────────────────────────────────────────┘
 */
export const CHAIN_ID = 11155111 // Sepolia

// TODO: replace with your own deployed addresses
export const QUEST_BOARD_ADDRESS =
  "0x0000000000000000000000000000000000000000" as const
export const QUEST_TOKEN_ADDRESS =
  "0x0000000000000000000000000000000000000000" as const
export const QUEST_BADGE_ADDRESS =
  "0x0000000000000000000000000000000000000000" as const

/** QuestBoard — core game contract. (Provided.) */
export const questBoardAbi = parseAbi([
  "function owner() view returns (address)",
  "function questCount() view returns (uint256)",
  "function quests(uint256) view returns (string title, uint256 reward, bool active)",
  "function points(address) view returns (uint256)",
  "function completedCount(address) view returns (uint256)",
  "function badgeAwarded(address) view returns (bool)",
  "function completed(address, uint256) view returns (bool)",
  "function badgeURI() view returns (string)",
  "function BADGE_MILESTONE() view returns (uint256)",
  "function addQuest(string title, uint256 reward)",
  "function completeQuest(uint256 questId)",
  "function deactivateQuest(uint256 questId)",
  "event QuestAdded(uint256 indexed questId, string title)",
  "event QuestCompleted(address indexed player, uint256 indexed questId, uint256 reward)",
  "event BadgeAwarded(address indexed player, uint256 tokenId)",
])

/** QuestToken — ERC-20 reward. (Provided.) */
export const erc20Abi = parseAbi([
  "function balanceOf(address) view returns (uint256)",
  "function symbol() view returns (string)",
  "function decimals() view returns (uint8)",
])

/** QuestBadge — ERC-721 milestone NFT. (Provided.) */
export const erc721Abi = parseAbi([
  "function balanceOf(address) view returns (uint256)",
  "function tokenURI(uint256) view returns (string)",
])
