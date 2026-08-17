"use client";

import Link from "next/link";
import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Atmosphere } from "@/components/art/Atmosphere";
import { NftAccountPanel } from "@/components/account/NftAccountPanel";
import { AddressDisplay } from "@/components/ui/AddressDisplay";
import { AccountBadge, VerifiedBadge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { EmptyState, Tabs } from "@/components/ui/Tabs";
import { claimHolding, holdingPath } from "@/lib/holdings";
import { useHoldings } from "@/lib/useHoldings";
import { ethToUsd, formatEth, formatUsd } from "@/lib/format";
import { project } from "@/lib/project";

function HeldInner() {
  const params = useSearchParams();
  const id = params.get("id");
  const holdings = useHoldings();
  const holding = holdings.find((item) => item.id === id);
  const [tab, setTab] = useState("account");

  if (!holding) {
    return (
      <EmptyState
        title="Minted NFT not found"
        body="This holding lives in this browser. Mint from the live drop, or open the NFT from your portfolio."
      />
    );
  }

  const nft = holding.nft;
  const account = nft.nftAccount;
  const mintUsd = ethToUsd(holding.mintPriceEth);
  const contained = account?.estimatedTotalValue ?? 0;
  const symbol = holding.claimSymbol ?? project.tokenSymbol;

  return (
    <div className="space-y-8">
      <p className="text-sm text-text-muted">
        <Link href="/portfolio/" className="hover:text-text-primary">
          Portfolio
        </Link>
        <span className="px-2">/</span>
        {nft.name}
      </p>
      <div className="grid gap-8 lg:grid-cols-2">
        <Atmosphere id={nft.artId} className="aspect-square w-full" rounded="rounded-lg" />
        <div>
          <Link
            href="/collection/"
            className="inline-flex items-center gap-1.5 text-sm text-text-secondary"
          >
            {nft.collectionName}
            {nft.verified ? <VerifiedBadge /> : null}
            {account ? <AccountBadge /> : null}
          </Link>
          <h1 className="mt-2 text-[32px] font-semibold leading-10">{nft.name}</h1>
          <div className="mt-4 space-y-2 text-sm">
            <p className="text-text-muted">Owned by</p>
            <AddressDisplay address={nft.owner} />
            {account ? (
              <>
                <p className="pt-2 text-text-muted">NFT Account</p>
                <AddressDisplay address={account.address} />
              </>
            ) : null}
          </div>
          <div className="mt-6 rounded-lg border border-border bg-surface-1 p-4">
            <p className="text-xs text-text-muted">Minted for</p>
            <p className="tabular text-2xl font-semibold">
              {formatEth(holding.mintPriceEth)}
            </p>
            <p className="text-sm text-text-secondary">{formatUsd(mintUsd)}</p>
          </div>
          {holding.claimEligible > 0 ? (
            <div className="mt-4 rounded-lg border border-border bg-surface-1 p-4">
              <p className="text-sm font-medium">Token claim</p>
              <p className="mt-1 text-sm text-text-secondary">
                {holding.claimEligible.toLocaleString()} ${symbol} can be claimed
                into this NFT’s NFT Account.
              </p>
              <Button className="mt-3" onClick={() => claimHolding(holding.id)}>
                Claim into NFT Account
              </Button>
            </div>
          ) : null}
          <div className="mt-4 grid grid-cols-2 gap-3 rounded-lg border border-border bg-surface-1 p-4 text-sm">
            <div>
              <p className="text-xs text-text-muted">NFT estimated value</p>
              <p className="tabular font-medium">{formatUsd(mintUsd)}</p>
            </div>
            <div>
              <p className="text-xs text-text-muted">Contained assets</p>
              <p className="tabular font-medium">{formatUsd(contained)}</p>
            </div>
          </div>
        </div>
      </div>

      <Tabs
        value={tab}
        onChange={setTab}
        tabs={[
          { id: "overview", label: "Overview" },
          { id: "account", label: "NFT Account" },
          { id: "traits", label: "Traits" },
        ]}
      />

      {tab === "overview" ? (
        <p className="max-w-2xl text-sm text-text-secondary">{nft.description}</p>
      ) : null}
      {tab === "account" && account ? (
        <NftAccountPanel account={account} isOwner />
      ) : null}
      {tab === "traits" ? (
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {nft.traits.map((trait) => (
            <div
              key={trait.trait_type}
              className="rounded-lg border border-border bg-surface-1 p-3"
            >
              <p className="text-xs uppercase tracking-wide text-text-muted">
                {trait.trait_type}
              </p>
              <p className="mt-1 text-sm font-medium">{trait.value}</p>
            </div>
          ))}
        </div>
      ) : null}
      <p className="text-xs text-text-muted">
        Showcase mint. No onchain transfer occurred. Bookmark {holdingPath(holding.id)}{" "}
        in this browser to return.
      </p>
    </div>
  );
}

export default function HeldPage() {
  return (
    <Suspense fallback={<p className="text-sm text-text-muted">Loading holding…</p>}>
      <HeldInner />
    </Suspense>
  );
}
