import { nexusClient } from "./create";

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

    console.log(receipt);
  } catch (err) {
    console.log("error: ", err);
  }
}

main();
