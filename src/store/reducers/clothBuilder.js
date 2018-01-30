import actionTypes from '../actions/actionTypes';
import {updatedObject } from '../utility';

const initialState = {
    items:null,
    totalPrice: 4,
    error : false,
    building : false
}

const addItem = (state,action)=> {
    return {
        ...state,
        items:{
            ...state.items,
            [action.itemName] : state.items[action.itemName] + 1
        },
        totalPrice : state.totalPrice + action.itemPrice,
        building : true
    }
}

const removeItem = (state , action)=>{
    return {
        ...state,
        items:{
            ...state.items,
            [action.itemName] : state.items[action.itemName] - 1
        },
        totalPrice : state.totalPrice - action.itemPrice,
        building : true
    }
}

const setItem = (state , action)=>{
    return{
        ...state,
        items:action.items,
        totalPrice : 4,
        error : false,
        building:false
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_ITEM :
            return addItem(state,action);
        case actionTypes.REMOVE_ITEM :
            return removeItem(state , action);
        case actionTypes.SET_ITEMS : 
            return setItem(state , action);
        case actionTypes.FETCH_ITEMS_FAIL :
            return updatedObject(state, {error : true});           
        default:
            return state;
    }
}

export default reducer;