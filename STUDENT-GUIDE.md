# QuestBoard Frontend — Student Starter (Pertemuan 5)

The **UI is already built** for you (components, styling, layout). Your job is
to wire it to the blockchain. You'll implement **6 files**, in order. As you
finish each, more of the app comes to life. 🎯

> Reference solution: the `questboard-frontend/` folder in this repo.
> Only peek if you're stuck!

## Setup

```bash
bun install
bun dev          # opens http://localhost:5173
```

At first the app boots but shows an empty shell — that's expected. You'll
fill it in.

## Your tasks (each maps to a slide)

| # | File | What to implement | Slide |
|---|------|-------------------|-------|
| 1 | `src/config/contracts.ts` | Paste your deployed contract **addresses** | "config/contracts.ts" |
| 2 | `src/components/ConnectButton.tsx` | Wallet connect / disconnect / switch network | "Wallet Integration" |
| 3 | `src/hooks/useQuests.ts` | Read the quest list (`useReadContract(s)`) | "Membaca Data" |
| 4 | `src/hooks/usePlayerStats.ts` | Batch-read player stats (`useReadContracts`) | "Baca Banyak Sekaligus" |
| 5 | `src/hooks/useQuestActions.ts` | Write + tx lifecycle (`useWriteContract`) | "Menulis ke Kontrak" |
| 6 | `src/hooks/useBadge.ts` | Read `badgeURI()` + fetch metadata from IPFS | "Bonus: IPFS" |

Each file has a `// TODO (P5)` block telling you exactly what to do.

## Where do the addresses come from?

After you deploy in Pertemuan 3–4, read them from:
```
questboard/ignition/deployments/<deployment-id>/deployed_addresses.json
```

## Optional — your own IPFS gateway (for the badge image)

Copy `.env.example` to `.env.local` and fill in your Pinata gateway:

```
VITE_PINATA_GATEWAY=your-gateway.mypinata.cloud
VITE_PINATA_GATEWAY_TOKEN=your_gateway_access_token
```

If you skip this, public IPFS gateways are used as a fallback.

## Done?

When all 6 are implemented: connect your wallet on Sepolia, complete quests,
watch your QST balance and badge update live. That's a full dApp. 🚀
