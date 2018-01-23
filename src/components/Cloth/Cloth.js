import React from 'react';
import ClothItem from './ClothItem/ClothItem';
import ClothBuilder from '../../containers/ClothBuilder/ClothBuilder';

const cloth = (props)=>{
    let transfromItem = Object.keys(props.items)
    .map(igKey=>{
        return [...Array(+props.items[igKey])].map((item,i)=>{
           return <ClothItem key={igKey + i} type={igKey} />
        })
    })
    // .reduce((arr,el)=>{
    //     return arr.concat(el);
    // },[]);

    if(transfromItem.length==0){
        transfromItem =<p>please start adding some items</p>
    }
    
    return(
        <div>
            {transfromItem}
        </div>
    )
}

export default cloth;