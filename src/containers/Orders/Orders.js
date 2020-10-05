import React, {Component,Fragment} from 'react';
import Order from '../../components/Order/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../layout/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
import { connect } from 'react-redux';

class Orders extends Component {
    state = {
        orders:[],
        loading:true
    }

    componentDidMount(){
       this.props.getOrders();
    }

render(){
    const { orders,loading } = this.props.orderProps;
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
                price={ order.price}/>
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

export default connect()(  withErrorHandler(Orders,axios));