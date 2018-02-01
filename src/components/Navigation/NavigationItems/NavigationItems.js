import React, {Component} from 'react';
import NavigationItem from './NavigationItem/NavigationItem';

class NavigationItems extends Component {
    componentDidMount() {}
    render() {
        const authentication = this.props.auth
            ? <NavigationItem link="/logout">Logout</NavigationItem>
            : <NavigationItem link="/auth">Authenticate</NavigationItem>;
        const order = this.props.auth
            ? <NavigationItem link="/orders">Orders</NavigationItem>
            : null;
        return (
            <ul>
                <NavigationItem exact link="/">Home</NavigationItem>
                {order}
                {authentication}
            </ul>
        )
    }
}

export default NavigationItems;