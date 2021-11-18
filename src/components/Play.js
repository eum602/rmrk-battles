import React, {useState, useEffect} from "react"
import RMRK2SocketServerConnector from "./RMRK2SocketServerConnector";

function Play(props) {

  const [account, setAccount] = useState('');
  const [loadClient, setLoadClient] = useState(true);
  
  return (
    <div className="App">

      <div>
        {/* LOAD OR UNLOAD THE CLIENT */}
        <button onClick={() => setLoadClient(prevState => !prevState)}>
          STOP CLIENT
        </button>
        {/* Automatically connect to rmrk-battles server and look for rivals*/}
        {loadClient ? <RMRK2SocketServerConnector account={props.account} /> : null}
      </div>
    </div>
  );
}

export default Play;
