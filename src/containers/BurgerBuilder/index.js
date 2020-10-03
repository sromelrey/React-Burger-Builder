import BurgerBuilder from './BurgerBuilder';

import { connect } from 'react-redux';
import {  onIngredientAdded,  onIngredientRemove, getIngredients } from '../../actions/BurgerBuilder';

const mapsStateToProps = state => ({
    burgerBuilderProps: state.burgerBuilder
});

const mapsDispatchToProps = dispatch => ({
    onIngredientAdded (ingName) {
        dispatch(onIngredientAdded(ingName));
      },
      onIngredientRemove (ingName){
        dispatch(onIngredientRemove(ingName));
      },
      getIngredients () {
          dispatch(getIngredients());
      }
  
});

export default connect(
	mapsStateToProps,
	mapsDispatchToProps
)( BurgerBuilder);
