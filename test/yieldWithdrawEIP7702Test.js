const dotenv = require('dotenv');
dotenv.config();

const { Wallet, prepareTransaction } = require('../src');
const {WalletCircle} = require("../src");

async function initWallet(options) {
    const wallet = new Wallet(options);
    return wallet;
}
async function main() {

    // configure the env

    // Initialise the wallet client
    const wallet = await initWallet({
        privateKey: process.env.privateKey,
        xApiKey: process.env.xApiKey,
    });

    const chainId = "10"; // Optimism chain ID
    // initialise the wallet
    await wallet.initWalletEVM({
        chainId,
    });

    console.log("=== Wallet Initialised ===", wallet.getAddressEVM());
    // Prepare the transaction from expand api
    // We are making an approve call here
    const prepareTransaction7702 = await prepareTransaction('http://localhost:3000/yieldaggregator/withdrawvault',
        {
            "from": "0x3806a6b1A5fCe178AB64E55c652D46e669BC2318",
            "tokenAddress": "0x7Bc5728BC2b59B45a58d9A576E2Ffc5f0505B35E",
            "amount": "290720000", // erc20 token
            "gas": "2307200",
            "yieldAggregatorId": "5003",
            "enableFee": false,
            "totalDeposit": "290720000000000",
            "xApiKey": process.env.xApiKey
        }
    );


    console.log(" === Prepare Transaction ===", prepareTransaction7702);
    //
    const signedTx = await wallet.signTransactionEIP7702(prepareTransaction7702);

    // //Sending transaction
    const tx = await wallet.sendTransaction(signedTx);
    console.log("Transaction Pending....", tx);
}

main();

