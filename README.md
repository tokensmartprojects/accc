# ACCC

Anti-Cabal Cabal Club on Robinhood Chain.

Mint a membership NFT. Each mint includes an NFT Account (ERC-6551) that can hold $ACCC. Secondary market is this collection only.

Identity lives in [`lib/project.ts`](lib/project.ts).

This is **not** TwinForge. TwinForge stays the factory.

## Screens

- `/` landing
- `/collection` collection + $ACCC + activity
- `/market` secondary listings
- `/mint` genesis drop
- `/nft/...` NFT + NFT Account + buy/list
- `/portfolio` ACCC holdings
- `/held?id=` minted NFTs in this browser

## Local

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run lint
npm run typecheck
npm run build
```

`npm run build` writes a static export to `out/` for Cloudflare Pages.

## Environment

Copy `.env.example` to `.env.local`.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_RPC_URL` | Optional Robinhood Chain RPC (defaults to the public endpoint) |
| `NEXT_PUBLIC_WALLETCONNECT_ID` | Enables WalletConnect in the connect modal |

Writes (buy, list, mint) are mocked until contracts exist.

## Cloudflare

Static export (`out/`). Framework preset: **None**. Build: `npm run build`. Deploy: `npx wrangler deploy`.

## Stack

Next.js App Router (static export), Tailwind, wagmi, viem, Robinhood Chain (`4663`).
