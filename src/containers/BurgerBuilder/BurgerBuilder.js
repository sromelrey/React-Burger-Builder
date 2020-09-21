import React, { Component,Fragment } from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSumarry/OrderSummary";
import withErrorHandler from '../../layout/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false
  };

  componentDidMount(){
    axios.get('https://react-burger-86749.firebaseio.com/ingredients.json')
          .then(response =>{
            this.setState({ingredients:response.data});
          })
          .catch(error =>{
            this.setState({error:true})
          })
  }

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    this.setState({ purchasable: sum > 0 });
  }

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients,
    };
    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    this.updatePurchaseState(updatedIngredients);
  };
  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) {
      return;
    }
    const updatedCount = oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients,
    };
    updatedIngredients[type] = updatedCount;
    const priceDeduction = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeduction;
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    this.updatePurchaseState(updatedIngredients);
  };

  puchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  }
  purchaseContinueHandler = () => {
    this.setState({loading: true});
    const order ={
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name:'Romel Rey Silva',
        address:{
          street: 'teststreet',
          zipCode: 'testzipcode',
          country: 'Philippines'
        },
        email: 'test@test.com'
      },
      deliveryMethod: 'fastest'
    }

    axios.post('/orders.json',order)
        .then(response =>{
          this.setState({loading:false ,purchasing:false});
        })
        .catch(error => {
          this.setState({loading:false,purchasing:false });
        });
  }


  render() {
    const disableInfo = {
      ...this.state.ingredients,
    };
    for (let key in disableInfo) {
      disableInfo[key] = disableInfo[key] <= 0;
    }
    let orderSumarry = null;
    let burger =  this.state.error? <p>Ingredients can't be loaded</p>: <Spinner />;

    if(this.state.ingredients){
      burger =  (
        <Fragment>
          
           <Burger ingredients={this.state.ingredients} />
            
           <BuildControls
              ingredientAdded={this.addIngredientHandler}
              ingredientRemove={this.removeIngredientHandler}
              disabled={disableInfo}
              purchasable={this.state.purchasable}
              ordered={this.puchaseHandler}
              price={this.state.totalPrice}
             />
              
        </Fragment>
        );
        orderSumarry = <OrderSummary 
        ingredients={this.state.ingredients} 
        price={this.state.totalPrice}
        purchaseCancelled={this.purchaseCancelHandler}
        purchaseContinued={this.purchaseContinueHandler}/>
    }
    if(this.state.loading){
      orderSumarry = <Spinner/>;
    }
   
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
export default withErrorHandler(BurgerBuilder,axios);
