import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/auxel';

const sideDrawer =(props) =>{
    let ClassName2 = ['sideDrawer' ,props.open ? 'sideDrawer-open' : 'sideDrawer-close'].join(' ');
    let ClassName = props.open ?  'sideDrawer sideDrawer-open' :'sideDrawer sideDrawer-close';
    return(
        <Aux>
        <Backdrop show={props.open}  clicked={props.clicked} />
        <div  className={ClassName2}>           
            <Logo/>
            <nav>
                <NavigationItems/>
            </nav>
        </div>
        </Aux>
    )
}
export default sideDrawer;