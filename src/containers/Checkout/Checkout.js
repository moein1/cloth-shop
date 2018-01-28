import React ,{Component} from 'react';
import {Route ,Redirect } from 'react-router-dom';
import Aux from '../../hoc/auxel';
import quertString from 'query-string';
import ChekoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'; 
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

import {connect} from 'react-redux';
class Checkout extends Component {
    state={
        items:{}
    }
   
    cancleCheckoutHandler= ()=>{
        this.props.history.goBack();
    }

    continueCheckoutHandler = ()=>{
        this.props.history.replace('/checkout/contact-data');
    }

    render(){
        let summary = <Redirect to="/"/>        
        if(this.props.its){
            const purchasedRedirect = 
                this.props.purchased ? <Redirect to ="/" /> : null;
            summary =(<Aux>
                {purchasedRedirect}
                <CheckoutSummary
                 cancelCheckout={this.cancleCheckoutHandler} 
                 continueCheckout={this.continueCheckoutHandler}
                 items={this.props.its} ></CheckoutSummary>
                 <Route path={this.props.match.path + '/contact-data'} 
                 component={ContactData}
                />
            </Aux>               
            )
        }
        return summary;
    }
}

const mapStateToProps=state=>{
    return{
        its: state.clt.items,
        purchased : state.purch.purchased
    }
}


export default connect(mapStateToProps )(Checkout);