import React from "react";
import { Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const {
    Connection,
    PublicKey,
    clusterApiUrl,
    Keypair,
    LAMPORTS_PER_SOL
} = require("@solana/web3.js");

const newPair = new Keypair();
const publicKey = new PublicKey(newPair._keypair.publicKey).toString();
var walletBalance = 0;

const airDropSol = async () => {
    try {
        const connection = new Connection(clusterApiUrl("testnet"), "confirmed");

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

        walletBalance = await connection.getBalance(
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

warpFunction();

function KeyGenPage() {
    const navigate = useNavigate();

    const move_to_walletlink = () => {
        navigate("/phantomwall");
    }
    return(
        <Alert variant="success">
            <Alert.Heading>Wallet Generated sucessfully</Alert.Heading>

            <p>
                Your new wallet has been Generated and the wallet key is: 
            </p>
            <p id="wallkey"></p>
            <br/>
            <p>
                And we have also Airdropped some SOL, Here's the Balance: 
            </p>
            <p id="wallbal"></p>
            <br/>
            <script>
                document.getElementbyId("wallkey").innerHTML = publicKey;
                document.getElementbyId("wallbal").innerHTML = walletBalance;
            </script>
            <hr />
            <div className="d-flex justify-content-end">
                <Button onClick={move_to_walletlink} variant="outline-sucess">Next</Button>
            </div>
            
        </Alert>
    )
};

export default KeyGenPage