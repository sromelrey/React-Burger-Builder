import * as ActionTypes from '../constants/ActionType';
import axios from '../axios-orders';
import _ from 'lodash';

export const authenticateUser = (email,password,isSignup)  =>  {
return async dispatch =>  {

            dispatch({
                type:ActionTypes.AUTH_REQUEST,
                payload: {
                    // loading: true
                }
            })
            const apiKey ='AIzaSyDiOCc-dzrQJQgdlnQnQFyrvSxeteCnIDo';
            const authData = {
                email,
                password,
                returnSecureToken: true
            }

            let url =`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`
            if(!isSignup){
                url =`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`;
            }
            const response =   await axios.post(url,authData);
        
          
            if(_.isEmpty(response)){
                return dispatch({
                    type: ActionTypes.AUTH_ERROR,
                    payload :  {
                        loading:  false,
                        error:  true
                    }
                })
            }      
            const {idToken,localId} = response.data;
            dispatch({
                type: ActionTypes.AUTH_SUCCESS,
                payload:{
                    loading: false,
                    token: idToken,
                    userId: localId
                }
            })       

    }
}