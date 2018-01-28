import React from 'react';
import Cloth from '../../Cloth/Cloth';
import Button from '../../UI/Button/Button';

const checkoutSummary = (props) => {
    return (
        <div>
            <h1>We hope you like your new cloth!</h1>
            <div>
                <Cloth items= {props.items} />
            </div>
            <Button btnType="Default" clicked={props.cancelCheckout} >Cancel</Button>
            <Button btnType="Success" clicked ={props.continueCheckout} >Continue</Button>
        </div>
    )
}

export default checkoutSummary;