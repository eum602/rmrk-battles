import React, {useState, useEffect} from "react"
// import RmrkApi from './api/RmrkApi';
// import Play from "./components/play";
// import WalletConnector from './components/polkadotConnector';
//import RMRK2SocketServerConnector from "./components/rmrk2SocketServerConnector";
import RMRK2SocketServerConnector from "./components/RMRK2SocketServerConnector";

import Game from "./components/game";

/*"EVPRszrKPmDT5hwGNhnxp2N1LBKrJgTujpay6xmzQDr4RtN"*/
function App() {

  const [nftId, setNftId] = useState('');

  const onSelectedNftId = (_nftId) => {
    console.log("Selecting final id in app.js", _nftId)
    setNftId(_nftId)
  }
  
  return (
    <RMRK2SocketServerConnector nftId={nftId}>
      <Game onSelectedNftId={onSelectedNftId} />
    </RMRK2SocketServerConnector>
  );
}

export default App;
