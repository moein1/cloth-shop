import React from 'react';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    {
        label: 'Top',
        type: 'top'
    }, {
        label: 'Bottom',
        type: 'bottom'
    }
]

const buildControls = (props) => (
    <div className="BuildControls">
    <p>Current Price : <strong>$ {props.price.toFixed(2)}</strong></p>
        {controls.map(control => (<BuildControl
         added={()=> props.addItem(control.type)} 
         removed = { ()=> props.removeItem(control.type) }
         disabled={props.disabled[control.type]}
         key={control.label} label={control.label}/>))}
         <button className="purchasable"
          disabled={!props.purchasable}
          onClick={props.ordered}
          >Order now</button>
    </div>
)

export default buildControls;