/**
 * IPFS helpers.
 *
 * Primary gateway = YOUR Pinata dedicated gateway (set in .env.local). It
 * reliably serves the content you pinned, unlike public gateways which 500 /
 * 504 / 403 at random. Public gateways are kept as fallbacks so the app still
 * works if the env vars aren't configured.
 *
 * On-chain we always store `ipfs://<cid>` (gateway-agnostic). Here we just
 * pick a good HTTP gateway to *display* it.
 */
const PINATA_GATEWAY = import.meta.env.VITE_PINATA_GATEWAY as string | undefined
const PINATA_TOKEN = import.meta.env.VITE_PINATA_GATEWAY_TOKEN as string | undefined

type GatewayFn = (cidPath: string) => string

// If your dedicated Pinata gateway is configured (.env.local), use ONLY that —
// it reliably serves your pins and keeps the network tab clean. The public
// gateways are a fallback only for setups without a configured gateway.
const GATEWAYS: GatewayFn[] = PINATA_GATEWAY
  ? [
      (p: string) =>
        `https://${PINATA_GATEWAY}/ipfs/${p}` +
        (PINATA_TOKEN ? `?pinataGatewayToken=${PINATA_TOKEN}` : ""),
    ]
  : [
      (p) => `https://ipfs.io/ipfs/${p}`,
      (p) => `https://dweb.link/ipfs/${p}`,
      (p) => `https://4everland.io/ipfs/${p}`,
    ]

export const GATEWAY_COUNT = GATEWAYS.length

/** Extract the CID/path from an ipfs:// URI, a gateway URL, or a bare CID. */
export function ipfsPath(uri: string | undefined): string | null {
  if (!uri) return null
  if (uri.startsWith("ipfs://")) return uri.slice("ipfs://".length)
  const m = uri.match(/\/ipfs\/(.+?)(\?.*)?$/)
  if (m) return m[1]
  if (uri.startsWith("http")) return null // plain http(s) URL — use as-is
  return uri // assume bare CID
}

/** Build a gateway URL for the given ipfs URI using gateway #index. */
export function gatewayUrl(uri: string | undefined, index = 0): string {
  if (!uri) return ""
  const path = ipfsPath(uri)
  if (path === null) return uri // not IPFS — return the original URL
  return GATEWAYS[Math.min(index, GATEWAYS.length - 1)](path)
}

/** Fetch + parse JSON, trying each gateway until one succeeds. */
export async function fetchIpfsJson<T = unknown>(uri: string): Promise<T> {
  const path = ipfsPath(uri)
  if (path === null) {
    const r = await fetch(uri)
    return (await r.json()) as T
  }
  let lastError: unknown
  for (const gw of GATEWAYS) {
    try {
      const r = await fetch(gw(path), { signal: AbortSignal.timeout(8000) })
      if (r.ok) return (await r.json()) as T
      lastError = new Error(`HTTP ${r.status}`)
    } catch (e) {
      lastError = e
    }
  }
  throw lastError ?? new Error("All IPFS gateways failed")
}
