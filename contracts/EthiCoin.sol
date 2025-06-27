// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

/**
 * @title EthiCoin
 * @dev ERC20 Token for the TrueHands labor compliance system
 * Rewards compliant employers and burns tokens for violations
 */
contract EthiCoin is ERC20, Ownable, Pausable {
    uint256 public constant INITIAL_SUPPLY = 1000000 * 10**18; // 1 million tokens
    uint256 public constant REWARD_AMOUNT = 10 * 10**18; // 10 tokens reward
    uint256 public constant PENALTY_AMOUNT = 10 * 10**18; // 10 tokens penalty
    
    mapping(address => bool) public authorizedContracts;
    
    event TokensRewarded(address indexed to, uint256 amount, string reason);
    event TokensBurned(address indexed from, uint256 amount, string reason);
    event ContractAuthorized(address indexed contractAddress, bool authorized);

    constructor() ERC20("EthiCoin", "ETHC") {
        _mint(msg.sender, INITIAL_SUPPLY);
    }

    modifier onlyAuthorizedContract() {
        require(authorizedContracts[msg.sender] || msg.sender == owner(), "Not authorized");
        _;
    }

    /**
     * @dev Authorize a contract to mint/burn tokens
     */
    function authorizeContract(address contractAddress, bool authorized) external onlyOwner {
        authorizedContracts[contractAddress] = authorized;
        emit ContractAuthorized(contractAddress, authorized);
    }

    /**
     * @dev Reward tokens for compliance
     */
    function reward(address to, uint256 amount, string memory reason) external onlyAuthorizedContract whenNotPaused {
        require(to != address(0), "Cannot reward zero address");
        require(amount > 0, "Reward amount must be positive");
        require(balanceOf(owner()) >= amount, "Insufficient tokens for reward");
        
        _transfer(owner(), to, amount);
        emit TokensRewarded(to, amount, reason);
    }

    /**
     * @dev Burn tokens as penalty for non-compliance
     */
    function burnFrom(address from, uint256 amount, string memory reason) external onlyAuthorizedContract whenNotPaused {
        require(from != address(0), "Cannot burn from zero address");
        require(amount > 0, "Burn amount must be positive");
        require(balanceOf(from) >= amount, "Insufficient balance to burn");
        
        _burn(from, amount);
        emit TokensBurned(from, amount, reason);
    }

    /**
     * @dev Emergency pause function
     */
    function pause() external onlyOwner {
        _pause();
    }

    /**
     * @dev Unpause function
     */
    function unpause() external onlyOwner {
        _unpause();
    }

    /**
     * @dev Override transfer to check pause state
     */
    function _beforeTokenTransfer(address from, address to, uint256 amount) internal override whenNotPaused {
        super._beforeTokenTransfer(from, to, amount);
    }
}
