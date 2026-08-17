import type { Address } from "./types";

export const ETH_USD = 2220.83;

export function abbreviateAddress(address: string, left = 5, right = 4) {
  if (address.length < left + right + 2) return address;
  return `${address.slice(0, left + 2)}...${address.slice(-right)}`;
}

export function formatEth(value: number, digits = 2) {
  return `${value.toLocaleString("en-US", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  })} ETH`;
}

export function formatUsd(value: number, digits = 0) {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}

export function formatUsdPrice(value: number) {
  if (value < 1) {
    return value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 3,
      maximumFractionDigits: 4,
    });
  }
  return formatUsd(value, value >= 100 ? 0 : 2);
}

export function formatCompact(value: number) {
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

export function formatTokenAmount(value: number) {
  return value.toLocaleString("en-US");
}

export function ethToUsd(eth: number) {
  return eth * ETH_USD;
}

export function isAddressLike(value: string): value is Address {
  return /^0x[a-fA-F0-9]{40}$/.test(value);
}
