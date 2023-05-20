import React from "react";
const {
    Connection,
    PublicKey,
    clusterApiUrl,
    Keypair,
    LAMPORTS_PER_SOL
} = require("@solana/web3.js");

const newPair = new Keypair();
const publicKey = new PublicKey(newPair._keypair.publicKey).toString();
const privateKey = newPair._keypair.secretKey;

const airDropSol = async () => {
    try {
        const connection = new Connection(clusterApiUrl("testnet"), "confirmed");
        const myWallet = await Keypair.fromSecretKey(privateKey);

        console.log("Airdropping some SOL to my wallet!");
        const fromAirDropSignature = await connection.requestAirdrop(
            new PublicKey(publicKey),
            2 * LAMPORTS_PER_SOL
        );
        await connection.confirmTransaction(fromAirDropSignature);
    } catch (err) {
        console.log(err);
    }
};

const getWalBalance = async () => {
    try {
        const connection = new Connection(clusterApiUrl("testnet"), "confirmed");
        // console.log("Connection object is: ", connection);

        const walletBalance = await connection.getBalance(
            new PublicKey(publicKey)
        );

        console.log(`Wallet balance: ${parseInt(walletBalance) / LAMPORTS_PER_SOL} SOL`);
    } catch (err) {
        console.log(err);
    }
};

const warpFunction = async () => {
    await airDropSol();
    await getWalBalance();
};


function HomeMain() {
    warpFunction();
    return(
        <div>Main Page</div>
    )
}

export default HomeMain