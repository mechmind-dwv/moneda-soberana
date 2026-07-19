export const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

export const CONTRACT_ABI = [
  "function transfer(address to, uint256 amount) external",
  "function applyDemurrage(address user) external",
  "function balance(address) view returns (int256)",
  "function getEffectiveCreditLimit(address) view returns (uint256)",
  "function creditLimit(address) view returns (uint256)",
  "function demurrageRatePerSecond() view returns (uint256)",
  "function baseCreditLimit() view returns (uint256)",
  "function treasury() view returns (address)",
  "function treasuryCreditLimit() view returns (uint256)",
  "event Transfer(address indexed from, address indexed to, uint256 amount)",
  "event DemurrageApplied(address indexed user, uint256 decay)"
];
