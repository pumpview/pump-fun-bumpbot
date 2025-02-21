//This wallet will be used to fund all the volume generator wallets
//Generate a new wallet and fund it with required sol
export const mainWalletPrivateKey = 'your_main_wallet_key';

//This is the token contract address of the pumpfun coin that you need to generate volume
//copy and paste your contract address below
export const tokenMintAddress='CXVUmsyrwLBeWHfNPQKcZko96RoTe52HC41bjmRjzocK';


//This is the rpc url that will be used to send transaction.
//Devnet is available for test purposes. 
//use mainnet rpc for live volume generation. use paid rpc url for better performance
export const rpcUrl='https://api.devnet.solana.com';


//How many wallets are you going to use to generate volume?. remember , volume booster wallets will not have any tokens left after each trade
//ideal count of wallets must be 3-4 wallets
export const walletCount=4;


//how much sol to use for volume generation
//eg: 0.001 SOL.
export const solAmount=0.001;






