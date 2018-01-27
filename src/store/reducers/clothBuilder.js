import actionTypes from '../actions/actionTypes';

const initialState = {
    items:null,
    totalPrice: 4,
    error : false
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
        case actionTypes.SET_ITEMS : 
            return{
                ...state,
                items:action.items,
                totalPrice : 4,
                error : false
            }
        case actionTypes.FETCH_ITEMS_FAIL : 
            return{
                ...state,
                error : true
            }
        default:
            return state;
    }
}

export default reducer;