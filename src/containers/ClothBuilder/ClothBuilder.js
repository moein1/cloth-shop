import React, {Component} from 'react';
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

const ITEM_PRICE = {
    bottom: 3.2,
    top: 1.4
}
class ClothBuilder extends Component {

   

    state = {
        items: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: null
    }


    componentDidMount() {
        axios
            .get('/items.json')
            .then(response => {
                if (response) 
                    this.setState({items: response.data})
            })
            .catch(error => {
                this.setState({error: error});
                console.log('eror happend in the get data' , this.state.error);
            });
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
        this.setState({
            purchasable: sum > 0
        })
    }

    addItemHandler = (type) => {
        const oldCount = this.state.items[type];
        const updatedItem = {
            ...this.state.items
        };
        updatedItem[type] = oldCount + 1;
        this.setState({
            items: updatedItem,
            totalPrice: this.state.totalPrice + ITEM_PRICE[type]
        })
        this.updatePurchseState(updatedItem);
    }

    removeItemHandler = (type) => {
        const updatedItem = {
            ...this.state.items
        }
        updatedItem[type] = this.state.items[type] - 1;
        this.setState({
            items: updatedItem,
            totalPrice: this.state.totalPrice - ITEM_PRICE[type]
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
        
       const queryParams = [];
       for(let i in this.state.items){
           queryParams.push(`${encodeURIComponent(i)}=${encodeURIComponent(this.state.items[i])}`);
       }
       queryParams.push(`price=${this.state.totalPrice.toFixed(2)}`)
       var queryString = queryParams.join('&');
        this.props.history.push({
            pathname : '/checkout',
            search:`?${queryString}`
        })
    }

    render() {
        const disabledInfo = {
            ...this.state.items
        }

        for (const key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let summary = null;

        let cloth = this.state.error ? <p>{this.state.error}</p> : <Spinner/>;

        if (this.state.items) {
            cloth = (
                <Aux>
                    <Cloth items={this.state.items}/>
                    <BuildControls
                        addItem
                        ={this.addItemHandler}
                        removeItem
                        ={this.removeItemHandler}
                        disabled
                        ={disabledInfo}
                        price
                        ={this.state.totalPrice}
                        purchasable={this.state.purchasable}
                        ordered={this.purchaseHandler}/>
                </Aux>
            )

            summary = <OrderSummary
                closeModal={this.modalClosed}
                continuePurchase={this.purchaseContinueHandler}
                items={this.state.items}
                totalPrice={this.state.totalPrice}></OrderSummary>
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

export default withErrorHandler(ClothBuilder, axios);