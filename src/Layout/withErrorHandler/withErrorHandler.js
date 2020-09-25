import React, {Component, Fragment} from 'react';

import Modal from '../../components/UI/Modal/Modal';

// HOC(Higher Order Component) wrappers
const withErrorHandler  = (WrappedComponent,axios) => {

    return class extends Component  {
        constructor(props){
            super(props);
            this.state  = {
                error: null
            }
         this.reqInterceptors = axios.interceptors.request.use(req=>{
                this.setState({error:null});
                return req;
            });

            this.resInterceptors = axios.interceptors.response.use(res => res, error =>{
                this.setState({error});
            });
        }
        
        componentWillUnmount(){
          
            axios.interceptors.request.eject(this.reqInterceptors);
            axios.interceptors.response.eject(this.resInterceptors);
        }

        errorConfirmedHandler = ()=>{
            this.setState({error:null})
        }

        render(){
            return(
                <Fragment>
                    <Modal 
                    show={this.state.error}
                    modalClosed={this.errorConfirmedHandler}
                    >
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props}/>
                </Fragment>
               
            );
        }
       
    }
}

export default withErrorHandler;