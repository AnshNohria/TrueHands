// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * @title WorkerRegistry
 * @dev Registry contract for managing worker information and employer authorization
 */
contract WorkerRegistry {
    struct Worker {
        string name;
        string position;
        string qualifications;
        uint256 startDate;
        uint256 endDate;
        bool isActive;
        address employer;
    }

    struct Employer {
        string companyName;
        string registrationNumber;
        bool isAuthorized;
        uint256 registrationDate;
        uint256 stakingAmount;
    }

    mapping(address => Worker) public workers;
    mapping(address => Employer) public employers;
    mapping(address => address[]) public employerWorkers; // employer => worker addresses
    
    address public admin;
    uint256 public minimumStake = 1 ether;

    event WorkerRegistered(address indexed worker, address indexed employer, string name);
    event WorkerUpdated(address indexed worker, address indexed employer);
    event EmployerAuthorized(address indexed employer, string companyName);
    event EmployerDeauthorized(address indexed employer);
    event StakeDeposited(address indexed employer, uint256 amount);
    event StakeWithdrawn(address indexed employer, uint256 amount);

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can call this function");
        _;
    }

    modifier onlyAuthorizedEmployer() {
        require(employers[msg.sender].isAuthorized, "Not authorized employer");
        _;
    }

    modifier workerExists(address _worker) {
        require(bytes(workers[_worker].name).length > 0, "Worker not registered");
        _;
    }

    constructor() {
        admin = msg.sender;
    }

    /**
     * @dev Register as an employer with staking
     */
    function registerEmployer(
        string memory _companyName,
        string memory _registrationNumber
    ) external payable {
        require(msg.value >= minimumStake, "Insufficient staking amount");
        require(!employers[msg.sender].isAuthorized, "Already registered");
        require(bytes(_companyName).length > 0, "Company name required");

        employers[msg.sender] = Employer({
            companyName: _companyName,
            registrationNumber: _registrationNumber,
            isAuthorized: true,
            registrationDate: block.timestamp,
            stakingAmount: msg.value
        });

        emit EmployerAuthorized(msg.sender, _companyName);
        emit StakeDeposited(msg.sender, msg.value);
    }

    /**
     * @dev Register a worker (only authorized employers)
     */
    function registerWorker(
        address _worker,
        string memory _name,
        string memory _position,
        string memory _qualifications,
        uint256 _startDate
    ) external onlyAuthorizedEmployer {
        require(_worker != address(0), "Invalid worker address");
        require(bytes(_name).length > 0, "Name required");
        require(_startDate <= block.timestamp, "Start date cannot be in future");

        workers[_worker] = Worker({
            name: _name,
            position: _position,
            qualifications: _qualifications,
            startDate: _startDate,
            endDate: 0,
            isActive: true,
            employer: msg.sender
        });

        employerWorkers[msg.sender].push(_worker);
        emit WorkerRegistered(_worker, msg.sender, _name);
    }

    /**
     * @dev Update worker end date (terminate employment)
     */
    function updateWorkerEndDate(address _worker, uint256 _endDate) 
        external 
        onlyAuthorizedEmployer 
        workerExists(_worker) 
    {
        require(workers[_worker].employer == msg.sender, "Not worker's employer");
        require(_endDate >= workers[_worker].startDate, "End date before start date");
        
        workers[_worker].endDate = _endDate;
        workers[_worker].isActive = false;
        emit WorkerUpdated(_worker, msg.sender);
    }

    /**
     * @dev Admin function to authorize employer
     */
    function authorizeEmployer(address _employer) external onlyAdmin {
        employers[_employer].isAuthorized = true;
        emit EmployerAuthorized(_employer, employers[_employer].companyName);
    }

    /**
     * @dev Admin function to deauthorize employer
     */
    function deauthorizeEmployer(address _employer) external onlyAdmin {
        employers[_employer].isAuthorized = false;
        emit EmployerDeauthorized(_employer);
    }

    /**
     * @dev Check if employer is authorized
     */
    function isAuthorizedEmployer(address _employer) external view returns (bool) {
        return employers[_employer].isAuthorized;
    }

    /**
     * @dev Get worker details
     */
    function getWorkerDetails(address _worker) 
        external 
        view 
        returns (
            string memory name,
            string memory position,
            string memory qualifications,
            uint256 startDate,
            uint256 endDate,
            bool isActive,
            address employer
        ) 
    {
        Worker memory worker = workers[_worker];
        return (
            worker.name,
            worker.position,
            worker.qualifications,
            worker.startDate,
            worker.endDate,
            worker.isActive,
            worker.employer
        );
    }

    /**
     * @dev Get employer details
     */
    function getEmployerDetails(address _employer)
        external
        view
        returns (
            string memory companyName,
            string memory registrationNumber,
            bool isAuthorized,
            uint256 registrationDate,
            uint256 stakingAmount
        )
    {
        Employer memory employer = employers[_employer];
        return (
            employer.companyName,
            employer.registrationNumber,
            employer.isAuthorized,
            employer.registrationDate,
            employer.stakingAmount
        );
    }

    /**
     * @dev Get workers for an employer
     */
    function getEmployerWorkers(address _employer) external view returns (address[] memory) {
        return employerWorkers[_employer];
    }

    /**
     * @dev Withdraw stake (admin only, for deauthorized employers)
     */
    function withdrawStake(address _employer) external onlyAdmin {
        require(!employers[_employer].isAuthorized, "Employer still authorized");
        uint256 amount = employers[_employer].stakingAmount;
        require(amount > 0, "No stake to withdraw");
        
        employers[_employer].stakingAmount = 0;
        payable(_employer).transfer(amount);
        emit StakeWithdrawn(_employer, amount);
    }

    /**
     * @dev Update minimum stake requirement
     */
    function updateMinimumStake(uint256 _newMinimumStake) external onlyAdmin {
        minimumStake = _newMinimumStake;
    }
}
