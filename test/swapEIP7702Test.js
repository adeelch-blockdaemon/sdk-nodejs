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
    const prepareTransaction7702 = await prepareTransaction('http://localhost:3000/dex/swapaggregator',
        {
            chainId,
            "path": ["0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1", "0x0b2c639c533813f4aa9d7837caf62653d097ff85"],
            "amountIn": "100000000000000",
            "chainSymbol": "OPT",
            "from": wallet.getAddressEVM(),
            "to": wallet.getAddressEVM(),
            "enableFee": true,
            "batchOption": "eip7702",
            "xApiKey": process.env.xApiKey
    });


    console.log(" === Prepare Transaction ===", prepareTransaction7702);
    // find "bridgeName": "Kyberswap", from array of prepareTransaction7702
    const kyperswapTransaction = prepareTransaction7702.find(item => {
        if (item.bridgeName === "Kyberswap") {
            return true;
        }
        return false;
    })

    console.log("prepareTransaction7702: ", kyperswapTransaction);

    // Signed Transaction
    const signedTx = await wallet.signTransactionEIP7702(kyperswapTransaction);

    //Sending transaction
    const tx = await wallet.sendTransaction(signedTx);
    console.log("Transaction Pending....", tx);
}

main();

