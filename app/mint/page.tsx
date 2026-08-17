"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { DropCard } from "@/components/cards/DropCard";
import { DropView } from "@/components/pages/DropView";
import { EmptyState } from "@/components/ui/Tabs";
import { drops, getDrop, liveDrop } from "@/lib/data/drops";

function MintInner() {
  const params = useSearchParams();
  const id = params.get("id");
  const selected = id ? getDrop(id) : liveDrop;
  const others = drops.filter((drop) => drop.id !== selected?.id);

  if (id && !selected) {
    return (
      <EmptyState
        title="Drop not found"
        body="This mint page only lists drops for this collection."
      />
    );
  }

  if (!selected) {
    return (
      <EmptyState
        title="No live drop"
        body="Minting events for this collection will appear here."
      />
    );
  }

  return (
    <div className="space-y-12">
      <DropView drop={selected} />
      {others.length ? (
        <section>
          <h2 className="mb-4 text-xl font-semibold">Other drops</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((drop) => (
              <DropCard key={drop.id} drop={drop} />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}

export default function MintPage() {
  return (
    <Suspense fallback={<p className="text-sm text-text-muted">Loading mint…</p>}>
      <MintInner />
    </Suspense>
  );
}
