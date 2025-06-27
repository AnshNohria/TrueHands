// Contract addresses for different networks
export const CONTRACT_ADDRESSES = {
  localhost: {
    EthiCoin: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
    WorkerRegistry: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512", 
    LaborCompliance: "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0"
  },
  sepolia: {
    EthiCoin: "0x...", // To be deployed
    WorkerRegistry: "0x...", // To be deployed
    LaborCompliance: "0x..." // To be deployed
  }
};

// Network configurations
export const NETWORKS = {
  localhost: {
    chainId: 31337,
    name: "Localhost",
    rpcUrl: "http://127.0.0.1:8545",
    currency: "ETH"
  },
  sepolia: {
    chainId: 11155111,
    name: "Sepolia Testnet",
    rpcUrl: "https://sepolia.infura.io/v3/",
    currency: "SepoliaETH"
  }
};

// Contract ABIs
export const ETHICOIN_ABI = [
  "function name() view returns (string)",
  "function symbol() view returns (string)", 
  "function decimals() view returns (uint8)",
  "function totalSupply() view returns (uint256)",
  "function balanceOf(address owner) view returns (uint256)",
  "function transfer(address to, uint256 amount) returns (bool)",
  "function allowance(address owner, address spender) view returns (uint256)",
  "function approve(address spender, uint256 amount) returns (bool)",
  "function transferFrom(address from, address to, uint256 amount) returns (bool)",
  "function authorizeContract(address contractAddress, bool authorized)",
  "function reward(address to, uint256 amount, string reason)",
  "function burnFrom(address from, uint256 amount, string reason)",
  "function pause()",
  "function unpause()",
  "function authorizedContracts(address) view returns (bool)",
  "event Transfer(address indexed from, address indexed to, uint256 value)",
  "event Approval(address indexed owner, address indexed spender, uint256 value)",
  "event TokensRewarded(address indexed to, uint256 amount, string reason)",
  "event TokensBurned(address indexed from, uint256 amount, string reason)"
];

export const WORKER_REGISTRY_ABI = [
  "function registerEmployer(string companyName, string registrationNumber) payable",
  "function registerWorker(address worker, string name, string position, string qualifications, uint256 startDate)",
  "function updateWorkerEndDate(address worker, uint256 endDate)",
  "function authorizeEmployer(address employer)",
  "function deauthorizeEmployer(address employer)",
  "function isAuthorizedEmployer(address employer) view returns (bool)",
  "function getWorkerDetails(address worker) view returns (string, string, string, uint256, uint256, bool, address)",
  "function getEmployerDetails(address employer) view returns (string, string, bool, uint256, uint256)",
  "function getEmployerWorkers(address employer) view returns (address[])",
  "function minimumStake() view returns (uint256)",
  "function workers(address) view returns (string, string, string, uint256, uint256, bool, address)",
  "function employers(address) view returns (string, string, bool, uint256, uint256)",
  "event WorkerRegistered(address indexed worker, address indexed employer, string name)",
  "event WorkerUpdated(address indexed worker, address indexed employer)",
  "event EmployerAuthorized(address indexed employer, string companyName)",
  "event EmployerDeauthorized(address indexed employer)",
  "event StakeDeposited(address indexed employer, uint256 amount)",
  "event StakeWithdrawn(address indexed employer, uint256 amount)"
];

export const LABOR_COMPLIANCE_ABI = [
  "function logWorkHours(address worker, uint256 date, uint256 hoursWorked, uint256 wagePaid)",
  "function payWages(address worker, uint256 date) payable",
  "function setComplianceRules(uint256 minimumWage, uint256 maxWorkingHours, uint256 overtimeMultiplier)",
  "function getWorkRecord(address worker, uint256 date) view returns (uint256, uint256, uint256, bool, string, bool, uint256)",
  "function getComplianceMetrics(address employer) view returns (uint256, uint256, uint256, uint256, uint256, uint256)",
  "function getWorkerWorkDates(address worker) view returns (uint256[])",
  "function getComplianceScore(address employer) view returns (uint256)",
  "function minimumWage() view returns (uint256)",
  "function maxWorkingHours() view returns (uint256)",
  "function overtimeMultiplier() view returns (uint256)",
  "function workRecords(address, uint256) view returns (uint256, uint256, uint256, bool, string, bool, uint256)",
  "function employerMetrics(address) view returns (uint256, uint256, uint256, uint256, uint256)",
  "event WorkHoursLogged(address indexed worker, address indexed employer, uint256 date, uint256 hoursWorked, uint256 wagePaid, bool isCompliant)",
  "event ComplianceViolation(address indexed employer, address indexed worker, string violationType, uint256 penaltyAmount)",
  "event ComplianceReward(address indexed employer, uint256 rewardAmount)",
  "event WagePaid(address indexed worker, address indexed employer, uint256 amount)"
];

// Constants
export const DECIMALS = 18;
export const COMPLIANCE_REWARD = "10";
export const VIOLATION_PENALTY = "15";
export const WAGE_VIOLATION_PENALTY = "20";

// Utility functions
export function getContractAddress(networkName: string, contractName: string): string {
  const network = CONTRACT_ADDRESSES[networkName as keyof typeof CONTRACT_ADDRESSES];
  if (!network) {
    throw new Error(`Network ${networkName} not found`);
  }
  const address = network[contractName as keyof typeof network];
  if (!address) {
    throw new Error(`Contract ${contractName} not found on ${networkName}`);
  }
  return address;
}

export function getNetworkConfig(chainId: number) {
  return Object.values(NETWORKS).find(network => network.chainId === chainId);
}
