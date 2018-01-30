import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import Layout from './components/Layout/Layout';
import ClothBuilder from './containers/ClothBuilder/ClothBuilder';
import CheckOut from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';

class App extends Component {
  render() {
    return (
      <Layout>
        <Switch>
          <Route path="/orders" component ={Orders} />
          <Route path="/checkout" component ={CheckOut}/>
          <Route path="/auth" component ={Auth} />
          <Route path="/logout" component ={Logout} />
          <Route path="/" exact component={ClothBuilder}/>
        </Switch>
      </Layout>
    );
  }
}

export default App;
