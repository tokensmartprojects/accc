import Link from "next/link";
import { Atmosphere } from "@/components/art/Atmosphere";
import { NFTCard } from "@/components/cards/NFTCard";
import { Button } from "@/components/ui/Button";
import { listedNfts } from "@/lib/data/catalog";
import { formatEth, formatUsdPrice } from "@/lib/format";
import { project, tokenLabel } from "@/lib/project";

export default function HomePage() {
  const listings = listedNfts().slice(0, 4);

  return (
    <div className="space-y-16">
      <section className="relative overflow-hidden rounded-[10px] border border-border">
        <Atmosphere
          id={project.bannerArtId}
          className="h-[280px] md:h-[360px]"
          rounded="rounded-none"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
          <p className="text-sm font-medium text-forge-green">Robinhood Chain</p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight md:text-5xl">
            {project.name}
          </h1>
          <p className="mt-1 text-lg text-text-primary">{project.fullName}</p>
          <p className="mt-3 max-w-xl text-base text-text-secondary">
            {project.tagline}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/mint/">
              <Button size="lg">Mint</Button>
            </Link>
            <Link href="/collection/">
              <Button size="lg" variant="secondary">
                View collection
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        <Stat label="Floor" value={formatEth(project.floorEth)} />
        <Stat label={tokenLabel()} value={formatUsdPrice(project.tokenPriceUsd)} />
        <Stat label="24h volume" value={formatEth(project.volume24hEth, 1)} />
      </section>

      <section className="rounded-lg border border-border bg-surface-1 p-6 md:p-8">
        <p className="text-xs font-semibold tracking-wide text-text-muted">
          HOW THIS COLLECTION WORKS
        </p>
        <div className="mt-6 font-mono text-sm leading-7 text-text-secondary">
          <p className="text-text-primary">NFT</p>
          <p className="pl-4">│</p>
          <p className="pl-4">
            ├── owns → <span className="text-text-primary">NFT Account</span>
          </p>
          <p className="pl-8">│</p>
          <p className="pl-8">├── {tokenLabel()}</p>
          <p className="pl-8">└── NFTs</p>
        </div>
      </section>

      <section>
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-semibold">On the market</h2>
          <Link href="/market/" className="text-sm text-text-secondary hover:text-text-primary">
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {listings.map((nft) => (
            <NFTCard key={`${nft.contract}-${nft.tokenId}`} nft={nft} />
          ))}
        </div>
      </section>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border bg-surface-1 p-4">
      <p className="text-xs text-text-muted">{label}</p>
      <p className="mt-1 tabular text-lg font-semibold">{value}</p>
    </div>
  );
}
