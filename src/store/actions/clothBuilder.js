import actionType from './actionTypes';
import axios from '../../axios-order';

const clothBuilder = {
    addItem: (name, price) => {
        return {type: actionType.ADD_ITEM, itemName: name, itemPrice: price}
    },
    removeItem: (name, price) => {
        return {type: actionType.REMOVE_ITEM, itemName: name, itemPrice: price}
    },
    initItems : () =>{
        return dispath =>{
            axios.get('/items.json').then(response=>{
               dispath(clothBuilder.setItems(response.data));
            }).catch(error=>{
                dispath(clothBuilder.fetchItemsFail());
            })
        }
    },
    setItems :(items)=>{
        return{
            type : actionType.SET_ITEMS,
            items : items
        }
    },
    fetchItemsFail : ()=>{
        return{
            type : actionType.FETCH_ITEMS_FAIL
        }
    }

}

    export default clothBuilder;