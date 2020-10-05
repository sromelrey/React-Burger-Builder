import * as ActionTypes from '../constants/ActionType';
import axios from '../axios-orders';
import _ from 'lodash';


export const onIngredientAdded = (ingredientName) => {
    // argument getState if you want to have 
    // access to state in action creators
    return  async (dispatch, getState) => {
        const { ingredients } = getState().burgerBuilder;
        
       const newIngredients ={...ingredients};
        dispatch({
            type: ActionTypes.ADD_INGREDIENT,
            payload:{
                ingredients: {
                    ...newIngredients,
                    [ingredientName]: newIngredients[ingredientName] + 1
                } 
            },
            ingredientName
            
        })
           
    };
}

// async isn't required if action doesn't have http request
export const onIngredientRemove = (ingredientName) => {
    return  async (dispatch,getState) => {
        const { ingredients } = getState().burgerBuilder;
        
       const newIngredients = {...ingredients};
        dispatch({
            type: ActionTypes.REMOVE_INGREDIENT,
            payload:{
                ingredients:{
                    ...newIngredients,
                    [ingredientName]: newIngredients[ingredientName] - 1
                 } ,
               
            },
            ingredientName
        })
           
    };
}

export const getIngredients = () => {
    return  async dispatch => {
        dispatch({
            type: ActionTypes.GET_INGREDIENTS_REQUEST,
            payload:{
                loading: true
            }
        });

        const response = await axios.get('https://react-burger-86749.firebaseio.com/ingredients.json');
        if(_.isEmpty(response)){
            return dispatch({
                type: ActionTypes.GET_INGREDIENTS_ERROR,
                payload :  {
                    loading:  false,
                    error:  true
                }
            })
        }      
        const { salad , bacon,cheese,meat } = response.data;
        dispatch({
            type: ActionTypes.GET_INGREDIENTS_SUCCESS,
            payload:{
                // to arrange the ingredients display 
                ingredients: { salad,bacon,cheese,meat},
                loading: false
            }
        })         
           
    };
}