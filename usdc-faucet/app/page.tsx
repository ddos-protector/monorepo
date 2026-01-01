"use client";

import { useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

export default function Home() {
  const [address, setAddress] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [txHash, setTxHash] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!address.trim()) return;

    setStatus("loading");
    setError(null);
    setTxHash(null);

    try {
      const res = await fetch("/api/getFaucet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address: address.trim() }),
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to request USDC");
      }

      setTxHash(data.transactionHash);
      setStatus("success");
      setAddress("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setStatus("error");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white dark:bg-black">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-md px-4">
        <h1 className="text-2xl font-semibold text-black dark:text-white">USDC Faucet</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Get 10 USDC on Mantle Sepolia Testnet
        </p>

        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="0x..."
          disabled={status === "loading"}
          className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-black text-black dark:text-white disabled:opacity-50"
        />

        <button
          type="submit"
          disabled={status === "loading" || !address.trim()}
          className="px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === "loading" ? "Sending..." : "Get USDC"}
        </button>

        {status === "success" && txHash && (
          <div className="text-sm text-green-600 dark:text-green-400">
            <p>Sent successfully!</p>
            <a
              href={`https://sepolia.mantlescan.xyz/tx/${txHash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline break-all"
            >
              View transaction
            </a>
          </div>
        )}

        {status === "error" && error && (
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
        )}
      </form>
    </div>
  );
}
