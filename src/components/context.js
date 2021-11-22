import React from 'react';

const RMRKContext = React.createContext({
    account: null,
    setAccount: () => {}
})

export default RMRKContext;