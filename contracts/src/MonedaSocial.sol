// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract MonedaSocial {
    mapping(address => int256) public balance;
    mapping(address => uint256) public lastUpdate;
    mapping(address => uint256) public creditLimit;

    uint256 public demurrageRatePerSecond;
    uint256 public baseCreditLimit;

    address public treasury;
    uint256 public treasuryCreditLimit;

    event Transfer(address indexed from, address indexed to, uint256 amount);
    event DemurrageApplied(address indexed user, uint256 decay);

    error ExceedsCreditLimit(address user, int256 newBalance);
    error Unauthorized();

    address private immutable deployer;

    constructor(
        uint256 _demurrageRatePerSecond,
        uint256 _baseCreditLimit,
        address _treasury,
        uint256 _treasuryCreditLimit
    ) {
        deployer = msg.sender;
        demurrageRatePerSecond = _demurrageRatePerSecond;
        baseCreditLimit = _baseCreditLimit;
        treasury = _treasury;
        treasuryCreditLimit = _treasuryCreditLimit;
        lastUpdate[treasury] = block.timestamp;
    }

    modifier onlyGovernance() {
        require(msg.sender == deployer, "Not governance");
        _;
    }

    /**
     * @notice Transfiere `amount` desde el llamante (msg.sender) hacia `to`.
     */
    function transfer(address to, uint256 amount) external {
        address from = msg.sender;
        require(to != address(0), "Invalid to");

        _applyLazyDemurrage(from);
        _applyLazyDemurrage(to);

        if (balance[from] - int256(amount) < -int256(_effectiveCreditLimit(from))) {
            revert ExceedsCreditLimit(from, balance[from] - int256(amount));
        }

        balance[from] -= int256(amount);
        balance[to]   += int256(amount);

        emit Transfer(from, to, amount);
    }

    function applyDemurrage(address user) external {
        _applyLazyDemurrage(user);
    }

    // --- gobernanza ---
    function setCreditLimit(address user, uint256 newLimit) external onlyGovernance {
        creditLimit[user] = newLimit;
    }
    function setDemurrageRate(uint256 newRate) external onlyGovernance {
        demurrageRatePerSecond = newRate;
    }
    function setBaseCreditLimit(uint256 newBase) external onlyGovernance {
        baseCreditLimit = newBase;
    }
    function setTreasury(address newTreasury) external onlyGovernance {
        treasury = newTreasury;
    }

    function getEffectiveCreditLimit(address user) external view returns (uint256) {
        return _effectiveCreditLimit(user);
    }

    // --- internals ---
    function _applyLazyDemurrage(address user) internal {
        uint256 timeDelta = block.timestamp - lastUpdate[user];
        if (timeDelta == 0) return;

        if (balance[user] > 0) {
            uint256 decay = (uint256(balance[user]) * demurrageRatePerSecond * timeDelta) / 1e18;
            if (decay > 0) {
                balance[user] -= int256(decay);
                balance[treasury] += int256(decay);
                emit DemurrageApplied(user, decay);
            }
        }
        lastUpdate[user] = block.timestamp;
    }

    function _effectiveCreditLimit(address user) internal view returns (uint256) {
        uint256 custom = creditLimit[user];
        return custom > 0 ? custom : baseCreditLimit;
    }
}
