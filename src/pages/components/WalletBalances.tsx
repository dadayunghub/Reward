import React, { useEffect } from 'react';
import { useBalance, useAccount } from 'wagmi';
import { mainnet, polygon, bsc, sepolia, optimism, arbitrum, base, zkSync } from 'wagmi/chains';
import styles from './WalletBalances.module.css';

type WalletBalancesProps = {
  onBalancesChange: (balances: {
    ethBalance: string;
    maticBalance: string;
    bnbBalance: string;
    sepoliaBalance: string;
    optimismBalance: string;
    arbitrumBalance: string;
    baseBalance: string;
    zkSyncBalance: string;
  }) => void;
};

const WalletBalances: React.FC<WalletBalancesProps> = ({ onBalancesChange }) => {
  const { address, isConnected } = useAccount();

  // Fetch balance on Ethereum Mainnet
  const { data: ethBalance } = useBalance({
    address,
    chainId: mainnet.id,
  });

  // Fetch balance on Polygon
  const { data: maticBalance } = useBalance({
    address,
    chainId: polygon.id,
  });

  // Fetch balance on Binance Smart Chain
  const { data: bnbBalance } = useBalance({
    address,
    chainId: bsc.id,
  });

  // Fetch balance on Sepolia Testnet
  const { data: sepoliaBalance } = useBalance({
    address,
    chainId: sepolia.id,
  });
  
  // Fetch balance on Optimism
  const { data: optimismBalance } = useBalance({
    address,
    chainId: optimism.id,
  });

  // Fetch balance on Arbitrum
  const { data: arbitrumBalance } = useBalance({
    address,
    chainId: arbitrum.id,
  });

  // Fetch balance on Base
  const { data: baseBalance } = useBalance({
    address,
    chainId: base.id,
  });

  // Fetch balance on zkSync
  const { data: zkSyncBalance } = useBalance({
    address,
    chainId: zkSync.id,
  });

  // Notify the parent component of balance changes
  useEffect(() => {
    onBalancesChange({
      ethBalance: ethBalance?.formatted || '0',
      maticBalance: maticBalance?.formatted || '0',
      bnbBalance: bnbBalance?.formatted || '0',
      sepoliaBalance: sepoliaBalance?.formatted || '0',
      optimismBalance: optimismBalance?.formatted || '0',
      arbitrumBalance: arbitrumBalance?.formatted || '0',
      baseBalance: baseBalance?.formatted || '0',
      zkSyncBalance: zkSyncBalance?.formatted || '0',
    });
  }, [
    ethBalance,
    maticBalance,
    bnbBalance,
    sepoliaBalance,
    optimismBalance,
    arbitrumBalance,
    baseBalance,
    zkSyncBalance,
    onBalancesChange,
  ]);

  if (!isConnected) return <div className={styles.connectMessage}>Resolver Node.</div>;

  return (
    <div className={styles.walletBalances}>
      <h3 className={styles.title}>Wallet Details</h3>
      <p className={styles.walletAddress}>{address}</p>
      <div className={styles.balancesContainer}>
        {ethBalance && parseFloat(ethBalance.formatted) > 0 && (
          <p className={styles.balanceItem}>
            <span className={styles.token}>Ethereum (ETH):</span> {ethBalance.formatted} ETH
          </p>
        )}
        {maticBalance && parseFloat(maticBalance.formatted) > 0 && (
          <p className={styles.balanceItem}>
            <span className={styles.token}>Polygon (MATIC):</span> {maticBalance.formatted} MATIC
          </p>
        )}
        {bnbBalance && parseFloat(bnbBalance.formatted) > 0 && (
          <p className={styles.balanceItem}>
            <span className={styles.token}>Binance Smart Chain (BNB):</span> {bnbBalance.formatted} BNB
          </p>
        )}
        {sepoliaBalance && parseFloat(sepoliaBalance.formatted) > 0 && (
          <p className={styles.balanceItem}>
            <span className={styles.token}>Sepolia (SEP):</span> {sepoliaBalance.formatted} SEP
          </p>
        )}
        {optimismBalance && parseFloat(optimismBalance.formatted) > 0 && (
          <p className={styles.balanceItem}>
            <span className={styles.token}>Optimism (OPT):</span> {optimismBalance.formatted} OPT
          </p>
        )}
        {arbitrumBalance && parseFloat(arbitrumBalance.formatted) > 0 && (
          <p className={styles.balanceItem}>
            <span className={styles.token}>Arbitrum (ARB):</span> {arbitrumBalance.formatted} ARB
          </p>
        )}
        {baseBalance && parseFloat(baseBalance.formatted) > 0 && (
          <p className={styles.balanceItem}>
            <span className={styles.token}>Base (BASE):</span> {baseBalance.formatted} BASE
          </p>
        )}
        {zkSyncBalance && parseFloat(zkSyncBalance.formatted) > 0 && (
          <p className={styles.balanceItem}>
            <span className={styles.token}>zkSync (ZKS):</span> {zkSyncBalance.formatted} ZKS
          </p>
        )}
      </div>
    </div>
  );
};

export default WalletBalances;
