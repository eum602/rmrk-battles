import React from 'react';

const RMRKContext = React.createContext({
    account: null,
    nftId: null,
    matching: null,
    enemy: null,
    selectedAttack: null,
    attack: null,
    results: null,
    lastResult: null,
    setAccount: () => {},
    setNftId: () => {},
    setMatching: () => {},
    setEnemy: () => {},
    setSelectedAttack: () => {},
    setAttack: () => {},
    setResults: () => {},
    setLastResult: () => {},
    sendAttack: () => {},
})

export default RMRKContext;