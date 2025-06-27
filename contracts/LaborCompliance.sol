// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./WorkerRegistry.sol";
import "./EthiCoin.sol";

/**
 * @title LaborCompliance
 * @dev Main contract for labor compliance tracking and enforcement
 */
contract LaborCompliance {
    WorkerRegistry public immutable workerRegistry;
    EthiCoin public immutable ethiCoin;
    
    uint256 public minimumWage = 15 * 10**18; // 15 tokens per hour
    uint256 public maxWorkingHours = 8; // 8 hours per day
    uint256 public overtimeMultiplier = 150; // 1.5x for overtime (150%)
    
    struct WorkRecord {
        uint256 date;
        uint256 hoursWorked;
        uint256 wagePaid;
        bool isCompliant;
        string complianceIssue;
        bool isPaid;
        uint256 overtimeHours;
    }

    struct ComplianceMetrics {
        uint256 totalWorkDays;
        uint256 compliantDays;
        uint256 totalPenalties;
        uint256 totalRewards;
        uint256 lastViolationDate;
    }

    mapping(address => mapping(uint256 => WorkRecord)) public workRecords; // worker => date => record
    mapping(address => ComplianceMetrics) public employerMetrics;
    mapping(address => uint256[]) public workerWorkDates; // worker => array of dates
    
    uint256 public constant COMPLIANCE_REWARD = 10 * 10**18;
    uint256 public constant VIOLATION_PENALTY = 15 * 10**18;
    uint256 public constant WAGE_VIOLATION_PENALTY = 20 * 10**18;

    event WorkHoursLogged(
        address indexed worker,
        address indexed employer,
        uint256 date,
        uint256 hoursWorked,
        uint256 wagePaid,
        bool isCompliant
    );
    event ComplianceViolation(
        address indexed employer,
        address indexed worker,
        string violationType,
        uint256 penaltyAmount
    );
    event ComplianceReward(address indexed employer, uint256 rewardAmount);
    event WagePaid(address indexed worker, address indexed employer, uint256 amount);

    modifier onlyAuthorizedEmployer() {
        require(workerRegistry.isAuthorizedEmployer(msg.sender), "Not authorized employer");
        _;
    }

    modifier validWorker(address _worker) {
        (string memory name,,,,,bool isActive,address employer) = workerRegistry.getWorkerDetails(_worker);
        require(bytes(name).length > 0, "Worker not registered");
        require(isActive, "Worker not active");
        require(employer == msg.sender, "Not worker's employer");
        _;
    }

    constructor(address _workerRegistryAddress, address _ethiCoinAddress) {
        workerRegistry = WorkerRegistry(_workerRegistryAddress);
        ethiCoin = EthiCoin(_ethiCoinAddress);
    }

    /**
     * @dev Set compliance rules (admin only)
     */
    function setComplianceRules(
        uint256 _minimumWage,
        uint256 _maxWorkingHours,
        uint256 _overtimeMultiplier
    ) external {
        // In production, this should be restricted to admin or DAO
        minimumWage = _minimumWage;
        maxWorkingHours = _maxWorkingHours;
        overtimeMultiplier = _overtimeMultiplier;
    }

    /**
     * @dev Log work hours and check compliance
     */
    function logWorkHours(
        address _worker,
        uint256 _date,
        uint256 _hoursWorked,
        uint256 _wagePaid
    ) external onlyAuthorizedEmployer validWorker(_worker) {
        require(_date <= block.timestamp, "Date cannot be in future");
        require(_hoursWorked > 0, "Hours worked must be positive");
        require(workRecords[_worker][_date].date == 0, "Work record already exists for this date");

        bool isCompliant = true;
        string memory complianceIssue = "Compliant";
        uint256 overtimeHours = 0;
        uint256 totalPenalty = 0;

        // Calculate overtime
        if (_hoursWorked > maxWorkingHours) {
            overtimeHours = _hoursWorked - maxWorkingHours;
        }

        // Check working hours compliance
        if (_hoursWorked > maxWorkingHours + 4) { // Max 4 hours overtime
            isCompliant = false;
            complianceIssue = "Excessive working hours";
            totalPenalty += VIOLATION_PENALTY;
            
            emit ComplianceViolation(msg.sender, _worker, "Excessive Hours", VIOLATION_PENALTY);
        }

        // Calculate required wage (including overtime)
        uint256 requiredWage = maxWorkingHours * minimumWage;
        if (overtimeHours > 0) {
            requiredWage += (overtimeHours * minimumWage * overtimeMultiplier) / 100;
        }

        // Check wage compliance
        if (_wagePaid < requiredWage) {
            isCompliant = false;
            complianceIssue = "Insufficient wage payment";
            totalPenalty += WAGE_VIOLATION_PENALTY;
            
            emit ComplianceViolation(msg.sender, _worker, "Wage Violation", WAGE_VIOLATION_PENALTY);
        }

        // Apply penalties or rewards
        if (!isCompliant) {
            ethiCoin.burnFrom(msg.sender, totalPenalty, complianceIssue);
            
            // Update employer metrics
            employerMetrics[msg.sender].totalPenalties += totalPenalty;
            employerMetrics[msg.sender].lastViolationDate = block.timestamp;
        } else {
            ethiCoin.reward(msg.sender, COMPLIANCE_REWARD, "Compliance reward");
            employerMetrics[msg.sender].totalRewards += COMPLIANCE_REWARD;
            emit ComplianceReward(msg.sender, COMPLIANCE_REWARD);
        }

        // Record the work
        workRecords[_worker][_date] = WorkRecord({
            date: _date,
            hoursWorked: _hoursWorked,
            wagePaid: _wagePaid,
            isCompliant: isCompliant,
            complianceIssue: complianceIssue,
            isPaid: false,
            overtimeHours: overtimeHours
        });

        workerWorkDates[_worker].push(_date);

        // Update employer metrics
        employerMetrics[msg.sender].totalWorkDays++;
        if (isCompliant) {
            employerMetrics[msg.sender].compliantDays++;
        }

        emit WorkHoursLogged(_worker, msg.sender, _date, _hoursWorked, _wagePaid, isCompliant);
    }

    /**
     * @dev Pay wages to worker
     */
    function payWages(address _worker, uint256 _date) 
        external 
        payable 
        onlyAuthorizedEmployer 
        validWorker(_worker) 
    {
        WorkRecord storage record = workRecords[_worker][_date];
        require(record.date != 0, "Work record not found");
        require(!record.isPaid, "Wages already paid");
        require(msg.value >= record.wagePaid, "Insufficient payment");

        record.isPaid = true;
        payable(_worker).transfer(record.wagePaid);

        // Refund excess payment
        if (msg.value > record.wagePaid) {
            payable(msg.sender).transfer(msg.value - record.wagePaid);
        }

        emit WagePaid(_worker, msg.sender, record.wagePaid);
    }

    /**
     * @dev Get work record for a specific date
     */
    function getWorkRecord(address _worker, uint256 _date)
        external
        view
        returns (
            uint256 date,
            uint256 hoursWorked,
            uint256 wagePaid,
            bool isCompliant,
            string memory complianceIssue,
            bool isPaid,
            uint256 overtimeHours
        )
    {
        WorkRecord memory record = workRecords[_worker][_date];
        return (
            record.date,
            record.hoursWorked,
            record.wagePaid,
            record.isCompliant,
            record.complianceIssue,
            record.isPaid,
            record.overtimeHours
        );
    }

    /**
     * @dev Get compliance metrics for an employer
     */
    function getComplianceMetrics(address _employer)
        external
        view
        returns (
            uint256 totalWorkDays,
            uint256 compliantDays,
            uint256 totalPenalties,
            uint256 totalRewards,
            uint256 lastViolationDate,
            uint256 compliancePercentage
        )
    {
        ComplianceMetrics memory metrics = employerMetrics[_employer];
        uint256 percentage = metrics.totalWorkDays > 0 
            ? (metrics.compliantDays * 100) / metrics.totalWorkDays 
            : 100;
            
        return (
            metrics.totalWorkDays,
            metrics.compliantDays,
            metrics.totalPenalties,
            metrics.totalRewards,
            metrics.lastViolationDate,
            percentage
        );
    }

    /**
     * @dev Get worker's work history dates
     */
    function getWorkerWorkDates(address _worker) external view returns (uint256[] memory) {
        return workerWorkDates[_worker];
    }

    /**
     * @dev Calculate compliance score for an employer
     */
    function getComplianceScore(address _employer) external view returns (uint256) {
        ComplianceMetrics memory metrics = employerMetrics[_employer];
        if (metrics.totalWorkDays == 0) return 100;
        
        uint256 baseScore = (metrics.compliantDays * 100) / metrics.totalWorkDays;
        
        // Reduce score based on recent violations
        if (metrics.lastViolationDate > 0 && block.timestamp - metrics.lastViolationDate < 30 days) {
            baseScore = baseScore > 10 ? baseScore - 10 : 0;
        }
        
        return baseScore;
    }
}
