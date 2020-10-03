import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import {Route,Redirect} from 'react-router-dom';
import ContactData from './ContactData';
import {connect} from 'react-redux';
class Checkout extends Component {

    onCheckoutCancelled = () => {
        this.props.history.goBack();
    }
    onCheckoutContinued = () =>  {
        this.props.history.replace('/checkout/contact-data');
    }
    render(){
        const { ingredients } = this.props.burgerBuilderProps;
        const { purchased } = this.props.orderProps;
        let summary = <Redirect to='/'/>;
        if(ingredients){
            const purchasedRedirect = purchased? <Redirect to="/"/> :null;
            summary =(
                <React.Fragment>
                    {purchasedRedirect}
                    <CheckoutSummary 
                        ingredients={ingredients}
                        onCheckoutCancelled={this.onCheckoutCancelled}
                        onCheckoutContinued={this.onCheckoutContinued}
                      />
                     <Route 
                         path={this.props.match.path + '/contact-data'}
                         component={ContactData}/>

                 </React.Fragment>
                
            )
        }
        return(
            <div>
               {summary}
            </div>
        )
    }

}



export default connect()(Checkout) ;