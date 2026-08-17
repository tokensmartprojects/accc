import type { Address } from "./types";

export const DEMO_OWNER: Address =
  "0x8421f4ca1fb44b1dd8516cf4c6f2e2e7c91af91a";
export const DEMO_CREATOR: Address =
  "0x8a21f4ca1fb44b1dd8516cf4c6f2e2e7c91af91a";

export const project = {
  name: "ACCC",
  fullName: "Anti-Cabal Cabal Club",
  tagline: "Anti-Cabal Cabal Club on Robinhood Chain.",
  description:
    "ACCC is the Anti-Cabal Cabal Club. Mint a membership NFT. Each one has an NFT Account that can hold $ACCC.",
  collectionName: "Anti-Cabal Cabal Club",
  collectionId: "accc",
  nftSymbol: "ACCC",
  nftPrefix: "ACCC",
  tokenName: "ACCC",
  tokenSymbol: "ACCC",
  chainId: 4663,
  nftContract: "0x71f3a91b4c2d8e9a7b6c5d4e3f2a1b0c9d8e7f6a" as Address,
  tokenContract: "0xa5e1c0de1234567890abcdef1234567890abcdef" as Address,
  tbaImplementation: "0x6551c0de6551c0de6551c0de6551c0de6551c0de" as Address,
  treasury: "0x7ea5a1a0de7ea5a1a0de7ea5a1a0de7ea5a1a0de" as Address,
  creator: DEMO_CREATOR,
  supply: 10000,
  holders: 1842,
  mintPriceEth: 0.08,
  maxPerWallet: 5,
  claimPerNft: 2000,
  floorEth: 0.72,
  volume24hEth: 48.2,
  tokenPriceUsd: 0.084,
  tokenChange24h: 4.82,
  tokenSupply: 100_000_000,
  tokenMarketCapUsd: 8_400_000,
  tokenVolume24hUsd: 420_000,
  tokenLiquidityUsd: 1_300_000,
  tokenHolders: 3904,
  logoArtId: "parallel-logo",
  bannerArtId: "parallel-banner",
  links: {
    website: "https://example.com",
    x: "https://x.com",
    discord: "https://discord.com",
  },
} as const;

export function tokenLabel() {
  return `$${project.tokenSymbol}`;
}
