import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItem = (props) => (
    <ul>
        <NavigationItem exact link="/">Home</NavigationItem>
        <NavigationItem link="#">About</NavigationItem>
        <NavigationItem link="/checkout">Checkout</NavigationItem>
        <NavigationItem link="/orders">Orders</NavigationItem>
        <NavigationItem link="#">Summary</NavigationItem>
    </ul>
)

export default navigationItem;