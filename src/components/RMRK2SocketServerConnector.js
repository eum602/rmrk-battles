import React, { useContext, useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import RMRKContext from "./context";
const ENDPOINT = "http://127.0.0.1:4001";

const accountDefault = 'EVPRszrKPmDT5hwGNhnxp2N1LBKrJgTujpay6xmzQDr4RtN' // null

export default function RMRK2SocketServerConnector(props) {
  const [socket, setSocket] = useState("")
  const [account, setAccount] = React.useState(null);
  const value = React.useMemo(() => ({ account, setAccount }), [account]);

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT)

    //if (props.account) setAccount(props.account);
    setSocket(socket);
    // CLEAN UP THE EFFECT
    return () => socket.disconnect();
    //

  }, []);

  useEffect(() => {
    sendMyAddress();
  }, [account]);

  const sendMyAddress = () => {
    if (!account) return;

    //I listen in the Room where other tokens of my category are
    let kindOfBird = "Founder" //must be dymamically obtained
    socket.on(kindOfBird, address => {
      console.log("new participant entered ", address)
    })
    
    //I Advise in the general room that 'I am in'
    socket.emit("generalNftsRoom", account);

    //I check if the other has accepted and if so I confirm I want to challenge  (I am the initial challenger) so a new match starts
    socket.on(account+"acceptRoom",(hasAccepted ,address) => {
      //TODO: verify this is available to fight
      console.log(`Has the player ${address} accepted?: ${hasAccepted}`)
      console.log("If the players accetps I will be receiving message about the challenge in 'matchRelayerRoom' listener ...")
    })
    
    //listen for other who want to challenge me
    const nftId = "myuniqueidentifier" //set it from the nft endpoint
    socket.on(nftId, challengerNFTId => {
      console.log("new challenge received from", challengerNFTId)
      //elucidate whether accept the challenge or not
      //show logic to user
      const amIAccepted = true //false
      acceptChallenge(amIAccepted, challengerNFTId);
    })
  }

  //to use to cheallenge other person
  const challengeSomeone = (challengedParticipant) => {
    //Challenge someone
    socket.emit("challengeRoom", props.account, challengedParticipant)
  }

  //I notice some is challenging me then I accept that
  const acceptChallenge = (amIAccepted,challenger) => {
    socket.emit("acceptChallengeRoom", amIAccepted, account, challenger)
    //listen in the room where contestants are going to exchange messages
    socket.on("")
  }

  const sendMatchMessage = (message,party) => {
    //e.g. message: I choose sccissor
    socket.emit("matchRelayerRoom", message, props.account, party)
  }

  const receiveMatchMessage = (message,party) => {
    //e.g. message = "sccissor"
    socket.on(props.account + "matchMessage", (message, party) => {
      console.log("player is", party)
      console.log("the player chose", message)
    })
  }

  return (
    <RMRKContext.Provider value={value}>
      {props.children}
    </RMRKContext.Provider>
  )
}