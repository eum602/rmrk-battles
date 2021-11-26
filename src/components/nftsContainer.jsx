import React, { useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import RMRKContext from './context';
import { getNFTByOwnerAddress } from './../api/rmrk';
import NFTSCard from './nftsCard';

const useStyles = createUseStyles({
    container: {
        padding: '5rem'
    },
    battleContainer: {
        display: 'flex'
    },
    playerContainer: {
        flex: '1',
        minHeight: '25rem',
        backgroundColor: '#0b111c',
        margin: '0 2rem',
        color: '#fff',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: '1px solid #2c2c2c',
        borderRadius: '5px'
    },
    pointsContainer: {
        margin: '0rem 3rem',
        fontSize: '1.5rem',
        color: '#fff',
        textAlign: 'center'
    },
    nftsContainer: {
        display: 'flex',
        padding: '2rem'
    }
});


const NFTSContainer = (props) => {
    const classes = useStyles();
    const [nfts, setNfts] = React.useState([]);
    const { account } = React.useContext(RMRKContext);
    const [selectedNftId, setSelectedNftId] = React.useState('');

    const load = async () => {
        //const result = await getNFTByOwnerAddress('EVPRszrKPmDT5hwGNhnxp2N1LBKrJgTujpay6xmzQDr4RtN')//account);
        const result = await getNFTByOwnerAddress(account) //account);
        if(result.state)
            setNfts(result.nfts);
    }

    useEffect(() => {
        load()
    }, [])

    const onSelectedBird = (_nftId) => {
        props.onSelectedNftId(_nftId)
    }

    return (
        <div className={classes.container}>
            <div className={classes.battleContainer}>
                <div className={classes.playerContainer}>Player 1</div>
                <div className={classes.pointsContainer}>
                    <div>POINTS</div>
                    <br/>
                    <div>0 - 0</div>
                </div>
                <div className={classes.playerContainer}>Player 2</div>
            </div>
            <div className={classes.nftsContainer}>
                {
                    nfts.map((item, i) => 
                        <NFTSCard key={i} 
                            image={item.image} 
                            name={item.metadata_name} 
                            description={item.metadata_description}
                            nftId={item.id}
                            onSelected={onSelectedBird}
                         />
                    )
                }
            </div>
        </div>
    )
}

export default NFTSContainer;