import React, { useState } from 'react';
import WalletBalances from './WalletBalances';
import SendTransaction from './SendTransaction';

const WalletDashboard: React.FC = () => {
  const [balances, setBalances] = useState({
    ethBalance: '0',
    maticBalance: '0',
    bnbBalance: '0',
    sepoliaBalance: '0',
    optimismBalance: '0',
    arbitrumBalance: '0',  // Add these new properties
    baseBalance: '0',
    zkSyncBalance: '0',
  });

  return (
    <div>
      <WalletBalances onBalancesChange={setBalances} />
      <SendTransaction balances={balances} />
    </div>
  );
};

export default WalletDashboard;
