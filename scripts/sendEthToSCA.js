import { parseEther } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { createWalletClient, http } from "viem";
import { sepolia } from "viem/chains";
import * as dotenv from "dotenv";
dotenv.config();

const PRIV_KEY =
  "47157c052e35d3cdafdf9d534a49fbbbe2a37ecaafce274a9c9cae5c1f8e67c0";
const ALCHEMY_API_URL =
  "https://eth-sepolia.g.alchemy.com/v2/Py_4YGfXT-7DQ7bdjPaGlX_aByVDovww";

async function main() {
  const account = privateKeyToAccount(`0x${PRIV_KEY}`);

  const wallet = createWalletClient({
    account: account,
    chain: sepolia,
    transport: http(ALCHEMY_API_URL),
  });

  const txHash = await wallet.sendTransaction({
    to: "0x9cB3669FE3ffc1a36F9d047DA9F1eAa06F502b0D",
    value: parseEther("0.1"),
  });

  return txHash;
}

main().then((txHash) => {
  console.log("Transation hash: ", txHash);
});
