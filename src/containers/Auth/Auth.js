import React, {Component} from 'react';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import classes from './Auth.css';
import axios from '../../axios-orders';
import { connect } from 'react-redux';

import withErrorHandler from '../../layout/withErrorHandler/withErrorHandler';

class Auth extends Component    {
    state ={
        controls :{
            email:  {
                elementType: 'input',
                elementConfig: {
                    type:'email',
                    placeholder: 'E-Mail Address'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            password:  {
                elementType: 'input',
                elementConfig: {
                    type:'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            },
        },
        isSignUp: true
    }

    checkValidity(value,rules){
        let isValid = true;
        if(!rules) {
            return true;
        }

        if(rules.required){
            isValid = value.trim() !== '' && isValid;
        }

        if(rules.minLength){
            isValid = value.length >= rules.minLength && isValid;
        }
        if(rules.maxLength){
            isValid = value.length <= rules.maxLength && isValid;
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }
       
        return isValid;
    }
    inputChangeHandler =(event,controlName)=>{
        const updateControls = { 
            ...this.state.controls,
            
                 [controlName] : {
                    ...this.state.controls[controlName],
                    value : event.target.value,
                    valid : this.checkValidity(event.target.value, this.state.controls[controlName].validation),
                    touched :    true
                 
                     }
                
                };
              
                this.setState({controls:updateControls});
    }
    submitHandler = (event) =>{
        const {email,password} = this.state.controls;
        event.preventDefault();
        this.props.authenticateUser(email.value, password.value,this.state.isSignUp)
    }

    switchAuthModeHandler=()=>{
        this.setState(prevState=>{
            return {isSignUp: !prevState.isSignUp};
        })
    }

    render(){
        const formElementsArray = [];
        for(let key in this.state.controls){
            formElementsArray.push({
                id:key,
                config:this.state.controls[key]
            })
        }
        
        const form = formElementsArray.map(formElement => (
                      <Input 
                          key={formElement.id}
                          elementType={formElement.config.elementType}
                          elementConfig={formElement.config.elementConfig}
                          value={formElement.config.value}
                          invalid={!formElement.config.valid}
                          shoudValidate={formElement.config.validation}
                          touched={formElement.config.touched}
                          changed={(event) => this.inputChangeHandler(event,formElement.id)}
                      />
                ));
               
           
           
        return(
                <div className={classes.Auth}>
                    <form onSubmit={this.submitHandler}>
                        {form}
                        <Button 
                        btnType="Success" >SUBMIT</Button>
                    </form>
                    <Button
                     btnType="Danger"
                     clicked={this.switchAuthModeHandler}
                     >SWITCH TO {this.state.isSignUp? 'SIGN IN':'SIGN UP'}</Button>
                </div>
        );
    }
}

export default connect()(  withErrorHandler(Auth,axios));