import React from 'react';

const order = (props)=>{
    let transfromItem = Object.keys(props.items)
    .map(key=>{
           return <span key ={key} >{key} <strong>({props.items[key]})</strong></span>
    })
   return( <div>
       {transfromItem}
        <p>Price: <strong>USD {props.price} </strong> </p>
    </div>)
}


export default order;