import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';
import { useMetaMask } from '../hooks/useMetaMask';
import { useContracts, useEthiCoin, useWorkerRegistry } from '../hooks/useContracts';

interface User {
  id: string;
  name: string;
  role: 'employer' | 'worker';
  balance?: string;
  address?: string;
  isAuthorized?: boolean;
  companyName?: string;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  switchRole: () => void;
  connectWallet: () => Promise<void>;
  isWalletConnected: boolean;
  walletAddress: string | null;
  ethBalance: string;
  tokenBalance: string;
  refreshBalances: () => Promise<void>;
  loading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [ethBalance, setEthBalance] = useState<string>('0');
  const [tokenBalance, setTokenBalance] = useState<string>('0');
  const [loading, setLoading] = useState(false);

  const { account, connectWallet: connectMetaMask, isConnected } = useMetaMask();
  const { contracts, initializeContracts, isInitialized } = useContracts();
  const { getBalance } = useEthiCoin();
  const { isAuthorizedEmployer, getEmployerDetails, getWorkerDetails } = useWorkerRegistry();

  // Initialize contracts when wallet connects
  useEffect(() => {
    if (isConnected && !isInitialized) {
      initializeContracts();
    }
  }, [isConnected, isInitialized, initializeContracts]);

  // Connect wallet and initialize user
  const connectWallet = async () => {
    setLoading(true);
    try {
      await connectMetaMask();
      if (account && contracts.provider) {
        await initializeUser(account);
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
    } finally {
      setLoading(false);
    }
  };

  // Initialize user based on wallet address
  const initializeUser = useCallback(async (address: string) => {
    if (!contracts.workerRegistry) return;

    try {
      // Check if user is an authorized employer
      const isEmployer = await isAuthorizedEmployer(address);
      
      if (isEmployer) {
        const employerDetails = await getEmployerDetails(address);
        setUser({
          id: address,
          name: employerDetails?.companyName || 'Unknown Employer',
          role: 'employer',
          address,
          isAuthorized: true,
          companyName: employerDetails?.companyName
        });
      } else {
        // Check if user is a registered worker
        const workerDetails = await getWorkerDetails(address);
        if (workerDetails && workerDetails.name) {
          setUser({
            id: address,
            name: workerDetails.name,
            role: 'worker',
            address,
            isAuthorized: true
          });
        } else {
          // New user - default to worker role
          setUser({
            id: address,
            name: 'New User',
            role: 'worker',
            address,
            isAuthorized: false
          });
        }
      }
    } catch (error) {
      console.error('Error initializing user:', error);
      // Fallback to basic user
      setUser({
        id: address,
        name: 'User',
        role: 'worker',
        address,
        isAuthorized: false
      });
    }
  }, [contracts.workerRegistry, isAuthorizedEmployer, getEmployerDetails, getWorkerDetails]);

  // Refresh balances
  const refreshBalances = useCallback(async () => {
    if (!account || !contracts.provider) return;

    try {
      // Get ETH balance
      const ethBal = await contracts.provider.getBalance(account);
      setEthBalance(parseFloat(ethers.formatEther(ethBal)).toFixed(4));

      // Get token balance
      const tokenBal = await getBalance(account);
      setTokenBalance(parseFloat(tokenBal).toFixed(2));
    } catch (error) {
      console.error('Error refreshing balances:', error);
    }
  }, [account, contracts.provider, getBalance]);

  // Update balances when account changes
  useEffect(() => {
    if (account && isInitialized) {
      refreshBalances();
    }
  }, [account, isInitialized, refreshBalances]);

  // Update user when account changes
  useEffect(() => {
    if (account && isInitialized) {
      initializeUser(account);
    } else if (!account) {
      setUser(null);
      setEthBalance('0');
      setTokenBalance('0');
    }
  }, [account, isInitialized, initializeUser]);

  const switchRole = () => {
    if (user) {
      setUser({
        ...user,
        role: user.role === 'employer' ? 'worker' : 'employer'
      });
    }
  };

  return (
    <UserContext.Provider value={{ 
      user, 
      setUser, 
      switchRole,
      connectWallet,
      isWalletConnected: isConnected,
      walletAddress: account,
      ethBalance,
      tokenBalance,
      refreshBalances,
      loading
    }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
