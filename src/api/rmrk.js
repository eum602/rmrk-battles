const axios = require("axios");

export const getNFTByOwnerAddress = async (account) => {
    let status = { state: true, message: 'Obtained NFTs', nfts: [] };
    try {
        const result = await axios(`https://kanaria.rmrk.app/api/rmrk2/account-birds/${account}`);
        status.nfts = result.data;
    } catch(err) {
        status = { state: true, message: 'Can´t obtaining NFTs', nfts: [] };
    }
    return status;
}