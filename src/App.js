import React, {useState, useEffect} from "react"
import RmrkApi from './api/RmrkApi';
import Play from "./components/Play";
import WalletConnector from './components/PolkadotConnector';

function App() {

  const [account, setAccount] = useState('');
  const [loadClient, setLoadClient] = useState(true);
  
  return (
    <div className="App">
      <WalletConnector onAccountReady={setAccount}/>
      <RmrkApi account={ account /*"EVPRszrKPmDT5hwGNhnxp2N1LBKrJgTujpay6xmzQDr4RtN"*/}/>
      <Play account= {account}/>
    </div>
  );
}

export default App;
