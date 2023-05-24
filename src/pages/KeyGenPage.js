import { Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Alert } from "react-bootstrap";
import {  useNavigate } from "react-router-dom";

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
var walletBalance = 0;
var walletBalanceSol = 0;
var fromAirDropSignature;

const delay = ms => new Promise(
    resolve => setTimeout(resolve, ms)
);

const airDropSol = async () => {
    try {
        const connection = new Connection(clusterApiUrl("testnet"), "confirmed");

        console.log("Airdropping some SOL to my wallet!");
        fromAirDropSignature = await connection.requestAirdrop(
            new PublicKey(publicKey),
            1 * LAMPORTS_PER_SOL
        );
        await connection.confirmTransaction({ signature: fromAirDropSignature});
    } catch (err) {
        console.log(err);
    }
};

const getWalBalance = async () => {
    try {
        const connection = new Connection(clusterApiUrl("testnet"), "confirmed");
        // console.log("Connection object is: ", connection);

        walletBalance = await connection.getBalance(new PublicKey(publicKey));
        walletBalanceSol = parseInt(walletBalance) / LAMPORTS_PER_SOL;


        console.log(`Wallet balance: ${walletBalanceSol} SOL`);
    } catch (err) {
        console.log(err);
    }
};

const warpFunction = async () => {
    await airDropSol();
    await delay(10000);
    await airDropSol();
    await delay(10000);
    await airDropSol();
    await getWalBalance();
};

warpFunction();

function KeyGenPage() {
    const navigate = useNavigate();

    const move_to_walletlink = () => {
        navigate("/phantomwall", {state: {publicKey : publicKey, privateKey : privateKey, fromAirDropSignature : fromAirDropSignature}});
    }
    return(
        <Alert variant="success">
            <Alert.Heading>Wallet Generated sucessfully</Alert.Heading>

            <p>
                Your new wallet has been Generated and the wallet key is: 
            </p>
            <div className="content" dangerouslySetInnerHTML={{__html: publicKey}}></div>
            <br/>
            <p>
                We have also Airdropped some SOL into your Wallet, The following is the private key ps:- Keep it Hidden:) 
            </p>
            <div className="content" dangerouslySetInnerHTML={{__html: privateKey}}></div>
            <br/>
            <hr/>
            <div className="d-flex justify-content-end">
                <Button onClick={move_to_walletlink} variant="outline-sucess">Next</Button>
            </div>
            
        </Alert>
    )
    
};

export default KeyGenPage