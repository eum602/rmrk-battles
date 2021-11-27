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
    setSocket(socket);
    // CLEAN UP THE EFFECT
    return () => socket.disconnect();
  }, []);

  useEffect(() => {
    startSocketMessagePassingScheme()    
  },[props.nftId])

  const startSocketMessagePassingScheme = () => {
    console.log("Now there is an address!!!!", props.nftId)
    if (!props.nftId) return;

    //I listen in the Room where other tokens of my category are
    let kindOfBird = "Founder" //must be dymamically obtained
    socket.on(kindOfBird, nftIdOtherParticipant => {
      console.log("new participant entered ", nftIdOtherParticipant)
      //for simplicity we challenge the first one immediately
      //set partyInChallenge=true // to avoid challenging during an ongoing party
      challengeSomeone(nftIdOtherParticipant)
    })

    //I check if the other has accepted and if so I confirm I want to challenge  (I am the initial challenger) so a new match starts
    socket.on(props.nftId+"acceptRoom",(challengedNftIdentifier, hasAccepted) => {
      //TODO: verify this is available to fight
      console.log(`Has the player ${challengedNftIdentifier} accepted?: ${hasAccepted}`)
      console.log("If the players accetps I will be receiving message about the challenge in 'matchRelayerRoom' listener ...")
      //Allow the user set its first move and send it through 'matchRelayerRoom' --> use "sendMatchMessage" method
    })
    
    //listen for other who want to challenge me
    socket.on(props.nftId, challengerNFTId => {
      console.log("new challenge received from", challengerNFTId)
      //elucidate whether accept the challenge or not
      //show logic to user
      //set partyInChallenge=true // to avoid challenging during an ongoing party
      const amIAccepted = true //for simplicity accepting immeadiately
      acceptChallenge(amIAccepted, challengerNFTId);
    })

    //I listen the message coming from the other player during a contest
    socket.on(props.nftId + "matchMessage", (message, party) => {
      console.log("player is", party)
      console.log("the player chose", message)
    })

    //I Advise in the general room that 'I am in'
    socket.emit("generalNftsRoom", props.nftId);
  }

  //to use to cheallenge other person
  const challengeSomeone = (challengedParticipant) => {
    //Challenge someone
    console.log("challenging to: ", challengedParticipant)
    socket.emit("challengeRoom", props.nftId, challengedParticipant)
  }

  //I notice some is challenging me then I accept that
  const acceptChallenge = (amIAccepted,challenger) => {
    socket.emit("acceptChallengeRoom", amIAccepted, props.nftId, challenger)
    //listen in the room where contestants are going to exchange messages
    //socket.on("")
  }

  const sendMatchMessage = (message,party) => {
    //e.g. message: I choose sccissor
    socket.emit("matchRelayerRoom", message, props.nftId, party)
  }

  return (
    <RMRKContext.Provider value={value}>
      {props.children}
    </RMRKContext.Provider>
  )
}