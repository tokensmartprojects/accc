import Link from "next/link";
import { AddressDisplay } from "@/components/ui/AddressDisplay";
import { Button } from "@/components/ui/Button";
import { nftPath } from "@/lib/data/catalog";
import { formatTokenAmount, formatUsd } from "@/lib/format";
import type { NftAccount } from "@/lib/types";

export function NftAccountPanel({
  account,
  isOwner,
  compact = false,
}: {
  account: NftAccount;
  isOwner?: boolean;
  compact?: boolean;
}) {
  return (
    <section className="rounded-lg border border-border bg-surface-1 p-5">
      <h3 className="text-base font-semibold">NFT Account</h3>
      <p className="mt-1 text-sm text-text-secondary">
        This NFT controls its own onchain account.
      </p>
      <p className="mt-1 text-xs text-text-muted">Powered by ERC-6551</p>
      <div className="mt-4">
        <p className="text-xs text-text-muted">Account</p>
        <AddressDisplay address={account.address} />
      </div>
      <div className="mt-5">
        <p className="mb-2 text-xs font-semibold tracking-wide text-text-muted">
          ASSETS
        </p>
        <div className="divide-y divide-border-subtle">
          {account.assets.length === 0 ? (
            <p className="py-3 text-sm text-text-muted">No assets yet.</p>
          ) : (
            account.assets.map((asset) => (
              <div
                key={asset.kind === "token" ? asset.symbol : asset.name}
                className="flex items-center justify-between py-3"
              >
                <div>
                  <p className="text-sm font-medium">
                    {asset.kind === "token" ? `$${asset.symbol}` : asset.name}
                  </p>
                  {asset.kind === "token" ? (
                    <p className="tabular text-xs text-text-muted">
                      {formatTokenAmount(asset.balance)}
                    </p>
                  ) : (
                    <p className="text-xs text-text-muted">{asset.collection}</p>
                  )}
                </div>
                <p className="tabular text-sm">{formatUsd(asset.estimatedValueUsd)}</p>
              </div>
            ))
          )}
        </div>
        <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
          <span className="text-sm text-text-secondary">Estimated value</span>
          <span className="tabular font-semibold">
            {formatUsd(account.estimatedTotalValue)}
          </span>
        </div>
      </div>
      {!compact ? (
        <div className="mt-5 flex flex-wrap gap-2">
          <Button variant="secondary" size="sm">
            View Account
          </Button>
          <Button variant="secondary" size="sm">
            Deposit
          </Button>
          {isOwner ? (
            <Button variant="secondary" size="sm">
              Withdraw / Manage
            </Button>
          ) : null}
        </div>
      ) : null}
      {account.assets.some((asset) => asset.kind === "nft") ? (
        <p className="mt-3 text-xs text-text-muted">
          Contained NFTs remain assets of this NFT Account, not of the owner wallet.
        </p>
      ) : null}
    </section>
  );
}

export function NftAccountRow({
  name,
  account,
  href,
}: {
  name: string;
  account: NftAccount;
  href: string;
}) {
  return (
    <Link
      href={
        href ||
        nftPath({
          chainId: 4663,
          contract: account.nft.contract,
          tokenId: account.nft.tokenId,
        })
      }
      className="grid grid-cols-3 items-center gap-4 rounded-md px-2 py-4 hover:bg-surface-2"
    >
      <span className="text-sm font-medium">{name}</span>
      <span className="tabular text-sm text-text-secondary">{account.assets.length}</span>
      <span className="tabular text-right text-sm">
        {formatUsd(account.estimatedTotalValue)}
      </span>
    </Link>
  );
}
