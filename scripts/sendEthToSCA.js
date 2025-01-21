import { parseEther } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { createWalletClient, http } from "viem";
import { baseSepolia, sepolia } from "viem/chains";
import * as dotenv from "dotenv";
dotenv.config();

const PRIV_KEY = process.env.PRIV_KEY;
const ALCHEMY_API_URL = process.env.ALCHEMY_API_URL;

async function main() {
  const account = privateKeyToAccount(`0x${PRIV_KEY}`);

  const wallet = createWalletClient({
    account: account,
    chain: baseSepolia,
    transport: http(ALCHEMY_API_URL),
  });

  const txHash = await wallet.sendTransaction({
    to: "0x9cB3669FE3ffc1a36F9d047DA9F1eAa06F502b0D",
    value: parseEther("0.05"),
  });

  return txHash;
}

main().then((txHash) => {
  console.log("Transation hash: ", txHash);
});
