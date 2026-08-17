import { createConfig, http } from "wagmi";
import { coinbaseWallet, injected, walletConnect } from "wagmi/connectors";
import { ROBINHOOD_RPC, robinhoodChain } from "./chain";
import { project } from "./project";

const walletConnectId = process.env.NEXT_PUBLIC_WALLETCONNECT_ID;

export const wagmiConfig = createConfig({
  chains: [robinhoodChain],
  connectors: [
    injected({ target: "metaMask" }),
    coinbaseWallet({ appName: project.name }),
    ...(walletConnectId
      ? [
          walletConnect({
            projectId: walletConnectId,
            showQrModal: true,
          }),
        ]
      : []),
  ],
  transports: {
    [robinhoodChain.id]: http(ROBINHOOD_RPC),
  },
  ssr: true,
});
