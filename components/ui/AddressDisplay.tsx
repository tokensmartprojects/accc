"use client";

import { Check, Copy, ExternalLink } from "lucide-react";
import { useState } from "react";
import { explorerAddressUrl } from "@/lib/chain";
import { cx } from "@/lib/cx";
import { abbreviateAddress } from "@/lib/format";

export function AddressDisplay({
  address,
  className,
}: {
  address: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    await navigator.clipboard.writeText(address);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1200);
  }

  return (
    <span className={cx("inline-flex items-center gap-1.5 font-mono text-sm", className)}>
      <span title={address}>{abbreviateAddress(address)}</span>
      <button
        type="button"
        onClick={copy}
        className="text-text-muted hover:text-text-primary"
        aria-label="Copy address"
      >
        {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
      </button>
      <a
        href={explorerAddressUrl(address)}
        target="_blank"
        rel="noreferrer"
        className="text-text-muted hover:text-text-primary"
        aria-label="View on explorer"
      >
        <ExternalLink className="h-3.5 w-3.5" />
      </a>
    </span>
  );
}

export function PriceDisplay({
  eth,
  usd,
  size = "md",
}: {
  eth?: number;
  usd?: number;
  size?: "sm" | "md" | "lg";
}) {
  return (
    <span
      className={cx(
        "tabular font-medium",
        size === "sm" && "text-sm",
        size === "md" && "text-base",
        size === "lg" && "text-2xl",
      )}
    >
      {eth !== undefined
        ? `${eth.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })} ETH`
        : usd !== undefined
          ? usd.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
              maximumFractionDigits: usd < 1 ? 3 : 0,
            })
          : "—"}
    </span>
  );
}
