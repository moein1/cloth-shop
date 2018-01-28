import React ,{Component} from 'react';
import Aux from '../../../hoc/auxel';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component{
    componentWillUpdate(){
        console.log('Order summary will upated');
    }   
    render(){
        const itemSummary = Object
        .keys(this.props.items)
        .map(ikey => {
            return <li key={ikey}>
                <span>{ikey}
                    : {this.props.items[ikey]}
                </span>
            </li>
        })
        return (
            <Aux>
                <div className="order-summary">
                    <h3>Your order</h3>
                    <p>A nice cloth with the following items:</p>
                    <ul>
                        {itemSummary}
                    </ul>
                    <p>Total price : <strong>{this.props.totalPrice.toFixed(1)}</strong></p>
                    <p>Continue to Checkout?</p>
                    <button onClick={this.props.closeModal} className="less" >Cancel</button>
                    <button onClick={this.props.continuePurchase} >Continue</button>
                    {/* <Button btnType="Success">New </Button> */}
                </div>    
            </Aux>
        )
    
    }
}


export default OrderSummary;