import { notFound } from "next/navigation";
import { NftView } from "@/components/pages/NftView";
import { getNft, nfts } from "@/lib/data/catalog";

export function generateStaticParams() {
  return nfts.map((nft) => ({
    chain: String(nft.chainId),
    contract: nft.contract,
    tokenId: nft.tokenId,
  }));
}

export default async function NftPage({
  params,
}: {
  params: Promise<{ chain: string; contract: string; tokenId: string }>;
}) {
  const { chain, contract, tokenId } = await params;
  const nft = getNft(chain, contract, tokenId);
  if (!nft) notFound();
  return <NftView nft={nft} />;
}
