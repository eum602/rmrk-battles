import React, {useState, useEffect} from "react"
import {web3Accounts, web3Enable} from "@polkadot/extension-dapp"
import {decodeAddress, encodeAddress} from "@polkadot/util-crypto"

function WalletConnector(props) {
    const [accounts, setAccounts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        extensionSetup()
    }, [])

    const extensionSetup = async() => {
        const extension = await web3Enable("nft-battles");
        if (extension.length === 0){
            setError('No extension installed');
            return;
        }
        let ksmAccounts = []
        const accounts = await web3Accounts()
        accounts.forEach(account => {
            let decoded = decodeAddress(account.address);
            let ksmAddress = encodeAddress(decoded, 2); //ksm: prefix 2
            ksmAccounts.push(ksmAddress)
        })
        if (ksmAccounts.length>0) props.onAccountReady(ksmAccounts[0]);
        return;
    };

    return (
        <div>
            {
                error && <div>Error: {error}</div>

            }
            {
                //accounts.map(account => <div style={{marginTop: 10}}>{account}</div>)
            }
        </div>
    )
}

export default WalletConnector;