import React, { Component } from 'react';
import Layout from './layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import './App.css';
class App extends Component {
  render() {
    return (
      <div className="App">
     <Layout>
      <BurgerBuilder/>
     </Layout>
      </div>
    );
  }
}

export default App;
