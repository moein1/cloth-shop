import React ,{Component} from 'react';
import {Route} from 'react-router-dom';
import Aux from '../../hoc/auxel';
import quertString from 'query-string';
import ChekoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'; 
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
    state={
        items:{},
        price:0
    }

    componentDidMount(){
        let query = quertString.parse(this.props.location.search);
        for(let item in query){
            if(item === 'price'){
                this.setState({
                    price :query[item]
                })
                delete query[item]
            }                
        }
        this.setState({
            items : query
        })
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
                 items={this.state.items} ></CheckoutSummary>
                 <Route path={this.props.match.path + '/contact-data'} 
                // component={ContactData}
                 render={(props)=><ContactData price={this.state.price} {...props}  items={this.state.items}/>} />
            </Aux>
        )
    }
}

export default Checkout;