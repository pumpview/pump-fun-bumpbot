![App Screenshot](https://i.imgur.com/dl9Eboz.png)  
  # Open Source Pump.fun Bump Bot & Volume Generator (Multi-Wallet Support)💊  
  An easy to use Node.js App to generate Volume or Bump on any Pump.fun token using multiple wallets. Supports Windows, Mac & Linux.
  
   ## Features✨  
   - 🟢Fully Open Source and Free to Use
   - 📦Less dependencies
   - 📈Multi-Wallet Volume/Bump Trade Generation
   - 💵Auto send sol before low executable balance, without interupting trades   
   - 🔄One Command Recover Solana from Multi-Wallets
   - 🚫No Token Registration Fees needed 
   - 🤏Cheapest in execution 

[![Watch the video](https://i.imgur.com/zVmQJkO.gif)](https://vimeo.com/1059188108?share=copy)


  ## Get Started 🚀  
  To get started, follow the steps below.
  1) install [node.js](https://nodejs.org/en) on your system .
  2) install any IDE , [VS Code](https://code.visualstudio.com/) prefered.
  3) Open VS Code & in Terminal type the below given commands

  ``````
  git clone https://github.com/pumpview/pump-fun-bumpbot.git
  cd pump-fun-bumpbot
  npm install

  ``````
  4) Once installation is completed, you can open the file called ``config.js`` and fill up the details. example shown below

  ````
````export const mainWalletPrivateKey = 'your_main_wallet_key';

export const tokenMintAddress='CXVUmsyrwLBeWHfNPQKcZko96RoTe52HC41bjmRjzocK';

export const rpcUrl='https://api.devnet.solana.com';

export const walletCount=4;

export const solAmount=0.001;
  ````
  Here you need to provide details before running the code
  
  a) *mainWalletPrivateKey* - This wallet will be used to fund the bot, you can create a new wallet and send desired sol amount to the wallet and paste the private in the mentioned field.

  b) *tokenMintAddress* - This is the token contract address that you need to provide for bumping. you can get this information from pump.fun token page. This app will only work on tokens that are not graduated.

  c) *rpcUrl* - This is the field you have to add your rpcUrl. by default solana public rpc url is added here. for better performance , a paid rpcUrl is prefered.

  d) *walletCount* - This is the number of wallets that you plan to use for bumping or Volume generation. This app support multiwallet volume/bump generation . if you are using a public rpcUrl it is prefered to keep it at 4 . for better performance.

  e) *solAmount* - This is the field were you have to mention how much sol will be used per trade. This amount will be transfered from your mainWallet and send to volume/bump generation wallets, then 90% of that sol amount will be used for bumping. PS- by default , the app will do 10,000 trades if any wallets have fallen below the balance of 0.0007 SOL then additional sol will be send from the mainWallet to the volume/bump wallets automatically. make sure you close the app after execution. ``Ctrl+C`` to terminate or close VS code.


  5) Once all the fields are entered properly and there is enough funds in the mainWallet, You can start runing the bot by entering the command shown below.
  
  ``npm run start``
  
  The above given command will start the bot, initally it will do the creation of volume/bump wallets, these wallets will be saved in the directory called ``BUMP_WALLETS``, all the newly generated wallets will now recieve the ````solAmount```` mentioned above . Then 90% of that sol amount will be used to execute trades.

  6) Once you are done with bump/volume bot. you can recover funds from the bump/volume wallets by entering the command shown below. if there is withdrawable balance, the solAmount will be send to the mainWallet.

  ``npm run recover``


  By following the steps shown above, you can easily run the bot. if faced with any bugs , you can directly report it to [@solapriv](https://t.me/solapriv)


  
  ## Fund Safety & Code Transparency 🛡️  
 The software fully is Opensource and human readable , None of the code provided are Obfuscated or Encrypted. only npm packages used are 
 `````

 @solana/web3.js 

@coral-xyz/anchor
  `````
  These are official packages , which is verifyable by checking package.json.
  
  To Secure the MainWallet interactions , 
  ``The MainWallet Fund trasfers are done locally.`` Which ensures the safety of the main wallet.

  Bump/Volume Trades are done on our official api endpoint shown below. Bump trades are done via locally generated wallets.
 
  ``https://api-beta.pumpfunapi.xyz`` 
  
  Verfiable source : ``commands/utils/utils.js``

  _Additional Safety Measures:- Generate a new wallet using phantom or solflare and use it as the ````mainWalletPrivateKey````, only fund mainwallet with required sol amount, if any transactions failed you can recharge the mainwallet. Never Expose your personal wallets or privatekeys_

*A Fee of 1-2 % is Charged per Trade/Transfers*

To remove fees completely , you can buy the premium for 8 SOL.

Contact [@solapriv](https://t.me/solapriv)

**Disclaimer:**  

This software is open-source, fully human-readable, and free to use without restrictions. A small fee of 1-2% is charged per trade/transfer. The code ensures complete privacy and safety, with no private keys exposed or stored in external services or databases—keys are used only during execution.  

We are not liable for any damages caused by improper key management. DeFi trading carries inherent risks, including potential loss of funds. Users should manage risks responsibly. This code is intended for exploring DeFi and understanding market interactions via automation, strictly for educational purposes.