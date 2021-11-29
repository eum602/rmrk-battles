import React, { useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import RMRKContext from './context';
import { getNFTByOwnerAddress } from './../api/rmrk';
import NFTSCard from './nftsCard';

import RockIcon from '../assets/piedra.png';
import PaperIcon from '../assets/papel.png';
import SicssorIcon from '../assets/tijera.png';

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
        backgroundColor: '#ffffff',
        margin: '0 2rem',
        color: '#1a202c',
        border: '1px solid #2c2c2c',
        borderRadius: '5px',
        padding: '0.5rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.5rem'
    },
    playerTitle: {
        textAlign: 'center',
        margin: '1rem 0'
    },
    playerSubTitle: {
        fontSize: '0.75rem',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        maxWidth: '15rem',
        alignSelf: 'center',
        // color: '#eb3089'
    },
    playerImage: {
        padding: '2rem',
        textAlign: 'center',
        '& > img': {
            width: '10rem'
        }
    },
    playerButtonContainer: {
        display: 'flex',
        height: '100%',
        alignItems: 'center',
        gap: '1rem',
        flexDirection: 'column'
    },
    playerChooseButton: {
        backgroundColor: 'white',
        borderRadius: '1rem',
        cursor: 'pointer',
        color: '#eb3089',
        border: '1px solid #eb3089',
        padding: '0.5rem',
        minWidth: '4rem',
        '&:hover': {
            backgroundColor: '#eb3089',
            color: 'white',
        },
        '&$disabledButton': {
            borderColor: '#b7b7b7',
            color: 'white',
            backgroundColor: '#b7b7b7'
        }
    },
    pointsContainer: {
        margin: '0rem 3rem',
        fontSize: '1.5rem',
        color: '#fff',
        textAlign: 'center'
    },
    nftsContainer: {
        display: 'flex',
        padding: '2rem',
        gap: '1rem'
    },
    disabledButton: {},
    attackButton: {
        borderRadius: '0',
        cursor: 'pointer',
        backgroundColor: '#eb3089',
        color: 'white',
        border: '1px solid #eb3089',
        padding: '0.5rem',
        minWidth: '4rem',
        fontSize: '1.2rem',
        '&:hover': {
            backgroundColor: '#f5a4ca',
            borderColor: '#f5a4ca'
        },
        '&$disabledButton': {
            borderColor: '#b7b7b7',
            color: 'white',
            backgroundColor: '#b7b7b7'
        }
    },
    matchButtonContainer: {
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    matchButton: {
        borderRadius: '0',
        cursor: 'pointer',
        backgroundColor: 'white',
        color: '#eb3089',
        border: '1px solid #eb3089',
        padding: '0.5rem',
        minWidth: '4rem',
        fontSize: '1.2rem',
        '&:hover': {
            backgroundColor: '#eb3089',
            color: 'white',
        },
        '&$disabledButton': {
            borderColor: '#b7b7b7',
            color: 'white',
            backgroundColor: '#b7b7b7'
        }
    }
});


