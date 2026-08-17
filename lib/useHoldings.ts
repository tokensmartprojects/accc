"use client";

import { useMemo, useSyncExternalStore } from "react";
import {
  getHoldingsSnapshot,
  getServerHoldingsSnapshot,
  subscribeHoldings,
} from "./holdings";
import type { Address } from "./types";

export function useHoldings(owner?: Address) {
  const all = useSyncExternalStore(
    subscribeHoldings,
    getHoldingsSnapshot,
    getServerHoldingsSnapshot,
  );

  return useMemo(() => {
    if (!owner) return all;
    return all.filter(
      (holding) => holding.owner.toLowerCase() === owner.toLowerCase(),
    );
  }, [all, owner]);
}
