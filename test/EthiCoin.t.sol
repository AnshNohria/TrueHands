// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "../contracts/EthiCoin.sol";

/**
 * @title EthiCoinTest
 * @dev Unit tests for EthiCoin contract
 */
contract EthiCoinTest {
    EthiCoin public ethiCoin;
    address public owner;
    address public user1;
    address public user2;
    address public authorizedContract;

    event Setup();
    event TestPassed(string testName);
    event TestFailed(string testName, string reason);

    constructor() {
        owner = address(this);
        user1 = address(0x1);
        user2 = address(0x2);
        authorizedContract = address(0x3);
        
        ethiCoin = new EthiCoin();
        emit Setup();
    }

    function testInitialSupply() external {
        require(ethiCoin.totalSupply() == 1000000 * 10**18, "Incorrect initial supply");
        require(ethiCoin.balanceOf(owner) == 1000000 * 10**18, "Owner should have initial supply");
        emit TestPassed("testInitialSupply");
    }

    function testAuthorizeContract() external {
        ethiCoin.authorizeContract(authorizedContract, true);
        require(ethiCoin.authorizedContracts(authorizedContract), "Contract should be authorized");
        
        ethiCoin.authorizeContract(authorizedContract, false);
        require(!ethiCoin.authorizedContracts(authorizedContract), "Contract should be deauthorized");
        emit TestPassed("testAuthorizeContract");
    }

    function testRewardFunction() external {
        // Authorize this contract
        ethiCoin.authorizeContract(address(this), true);
        
        uint256 rewardAmount = 100 * 10**18;
        uint256 initialBalance = ethiCoin.balanceOf(user1);
        
        ethiCoin.reward(user1, rewardAmount, "Test reward");
        
        require(ethiCoin.balanceOf(user1) == initialBalance + rewardAmount, "Reward not transferred correctly");
        emit TestPassed("testRewardFunction");
    }

    function testBurnFrom() external {
        // First give user1 some tokens
        ethiCoin.transfer(user1, 1000 * 10**18);
        
        // Authorize this contract
        ethiCoin.authorizeContract(address(this), true);
        
        uint256 burnAmount = 100 * 10**18;
        uint256 initialBalance = ethiCoin.balanceOf(user1);
        
        ethiCoin.burnFrom(user1, burnAmount, "Test penalty");
        
        require(ethiCoin.balanceOf(user1) == initialBalance - burnAmount, "Tokens not burned correctly");
        emit TestPassed("testBurnFrom");
    }

    function testUnauthorizedReward() external {
        // Try to reward without authorization (should fail)
        try ethiCoin.reward(user1, 100 * 10**18, "Unauthorized reward") {
            emit TestFailed("testUnauthorizedReward", "Should have reverted");
        } catch {
            emit TestPassed("testUnauthorizedReward");
        }
    }

    function testPauseFunction() external {
        ethiCoin.pause();
        
        // Try to transfer while paused (should fail)
        try ethiCoin.transfer(user1, 100 * 10**18) {
            emit TestFailed("testPauseFunction", "Transfer should have failed while paused");
        } catch {
            emit TestPassed("testPauseFunction");
        }
        
        ethiCoin.unpause();
    }

    function runAllTests() external {
        testInitialSupply();
        testAuthorizeContract();
        testRewardFunction();
        testBurnFrom();
        testUnauthorizedReward();
        testPauseFunction();
    }
}
