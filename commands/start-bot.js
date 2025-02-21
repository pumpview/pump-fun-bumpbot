import { bumpBuy, connection, createKeyPair, getOrCreateKeypairs, lamportsToSol, sendSolForAll } from "./utils/utils.js";
import { mainWalletPrivateKey, rpcUrl, solAmount, tokenMintAddress, walletCount } from "../config.js";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

const tradeWallets = await getOrCreateKeypairs(walletCount);
const mainWalletKeypair = createKeyPair(mainWalletPrivateKey);

const runRequests = async () => {
  let requests = [];
  
  for (const wallet of tradeWallets) {
    const tradeWallet = wallet.secretKey;
    const walletKeyPair = createKeyPair(tradeWallet);
    const balance = await connection.getBalance(walletKeyPair.publicKey);
    const buyAmount = lamportsToSol(balance - balance * 90 / 100).toFixed(4);

    if (buyAmount < 0.0001) {
      await sendSolForAll([walletKeyPair], solAmount * LAMPORTS_PER_SOL, mainWalletKeypair);
    }

    const tradeResponse = bumpBuy({ rpcUrl, seller: tradeWallet, mint: tokenMintAddress, amount: buyAmount });
    requests.push(tradeResponse);
  }

  try {
    const results = await Promise.allSettled(requests);
    for (const result of results) {
      console.log("Results:", result.value?.message || result.reason);
    }
  } catch (error) {
    console.error("Error in runRequests:", error);
  }
};

const executeWithCount = async (count) => {
  for (let i = 0; i < count; i++) {
    console.log(`Execution ${i + 1} started...`);
    await runRequests();
    console.log(`Execution ${i + 1} completed.`);

    if (i < count - 1) {
      await new Promise((resolve) => setTimeout(resolve, 10000)); // Wait 10 seconds
    }
  }
  console.log("All executions completed.");
};

// ✅ Run 10000 times  
await executeWithCount(100000);
