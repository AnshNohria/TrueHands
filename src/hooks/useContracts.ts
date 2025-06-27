import { useState } from 'react';
import { ethers } from 'ethers';
import { 
  ETHICOIN_ABI, 
  WORKER_REGISTRY_ABI, 
  LABOR_COMPLIANCE_ABI,
  getContractAddress 
} from './constants';

export interface ContractInstances {
  ethiCoin: ethers.Contract | null;
  workerRegistry: ethers.Contract | null;
  laborCompliance: ethers.Contract | null;
  signer: ethers.Signer | null;
  provider: ethers.BrowserProvider | null;
}

export function useContracts() {
  const [contracts, setContracts] = useState<ContractInstances>({
    ethiCoin: null,
    workerRegistry: null,
    laborCompliance: null,
    signer: null,
    provider: null
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const initializeContracts = async () => {
    try {
      setLoading(true);
      setError(null);

      if (!window.ethereum) {
        throw new Error('MetaMask not installed');
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const network = await provider.getNetwork();
      
      // Determine network name based on chain ID
      const networkName = Number(network.chainId) === 31337 ? 'localhost' : 'sepolia';

      // Get contract addresses
      const ethiCoinAddress = getContractAddress(networkName, 'EthiCoin');
      const workerRegistryAddress = getContractAddress(networkName, 'WorkerRegistry');
      const laborComplianceAddress = getContractAddress(networkName, 'LaborCompliance');

      // Create contract instances
      const ethiCoin = new ethers.Contract(ethiCoinAddress, ETHICOIN_ABI, signer);
      const workerRegistry = new ethers.Contract(workerRegistryAddress, WORKER_REGISTRY_ABI, signer);
      const laborCompliance = new ethers.Contract(laborComplianceAddress, LABOR_COMPLIANCE_ABI, signer);

      setContracts({
        ethiCoin,
        workerRegistry,
        laborCompliance,
        signer,
        provider
      });

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(errorMessage);
      console.error('Error initializing contracts:', err);
    } finally {
      setLoading(false);
    }
  };

  return {
    contracts,
    initializeContracts,
    loading,
    error,
    isInitialized: !!contracts.signer
  };
}

// Hook for EthiCoin operations
export function useEthiCoin() {
  const { contracts } = useContracts();
  const [loading, setLoading] = useState(false);

  const getBalance = async (address: string) => {
    if (!contracts.ethiCoin) return '0';
    
    try {
      const balance = await contracts.ethiCoin.balanceOf(address);
      return ethers.formatEther(balance);
    } catch (err) {
      console.error('Error getting balance:', err);
      return '0';
    }
  };

  const transfer = async (to: string, amount: string) => {
    if (!contracts.ethiCoin) throw new Error('Contract not initialized');
    
    setLoading(true);
    try {
      const amountWei = ethers.parseEther(amount);
      const tx = await contracts.ethiCoin.transfer(to, amountWei);
      await tx.wait();
      return tx.hash;
    } finally {
      setLoading(false);
    }
  };

  const approve = async (spender: string, amount: string) => {
    if (!contracts.ethiCoin) throw new Error('Contract not initialized');
    
    setLoading(true);
    try {
      const amountWei = ethers.parseEther(amount);
      const tx = await contracts.ethiCoin.approve(spender, amountWei);
      await tx.wait();
      return tx.hash;
    } finally {
      setLoading(false);
    }
  };

  return {
    getBalance,
    transfer,
    approve,
    loading,
    contract: contracts.ethiCoin
  };
}

// Hook for Worker Registry operations
export function useWorkerRegistry() {
  const { contracts } = useContracts();
  const [loading, setLoading] = useState(false);

  const registerEmployer = async (companyName: string, registrationNumber: string, stakeAmount: string) => {
    if (!contracts.workerRegistry) throw new Error('Contract not initialized');
    
    setLoading(true);
    try {
      const stakeWei = ethers.parseEther(stakeAmount);
      const tx = await contracts.workerRegistry.registerEmployer(companyName, registrationNumber, { value: stakeWei });
      await tx.wait();
      return tx.hash;
    } finally {
      setLoading(false);
    }
  };

  const registerWorker = async (
    workerAddress: string,
    name: string,
    position: string,
    qualifications: string,
    startDate: number
  ) => {
    if (!contracts.workerRegistry) throw new Error('Contract not initialized');
    
    setLoading(true);
    try {
      const tx = await contracts.workerRegistry.registerWorker(
        workerAddress,
        name,
        position,
        qualifications,
        startDate
      );
      await tx.wait();
      return tx.hash;
    } finally {
      setLoading(false);
    }
  };

  const getWorkerDetails = async (workerAddress: string) => {
    if (!contracts.workerRegistry) return null;
    
    try {
      const details = await contracts.workerRegistry.getWorkerDetails(workerAddress);
      return {
        name: details[0],
        position: details[1],
        qualifications: details[2],
        startDate: Number(details[3]),
        endDate: Number(details[4]),
        isActive: details[5],
        employer: details[6]
      };
    } catch (err) {
      console.error('Error getting worker details:', err);
      return null;
    }
  };

  const getEmployerDetails = async (employerAddress: string) => {
    if (!contracts.workerRegistry) return null;
    
    try {
      const details = await contracts.workerRegistry.getEmployerDetails(employerAddress);
      return {
        companyName: details[0],
        registrationNumber: details[1],
        isAuthorized: details[2],
        registrationDate: Number(details[3]),
        stakingAmount: ethers.formatEther(details[4])
      };
    } catch (err) {
      console.error('Error getting employer details:', err);
      return null;
    }
  };

  const isAuthorizedEmployer = async (employerAddress: string) => {
    if (!contracts.workerRegistry) return false;
    
    try {
      return await contracts.workerRegistry.isAuthorizedEmployer(employerAddress);
    } catch (err) {
      console.error('Error checking employer authorization:', err);
      return false;
    }
  };

  const getEmployerWorkers = async (employerAddress: string) => {
    if (!contracts.workerRegistry) return [];
    
    try {
      return await contracts.workerRegistry.getEmployerWorkers(employerAddress);
    } catch (err) {
      console.error('Error getting employer workers:', err);
      return [];
    }
  };

  return {
    registerEmployer,
    registerWorker,
    getWorkerDetails,
    getEmployerDetails,
    isAuthorizedEmployer,
    getEmployerWorkers,
    loading,
    contract: contracts.workerRegistry
  };
}

// Hook for Labor Compliance operations
export function useLaborCompliance() {
  const { contracts } = useContracts();
  const [loading, setLoading] = useState(false);

  const logWorkHours = async (
    workerAddress: string,
    date: number,
    hoursWorked: number,
    wagePaid: string
  ) => {
    if (!contracts.laborCompliance) throw new Error('Contract not initialized');
    
    setLoading(true);
    try {
      const wagePaidWei = ethers.parseEther(wagePaid);
      const tx = await contracts.laborCompliance.logWorkHours(
        workerAddress,
        date,
        hoursWorked,
        wagePaidWei
      );
      await tx.wait();
      return tx.hash;
    } finally {
      setLoading(false);
    }
  };

  const payWages = async (workerAddress: string, date: number, amount: string) => {
    if (!contracts.laborCompliance) throw new Error('Contract not initialized');
    
    setLoading(true);
    try {
      const amountWei = ethers.parseEther(amount);
      const tx = await contracts.laborCompliance.payWages(workerAddress, date, { value: amountWei });
      await tx.wait();
      return tx.hash;
    } finally {
      setLoading(false);
    }
  };

  const getWorkRecord = async (workerAddress: string, date: number) => {
    if (!contracts.laborCompliance) return null;
    
    try {
      const record = await contracts.laborCompliance.getWorkRecord(workerAddress, date);
      return {
        date: Number(record[0]),
        hoursWorked: Number(record[1]),
        wagePaid: ethers.formatEther(record[2]),
        isCompliant: record[3],
        complianceIssue: record[4],
        isPaid: record[5],
        overtimeHours: Number(record[6])
      };
    } catch (err) {
      console.error('Error getting work record:', err);
      return null;
    }
  };

  const getComplianceMetrics = async (employerAddress: string) => {
    if (!contracts.laborCompliance) return null;
    
    try {
      const metrics = await contracts.laborCompliance.getComplianceMetrics(employerAddress);
      return {
        totalWorkDays: Number(metrics[0]),
        compliantDays: Number(metrics[1]),
        totalPenalties: ethers.formatEther(metrics[2]),
        totalRewards: ethers.formatEther(metrics[3]),
        lastViolationDate: Number(metrics[4]),
        compliancePercentage: Number(metrics[5])
      };
    } catch (err) {
      console.error('Error getting compliance metrics:', err);
      return null;
    }
  };

  const getWorkerWorkDates = async (workerAddress: string) => {
    if (!contracts.laborCompliance) return [];
    
    try {
      const dates = await contracts.laborCompliance.getWorkerWorkDates(workerAddress);
      return dates.map((date: ethers.BigNumberish) => Number(date));
    } catch (err) {
      console.error('Error getting worker work dates:', err);
      return [];
    }
  };

  const getComplianceScore = async (employerAddress: string) => {
    if (!contracts.laborCompliance) return 0;
    
    try {
      const score = await contracts.laborCompliance.getComplianceScore(employerAddress);
      return Number(score);
    } catch (err) {
      console.error('Error getting compliance score:', err);
      return 0;
    }
  };

  return {
    logWorkHours,
    payWages,
    getWorkRecord,
    getComplianceMetrics,
    getWorkerWorkDates,
    getComplianceScore,
    loading,
    contract: contracts.laborCompliance
  };
}
