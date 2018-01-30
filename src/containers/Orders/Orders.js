import React, {Component} from 'react';
import {connect} from 'react-redux';
import Order from '../../components/Order/Order';
import axios from '../../axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import action from '../../store/actions';

class Orders extends Component {

    loadingHandler = (state) => {
        this.setState({loading: state})
    }

    componentDidMount() {
        this
            .props
            .onGetOrders(this.props.token);        
    }

    render() {  
        let order = null;     
        if (this.props.ords) 
            order = (this.props.ords.map(order => (<Order key={order.id} price={order.price} items={order.items}/>)))
        if(this.props.loading)
            order = <Spinner />
        return (
            <div>
                {order}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {ords: state.ord.orders,
         err: state.ord.error,
         loading : state.ord.loading,
         token : state.auth.token    }
}

const mapDispatchToProps = dispatch => {
    return {
        onGetOrders: (token) => dispatch(action.fetchOrders(token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));