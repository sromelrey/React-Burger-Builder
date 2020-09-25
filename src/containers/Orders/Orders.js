import React, {Component,Fragment} from 'react';
import Order from '../../components/Order/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../layout/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {
    state = {
        orders:[],
        loading:true
    }

    componentDidMount(){
        axios.get('/orders.json')
        .then(response=>{
            const fetchOrders = [];
            for(let key in response.data){
                fetchOrders.push(({
                    ...response.data[key],
                    id: key
                }))
            }
            this.setState({loading: false , orders: fetchOrders});
        })
        .catch(error => {
            this.setState({loading:false});
        })
    }

render(){
    const { orders,loading } = this.state;

    let ordersView = null;
    if(loading){
        ordersView = <Spinner/>
    }
    ordersView = (
        <Fragment>
             {orders.map(order => (
                <Order 
                key={order.id} 
                ingredients={order.ingredients}
                price={+order.price}/>
            )  
            )}
          
        </Fragment>
    )
    return(
        <div>
           {ordersView}
        </div>
    );
}
}

export default withErrorHandler(Orders,axios);