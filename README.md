# TrueHands - Ethical Labor Management DApp

TrueHands is a decentralized application (DApp) built on blockchain technology to ensure fair labor practices through transparent compliance tracking, automated wage payments, and incentivized ethical behavior using the EthiCoin reward system.

## 🌟 Features

### For Employers
- **Worker Registry**: Register and manage workers with verified credentials
- **Compliance Tracking**: Real-time monitoring of working hours and wage compliance
- **Automated Penalties**: Smart contract-based penalties for labor violations
- **Rewards System**: Earn EthiCoins for maintaining ethical labor practices
- **Staking System**: Demonstrate commitment through EthiCoin staking

### For Workers
- **Transparent Records**: Immutable work history and compliance records
- **Automated Payments**: Secure, blockchain-based wage payments
- **Credential Management**: Decentralized storage of qualifications and certifications
- **Earnings Tracking**: Detailed view of wages and payment history

### Technical Features
- **Smart Contracts**: Solidity-based contracts for all core functionality
- **ERC-20 Token**: Custom EthiCoin token for incentivization
- **React Frontend**: Modern, responsive user interface
- **MetaMask Integration**: Seamless wallet connectivity
- **Real-time Updates**: Live compliance metrics and notifications

## 🏗️ Architecture

### Smart Contracts
```
contracts/
├── EthiCoin.sol          # ERC-20 token contract
├── WorkerRegistry.sol    # Worker and employer registration
└── LaborCompliance.sol   # Main compliance logic
```

### Frontend Structure
```
src/
├── components/           # Reusable UI components
├── pages/               # Application pages
│   ├── employer/        # Employer dashboard pages
│   ├── worker/          # Worker dashboard pages
│   └── shared/          # Shared components
├── hooks/               # Custom React hooks
│   ├── useMetaMask.ts   # MetaMask integration
│   ├── useContracts.ts  # Smart contract interactions
│   └── constants.ts     # Contract addresses and ABIs
└── context/             # React context providers
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- MetaMask browser extension
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd TrueHands
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   VITE_NETWORK=localhost
   VITE_ETHICOIN_ADDRESS=0x5FbDB2315678afecb367f032d93F642f64180aa3
   VITE_WORKER_REGISTRY_ADDRESS=0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512
   VITE_LABOR_COMPLIANCE_ADDRESS=0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 🔧 Smart Contract Development

### Foundry Setup (Simulated)
The project is structured to work with Foundry for smart contract development:

```bash
# Compile contracts (simulated)
npm run compile

# Run tests (simulated)
npm run test

# Deploy to local network (simulated)
npm run deploy:local

# Deploy to testnet (simulated)
npm run deploy:testnet
```

### Contract Testing
Located in the `test/` directory:
- `EthiCoin.t.sol` - Unit tests for the token contract
- `WorkerRegistry.t.sol` - Tests for worker/employer registration
- `Integration.t.sol` - End-to-end system tests

### Deployment
Deployment scripts are in the `script/` directory:
- `Deploy.s.sol` - Main deployment script

## 📱 Usage Guide

### For Employers

1. **Connect Wallet**: Use MetaMask to connect your wallet
2. **Register as Employer**: Provide company details and stake EthiCoins
3. **Add Workers**: Register workers with their wallet addresses and credentials
4. **Log Work Hours**: Record daily work hours and wage payments
5. **Monitor Compliance**: View real-time compliance metrics and scores

### For Workers

1. **Connect Wallet**: Connect your MetaMask wallet
2. **View Profile**: Check your employment details and credentials
3. **Track Work History**: Monitor logged work hours and compliance status
4. **Earnings Summary**: View wage payments and earning history

## 🔒 Security Features

- **Immutable Records**: All work and compliance data stored on blockchain
- **Automated Compliance**: Smart contracts automatically enforce labor standards
- **Secure Payments**: Blockchain-based wage payments eliminate intermediaries
- **Transparent Operations**: All transactions and compliance actions are publicly verifiable

## 🎯 Compliance Rules

- **Maximum Working Hours**: 8 hours per day (configurable)
- **Overtime Regulations**: 1.5x wage multiplier for overtime
- **Minimum Wage**: Enforced per hour (configurable)
- **Violation Penalties**: Automatic EthiCoin burns for violations
- **Compliance Rewards**: EthiCoin rewards for maintaining standards

## 🧪 Testing

The application includes comprehensive testing:

### Unit Tests
- Smart contract functionality
- Individual component testing
- Hook and utility function tests

### Integration Tests
- End-to-end workflow testing
- Contract interaction testing
- Frontend-backend integration

### Demo Data
The application includes demo data for testing:
- Sample employers and workers
- Mock work records and compliance data
- Simulated transaction history

## 🌐 Network Support

### Supported Networks
- **Localhost** (for development)
- **Sepolia Testnet** (for testing)
- **Mainnet** (for production - future)

### Contract Addresses

#### Localhost (Development)
- EthiCoin: `0x5FbDB2315678afecb367f032d93F642f64180aa3`
- WorkerRegistry: `0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512`
- LaborCompliance: `0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0`

## 📊 Key Metrics

- **Compliance Score**: Percentage of compliant work days
- **EthiCoin Balance**: Current token holdings
- **Violation Count**: Number of labor violations
- **Reward Earnings**: Total EthiCoins earned through compliance

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue on GitHub
- Contact the development team
- Check the documentation wiki

## 🔮 Future Roadmap

- [ ] Multi-signature contract upgrades
- [ ] Oracle integration for real-time labor law updates
- [ ] Mobile application development
- [ ] Advanced analytics and reporting
- [ ] Multi-chain deployment
- [ ] DAO governance implementation

---

**Built with ❤️ for ethical labor practices**
