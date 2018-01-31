import actionType from './actionTypes';
import axios from '../../axios-order';

const orders = {
    fetchOrders : (token ,userId )=>{
        return dispatch =>{
            dispatch(orders.setOrderInit());
            axios.get(`/orders.json?auth=${token}&orderBy="userId"&equalTo="${userId}"`).then(response=>{
                const orderArray=[];            
                for(let key in response.data){
                    orderArray.push({...response.data[key] , id:key});
                }
                dispatch(orders.setOrder(orderArray));
            }).catch(error=>{
                dispatch(orders.setOrderFail());
            })
        }
    },
    setOrderInit : ()=>{
        return{
            type : actionType.SET_ORDERS_START
        }
    },
    setOrder : (orders) =>{
        return {
            type : actionType.SET_ORDERS,
            orders : orders
        }
    },
    setOrderFail : ()=>{
        return{
            type: actionType.SET_ORDERS_FAIL
        }
    }
}

export default orders;