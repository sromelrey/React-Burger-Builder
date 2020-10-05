import Checkout from './Checkout';

import { connect } from 'react-redux';

const mapsStateToProps = state => ({
   
    burgerBuilderProps: state.burgerBuilder,
    orderProps: state.order
});

export default connect(mapsStateToProps)(Checkout) ;