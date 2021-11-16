import React, {useState, useEffect} from "react"
const axios = require("axios")

function RmrkApi (props) {
    const [nfts, setNfts] = useState([])
    const [error, setError] = useState(null);

    const getNFTByOwnerAddress = async () => {
        if(!props.account)return;
        let result;
        try {
            result = await axios(`https://kanaria.rmrk.app/api/rmrk2/account-birds/${props.account}`)
            //result = await axios(`https://kanaria.rmrk.app/api/rmrk2/account-birds/EVPRszrKPmDT5hwGNhnxp2N1LBKrJgTujpay6xmzQDr4RtN`)
            //result = await axios(`https://kanaria.rmrk.app/api/rmrk2/account-birds/CpF4Z26nfh8o7Am79mDLSUKBYaSCYkrFGjEYRyQjQfCQWMw`)
            
            if(!result.data){
                setError("Nothing returned")
                return;
            }
            const obtainedNFTs = result.data;
            console.log("Obtained NFTs",JSON.stringify(obtainedNFTs))
            if(JSON.stringify(obtainedNFTs) === JSON.stringify(nfts)) return;
            setNfts([...obtainedNFTs].map(object => {
               return object;
            }))
            
        }catch(e){
            console.log("Error", error)
            setError(e.message.data)
        }
    }

    const renderNFTs = () => {
        getNFTByOwnerAddress()
        return (
            <div>{nfts.map(nft => renderNFT(nft))}</div>
        )
    }

    const renderNFT = (nft) => {
        return (
            <div>
                <div>{JSON.stringify(nft)}</div>
                <div>{renderImage(nft.image)}</div>
            </div>
        )
    }

    const renderImage = (imageUrl) => {
        if (imageUrl){
            return (
                <img src={imageUrl}
                    alt="none"
                    style={{
                    verticalAlign: "middle",
                    display: "block",
                    margin: "auto",
                    marginLeft: "auto",
                    marginRight: "auto"
                    }}
                />
            )
        }

        return <div>No image found</div>
    }

    return (
        <div>
            {  error && <div>Error: {error}</div>}
            { renderNFTs()}
            <br/>
        </div>
    )
}

export default RmrkApi;