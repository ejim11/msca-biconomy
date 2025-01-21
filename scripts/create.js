import { privateKeyToAccount } from "viem/accounts";
import { createSmartAccountClient } from "@biconomy/sdk";
import { baseSepolia, sepolia } from "viem/chains";
import { http, parseEther } from "viem";

const privateKey =
  "47157c052e35d3cdafdf9d534a49fbbbe2a37ecaafce274a9c9cae5c1f8e67c0";
const account = privateKeyToAccount(`0x${privateKey}`);
const bundlerUrl =
  "https://bundler.biconomy.io/api/v3/84532/nJPK7B3ru.dd7f7861-190d-41bd-af80-6877f74b8f44";

export async function main() {
  try {
    const nexusClient = await createSmartAccountClient({
      signer: account,
      chain: sepolia,
      transport: http(),
      bundlerTransport: http(bundlerUrl),
    });

    const smartAccountAddress = await nexusClient.account.address;

    console.log(smartAccountAddress);

    console.log(await nexusClient.account.isDeployed());

    const hash = await nexusClient.sendUserOperation({
      calls: [
        {
          to: "0x13D3DbabC6a417543cCA179dD2631C6aA3e86b90",
          data: "0x",
          value: parseEther("0.003"),
        },
      ],
    });
    const receipt = await nexusClient.waitForTransactionReceipt({ hash });

    console.log(receipt);
  } catch (error) {
    console.log("error: ", error);
  }
}

main();
