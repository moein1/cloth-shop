import React from 'react';

const buildControl = (props)=>(
    <div className="BuildControl">
        <div>{props.label}</div>
        <button className ="less" onClick={props.removed} 
        disabled = {props.disabled} >Less</button>
        <button  onClick={props.added} >More</button>
    </div>
)

export default buildControl;