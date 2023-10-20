import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { WorkflowDataContext } from "@/context";
import { WorkflowDataProvider } from "@/providers";
import { ChakraProvider } from "@chakra-ui/react";
import Navbar from "@/components/navbar/Navbar";
import { OktoConnector,} from "@okto_wallet/okto-connect-sdk";
import { WagmiConfig, createConfig, mainnet } from 'wagmi'
import { createPublicClient, http } from 'viem'



import { useRouter } from "next/router";
import { useMemo } from "react";
import {WalletProvider} from '@suiet/wallet-kit';
import '@suiet/wallet-kit/style.css';



export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  console.log(router);
  
  // const network = WalletAdapterNetwork.Devnet;

  // // You can also provide a custom RPC endpoint.
  // const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  // const wallets = useMemo(
  //   () => [
  //     /**
  //      * Wallets that implement either of these standards will be available automatically.
  //      *
  //      *   - Solana Mobile Stack Mobile Wallet Adapter Protocol
  //      *     (https://github.com/solana-mobile/mobile-wallet-adapter)
  //      *   - Solana Wallet Standard
  //      *     (https://github.com/solana-labs/wallet-standard)
  //      *
  //      * If you wish to support a wallet that supports neither of those standards,
  //      * instantiate its legacy wallet adapter here. Common legacy adapters can be found
  //      * in the npm package `@solana/wallet-adapter-wallets`.
  //      */
  //     new UnsafeBurnerWalletAdapter(),
  //   ],
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  //   [network]
  // );

  const oktoConnector = new OktoConnector({
    chains:[mainnet],
    options: {
      projectId: "c63e42ee270545b423495ea9f1a230e6",
    },
  });

 
const config = createConfig({
  autoConnect: true,
  publicClient: createPublicClient({
    chain: mainnet,
    transport: http()
  }),
  connectors:[ oktoConnector]
})

  const showHeader =
    router.pathname === "/" || router.pathname === "/home" ? true : false;
  return (
    <WagmiConfig config={config}>
    <WalletProvider>
          <WorkflowDataProvider>
            <ChakraProvider>
        
              {showHeader && <Navbar />}
              <Component {...pageProps} />
            </ChakraProvider>
          </WorkflowDataProvider>
          </WalletProvider>
          </WagmiConfig>
  );
}
