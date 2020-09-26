import React from 'react';
import classes from './Input.css';

const input = (props) => {

    let intputElement = null;
    const inputClasses = [classes.InputElement];

    if(props.invalid && props.shoudValidate && props.touched){
        inputClasses.push(classes.Invalid)
    }

    switch (props.elementType) {
        case ('input'):
            intputElement = <input 
                             className={inputClasses.join(' ')} 
                             {...props.elementConfig}
                              value={props.value} 
                              onChange={props.changed}/>;
            break;
        case ('textarea'):
            intputElement = <textarea 
                            className={inputClasses.join(' ')} 
                            {...props.elementConfig}
                            value={props.value} 
                            onChange={props.changed}/>;
            break;
        case ('select'):
            intputElement = <select 
                                className={inputClasses.join(' ')} 
                                value={props.value} 
                                onChange={props.changed}>

                                {props.elementConfig.options.map(option=>(

                                    <option key={option.value} value={option.value}>{option.displayValue}</option>

                                ))}
                                    
                                </select>;
            break;
        default:
            intputElement = <input 
                            className={inputClasses.join(' ')} 
                            {...props.elementConfig}
                            value={props.value} 
                            onChange={props.changed}/>;
           
    }

    return (

        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {intputElement}
        </div>
    )
};

export default input