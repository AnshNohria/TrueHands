// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "../contracts/EthiCoin.sol";
import "../contracts/WorkerRegistry.sol";
import "../contracts/LaborCompliance.sol";

/**
 * @title Deploy
 * @dev Deployment script for TrueHands contracts
 */
contract Deploy {
    EthiCoin public ethiCoin;
    WorkerRegistry public workerRegistry;
    LaborCompliance public laborCompliance;

    event ContractsDeployed(
        address ethiCoin,
        address workerRegistry,
        address laborCompliance
    );

    function run() external {
        // Deploy EthiCoin
        ethiCoin = new EthiCoin();
        
        // Deploy WorkerRegistry
        workerRegistry = new WorkerRegistry();
        
        // Deploy LaborCompliance
        laborCompliance = new LaborCompliance(
            address(workerRegistry),
            address(ethiCoin)
        );

        // Authorize LaborCompliance contract to mint/burn EthiCoins
        ethiCoin.authorizeContract(address(laborCompliance), true);

        emit ContractsDeployed(
            address(ethiCoin),
            address(workerRegistry),
            address(laborCompliance)
        );
    }

    function getAddresses() external view returns (address, address, address) {
        return (address(ethiCoin), address(workerRegistry), address(laborCompliance));
    }
}
