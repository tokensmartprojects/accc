"use client";

import { erc20Abi, erc721Abi, formatEther, formatUnits } from "viem";
import { useAccount, useBalance, useReadContracts } from "wagmi";
import { ROBINHOOD_CHAIN_ID } from "../chain";
import type { Address } from "../types";

const demoToken = process.env.NEXT_PUBLIC_DEMO_TOKEN as Address | undefined;
const demoNft = process.env.NEXT_PUBLIC_DEMO_NFT as Address | undefined;
const demoNftId = process.env.NEXT_PUBLIC_DEMO_NFT_ID ?? "1";

export function useConnectedWallet() {
  const account = useAccount();
  return {
    address: account.address,
    isConnected: account.isConnected,
    chainId: account.chainId,
    isRobinhood: account.chainId === ROBINHOOD_CHAIN_ID,
    status: account.status,
  };
}

export function useNativeEthBalance(address?: Address) {
  const { data, error, isLoading } = useBalance({
    address,
    chainId: ROBINHOOD_CHAIN_ID,
    query: { enabled: Boolean(address) },
  });

  return {
    wei: data?.value,
    formatted: data ? Number(formatEther(data.value)) : undefined,
    isLoading,
    error: error?.message,
  };
}

export function useDemoTokenBalance(holder?: Address) {
  const enabled = Boolean(demoToken && holder);
  const { data, error, isLoading } = useReadContracts({
    allowFailure: true,
    query: { enabled },
    contracts: demoToken
      ? [
          { address: demoToken, abi: erc20Abi, functionName: "name" },
          { address: demoToken, abi: erc20Abi, functionName: "symbol" },
          { address: demoToken, abi: erc20Abi, functionName: "decimals" },
          {
            address: demoToken,
            abi: erc20Abi,
            functionName: "balanceOf",
            args: holder ? [holder] : undefined,
          },
        ]
      : [],
  });

  const name = data?.[0]?.status === "success" ? String(data[0].result) : undefined;
  const symbol =
    data?.[1]?.status === "success" ? String(data[1].result) : undefined;
  const decimals =
    data?.[2]?.status === "success" ? Number(data[2].result) : undefined;
  const raw =
    data?.[3]?.status === "success" ? (data[3].result as bigint) : undefined;

  return {
    configured: Boolean(demoToken),
    contract: demoToken,
    name,
    symbol,
    decimals,
    formatted:
      raw !== undefined && decimals !== undefined
        ? Number(formatUnits(raw, decimals))
        : undefined,
    isLoading,
    error: error?.message,
  };
}

export function useDemoNftOwner() {
  const enabled = Boolean(demoNft);
  const { data, error, isLoading } = useReadContracts({
    allowFailure: true,
    query: { enabled },
    contracts: demoNft
      ? [
          {
            address: demoNft,
            abi: erc721Abi,
            functionName: "ownerOf",
            args: [BigInt(demoNftId)],
          },
          {
            address: demoNft,
            abi: erc721Abi,
            functionName: "tokenURI",
            args: [BigInt(demoNftId)],
          },
        ]
      : [],
  });

  return {
    configured: Boolean(demoNft),
    contract: demoNft,
    tokenId: demoNftId,
    owner:
      data?.[0]?.status === "success"
        ? (data[0].result as Address)
        : undefined,
    tokenURI:
      data?.[1]?.status === "success" ? String(data[1].result) : undefined,
    isLoading,
    error: error?.message,
  };
}
