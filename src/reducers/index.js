import { combineReducers } from 'redux';
import burgerBuilderReducer from './BurgerBuilder';

export default ()=>{
    combineReducers({burgerBuilderReducer});
}