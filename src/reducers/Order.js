import * as ActionTypes from '../constants/ActionType';

const initialState ={
    orders: [] ,
    loading: false,
    purchased: false
}
const  orderReducer = (state = initialState,  action) => {
    switch (action.type) {
        case ActionTypes.PURCHASE_BURGER_REQUEST:
        case ActionTypes.PURCHASE_BURGER_ERROR:
        case ActionTypes.PURCHASE_BURGER_SUCCESS:
        case ActionTypes.GET_ORDER_REQUEST:
        case ActionTypes.GET_ORDER_ERROR:
        case ActionTypes.GET_ORDER_SUCCESS:
            return{
                ...state,
                ...action.payload,
                // concat array method return new array 
                // to use state.orders without changing it
                // orders: state.orders.concat(newOrder)
            }
        default:
          return  state;
    }
};

export default orderReducer;