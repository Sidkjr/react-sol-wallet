import { Button } from "react-bootstrap";
import { Alert } from "react-bootstrap";
import { useLocation } from "react-router-dom";
window.Buffer = window.Buffer || require("buffer").Buffer;

const {
    Connection,
    PublicKey,
    clusterApiUrl,
    Keypair,
    LAMPORTS_PER_SOL,
    Transaction,
    SystemProgram,
    sendAndConfirmTransaction
} = require("@solana/web3.js");

function TransactionPage() {
    const location = useLocation();
    const senders_privateKey = location.state.privateKey;
    console.log("Sender's Private Key: ")
    console.log(senders_privateKey);
    const senders_publicKey = location.state.publicKey;
    const recievers_publicKey = location.state.walletKey;
    var signature;
    const sender = Keypair.fromSecretKey(senders_privateKey);
    console.log(sender);

    const transferSol = async () => {
        const connection = new Connection(clusterApiUrl("testnet"), "confirmed");
        


        var transaction = new Transaction().add(
            SystemProgram.transfer({
                fromPubkey: new PublicKey(senders_publicKey),
                toPubkey : new PublicKey(recievers_publicKey),
                lamports: LAMPORTS_PER_SOL * 2
            })
        );

        signature = await sendAndConfirmTransaction(
            connection,
            transaction,
            [sender]
        );

        console.log("Signature is: ", signature);
    };

    transferSol();

    return(
        <div>
            <Alert variant="success">
            <Alert.Heading>Transaction sucessfull</Alert.Heading>

            <p>
                Your Phantom wallet has recieved 2 SOL from: 
            </p>

            <div className="content" dangerouslySetInnerHTML={{__html: senders_publicKey}}></div>
            <br/>
            <hr/>
            <p>Please Check out my</p>
            <br/>
            <div className="d-flex justify-content-end">
                <Button href="https://github.com/Sidkjr/" variant="outline-dark">Github</Button>
                <Button href="https://linkedin.com/in/siddhant-khare-13938920a/" variant="outline-primary">LinkedIn</Button>

            </div>
            
        </Alert>
        </div>
    )
};

export default TransactionPage