import Checkout from './Checkout';

import { connect } from 'react-redux';

const mapsStateToProps = state => ({
   
    burgerBuilderProps: state.burgerBuilder,
    orderProps: state.order
});

const mapsDispatchToProps = dispatch =>({

});

export default connect(mapsStateToProps)(Checkout) ;