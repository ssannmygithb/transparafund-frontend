import { useState } from "react"
import { GATEWAY_COUNT, gatewayUrl } from "../lib/ipfs"

/**
 * <img> for IPFS content that automatically falls back to the next gateway
 * if the current one fails (handles flaky public gateways gracefully).
 */
export function IpfsImage({
  uri,
  alt,
  className,
}: {
  uri: string | undefined
  alt: string
  className?: string
}) {
  const [gw, setGw] = useState(0)
  // Reset the gateway index when the source changes — adjusting state during
  // render (React's recommended pattern, no effect / no cascading renders).
  const [lastUri, setLastUri] = useState(uri)
  if (uri !== lastUri) {
    setLastUri(uri)
    setGw(0)
  }

  if (!uri) return null

  return (
    <img
      src={gatewayUrl(uri, gw)}
      alt={alt}
      className={className}
      onError={() => setGw((g) => (g + 1 < GATEWAY_COUNT ? g + 1 : g))}
    />
  )
}
