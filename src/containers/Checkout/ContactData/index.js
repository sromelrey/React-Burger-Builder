import ContactData from './ContactData';

import { connect } from 'react-redux';
import {  onPurchaseBurger  } from '../../../actions/Orders';

const mapsStateToProps = state => ({
    burgerBuilderProps: state.burgerBuilder
});

const mapsDispatchToProps = dispatch =>({
    onPurchaseBurger(order){
        dispatch(onPurchaseBurger(order));
    }
});

export default connect(mapsStateToProps,mapsDispatchToProps)(ContactData) ;