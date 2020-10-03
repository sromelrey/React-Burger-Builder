import React, { Component,Fragment } from "react";
import { connect } from 'react-redux';

import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSumarry/OrderSummary";
import withErrorHandler from '../../layout/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';

class BurgerBuilder extends Component {
  state = {
    purchasable: false,
    purchasing: false,
  };

  componentDidMount(){
    this.props.getIngredients();
  }

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum > 0 ;
  }

  puchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  }
  purchaseContinueHandler = () => {
  
    this.props.history.push('/checkout');
  }


  render() {
    const { ingredients, totalPrice, error } = this.props.burgerBuilderProps;
    const disableInfo = {
      ...ingredients,
    };
   
    for (let key in disableInfo) {
      disableInfo[key] = disableInfo[key] <= 0;
    }
    let orderSumarry = null;
    let burger =  error ? <p>Ingredients can't be loaded</p>: <Spinner />;

    if(ingredients){
      burger =  (
        <Fragment>
          
           <Burger ingredients={ingredients} />
            
           <BuildControls
              ingredientAdded={this.props.onIngredientAdded}
              ingredientRemove={this.props.onIngredientRemove}
              disabled={disableInfo}
              purchasable={this.updatePurchaseState(ingredients)}
              ordered={this.puchaseHandler}
              price={totalPrice}
             />
              
        </Fragment>
        );
        orderSumarry = <OrderSummary 
                         ingredients={ingredients} 
                         price={totalPrice}
                         purchaseCancelled={this.purchaseCancelHandler}
                         purchaseContinued={this.purchaseContinueHandler}/>
    }
    // if(this.state.loading){
    //   orderSumarry = <Spinner/>;
    // }
   
    return (
      <Fragment>
        <Modal 
            show={this.state.purchasing}
            modalClosed={this.purchaseCancelHandler}>
          {orderSumarry}
        </Modal>

       {burger}
      </Fragment>
    );
  }
}


export default connect()( withErrorHandler(BurgerBuilder,axios));
