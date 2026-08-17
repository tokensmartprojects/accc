"use client";

import { useState } from "react";
import { NFTCard } from "@/components/cards/NFTCard";
import { listedNfts } from "@/lib/data/catalog";
import { project } from "@/lib/project";
import { cx } from "@/lib/cx";

const sorts = ["Trending", "Price", "New"] as const;

export default function MarketPage() {
  const [sort, setSort] = useState<(typeof sorts)[number]>("Trending");
  const items = [...listedNfts()];
  if (sort === "Price") {
    items.sort(
      (a, b) =>
        (a.market?.listing?.priceEth ?? 0) - (b.market?.listing?.priceEth ?? 0),
    );
  }
  if (sort === "New") items.reverse();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-[32px] font-semibold leading-10">Market</h1>
        <p className="mt-2 max-w-xl text-sm text-text-secondary">
          Secondary listings for {project.collectionName} only. Buying an NFT
          with an NFT Account also transfers whatever that account holds.
        </p>
        <div className="mt-4 flex gap-5 border-b border-border-subtle">
          {sorts.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setSort(item)}
              className={cx(
                "relative pb-3 text-sm font-medium",
                sort === item ? "text-text-primary" : "text-text-muted",
              )}
            >
              {item}
              {sort === item ? (
                <span className="absolute inset-x-0 -bottom-px h-0.5 bg-forge-green" />
              ) : null}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((nft) => (
          <NFTCard key={`${nft.contract}-${nft.tokenId}`} nft={nft} />
        ))}
      </div>
    </div>
  );
}
