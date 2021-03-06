import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import actions from '../../store/actions';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from 'axios';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import {formElementCreator ,checkValidity } from '../../store/utility';

class Auth extends Component {    

    state = {
        controls: {
            email: formElementCreator('input', 'email', 'Email', '', true, true, false, false),
            password: formElementCreator('input', 'password', 'Password', '', true,false, false, false, 6)
        },
        isSignup: true
    }

    
    inputChangeHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: checkValidity(this.state.controls[controlName].validation, event.target.value),
                touched: true
            }
        }
        this.setState({controls: updatedControls})
    }

    authSubmit = (event) => {
        event.preventDefault();
        this
            .props
            .onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup);
    }

    switchAuthModeHandler = (event) => {
        event.preventDefault();
        this.setState((prevState) => {
            return {
                isSignup: !prevState.isSignup
            }
        })
    }

    render() {
        let formElementArray = [];
        for (let key in this.state.controls) {
            formElementArray.push({id: key, config: this.state.controls[key]})
        }

        const inputList = formElementArray.map(formElement => {
            return <Input
                key
                ={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig
                ={formElement.config.elementConfig}
                value={formElement.config.value}
                label={formElement.config.elementConfig.placeholder}
                changed
                ={(event) => this.inputChangeHandler(event, formElement.id)}
                invalid={!formElement.config.valid && formElement.config.touched}/>

        });

        let errorMessage = this.props.error ? <p>{this.props.error.message}</p> : null;
        

        let authForm = <form className="contact">
            {errorMessage}
            {inputList}
            <Button clicked ={this.authSubmit} btnType="Success">{this.state.isSignup
                    ? 'SIGNUP'
                    : 'SIGNIN'}</Button>
            <Button clicked={this.switchAuthModeHandler} btnType="Default">Switch to {this.state.isSignup
                    ? 'SIGN IN'
                    : 'SIGN UP'}</Button>
        </form>

        if(this.props.loading)
                authForm = <Spinner />
        if(this.props.authenticated){
            authForm = this.props.building ?
            <Redirect to = "/checkout" /> :
            <Redirect to = "/" />
        }          

        return (
            <div>
                {authForm}
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup))
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error : state.auth.error,
        authenticated : state.auth.token !=null,
        building : state.clt.building
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Auth , axios));