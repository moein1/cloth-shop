import actionTypes from '../actions/actionTypes';

const initialState = {
    orders: [],
    error: false,
    loading : false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_ORDERS_START:
            return{
                ...state,
                loading : true
            }
        case actionTypes.SET_ORDERS:
            return {
                ...state,
                orders: action.orders,
                error: false,
                loading : false
            }
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