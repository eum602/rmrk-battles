import React, { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:4001";

export default function RMRK2SocketServerConnector(props) {
  const [response, setResponse] = useState("");
  const [account, setAccount] = useState("");
  const [socket, setSocket] = useState("")

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT)
    socket.on("otherRoom", data => {
      console.log("Party to fight ", data )
    })

    //if (props.account) setAccount(props.account);
    setSocket(socket);
    // CLEAN UP THE EFFECT
    return () => socket.disconnect();
    //

  }, []);

  const sendMyAddress = () => {
    if (!props || (props && !props.account))return;
    if (account === props.account) return;
    setAccount(prevState => {
      if (prevState === props.account) return;
      return props.account;
    })

    //I listen in the Room where other tokens of my category are
    let kindOfBird = "Founder" //must be dymamically obtained
    socket.on(kindOfBird, address => {
      console.log("new participant entered ", address)
    })
    
    //I Advise in the general room that 'I am in'
    socket.emit("accountsRoom", props.account);

    //I check if the other has accepted and if so I confirm I want to challenge  (I am the initial challenger) so a new match starts
    socket.on(props.account+"accept",(hasAccepted ,address) => {
      //TODO: verify this is available to fight
      console.log(`Has the player ${address} accepted?: ${hasAccepted}`)
      console.log("If the players accetps I will be receiving message about the challenge in 'matchRelayer' listener ...")
    })
    
    //listen for other who want to challenge me
    const nftId = "myuniqueidentifier" //set it from the nft endpoint
    socket.on(nftId, address => {
      console.log("new challenge received from", address)
    })
  }

  //to use to cheallenge other person
  const challengeSomeone = (challengedParticipant) => {
    //Challenge someone
    socket.emit("challengeRoom", props.account, challengedParticipant)
  }

  //I notice some is challenging me then I accept that
  const acceptChallenge = (amIAccepted,challenger) => {
    socket.emit("acceptChallenge", amIAccepted ,props.account, challenger)
  }

  const sendMatchMessage = (message,party) => {
    //e.g. message: I choose sccissor
    socket.emit("matchRelayer", message, props.account, party)
  }


  const receiveMatchMessage = (message,party) => {
    //e.g. message = "sccissor"
    socket.on(props.account + "matchMessage", (message, party) => {
      console.log("player is", party)
      console.log("the player chose", message)
    })
  }

  return (
    <p>
      It's <time dateTime={response}>{response}</time>
      {sendMyAddress()}
    </p>
  );
}