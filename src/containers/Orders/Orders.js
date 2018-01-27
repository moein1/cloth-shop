import React ,{Component} from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component{

    state={
        orders:[],
        loading : false
    }

    loadingHandler=(state)=>{
        this.setState({
            loading:state
        })
    }

    componentDidMount(){
       this.loadingHandler(true);
        axios.get('/orders.json').then(
            response=>{
                const orders=[]                
                for(let key in response.data){
                    orders.push({...response.data[key] , id:key});
                }
                this.setState({
                    orders:orders
                })               
                this.loadingHandler(false);
            }
        ).catch(error=>{
            this.loadingHandler(false);
        })
    }

    render(){
        let order =(
            <div>
                <Order />
                <Order />
            </div>
        )
        if(this.state.loading)
            order = <Spinner />
        return(
            <div>
               {this.state.orders.map(order=>(
                   <Order key={order.id} 
                   price = {order.price} 
                   items = {order.items}
                   />
               ))}
            </div>
        )
    }
}

export default withErrorHandler(Orders ,axios);