import {web3Accounts, web3Enable} from "@polkadot/extension-dapp"
import {decodeAddress, encodeAddress} from "@polkadot/util-crypto"

export const extensionSetup = async() => {
    const status = { state: true, message: 'It´s all ready', ksmAccounts: [] }
    const extension = await web3Enable("nft-battles");
    if (extension.length === 0){
        status.state = false;
        status.message = 'No extension installed';
        return;
    }
    const accounts = await web3Accounts()
    accounts.forEach(account => {
        let decoded = decodeAddress(account.address);
        let ksmAddress = encodeAddress(decoded, 2); //ksm: prefix 2
        status.ksmAccounts.push(ksmAddress)
    })
    return status;
};