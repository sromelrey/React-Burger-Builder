import Auth from './Auth';

import { connect } from 'react-redux';
import {authenticateUser} from '../../actions/Auth';

const mapsStateToProps = state => ({
	authProps : state.auth
});

const mapsDispatchToProps = dispatch => ({
	authenticateUser(email,	password,isSignUp){
		dispatch(authenticateUser(email, password,isSignUp));
	}
  
});

export default connect(
	mapsStateToProps,
	mapsDispatchToProps
)( Auth);
