
import { mainWalletPrivateKey, walletCount } from "../config.js"
import { connection, createKeyPair, getOrCreateKeypairs,    sendSol } from "./utils/utils.js"

let allWallets = [];
const bumpwallets = await getOrCreateKeypairs(walletCount);
allWallets.push(...bumpwallets);
const mainWalletKeyPair = createKeyPair(mainWalletPrivateKey).publicKey;
for(const wallet of allWallets){
   const keyPair = createKeyPair(wallet.secretKey);
   
   const balance = await connection.getBalance(keyPair.publicKey);
   if(balance === 0 || balance<5000){
      console.log('zero or low balance skiping wallet', wallet.publicKey)
      
   }else{
   const sendAmount =  balance - 5000
  await sendSol(keyPair,mainWalletKeyPair,sendAmount.toFixed(0))
   }
   
}

