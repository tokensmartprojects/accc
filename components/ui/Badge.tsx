import type { ReactNode } from "react";
import { cx } from "@/lib/cx";

export function Badge({
  children,
  tone = "muted",
  className,
}: {
  children: ReactNode;
  tone?: "muted" | "green" | "warning" | "error" | "info";
  className?: string;
}) {
  return (
    <span
      className={cx(
        "inline-flex items-center rounded-sm px-1.5 py-0.5 text-[10px] font-semibold tracking-wide uppercase",
        tone === "muted" && "bg-surface-3 text-text-secondary",
        tone === "green" && "bg-forge-green-muted text-forge-green",
        tone === "warning" && "bg-[#3a2e14] text-warning",
        tone === "error" && "bg-[#3a1818] text-error",
        tone === "info" && "bg-[#152536] text-info",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function VerifiedBadge({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      className={cx("h-3.5 w-3.5 shrink-0 text-forge-green", className)}
      aria-label="Verified"
    >
      <circle cx="8" cy="8" r="7" fill="currentColor" />
      <path
        d="M5 8.2 L7 10.2 L11.2 5.8"
        fill="none"
        stroke="#080A09"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function AccountBadge({ className }: { className?: string }) {
  return (
    <span
      title="Has an NFT Account"
      className={cx("inline-flex text-forge-green", className)}
    >
      <svg viewBox="0 0 12 12" className="h-3 w-3" aria-label="NFT Account">
        <path d="M6 1 L11 6 L6 11 L1 6 Z" fill="currentColor" />
      </svg>
    </span>
  );
}
