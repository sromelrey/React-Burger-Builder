import Orders from './Orders';

import { connect } from 'react-redux';
import { getOrders } from '../../actions/Orders';

const mapsStateToProps = state => ({
    orderProps: state.order
});

const mapsDispatchToProps = dispatch => ({
    
    getOrders () {
          dispatch(getOrders());
      }
  
});

export default connect(
	mapsStateToProps,
	mapsDispatchToProps
)(Orders);
