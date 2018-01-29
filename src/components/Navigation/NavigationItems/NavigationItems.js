import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItem = (props) => (
    <ul>
        <NavigationItem exact link="/">Home</NavigationItem>
        <NavigationItem link="/orders">Orders</NavigationItem>
    </ul>
)

export default navigationItem;