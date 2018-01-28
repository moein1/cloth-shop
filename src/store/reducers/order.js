import actionTypes from '../actions/actionTypes';
import {updatedObject} from '../utility';  


const initialState = {
    orders: [],
    error: false,
    loading : false
}

const setOrders = (state , action)=>{
    return {
        ...state,
        orders: action.orders,
        error: false,
        loading : false
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_ORDERS_START:
            return updatedObject(state , {loading : true} )
        case actionTypes.SET_ORDERS:
            return setOrders(state , action);
        case actionTypes.SET_ORDERS_FAIL:
            return {
                ...state,
                error: true,
                loading : false
            }
        default:
            return state;
    }
}

export default reducer;