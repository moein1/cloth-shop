import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import NavigationItem from '../NavigationItems/NavigationItem/NavigationItem';
import Menu from '../../Menu/Menu';

const toolbar = (props) => (
    <header>
        <Menu clicked={props.menuClicked} />
        <Logo></Logo>
        <nav>
            <NavigationItems auth = {props.auth} />           
        </nav>
    </header>
)

export default toolbar;