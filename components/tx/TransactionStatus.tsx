"use client";

import { useState } from "react";
import { explorerTxUrl } from "@/lib/chain";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { formatEth } from "@/lib/format";

export type TxPhase =
  | "idle"
  | "confirm"
  | "awaiting"
  | "submitted"
  | "complete";

function fakeHash() {
  const bytes = Array.from({ length: 20 }, () =>
    Math.floor(Math.random() * 16).toString(16),
  ).join("");
  return `0x82F${bytes}921`;
}

export function useMockTransaction() {
  const [phase, setPhase] = useState<TxPhase>("idle");
  const [hash, setHash] = useState<string>();
  const [action, setAction] = useState("");
  const [amountEth, setAmountEth] = useState(0);

  function start(nextAction: string, nextAmount: number) {
    setAction(nextAction);
    setAmountEth(nextAmount);
    setPhase("confirm");
  }

  function confirm() {
    setPhase("awaiting");
    window.setTimeout(() => {
      const nextHash = fakeHash();
      setHash(nextHash);
      setPhase("submitted");
    }, 700);
  }

  function finish() {
    setPhase("complete");
  }

  function reset() {
    setPhase("idle");
    setHash(undefined);
  }

  return { phase, hash, action, amountEth, start, confirm, finish, reset };
}

export function TransactionModal({
  tx,
  completeTitle,
  completeBody,
  completeHref,
  completeLabel,
  onComplete,
}: {
  tx: ReturnType<typeof useMockTransaction>;
  completeTitle: string;
  completeBody: string;
  completeHref?: string;
  completeLabel?: string;
  onComplete?: () => void;
}) {
  const gas = 0.0003;
  const open = tx.phase !== "idle";

  return (
    <Modal
      open={open}
      onClose={tx.reset}
      title={
        tx.phase === "confirm"
          ? "Confirm transaction"
          : tx.phase === "awaiting"
            ? "Awaiting wallet approval"
            : tx.phase === "submitted"
              ? "Transaction submitted"
              : completeTitle
      }
    >
      {tx.phase === "confirm" ? (
        <div className="space-y-3 text-sm">
          <Row label="Action" value={tx.action} />
          <Row label="Amount" value={formatEth(tx.amountEth)} />
          <Row label="Estimated gas" value={formatEth(gas, 4)} />
          <Row label="Total" value={formatEth(tx.amountEth + gas, 4)} />
          <p className="text-xs text-text-muted">
            This showcase does not send a real transaction until the collection contracts are live.
          </p>
          <Button className="w-full" onClick={tx.confirm}>
            Confirm
          </Button>
        </div>
      ) : null}
      {tx.phase === "awaiting" ? (
        <p className="text-sm text-text-secondary">Preparing mock approval…</p>
      ) : null}
      {tx.phase === "submitted" && tx.hash ? (
        <div className="space-y-4">
          <p className="break-all font-mono text-sm text-text-secondary">{tx.hash}</p>
          <a
            href={explorerTxUrl(tx.hash)}
            target="_blank"
            rel="noreferrer"
            className="block text-sm text-forge-green"
          >
            View transaction
          </a>
          <Button className="w-full" onClick={tx.finish}>
            Continue
          </Button>
        </div>
      ) : null}
      {tx.phase === "complete" ? (
        <div className="space-y-4">
          <p className="text-sm text-text-secondary">{completeBody}</p>
          {completeHref ? (
            <a href={completeHref}>
              <Button className="w-full">{completeLabel ?? "View"}</Button>
            </a>
          ) : (
            <Button
              className="w-full"
              onClick={() => {
                tx.reset();
                onComplete?.();
              }}
            >
              {completeLabel ?? "Done"}
            </Button>
          )}
        </div>
      ) : null}
    </Modal>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-text-muted">{label}</span>
      <span className="tabular font-medium">{value}</span>
    </div>
  );
}
