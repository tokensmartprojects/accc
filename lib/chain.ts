import { defineChain } from "viem";

export const ROBINHOOD_CHAIN_ID = 4663;
export const ROBINHOOD_TESTNET_ID = 46630;

export const ROBINHOOD_EXPLORER = "https://robinhoodchain.blockscout.com";
export const ROBINHOOD_RPC =
  process.env.NEXT_PUBLIC_RPC_URL ?? "https://rpc.mainnet.chain.robinhood.com";

export const robinhoodChain = defineChain({
  id: ROBINHOOD_CHAIN_ID,
  name: "Robinhood Chain",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: { http: [ROBINHOOD_RPC] },
  },
  blockExplorers: {
    default: { name: "Blockscout", url: ROBINHOOD_EXPLORER },
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167020862bE2a173976CA11",
    },
  },
});

export const robinhoodTestnet = defineChain({
  id: ROBINHOOD_TESTNET_ID,
  name: "Robinhood Chain Testnet",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.testnet.chain.robinhood.com"],
    },
  },
  blockExplorers: {
    default: {
      name: "Blockscout",
      url: "https://explorer.testnet.chain.robinhood.com",
    },
  },
});

export function explorerAddressUrl(address: string) {
  return `${ROBINHOOD_EXPLORER}/address/${address}`;
}

export function explorerTxUrl(hash: string) {
  return `${ROBINHOOD_EXPLORER}/tx/${hash}`;
}
