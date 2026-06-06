# QuestBoard Frontend — Starter

Workshop starter for **Pertemuan 5: Frontend Integration with Smart Contracts**
(GDGoC UIN Jakarta × ETH Jakarta — Weekly Class Web 3.0).

The UI is pre-built; you implement the Web3 integration. **Start here →
[`STUDENT-GUIDE.md`](./STUDENT-GUIDE.md).**

## Stack

- Vite + React + TypeScript (run with **Bun**)
- **wagmi v2** + **viem** — wallet & contract interaction
- TanStack Query — caching (via wagmi)

## Quick start

```bash
bun install
bun dev
```

Then follow `STUDENT-GUIDE.md` to fill in the 6 `// TODO (P5)` files.

## Project structure

```
src/
├── config/      contract addresses, ABIs, wagmi setup
├── lib/         pure helpers (format, IPFS)
├── hooks/       all blockchain interaction  ← you implement these
└── components/  the UI (pre-built)
```
