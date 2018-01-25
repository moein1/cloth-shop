import React ,{Component} from 'react';
import {Route} from 'react-router-dom';
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

    componentDidMount(){
        // by using Redux we do not need to use this query string
        //and we can easily map state to props and have the access to the state
        // let query = quertString.parse(this.props.location.search);
        // for(let item in query){
        //     if(item === 'price'){
        //         this.setState({
        //             price :query[item]
        //         })
        //         delete query[item]
        //     }                
        // }
        // this.setState({
        //     items : query
        // })
    }
   
    cancleCheckoutHandler= ()=>{
        this.props.history.goBack();
    }

    continueCheckoutHandler = ()=>{
        this.props.history.replace('/checkout/contact-data');
    }

    render(){
        return(
            <Aux>
                <CheckoutSummary
                 cancelCheckout={this.cancleCheckoutHandler} 
                 continueCheckout={this.continueCheckoutHandler}
                 items={this.props.its} ></CheckoutSummary>
                 <Route path={this.props.match.path + '/contact-data'} 
                 component={ContactData}
                //we redux we do not use render and we can 
                //and pass the price and items 
                 render={(props)=><ContactData price={this.state.price} {...props}  items={this.state.items}/>} />
            </Aux>
        )
    }
}

const mapStateToProps=state=>{
    return{
        its: state.items
    }
}

export default connect(mapStateToProps)(Checkout);