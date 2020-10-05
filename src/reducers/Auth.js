import * as ActionTypes from '../constants/ActionType';

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
}

const authReducer = (state=initialState,action)=>{
    switch (action.type) {
        case ActionTypes.AUTH_REQUEST:
        case ActionTypes.AUTH_ERROR:
        case ActionTypes.AUTH_SUCCESS:
            return  {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
}

export default authReducer;