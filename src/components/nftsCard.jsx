import React from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
    container: {
        padding: '0.5rem',
        backgroundColor: '#0b111c',
        textAlign: 'center',
        color: 'white',
        fontSize: '0.75rem',
        cursor: 'pointer',
        '&:hover': {
            boxShadow: '0px 0px 20px 1px #6e6e6e'
        }
    },
    image: {
        width: '10rem'
    }
});


const NFTSCard = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.container} onClick={props.onClick}>
            <img className={classes.image} src={props.image}/>
            <div>
                <p>{props.name}<br/>{props.description}</p>
            </div>
        </div>
    )
}

export default NFTSCard;