import * as ActionTypes from '../constants/ActionType';

const initialState = {
    
      ingredients: null,
      totalPrice: 4,
      loading: false,
      error: false,
};

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7,
  };
  

const burgerReducer = (state = initialState,action) =>{
    switch (action.type) {
        case ActionTypes.ADD_INGREDIENT:
            return {
                ...state,
                ...action.payload,
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
            };
      case ActionTypes.REMOVE_INGREDIENT:
        return {
            ...state,
            ...action.payload,
            
            totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
        };
       case ActionTypes.GET_INGREDIENTS_REQUEST:
       case ActionTypes.GET_INGREDIENTS_ERROR:
       case ActionTypes.GET_INGREDIENTS_SUCCESS:
            // spread operator copy the object without changing the value
            // if to spread operator in object/array literal it will merge both of it
           return {
               ...state,
               ...action.payload,
               totalPrice: 4
           }
        default:
            return state;
    }
};

export default burgerReducer;