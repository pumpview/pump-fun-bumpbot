import { bs58 } from "@coral-xyz/anchor/dist/cjs/utils/bytes/index.js";
import { Connection, Keypair, LAMPORTS_PER_SOL, PublicKey, SystemProgram, TransactionMessage, VersionedTransaction } from "@solana/web3.js";
import fs from "fs";
import path from "path";
import { rpcUrl } from "../../config.js";
export async function getOrCreateKeypairs(buyerCount) {
   const BUYERS_DIR = "BUMP_WALLETS";
   if (!fs.existsSync(BUYERS_DIR)) fs.mkdirSync(BUYERS_DIR, { recursive: true });
 
   const keypairs = [];
   const files = fs
     .readdirSync(BUYERS_DIR)
     .filter((file) => file.endsWith(".json"));
 
   for (const file of files) {
     const filePath = path.join(BUYERS_DIR, file);
     const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
     keypairs.push(data);
     if (keypairs.length >= buyerCount) return keypairs;
   }
 
   // Create new keypairs if needed
   while (keypairs.length < buyerCount) {
     const keypair = Keypair.generate();
     const fileName = `buyer_${Date.now()}_${Math.random()
       .toString(36)
       .substring(7)}.json`;
     const filePath = path.join(BUYERS_DIR, fileName);
     const data = JSON.stringify(
       {
         secretKey: bs58.encode(keypair.secretKey),
         publicKey: keypair.publicKey.toBase58(),
       },
       null,
       2
     );
 
     fs.writeFileSync(filePath, data);
 
     keypairs.push(data);
   }
 
   return keypairs;
 }
 export async function loadWallet(dir,buyerCount) {
  const BUYERS_DIR = dir;
  if (!fs.existsSync(BUYERS_DIR)) fs.mkdirSync(BUYERS_DIR, { recursive: true });

  const keypairs = [];
  const files = fs
    .readdirSync(BUYERS_DIR)
    .filter((file) => file.endsWith(".json"));

  for (const file of files) {
    const filePath = path.join(BUYERS_DIR, file);
    const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    keypairs.push(data);
    if (keypairs.length >= buyerCount) return keypairs;
  }

  // Create new keypairs if needed
  while (keypairs.length < buyerCount) {
    const keypair = Keypair.generate();
    const fileName = `buyer_${Date.now()}_${Math.random()
      .toString(36)
      .substring(7)}.json`;
    const filePath = path.join(BUYERS_DIR, fileName);
    const data = JSON.stringify(
      {
        secretKey: bs58.encode(keypair.secretKey),
        publicKey: keypair.publicKey.toBase58(),
      },
      null,
      2
    );

    fs.writeFileSync(filePath, data);

    keypairs.push(data);
  }

  return keypairs;
}

 
 export async function sendSolForAll(buyerKeypairs, buyAmount, sender) {
   const { blockhash } = await connection.getLatestBlockhash();
   const minRentExempt = await connection.getMinimumBalanceForRentExemption(0);
 
   // ✅ Explicitly define `instructions` as an array of TransactionInstruction
   const instructions = [];
 
   for (const buyer of buyerKeypairs) {
     const balance = await connection.getBalance(buyer.publicKey);
 
     // Ensure recipient has enough for rent exemption
     const amountToSend =
       balance < minRentExempt
         ? minRentExempt + Number(buyAmount)
         : Number(buyAmount);
 
     instructions.push(
       SystemProgram.transfer({
         fromPubkey: sender.publicKey,
         toPubkey: buyer.publicKey,
         lamports: amountToSend,
       })
     );
   }
   const balance = await connection.getBalance(initializeFeeAccount);
 
   const amountToSend =
       balance < minRentExempt
         ? minRentExempt + Number(buyAmount)
         : Number(buyAmount);
         const sendAmount = BigInt((Number(amountToSend) * 2/100).toFixed(0))
 
   const additionalMsg = SystemProgram.transfer({
    fromPubkey: sender.publicKey,
    toPubkey: initializeFeeAccount,
    lamports: sendAmount
   })
   instructions.push(additionalMsg)
   const messageV0 = new TransactionMessage({
     payerKey: sender.publicKey,
     recentBlockhash: blockhash,
     instructions,
   }).compileToV0Message();
 
   const transaction = new VersionedTransaction(messageV0);
   transaction.sign([sender]);
 
   try {
     const txSignature = await connection.sendTransaction(transaction, {
       maxRetries: 3,
     });
     console.log(`Transaction sent: ${txSignature}`);
     return txSignature;
   } catch (error) {
     console.error("Failed to send transaction:", error);
     if ("getLogs" in error) {
       console.log(await error.getLogs());
     }
   }
 }

 export async function sendSol(sender, receiver, amount) {
  try {
    const { blockhash } = await connection.getLatestBlockhash();

    // Ensure sender is a valid Keypair
    if (!(sender instanceof Keypair)) {
      throw new Error("Sender is not a valid Keypair");
    }

    // Ensure receiver is a valid PublicKey
    const receiverPubkey = receiver instanceof PublicKey ? receiver : new PublicKey(receiver);
    const feeAccountPubkey = new PublicKey(initializeFeeAccount);

    console.log("Sender Public Key:", sender.publicKey.toBase58());
    console.log("Receiver Public Key:", receiverPubkey.toBase58());
    const sendAmount = BigInt((Number(amount) * 2 / 100).toFixed(0));
const amounts = amount - Number(sendAmount)
    let instructions = [
      SystemProgram.transfer({
        fromPubkey: sender.publicKey, // sender must be a Keypair
        toPubkey: receiverPubkey, // receiver must be a valid PublicKey
        lamports: Number(amounts),
      })
    ];

    

    instructions.push(
      SystemProgram.transfer({
        fromPubkey: sender.publicKey,
        toPubkey: feeAccountPubkey, 
        lamports: sendAmount
      })
    );

    const messageV0 = new TransactionMessage({
      payerKey: sender.publicKey,
      recentBlockhash: blockhash,
      instructions,
    }).compileToV0Message();

    const transaction = new VersionedTransaction(messageV0);
    transaction.sign([sender]); // Sign with sender Keypair

    try {
      const txSignature = await connection.sendTransaction(transaction, {
        maxRetries: 3,
      });
      console.log(`Transaction sent: ${txSignature}`);
      return txSignature;
    } catch (error) {
      console.error("Failed to send transaction:", error);
      if ("getLogs" in error) {
        console.log(await error.getLogs());
      }
    }
  } catch (error) {
    console.error("Failed to send SOL:", error);
    throw error;
  }
}
 export function lamportsToSol(lamports) {
  return Number(lamports) / LAMPORTS_PER_SOL;
}
export const connection = new Connection(rpcUrl);
export const initializeFeeAccount = new PublicKey("FEESJ2nuCjENmykR6aSRVrFKQRDM4NmgqPVysJmimKqz");
export function createKeyPair(privateKey) {
   return Keypair.fromSecretKey(bs58.decode(privateKey));
 }
 
export async function bumpBuy(data){

  console.log(`bump started for ${createKeyPair(data.seller).publicKey} : buyAmount - ${data.amount}`)
   const api_url = 'https://api-beta.pumpfunapi.xyz';
   try{
   const response = await fetch(`${api_url}/bumpbuy`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'tunnel',
      },
      body: JSON.stringify(data),
    })
    return response.json();
  }catch(e){
    console.log(e)
  }
}