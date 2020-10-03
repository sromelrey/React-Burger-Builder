import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { createStore,applyMiddleware,compose,combineReducers } from 'redux' ;
import { Provider } from 'react-redux';


import thunk from 'redux-thunk';

import burgerBuilderReducer from './reducers/BurgerBuilder';
import orderReducer from './reducers/Order';

const rootReducer = combineReducers({
    burgerBuilder: burgerBuilderReducer,
    order: orderReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    rootReducer,
    composeEnhancers(
        applyMiddleware(thunk)
    )
    );

const app = (
    <Provider store={store}>
         <BrowserRouter>
             <App />
        </BrowserRouter>
    </Provider>
   
)
ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
