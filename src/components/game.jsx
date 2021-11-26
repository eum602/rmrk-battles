import React from 'react';
import { createUseStyles } from 'react-jss';
import RMRKContext from './context';
import { extensionSetup } from '../api/wallet';
import NFTSContainer from './nftsContainer';


const useStyles = createUseStyles({
    container: {
    },
    title: {
        color: '#fff',
        textAlign: 'center',
        '& h1': {
            margin: '4rem',
            marginBottom: '0',
            fontSize: '3rem'
        }
    },
    getAccount: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputButton: {
        margin: '10rem 0rem',
        padding: '1rem',
        backgroundColor: '#eb3089',
        color: 'white',
        outline: 'none',
        border: 'none',
        fontWeight: '600',
        fontSize: '1.2rem',
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: '#d3297a',
        }
    },
    listAccount: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#fff',
        '& p': {
            fontSize: '1.5rem',
            fontWeight: 400,
            margin: '5rem 0'
        }
    }

});

const Game = (props) => {
    const classes = useStyles();
    const { account, setAccount } = React.useContext(RMRKContext);
    const [showAccounts, setShowAccounts] = React.useState(false);
    const [accounts, setAccounts] = React.useState([]);
    const [selectAccount, setSelectAccount] = React.useState('');

    const getAccounts = async () => {
        const _accounts = await extensionSetup();
        if (! _accounts){
            setShowAccounts(false)
            return
        }
            
        setAccounts(_accounts.ksmAccounts);
        if(_accounts.state)
            setShowAccounts(true)
    }

    const onChangeSelectAccount = (e) => {
        setSelectAccount(e.target.value);
    }

    const onSelectAccount = () => {
        if(selectAccount === '') return;
        setAccount(selectAccount);
        setShowAccounts(false)
    }

    const renderAccounts = () => {
        if (!account && !showAccounts)
            return (
                <div className={classes.getAccount}>
                    <input className={classes.inputButton} type="button" value="Get Accounts" onClick={getAccounts}/>

                    <React.Fragment key={1}>
                        <input type="text" name={`acct`} onChange={onChangeSelectAccount}/>
                        <label htmlFor={`acct`}>{"account"}</label><br></br>
                        <input className={classes.inputButton} type="button" value="Select account" onClick={onSelectAccount}/>
                    </React.Fragment>
                </div>
            )
        else if (!account && showAccounts)
            return (
                <div className={classes.listAccount}>
                    <p>Choose an account</p>
                    <div style={{ backgroundColor: '#0b111c', padding: '2rem' }}>
                    {
                        accounts.map((item, i) => 
                            <React.Fragment key={i}>
                                <input type="radio" id={`radio-${item}`} name={`radio-${item}`} value={item} onChange={onChangeSelectAccount}/>
                                <label htmlFor={`radio-${item}`}>{item}</label><br></br>
                            </React.Fragment>
                        )
                    }
                    </div>
                    <input className={classes.inputButton} type="button" value="Select account" onClick={onSelectAccount}/>
                </div>
            )
        else if(account && !showAccounts) {
            return <NFTSContainer onSelectedNftId={props.onSelectedNftId}/>
        }
        else return null;
    }

    return (
        <div className={classes.container}>
            <div className={classes.title}>
                <h1>RMRK Battles</h1>
            </div>
            {renderAccounts()}
        </div>
    )
}

export default Game;