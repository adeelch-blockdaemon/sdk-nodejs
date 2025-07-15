const dotenv = require('dotenv');
dotenv.config();

const { Wallet, prepareTransaction } = require('../src/index');
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

    // Prepare the transaction from expand api
    // We are making an approve call here
    const prepareTransaction7702 = await prepareTransaction('http://localhost:3000/dex/swapaggregator',
        {
            "chainId": "10",
            "path": ["0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1", "0x0b2c639c533813f4aa9d7837caf62653d097ff85"],
            "amountIn": "100000000000000",
            "chainSymbol": "OPT",
            "from": "0x3806a6b1A5fCe178AB64E55c652D46e669BC2318",
            "to": "0x3806a6b1A5fCe178AB64E55c652D46e669BC2318",
            "enableFee": true,
            "batchOption": "eip7702",
            "xApiKey": process.env.xApiKey
    });


    // Signed Transaction
    console.log("prepareTransaction7702: ", prepareTransaction7702);
}

main();

