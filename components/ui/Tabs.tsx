"use client";

import { cx } from "@/lib/cx";

export function Tabs({
  tabs,
  value,
  onChange,
}: {
  tabs: { id: string; label: string }[];
  value: string;
  onChange: (id: string) => void;
}) {
  return (
    <div className="flex gap-5 overflow-x-auto border-b border-border-subtle">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          onClick={() => onChange(tab.id)}
          className={cx(
            "relative shrink-0 pb-3 text-sm font-medium",
            value === tab.id
              ? "text-text-primary"
              : "text-text-muted hover:text-text-secondary",
          )}
        >
          {tab.label}
          {value === tab.id ? (
            <span className="absolute inset-x-0 -bottom-px h-0.5 bg-forge-green" />
          ) : null}
        </button>
      ))}
    </div>
  );
}

export function EmptyState({
  title,
  body,
}: {
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-lg border border-border bg-surface-1 px-5 py-10 text-center">
      <h3 className="text-base font-semibold">{title}</h3>
      <p className="mx-auto mt-2 max-w-md text-sm text-text-secondary">{body}</p>
    </div>
  );
}

export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cx("animate-pulse rounded-md bg-surface-3", className)}
    />
  );
}