const NFTSContainer = (props) => {
    const classes = useStyles();
    const [nfts, setNfts] = React.useState([]);
    const { account, nftId, setNftId, matching, setMatching, enemy, selectedAttack, setSelectedAttack, sendAttack, lastResult, results, attack } = React.useContext(RMRKContext);
    const [selectedNft, setSelectedNft] = React.useState(null);

    const onMatching = () => {
        if(selectedNft)
            setMatching(true);
    }

    const load = async () => {
        // const result = await getNFTByOwnerAddress('EVPRszrKPmDT5hwGNhnxp2N1LBKrJgTujpay6xmzQDr4RtN');
        const result = await getNFTByOwnerAddress(account);
        if(result.state)
            setNfts(result.nfts);
    }

    useEffect(() => {
        if(selectedNft)
            setNftId(selectedNft.id);
            // setNftId(selectedNft.id + Math.random().toString().replace('.', ''));
    }, [selectedNft])

    useEffect(() => {
        load()
    }, []);

    const renderIcon = () => {
        switch(selectedAttack) {
            case 'R': return <img src={RockIcon}/>
            case 'P': return <img src={PaperIcon}/>
            case 'S': return <img src={SicssorIcon}/>
            default: return null;
        }
    }

    const renderIconEnemy = () => {
        if(lastResult && enemy)
            switch(lastResult[enemy.nftId]) {
                case 'R': return <img src={RockIcon}/>
                case 'P': return <img src={PaperIcon}/>
                case 'S': return <img src={SicssorIcon}/>
            }
        else {
            return <p>Waiting attack...</p>;
        }
    }

    const renderPoints = () => {
        let win = 0; 
        let lose = 0; 
        console.log(results);
        for (const result of results) {
            if(result[nftId] === result[enemy.nftId]) continue;
            else if(result[nftId] === 'R' && result[enemy.nftId] === 'P') { lose += 1 }
            else if(result[nftId] === 'R' && result[enemy.nftId] === 'S') { win += 1 }
            else if(result[nftId] === 'P' && result[enemy.nftId] === 'R') { win += 1 }
            else if(result[nftId] === 'P' && result[enemy.nftId] === 'S') { lose += 1 }
            else if(result[nftId] === 'S' && result[enemy.nftId] === 'R') { lose += 1 }
            else if(result[nftId] === 'S' && result[enemy.nftId] === 'P') { win += 1 }
        }
        return <div>{win} - {lose}</div>
    }

    return (
        <div className={classes.container}>
            <div className={classes.battleContainer}>
                <div className={classes.playerContainer}>
                    <div className={classes.playerTitle}>Player 1 <span style={{color: '#eb3089'}}>{selectedNft ? selectedNft.metadata_name : '' }</span></div>
                    {
                        selectedNft ?
                        <>
                            <div style={{display: 'flex', width: '100%', padding: '1rem', gap: '0.5rem'}}>
                                <input type="button" className={`${classes.playerChooseButton} ${enemy ? '' : classes.disabledButton}`} value="Rock" onClick={() => setSelectedAttack('R')}/>
                                <input type="button" className={`${classes.playerChooseButton} ${enemy ? '' : classes.disabledButton}`} value="Paper" onClick={() => setSelectedAttack('P')}/>
                                <input type="button" className={`${classes.playerChooseButton} ${enemy ? '' : classes.disabledButton}`} value="Scissor" onClick={() => setSelectedAttack('S')}/>
                            </div>
                            <div className={classes.playerImage}>
                                {renderIcon()}
                            </div>
                        </>
                        :
                        <div>No select NFT</div>
                    }
                </div>
                <div className={classes.pointsContainer}>
                    <div>POINTS</div>
                    <br/>
                    {renderPoints()}
                    <br/>
                    <input type="button" className={`${classes.attackButton} ${!attack ? '' : classes.disabledButton}`} value="Attack" onClick={sendAttack}/>
                    <br/>
                    <div style={{padding: '1rem 0rem', height: '10rem', overflowY: 'auto'}}>
                        {
                            results.map((item, i) => 
                                <div key={i}>{`${item[nftId]} - ${item[enemy.nftId]}`}</div>
                            )
                        }
                    </div>
                </div>
                <div className={classes.playerContainer}>
                    <div className={classes.playerTitle}>Player 2 <span style={{color: '#eb3089'}}>{enemy ? enemy.metadata_name : '' }</span></div>
                    {
                        enemy ?
                        <div className={classes.playerImage}>
                            {renderIconEnemy()}
                        </div>
                        :
                        <div className={classes.matchButtonContainer}>
                            <input type="button" className={`${classes.matchButton} ${selectedNft ? '' : classes.disabledButton}`} value={ !matching ? "Match" : "Matching..." } onClick={onMatching}/>
                        </div>
                    }
                </div>
            </div>
            <div className={classes.nftsContainer}>
                {
                    nfts.map((item, i) => 
                        <NFTSCard key={i} 
                            image={item.image} 
                            name={item.metadata_name} 
                            description={item.metadata_description}
                            nftId={item.id}
                            onClick={() => setSelectedNft(item)}
                        />
                    )
                }
            </div>
        </div>
    )
}

export default NFTSContainer;