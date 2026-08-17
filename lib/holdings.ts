import { project } from "./project";
import type { Address, CollectionNFT, Drop, Holding, Trait } from "./types";

const KEY = "collection.holdings.v1";
const EMPTY: Holding[] = [];
const listeners = new Set<() => void>();
let snapshot: Holding[] = EMPTY;

export type { Holding };

function read(): Holding[] {
  if (typeof window === "undefined") return EMPTY;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return EMPTY;
    const parsed = JSON.parse(raw) as Holding[];
    return Array.isArray(parsed) ? parsed : EMPTY;
  } catch {
    return EMPTY;
  }
}

function write(next: Holding[]) {
  snapshot = next;
  window.localStorage.setItem(KEY, JSON.stringify(next));
  listeners.forEach((listener) => listener());
}

function hydrate() {
  snapshot = read();
  return snapshot;
}

export function subscribeHoldings(listener: () => void) {
  if (snapshot === EMPTY && typeof window !== "undefined") hydrate();
  listeners.add(listener);
  const onStorage = (event: StorageEvent) => {
    if (event.key === KEY) {
      snapshot = read();
      listener();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

export function getHoldingsSnapshot() {
  if (typeof window === "undefined") return EMPTY;
  if (snapshot === EMPTY) return hydrate();
  return snapshot;
}

export function getServerHoldingsSnapshot() {
  return EMPTY;
}

export function holdingsFor(owner: Address) {
  return getHoldingsSnapshot().filter(
    (holding) => holding.owner.toLowerCase() === owner.toLowerCase(),
  );
}

function accountAddress(tokenId: string): Address {
  const hex = tokenId.padStart(8, "0").slice(-8);
  return `0x71f8${hex}abcdef1234567890abcd${hex}` as Address;
}

const arts = ["wanderer-775", "wanderer-8812", "gate-12", "origin-192"];
const layers = ["Ash", "Iron", "Pale", "Deep"];
const classes = ["Scout", "Warden", "Seer", "Keeper"];
const marks = ["Split Moon", "Quiet Star", "Void Mark", "Twin Mark"];

function traits(seed: number): Trait[] {
  return [
    { trait_type: "Layer", value: layers[seed % layers.length] },
    { trait_type: "Class", value: classes[seed % classes.length] },
    { trait_type: "Mark", value: marks[seed % marks.length] },
  ];
}

export function mintHoldings(owner: Address, drop: Drop, quantity: number) {
  const current = getHoldingsSnapshot();
  const startId = 10000 + current.length;
  const created: Holding[] = [];

  for (let index = 0; index < quantity; index += 1) {
    const tokenId = String(startId + index + 1);
    const seed = startId + index;
    const nft: CollectionNFT = {
      chainId: project.chainId,
      contract: project.nftContract,
      tokenId,
      collectionId: project.collectionId,
      collectionName: project.collectionName,
      verified: true,
      owner,
      name: `${project.nftPrefix} #${tokenId}`,
      description: `Minted from ${drop.name}.`,
      artId: arts[seed % arts.length],
      listed: false,
      traits: traits(seed),
      nftAccount: drop.includes.nftAccount
        ? {
            address: accountAddress(tokenId),
            nft: { contract: project.nftContract, tokenId },
            controller: owner,
            assets: [],
            estimatedTokenValue: 0,
            estimatedNftValue: 0,
            estimatedTotalValue: 0,
          }
        : undefined,
    };

    created.push({
      id: `${drop.id}-${tokenId}-${Date.now()}-${index}`,
      owner,
      dropId: drop.id,
      mintedAt: new Date().toISOString(),
      mintPriceEth: drop.priceEth,
      claimEligible: drop.includes.tokenClaim,
      claimed: false,
      claimSymbol: project.tokenSymbol,
      claimName: project.tokenName,
      claimContract: project.tokenContract,
      nft,
    });
  }

  write([...current, ...created]);
  return created;
}

export function claimHolding(id: string) {
  const current = getHoldingsSnapshot();
  const next = current.map((holding) => {
    if (holding.id !== id || holding.claimed || !holding.nft.nftAccount) {
      return holding;
    }
    const valueUsd = Math.round(holding.claimEligible * project.tokenPriceUsd);
    const account = holding.nft.nftAccount;
    return {
      ...holding,
      claimed: true,
      claimEligible: 0,
      nft: {
        ...holding.nft,
        nftAccount: {
          ...account,
          assets: [
            ...account.assets,
            {
              kind: "token" as const,
              symbol: holding.claimSymbol ?? project.tokenSymbol,
              name: holding.claimName ?? project.tokenName,
              contract: holding.claimContract ?? project.tokenContract,
              balance: holding.claimEligible,
              estimatedValueUsd: valueUsd,
            },
          ],
          estimatedTokenValue: account.estimatedTokenValue + valueUsd,
          estimatedTotalValue: account.estimatedTotalValue + valueUsd,
        },
      },
    };
  });
  write(next);
  return next.find((holding) => holding.id === id);
}

export function holdingPath(id: string) {
  return `/held/?id=${encodeURIComponent(id)}`;
}
