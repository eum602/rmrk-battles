import React, {useState, useEffect} from "react"
// import RmrkApi from './api/RmrkApi';
// import Play from "./components/play";
// import WalletConnector from './components/polkadotConnector';
import RMRK2SocketServerConnector from "./components/RMRK2SocketServerConnector";
import Game from "./components/game";

/*"EVPRszrKPmDT5hwGNhnxp2N1LBKrJgTujpay6xmzQDr4RtN"*/
function App() {
  return (
    <RMRK2SocketServerConnector>
      <Game/>
    </RMRK2SocketServerConnector>
  );
}

export default App;
