import React from 'react';

const input = (props)=>{
    let inputElemnt = null;
    let className = null;
    if(props.invalid)
        className = 'invalid';
    switch (props.elementType) {
        case 'input':
            inputElemnt = <input 
            value ={props.vlaue} onChange={props.changed} 
             {...props.elementConfig}
             className ={className}
             />;
            break;
        case 'textarea':
            inputElemnt = <textarea rows="6" onChange={props.changed} {...props.elementConfig} />;
            break;
        case 'select':
            inputElemnt = 
              <select value={props.value} onChange={props.changed}>
                {props.elementConfig.options.map(ele=>{
                   return <option key={ele.value} value={ele.value}>{ele.displayValue}</option>
                })}                
                </select>
            break;
        default:
            inputElemnt =<input value={props.value} onChange={props.changed} {...props.elementConfig} />
            break;
    }
    return(
    <div>
        <label>{props.label}</label>
        {inputElemnt}
    </div>
    )
}

export default input;