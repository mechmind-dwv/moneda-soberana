import { ethers } from "ethers";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "../contractConfig";

// Proveedor fijo (Anvil local)
const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");

// Billetera de prueba (cuenta 0 de Anvil)
const privateKey = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
const wallet = new ethers.Wallet(privateKey, provider);

export const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, wallet);

export async function getBalance(address) {
  const bal = await contract.balance(address);
  return ethers.formatEther(bal);
}

export async function getCreditLimit(address) {
  const limit = await contract.getEffectiveCreditLimit(address);
  return ethers.formatEther(limit);
}

export async function sendTransaction(to, amount) {
  const tx = await contract.transfer(to, ethers.parseEther(amount));
  await tx.wait();
  return tx;
}
