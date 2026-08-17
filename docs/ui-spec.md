# ACCC — Anti-Cabal Cabal Club

Dedicated NFT project on Robinhood Chain. Visual chrome matches TwinForge’s dark UI. Product is this collection only — not a factory.

## Product

Hierarchy: **ACCC → NFT → NFT Account → $ACCC / NFTs**

Every mint can include an NFT Account (ERC-6551). Claim `$ACCC` into that account, not the owner wallet.

Identity in `lib/project.ts`.

## Visual identity

Dark UI, forge green `#65E65F`, Inter. Stand-in Atmosphere art until ACCC assets land.

## Navigation

Collection · Market · Mint. Portfolio via wallet menu. Mobile: Collection · Market · Mint · Me.

## Critical UX

Never confuse NFT owner, NFT Account address, and assets held by the NFT Account.

Whenever an NFT with a non-empty NFT Account is listed, bought, or transferred, surface the account contents.

Use **Estimated value**.

## Routes

`/` `/collection` `/market` `/mint` `/nft/:chain/:contract/:tokenId` `/portfolio` `/held?id=`
