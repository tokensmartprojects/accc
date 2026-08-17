"use client";

import Link from "next/link";
import { useState } from "react";
import { Atmosphere } from "@/components/art/Atmosphere";
import { ProjectVideo } from "@/components/art/ProjectVideo";
import { NFTCard } from "@/components/cards/NFTCard";
import { AddressDisplay } from "@/components/ui/AddressDisplay";
import { Badge, VerifiedBadge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Tabs } from "@/components/ui/Tabs";
import { activity, nfts } from "@/lib/data/catalog";
import { holdingPath } from "@/lib/holdings";
import { formatEth, formatUsd, formatUsdPrice } from "@/lib/format";
import { project, tokenLabel } from "@/lib/project";
import { useHoldings } from "@/lib/useHoldings";
import type { CollectionNFT } from "@/lib/types";

export function CollectionView() {
  const [tab, setTab] = useState("overview");
  const holdings = useHoldings();
  const minted = holdings.map((holding) => holding.nft);
  const items = [
    ...minted,
    ...nfts.filter((nft) => !alreadyShown(minted, nft)),
  ];

  function hrefFor(nft: CollectionNFT) {
    const holding = holdings.find(
      (item) =>
        item.nft.contract.toLowerCase() === nft.contract.toLowerCase() &&
        item.nft.tokenId === nft.tokenId,
    );
    return holding ? holdingPath(holding.id) : undefined;
  }

  return (
    <div>
      <ProjectVideo
        src={project.videos.collection}
        className="h-48 w-full md:h-64"
        rounded="rounded-[10px]"
      />
      <div className="-mt-8 ml-4 flex items-end gap-4 md:ml-0">
        <Atmosphere
          id={project.logoArtId}
          className="h-20 w-20 border-4 border-bg"
          rounded="rounded-lg"
        />
      </div>
      <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-[32px] font-semibold leading-10">{project.name}</h1>
            <VerifiedBadge className="h-5 w-5" />
            <Badge tone="green">Collection</Badge>
          </div>
          <p className="mt-2 text-text-secondary">{project.description}</p>
          <p className="mt-2 text-sm text-text-muted">
            Created by <AddressDisplay address={project.creator} />
          </p>
          <p className="mt-1 text-sm text-text-secondary">
            {project.supply.toLocaleString()} NFTs · {project.holders.toLocaleString()}{" "}
            holders
          </p>
        </div>
        <div className="flex gap-2">
          <Link href="/mint/">
            <Button>Mint genesis drop</Button>
          </Link>
        </div>
      </div>

      <div className="mt-8">
        <Tabs
          value={tab}
          onChange={setTab}
          tabs={[
            { id: "overview", label: "Overview" },
            { id: "nfts", label: "NFTs" },
            { id: "token", label: tokenLabel() },
            { id: "activity", label: "Activity" },
          ]}
        />
      </div>

      {tab === "overview" || tab === "nfts" ? (
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <MarketStat label="NFT floor" value={formatEth(project.floorEth)} />
          <MarketStat
            label={tokenLabel()}
            value={formatUsdPrice(project.tokenPriceUsd)}
          />
          <MarketStat label="24h volume" value={formatEth(project.volume24hEth, 1)} />
        </div>
      ) : null}

      {tab === "overview" ? (
        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_320px]">
          <div>
            <h2 className="text-xl font-semibold">About</h2>
            <dl className="mt-4 space-y-3 text-sm">
              <Row label="NFT collection" value={project.collectionName} />
              <Row label="Token" value={tokenLabel()} />
              <Row label="NFT Accounts" value="Enabled" />
            </dl>
            <p className="mt-4 max-w-xl text-sm text-text-secondary">
              Every mint includes an NFT Account. Claim {tokenLabel()} into that
              account — not the owner wallet.
            </p>
            <h3 className="mt-10 text-lg font-semibold">NFTs</h3>
            <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
              {items.slice(0, 4).map((nft) => (
                <NFTCard
                  key={`${nft.contract}-${nft.tokenId}`}
                  nft={nft}
                  href={hrefFor(nft)}
                />
              ))}
            </div>
          </div>
          <aside className="h-fit rounded-lg border border-border bg-surface-1 p-5">
            <p className="text-sm text-text-muted">{tokenLabel()}</p>
            <p className="mt-1 tabular text-2xl font-semibold">
              {formatUsdPrice(project.tokenPriceUsd)}
            </p>
            <p className="text-sm text-forge-green">+{project.tokenChange24h}%</p>
            <dl className="mt-5 space-y-3 text-sm">
              <Row label="Market cap" value={formatUsd(project.tokenMarketCapUsd)} />
              <Row label="Liquidity" value={formatUsd(project.tokenLiquidityUsd)} />
            </dl>
            <Button className="mt-5 w-full">Trade {tokenLabel()}</Button>
          </aside>
        </div>
      ) : null}

      {tab === "nfts" ? (
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((nft) => (
            <NFTCard
              key={`${nft.contract}-${nft.tokenId}`}
              nft={nft}
              href={hrefFor(nft)}
            />
          ))}
        </div>
      ) : null}

      {tab === "token" ? (
        <div className="mt-8 max-w-2xl space-y-6">
          <div>
            <h2 className="text-2xl font-semibold">{tokenLabel()}</h2>
            <p className="text-sm text-text-secondary">
              {project.name} ecosystem token
            </p>
            <p className="mt-3 tabular text-3xl font-semibold">
              {formatUsdPrice(project.tokenPriceUsd)}
            </p>
            <p className="text-sm text-forge-green">+{project.tokenChange24h}%</p>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <MarketStat label="Market cap" value={formatUsd(project.tokenMarketCapUsd)} />
            <MarketStat label="24h volume" value={formatUsd(project.tokenVolume24hUsd)} />
            <MarketStat label="Liquidity" value={formatUsd(project.tokenLiquidityUsd)} />
          </div>
          <div className="flex gap-2">
            <Button>Buy</Button>
            <Button variant="secondary">Sell</Button>
          </div>
          <dl className="space-y-3 text-sm">
            <Row label="Total supply" value={project.tokenSupply.toLocaleString()} />
            <Row label="Holders" value={project.tokenHolders.toLocaleString()} />
            <div>
              <p className="text-text-muted">Contract</p>
              <AddressDisplay address={project.tokenContract} />
            </div>
          </dl>
        </div>
      ) : null}

      {tab === "activity" ? (
        <div className="mt-8 divide-y divide-border-subtle rounded-lg border border-border">
          {activity.map((item) => (
            <div key={item.id} className="flex items-center justify-between px-4 py-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">
                  {item.type}
                </p>
                <p className="text-sm font-medium">{item.title}</p>
              </div>
              <div className="text-right">
                {item.amount ? (
                  <p className="tabular text-sm">{item.amount}</p>
                ) : null}
                <p className="text-xs text-text-muted">{item.at}</p>
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function MarketStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border bg-surface-1 p-4">
      <p className="text-xs text-text-muted">{label}</p>
      <p className="mt-1 tabular text-lg font-semibold">{value}</p>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <dt className="text-text-muted">{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}

function alreadyShown(minted: CollectionNFT[], nft: CollectionNFT) {
  return minted.some(
    (item) =>
      item.contract.toLowerCase() === nft.contract.toLowerCase() &&
      item.tokenId === nft.tokenId,
  );
}
