import React, {Component} from 'react';
import {connect} from 'react-redux';
import Aux from '../../hoc/auxel';
import Cloth from '../../components/Cloth/Cloth';
import BuildControl from '../../components/Cloth/BuildControls/BuildControls';
import BuildControls from '../../components/Cloth/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Cloth/OrderSummary/OrderSummary';
import BackDrop from '../../components/UI/Backdrop/Backdrop';
import axios from '../../axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import actionTypes from '../../store/actions/actionTypes';
import action from '../../store/actions/index';

const ITEM_PRICE = {
    bottom: 3.2,
    top: 1.4
}
class ClothBuilder extends Component {

    state = {
        // items: null,
        totalPrice: 4,
        purchasing: false,
        loading: false,
        error: null
    }

    componentDidMount() {
        // axios     .get('/items.json')     .then(response => {         if (response)
        //       this.setState({items: response.data})     })     .catch(error => {
        // this.setState({error: error});         console.log('eror happend in the get
        // data' , this.state.error);     });
    }

    updatePurchseState(items) {
        const sum = Object
            .keys(items)
            .map((igk) => {
                return items[igk];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0)        
            return sum > 0;   
    }

    addItemHandler = (type) => {
        const oldCount = this.props.its[type];
        const updatedItem = {
            ...this.props.its
        };
        updatedItem[type] = oldCount + 1;
        this.setState({
            items: updatedItem,
            totalPrice: this.props.price + ITEM_PRICE[type]
        })
        this.updatePurchseState(updatedItem);
    }

    removeItemHandler = (type) => {
        const updatedItem = {
            ...this.props.its
        }
        updatedItem[type] = this.props.its[type] - 1;
        this.setState({
            items: updatedItem,
            totalPrice: this.props.price - ITEM_PRICE[type]
        })
        this.updatePurchseState(updatedItem);
    }

    purchaseHandler = () => {
        this.setState({purchasing: true})
    }
    modalClosed = () => {
        this.setState({purchasing: false})
    }

    purchaseContinueHandler = () => {
        //alert('we would like to continue!');

        // const queryParams = [];
        // for (let i in this.props.its) {
        //     queryParams.push(`${encodeURIComponent(i)}=${encodeURIComponent(this.props.its[i])}`);
        // }
        // queryParams.push(`price=${this.props.price.toFixed(2)}`)
        // var queryString = queryParams.join('&');
        // this
        //     .props
        //     .history
        //     .push({pathname: '/checkout', search: `?${queryString}`})

        //by using redux we do not need to pass items to the ceckout 
        this.props.history.push('/checkout');
    }

    render() {
        const disabledInfo = {
            ...this.props.its
        }

        for (const key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let summary = null;

        let cloth = this.state.error
            ? <p>{this.state.error}</p>
            : <Spinner/>;

        if (this.props.its) {
            cloth = (
                <Aux>
                    <Cloth items={this.props.its}/>
                    <BuildControls
                        addItem
                        ={this.props.onItemsAdded}
                        removeItem={this.props.onItemRemoved}
                        disabled
                        ={disabledInfo}
                        price
                        ={this.props.price}
                        purchasable={this.updatePurchseState(this.props.its)}
                        ordered={this.purchaseHandler}/>
                </Aux>
            )

            summary = <OrderSummary
                closeModal={this.modalClosed}
                continuePurchase={this.purchaseContinueHandler}
                items={this.props.its}
                totalPrice={this.props.price}></OrderSummary>
        }

        if (this.state.loading) {
            summary = <Spinner/>
        }

        return (
            <Aux>
                <BackDrop clicked={this.modalClosed} show={this.state.purchasing}/>
                <Modal loading ={this.state.loading} show={this.state.purchasing}>
                    {summary}
                </Modal>
                {cloth}
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {its: state.items, price: state.totalPrice}
}


const mapDispatchToProps = dispatch => {
    return {
        onItemsAdded: (itemName) => dispatch({type: actionTypes.ADD_ITEM, itemName: itemName, itemPrice: ITEM_PRICE[itemName]}),
        onItemRemoved: (itemName) => dispatch({type: actionTypes.REMOVE_ITEM, itemName: itemName, itemPrice: ITEM_PRICE[itemName]})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ClothBuilder, axios));