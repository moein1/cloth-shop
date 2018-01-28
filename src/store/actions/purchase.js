import actionType from './actionTypes';
import axios from '../../axios-order';


const purchase = {
    purchseCloth : (orders)=>{
        return dispatch=>{
            dispatch(purchase.purchaseClothStart());
            axios.post('/orders.json' , orders).
            then(response=>{
                dispatch(purchase.purchaseClothSuccess(response.data.name,orders));
            }).catch(error=>{
                dispatch(purchase.purchaseClothFail(error));
            })
        }
    },
    purchaseClothStart :()=>{
        return{
            type : actionType.PURCHASE_CLOTH_START,
            loading : true
        }
    },
    purchaseClothSuccess : (id , orderData)=>{
        return{
            type : actionType.PURCHASE_CLOTH_SUCCESS,
            orderId : id,
            orderData : orderData
        }
    },
    purchaseClothFail : (error)=>{
        return{
            type : actionType.PURCHASE_CLOTH_FAIL,
            error : error
        }
    },
    purchaseInit : () =>{
        return{
            type : actionType.PURCHASE_INIT
        }
    }

}

export default purchase;