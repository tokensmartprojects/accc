import Link from "next/link";
import { Clock } from "lucide-react";
import { Atmosphere } from "@/components/art/Atmosphere";
import { AccountBadge, VerifiedBadge } from "@/components/ui/Badge";
import { nftPath } from "@/lib/data/catalog";
import type { CollectionNFT } from "@/lib/types";

export function NFTCard({ nft, href }: { nft: CollectionNFT; href?: string }) {
  return (
    <Link
      href={href ?? nftPath(nft)}
      className="group overflow-hidden rounded-lg border border-border bg-surface-1 hover:border-[#3a4440]"
    >
      <Atmosphere id={nft.artId} className="aspect-square" rounded="rounded-none" />
      <div className="space-y-2 p-3">
        <div className="flex items-center gap-1.5 text-xs text-text-secondary">
          <span className="truncate">{nft.collectionName}</span>
          {nft.verified ? <VerifiedBadge /> : null}
          {nft.nftAccount ? <AccountBadge /> : null}
        </div>
        <p className="truncate text-sm font-medium">{nft.name}</p>
        <div className="flex items-end justify-between gap-2">
          <div>
            {nft.market?.listing ? (
              <p className="tabular text-sm font-medium">
                ◇ {nft.market.listing.priceEth.toFixed(2)} ETH
              </p>
            ) : null}
            {nft.market?.bestOffer ? (
              <p className="text-xs text-text-muted">
                Best offer {nft.market.bestOffer.priceEth.toFixed(2)} ETH
              </p>
            ) : null}
            {!nft.listed && nft.nftAccount ? (
              <p className="text-xs text-text-muted">Minted</p>
            ) : null}
          </div>
          {nft.listed ? <Clock className="h-3.5 w-3.5 text-text-muted" /> : null}
        </div>
      </div>
    </Link>
  );
}
