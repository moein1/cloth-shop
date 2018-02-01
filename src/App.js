import React, {Component} from 'react';
import {Route, Switch ,withRouter ,Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import Layout from './components/Layout/Layout';
import ClothBuilder from './containers/ClothBuilder/ClothBuilder';
import CheckOut from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import action from './store/actions';
import withErrorHandler from './hoc/withErrorHandler/withErrorHandler';

class App extends Component {
  componentDidMount(){
    if (localStorage.getItem('token') && localStorage.getItem('userId')) 
            this.props.onSetToken();
  }

  render() {
    let routes = (
      <Switch>
          <Route path="/auth" component ={Auth} />
          <Route path="/" exact component={ClothBuilder}/>
          <Redirect to="/" />
        </Switch>
    )
    if(this.props.isAuthenticated){
      routes =(
        <Switch>
          <Route path="/auth" component ={Auth} />
          <Route path="/checkout" component ={CheckOut}/>
          <Route path="/orders" component ={Orders} />
          <Route path="/logout" component ={Logout} />
          <Route path="/" exact component={ClothBuilder}/>
          <Redirect to = "/" />
        </Switch>
      )
    }
    return (
      <Layout>
        {routes}
      </Layout>
    );
  }
}

const mapStateToProps = state =>{
  return{
    isAuthenticated : state.auth.token != null
  }
}

const mapDispatchToProps = dispatch =>{
  return{
    onSetToken : () =>dispatch(action.setToken())
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));
