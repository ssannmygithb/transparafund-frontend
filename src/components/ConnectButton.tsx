/**
 * ┌─ TODO (P5): Wallet Integration ────────────────────────────────────┐
 * │ Implement wallet connect with wagmi. See slide "Wallet Integration".│
 * │                                                                     │
 * │ 1. import { useAccount, useConnect, useDisconnect, useChainId,      │
 * │             useSwitchChain } from "wagmi"                           │
 * │ 2. import { CHAIN_ID } from "../config/contracts"                   │
 * │ 3. not connected  -> button -> connect({ connector: connectors[0] })│
 * │ 4. wrong network  -> button -> switchChain({ chainId: CHAIN_ID })   │
 * │ 5. connected      -> show shortened address; click to disconnect    │
 * └─────────────────────────────────────────────────────────────────────┘
 */
export function ConnectButton() {
  return (
    <button className="btn btn-primary" disabled>
      Connect Wallet (TODO)
    </button>
  )
}
