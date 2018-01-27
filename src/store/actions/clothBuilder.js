import actionType from './actionTypes';

const clothBuilder = {
    addItem: (name, price) => {
        return {type: actionType.ADD_ITEM, itemName: name, itemPrice: price}
    },
    removeItem: (name, price) => {
        return {type: actionType.REMOVE_ITEM, itemName: name, itemPrice: price}
    }
}

export default clothBuilder;