import actionType from '../actions/actionTypes';
import {updatedObject} from '../utility';

const initialState = {
    error: null,
    orders: [],
    loading: false,
    purchased: false
}

const purchaseSuccess = (state ,action) =>{
    const newOrder = {
        ...action.orderData,
        id: action.orderId
    }
    return {
        ...state,
        error: null,
        loading: false,
        orders: state
            .orders
            .concat(newOrder),
        purchased: true
    }
}

const purchaseFail = (state,action) =>{
    return {
        ...state,
        error: action.error,
        loading: false
    }
}



const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.PURCHASE_CLOTH_START:
            return updatedObject(state, {loading: true});
        case actionType.PURCHASE_CLOTH_SUCCESS:
            return purchaseSuccess(state,action);
        case actionType.PURCHASE_CLOTH_FAIL:
            return purchaseFail(state , action);
        case actionType.PURCHASE_INIT:
            return updatedObject(state, {purchased: false});
        default:
            return state;
    }
}

export default reducer;