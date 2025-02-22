import { privateKeyToAccount } from "viem/accounts";
import { createSmartAccountClient } from "@biconomy/sdk";
import { baseSepolia, sepolia } from "viem/chains";
import { http, parseEther } from "viem";
import * as dotenv from "dotenv";
dotenv.config();

const privateKey = process.env.PRIV_KEY;
const account = privateKeyToAccount(`0x${privateKey}`);
const bundlerUrl =
  "https://bundler.biconomy.io/api/v3/84532/nJPK7B3ru.dd7f7861-190d-41bd-af80-6877f74b8f44";

// export const nexusClient = await createSmartAccountClient({
//   signer: account,
//   chain: baseSepolia,
//   transport: http(),
//   bundlerTransport: http(bundlerUrl),
// });

const nexusClient = await createSmartAccountClient({
  signer: account,
  chain: baseSepolia,
  transport: http(),
  bundlerTransport: http(bundlerUrl),
});

const smartAccountAddress = await nexusClient.account.address;

console.log(smartAccountAddress);

console.log(await nexusClient.account.isDeployed());

export async function main() {
  try {
    const hash = await nexusClient.sendTransaction({
      calls: [
        {
          to: "0x13D3DbabC6a417543cCA179dD2631C6aA3e86b90",
          value: parseEther("0.0003"),
        },
      ],
    });
    const receipt = await nexusClient.waitForTransactionReceipt({ hash });

    console.log("Reciept : ", receipt);
  } catch (error) {
    console.log("error: ", error);
  }
}

main();
