import { createConfig } from 'wagmi';
import { http } from 'wagmi';
import { connectorsForWallets } from '@rainbow-me/rainbowkit';
import {
bybitWallet,
coinbaseWallet,
  metaMaskWallet,
  trustWallet,
  coreWallet,
  krakenWallet,
  ledgerWallet,
  okxWallet,
  mewWallet,
  phantomWallet,
  walletConnectWallet,
  bitgetWallet,
  binanceWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { 
  mainnet, 
  sepolia, 
  polygon, 
  optimism, 
  arbitrum,
  base, 
  zkSync,
  bsc,
} from 'wagmi/chains';

const connectors = connectorsForWallets(
  [
    {
      groupName: 'Recommended',
      wallets: [walletConnectWallet, metaMaskWallet, binanceWallet, trustWallet],
    },
    
    {
      groupName: 'Suggested',
      wallets: [
        bybitWallet,
coinbaseWallet,
  
  
  coreWallet,
  krakenWallet,
  ledgerWallet,
  okxWallet,
  mewWallet,
  phantomWallet,
  
  bitgetWallet,
  
      ],
    },
  ],
  { appName: 'Chron Node', projectId: '7e02e091c30851f318144e3327aa8c63' },
);

export const config = createConfig({
  chains: [
    mainnet,
    sepolia,
    polygon,
    optimism,
    arbitrum,
    base,
    zkSync,
    
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true' ? [sepolia] : []),
  ],
  connectors: connectors,
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [polygon.id]: http(),
    [optimism.id]: http(),
    [arbitrum.id]: http(),
    [base.id]: http(),
    [zkSync.id]: http(),
    [bsc.id]: http(),
  },
  ssr: true,
});
