import { project } from "../project";
import type { Drop } from "../types";

export const drops: Drop[] = [
  {
    id: "genesis",
    name: `Genesis ${project.collectionName}`,
    status: "live",
    priceEth: project.mintPriceEth,
    supply: project.supply,
    minted: 6821,
    maxPerWallet: project.maxPerWallet,
    artId: "wanderer-775",
    includes: {
      nftLabel: `1 ${project.nftPrefix} NFT`,
      nftAccount: true,
      tokenClaim: project.claimPerNft,
      tokenSymbol: project.tokenSymbol,
    },
  },
  {
    id: "second-drop",
    name: `${project.collectionName} II`,
    status: "upcoming",
    priceEth: 0.12,
    supply: 2500,
    minted: 0,
    maxPerWallet: 3,
    startsAt: "Sep 2, 2026",
    artId: "wanderer-8812",
    includes: {
      nftLabel: `1 ${project.nftPrefix} NFT`,
      nftAccount: true,
      tokenClaim: 800,
      tokenSymbol: project.tokenSymbol,
    },
  },
  {
    id: "founders",
    name: `${project.name} Founders`,
    status: "completed",
    priceEth: 0.05,
    supply: 500,
    minted: 500,
    maxPerWallet: 2,
    artId: "gate-12",
    includes: {
      nftLabel: `1 ${project.nftPrefix} NFT`,
      nftAccount: true,
      tokenClaim: 4000,
      tokenSymbol: project.tokenSymbol,
    },
  },
];

export function getDrop(id: string) {
  return drops.find((drop) => drop.id === id);
}

export const liveDrop = drops[0];
