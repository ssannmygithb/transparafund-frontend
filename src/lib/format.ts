import { formatUnits } from "viem"

/** Format a raw ERC-20 amount (18 decimals) into a friendly string. */
export function formatToken(
  raw: bigint | undefined,
  decimals = 18,
  maxFractionDigits = 2,
): string {
  if (raw === undefined) return "—"
  const n = Number(formatUnits(raw, decimals))
  return n.toLocaleString(undefined, { maximumFractionDigits: maxFractionDigits })
}

/** 0x1234…abcd */
export function shortenAddress(addr?: string): string {
  if (!addr) return ""
  return `${addr.slice(0, 6)}…${addr.slice(-4)}`
}

/** Render a plain bigint count as a string. */
export function formatCount(raw: bigint | undefined): string {
  return raw === undefined ? "—" : raw.toString()
}
