import React, {useState, useEffect} from "react"
import RmrkApi from './api/RmrkApi';
import WalletConnector from './components/PolkadotConnector';

function App() {

  const [account, setAccount] = useState('');
  
  return (
    <div className="App">
      <WalletConnector onAccountReady={setAccount}/>
      <RmrkApi account={ account /*"EVPRszrKPmDT5hwGNhnxp2N1LBKrJgTujpay6xmzQDr4RtN"*/}/>
    </div>
  );
}

export default App;
