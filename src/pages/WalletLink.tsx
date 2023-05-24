import {
    PublicKey,
    Transaction,
} from "@solana/web3.js";
import '../App.css'
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import  LogoofPhantom from "../files/LogoofPhantom.png"

// create types
type DisplayEncoding = "utf8" | "hex";

type PhantomEvent = "disconnect" | "connect" | "accountChanged";
type PhantomRequestMethod =
  | "connect"
  | "disconnect"
  | "signTransaction"
  | "signAllTransactions"
  | "signMessage";

interface ConnectOpts {
  onlyIfTrusted: boolean;
}

// create a provider interface (hint: think of this as an object) to store the Phantom Provider
interface PhantomProvider {
  publicKey: PublicKey | null;
  isConnected: boolean | null;
  signTransaction: (transaction: Transaction) => Promise<Transaction>;
  signAllTransactions: (transactions: Transaction[]) => Promise<Transaction[]>;
  signMessage: (
    message: Uint8Array | string,
    display?: DisplayEncoding
  ) => Promise<any>;
  connect: (opts?: Partial<ConnectOpts>) => Promise<{ publicKey: PublicKey }>;
  disconnect: () => Promise<void>;
  on: (event: PhantomEvent, handler: (args: any) => void) => void;
  request: (method: PhantomRequestMethod, params: any) => Promise<unknown>;
}

/**
 * @description gets Phantom provider, if it exists
 */
 const getProvider = (): PhantomProvider | undefined => {
  if ("solana" in window) {
    // @ts-ignore
    const provider = window.solana as any;
    if (provider.isPhantom) return provider as PhantomProvider;
  }
};

function WalletLink() {
  const [provider, setProvider] = useState<PhantomProvider | undefined>(
    undefined
  );

	// create state variable for the wallet key
  const [walletKey, setWalletKey] = useState<PhantomProvider | undefined>(
  undefined
  );

  // this is the function that runs whenever the component updates (e.g. render, refresh)
  useEffect(() => {
	  const provider = getProvider();

		// if the phantom provider exists, set this as the provider
	  if (provider) setProvider(provider);
	  else setProvider(undefined);
  }, []);

  /**
   * @description prompts user to connect wallet if it exists.
	 * This function is called when the connect wallet button is clicked
   */
  const connectWallet = async () => {
    // @ts-ignore
    const { solana } = window;

		// checks if phantom wallet exists
    if (solana) {
      try {
				// connects wallet and returns response which includes the wallet public key
        const response = await solana.connect();
        ;
        console.log('wallet account ', response.publicKey.toString());
				// update walletKey to be the public key
        setWalletKey(response.publicKey.toString());
      } catch (err) {
      // { code: 4001, message: 'User rejected the request.' }
      }
    }
  };
    const location = useLocation();
    const private_key_genwall = location.state.privateKey;
    const public_key_genwall = location.state.publicKey;
    const fromAirDropSignature = location.state.fromAirDropSignature;

    console.log(private_key_genwall);
    console.log(public_key_genwall);

    const navigate = useNavigate();

    const move_to_transact = () => {
        navigate("/transactionPage", {state: {publicKey : public_key_genwall, privateKey : private_key_genwall, walletKey : walletKey, fromAirDropSignature : fromAirDropSignature}});
    }
    
    return(
      
        <div className="App">
          <header className="App-header">
            <h2>Let's Connect To Phantom</h2>
          </header>
          
          {provider && !walletKey && (
            <div className="d-grid gap-2">
              <Button onClick={connectWallet} variant="outline-success" size="lg">Connect wallet</Button>
            </div>
          )}
          {provider && walletKey && (
            <div className="d-grid gap-2">
              <div className="App-body">
                  <img
                  src={LogoofPhantom}
                  alt=""
                  style={{
                    height: '55px',
                    width: '55px',
                  }}></img>
                  <h3>Phantom sucessfully Connected!</h3>
              </div>
              <Button onClick={move_to_transact} variant="outline-success" size="lg">Let's Transact</Button>
            </div>
          )}
          {!provider && (
            <p>
              It seems you don't have Phantom. Install{""}
              <div className="d-grid gap-2">
                <Button href="https://phantom.app/download" variant="outline-info" size="lg">Phantom Extension</Button>
              </div>
            </p>
          )}
        </div>
    )
};

export default WalletLink