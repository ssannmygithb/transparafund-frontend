import { http, createConfig } from "wagmi"
import { sepolia } from "wagmi/chains"
import { injected } from "wagmi/connectors"

/**
 * wagmi config — the single source of truth for "how do we talk to the chain".
 *
 * - chains:      which networks the app supports (just Sepolia here)
 * - connectors:  how the user connects a wallet (injected = MetaMask & friends)
 * - transports:  the RPC endpoint used for read calls per chain
 */
export const config = createConfig({
  chains: [sepolia],
  connectors: [injected()],
  transports: {
    [sepolia.id]: http("https://ethereum-sepolia-rpc.publicnode.com"),
  },
})

// Make wagmi's hooks fully type-aware of our config.
declare module "wagmi" {
  interface Register {
    config: typeof config
  }
}
