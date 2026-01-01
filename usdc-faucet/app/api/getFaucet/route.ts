import { NextRequest, NextResponse } from "next/server";
import { createWalletClient, http, parseUnits, isAddress } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { mantleSepoliaTestnet } from "viem/chains";

export async function POST(req: NextRequest) {
  try {
    const { address } = await req.json();

    if (!address || !isAddress(address)) {
      return NextResponse.json(
        { success: false, error: "Invalid wallet address" },
        { status: 400 }
      );
    }

    const MIN_AMOUNT = parseUnits("10", 6);

    const account = privateKeyToAccount(process.env.PRIVATE_KEY as `0x${string}`);
    const client = createWalletClient({
      account,
      chain: mantleSepoliaTestnet,
      transport: http(),
    });

    const writeContract = await client.writeContract({
      address: "0x3D884Eca2a1E65A41Cd54b1CF55537dAe35d7BDC",
      abi: [
        {
          name: "mint",
          type: "function",
          inputs: [
            { name: "account", type: "address" },
            { name: "value", type: "uint256" },
          ],
          outputs: [],
          stateMutability: "nonpayable",
        },
      ],
      functionName: "mint",
      args: [address, MIN_AMOUNT],
    });

    return NextResponse.json({
      success: true,
      address,
      transactionHash: writeContract,
    });
  } catch (err) {
    console.error("Faucet error:", err);
    return NextResponse.json(
      { success: false, error: "Failed to send USDC" },
      { status: 500 }
    );
  }
}
