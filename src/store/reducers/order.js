import actionTypes from '../actions/actionTypes';

const initialState = {
    orders: [],
    error: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_ORDERS:
            return {
                ...state,
                orders: action.orders,
                error: false
            }
        case actionTypes.SET_ORDERS_FAIL:
            return {
                ...state,
                error: true
            }
        default:
            return state;
    }
}

export default reducer;