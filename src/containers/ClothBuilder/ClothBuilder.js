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
import action from '../../store/actions/index';

const ITEM_PRICE = {
    bottom: 3.2,
    top: 1.4
}
class ClothBuilder extends Component {

    state = {
        totalPrice: 4,
        purchasing: false
    }

    componentDidMount() {
        this.props.onItemInit();
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

    purchaseHandler = () => {
        this.setState({purchasing: true})
    }
    modalClosed = () => {
        this.setState({purchasing: false})
    }

    purchaseContinueHandler = () => {
        this.props.onPurchaseInit();
        this.props.history.push('/checkout');
    }

    continueToSignupHandler = ()=>{
        this.props.onPurchaseInit();
        this.props.history.push('/auth');
    }

    render() {
        const disabledInfo = {
            ...this.props.its
        }

        for (const key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let summary = null;

        let cloth = this.props.error
            ? <p>{this.props.error}</p>
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
                continueToSignup = {this.continueToSignupHandler}
                items={this.props.its}
                totalPrice={this.props.price}></OrderSummary>
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
    return {its: state.clt.items, 
        price: state.clt.totalPrice,
        error : state.clt.error,
        authorized : state.auth.token != null }
}

const mapDispatchToProps = dispatch => {
    return {
        onItemsAdded: (itemName) => dispatch(action.addItem(itemName, ITEM_PRICE[itemName])),
        onItemRemoved: (itemName) => dispatch(action.removeItem(itemName, ITEM_PRICE[itemName])),
        onItemInit: () => dispatch(action.initItems()),
        onPurchaseInit : ()=>dispatch(action.purchaseInit())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ClothBuilder, axios));