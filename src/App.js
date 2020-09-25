import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Layout from './layout/Layout';
import Checkout from './containers/Checkout/Checkout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Orders from './containers/Orders/Orders';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
         <Layout>
           <Switch>
             <Route path="/checkout" component={Checkout}/>
             <Route path="/orders" component={Orders}/>
             <Route path="/" exact component={BurgerBuilder}/>
           </Switch>
          
         </Layout>
      </div>
    );
  }
}

export default App;
