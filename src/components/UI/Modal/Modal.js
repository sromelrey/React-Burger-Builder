import React,{Component,Fragment} from "react";
import classes from "./Modal.css";
import Backdrop from "../Backdrop/Backdrop";
import { info } from "autoprefixer";

class Modal extends Component {

  // shouldComponentUpdate to control and prevent OrderSummary 
  // from updating without if the modal is not shown
  shouldComponentUpdate(nextProps,  nextState){
    // return true if the modal is shown
    return nextProps.show !== this.props.show;
  }

  componentDidUpdate(){
    console.log('Modal will componentDidUpdate')
  }

  render(){
    return(
      <Fragment>
      <Backdrop show={this.props.show} clicked={this.props.modalClosed}/>
      <div
        className={classes.Modal}
        style={{
          transform: this.props.show ? "translateY(0)" : "translateY(-100vh)",
          opacity: this.props.show ? "1" : "0",
        }}>
        {this.props.children}
      </div>
    </Fragment>
    )
  }

};

export default Modal;
