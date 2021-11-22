import React, {useState, useEffect} from "react"
import {web3Accounts, web3Enable} from "@polkadot/extension-dapp"
import {decodeAddress, encodeAddress} from "@polkadot/util-crypto"

function WalletConnector(props) {
    const [accounts, setAccounts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        extensionSetup()
    }, [])

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