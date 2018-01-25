import actionTypes from './actions';

const initialState = {
    items: {
        top: 0,
        bottom:0
    },
    totalPrice: 4
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_ITEM :
            return {
                ...state,
                items:{
                    ...state.items,
                    [action.itemName] : state.items[action.itemName] + 1
                },
                totalPrice : state.totalPrice + action.itemPrice
            }
        case actionTypes.REMOVE_ITEM :
            return {
                ...state,
                items:{
                    ...state.items,
                    [action.itemName] : state.items[action.itemName] - 1
                },
                totalPrice : state.totalPrice - action.itemPrice
            }
        case actionTypes.RESET_STATE :
            console.log('we should reset the state after posting the data to server');
            return {
                ...state,
                items:{
                    top:0,
                    bottom:0
                },
                totalPrice : 4
            }
        default:
            return state;
    }
}

export default reducer;