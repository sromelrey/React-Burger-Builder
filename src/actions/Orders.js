import * as ActionTypes from '../constants/ActionType';
import axios from '../axios-orders';
import _ from 'lodash';

export const onPurchaseBurger = (order)  =>  {
    return async dispatch   =>  {

        dispatch({
            type: ActionTypes.PURCHASE_BURGER_REQUEST,
            payload: {
                loading: true,
            }
        })
  
        const response = await axios.post('/orders.json', order);
        if(_.isEmpty(response)){
             return dispatch({
               type: ActionTypes.PURCHASE_BURGER_ERROR,
                  payload :  {
                     loading:  false
                     }
                 })
         }     

         const  id  = response.data.name
         const orders = {...order.orderData,id};

         dispatch({
             type:ActionTypes.PURCHASE_BURGER_SUCCESS,
             payload: {
               orders: orders,
               loading:false  ,
               purchased:true
             }
         })
         



    }
}

export const getOrders = () =>{
    return async dispatch =>{
        dispatch({
            type: ActionTypes.GET_ORDER_REQUEST,
            payload:{
                loading: true
            }
        });

      const response  = await axios.get('/orders.json');
  
      if(_.isEmpty(response)){
        return dispatch({
          type: ActionTypes.GET_ORDER_ERROR,
             payload :  {
                loading:  false
                }
            })
    } 

    const fetchOrders = [];
    for(let key in response.data){
          fetchOrders.push(({
              ...response.data[key],
              id: key
          }))
    }

    console.log(fetchOrders)
      dispatch({
        type: ActionTypes.GET_ORDER_SUCCESS,
           payload :  {
              loading:  false,
              orders: fetchOrders
              }
          })
    }
}