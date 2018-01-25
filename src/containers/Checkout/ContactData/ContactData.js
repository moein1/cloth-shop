import React, {Component} from 'react';
import {connect} from 'react-redux';
import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-order';
import spinner from '../../../components/UI/Spinner/Spinner';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import actionType from '../../../store/actions';
class ContactData extends Component {

    orderFormHandler = (type, configType, configPlaceholder, value, required, valid, touched) => {
        return {
            elementType: type,
            elementConfig: {
                type: configType,
                placeholder: configPlaceholder
            },
            value: value,
            validation: {
                required: required
            },
            valid: valid,
            touched: touched
        };
    }

    state = {
        orderForm: {
            name: this.orderFormHandler('input', 'text', 'Your Name', '', true, false, false),
            email: this.orderFormHandler('input', 'email', 'Email', '', true, false, false),
            street: this.orderFormHandler('input', 'text', 'Street', '', true, false, false),
            country: this.orderFormHandler('input', 'text', 'Country', '', true, false, false),
            zipCode: this.orderFormHandler('input', 'text', 'Zip Code', '', true, false, false),
            //  Comment : this.orderFormHandler('textarea' ,'text', 'Comment','' ),
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {
                            value: 'fastest',
                            displayValue: 'fastest'
                        }, {
                            value: 'cheapest',
                            displayValue: 'cheapest'
                        }, {
                            value: 'express',
                            displayValue: 'express'
                        }
                    ]
                },
                value: 'express',
                validation: {},
                valid: true
            }
        },
        formIsValid: false,
        loading: false
    }

    checkValidity = (rules, value) => {
        let isValid = true;

        if (rules.required) 
            isValid = value.trim() !== '' && isValid;
        return isValid;
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true});
        const formData = {};
        for (let key in this.state.orderForm) {
            formData[key] = this.state.orderForm[key].value;
        }
        const order = {
            items: this.props.its,
            price: (+ this.props.price).toFixed(2),
            orderData: formData
        }
        axios
            .post('/orders.json', order)
            .then(response => {
                this.setState({loading: false});
                this.props.onResetState;
                this
                    .props
                    .history
                    .push('/')
                //we should reset the items and price that has been posted to server

            })
            .catch(error => {
                this.setState({loading: false})
            })
    }

    inputChangedHandler = (event, eventIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        };
        const updatedFormElement = {
            ...updatedOrderForm[eventIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.touched = true;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.validation, event.target.value);
        updatedOrderForm[eventIdentifier] = updatedFormElement;

        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }

        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid})
    }

    render() {
        let formElementArray = [];
        for (let key in this.state.orderForm) {
            formElementArray.push({id: key, config: this.state.orderForm[key]})
        }
        let form = (
            <div className="contact">
                <h4>Enter your contact data</h4>
                <form onSubmit ={this.orderHandler}>
                    {formElementArray.map(formElement => {
                        return <Input
                            key={formElement.id}
                            elementType={formElement.config.elementType}
                            elementConfig
                            ={formElement.config.elementConfig}
                            value={formElement.config.value}
                            label={formElement.config.elementConfig.placeholder}
                            changed
                            ={(event) => this.inputChangedHandler(event, formElement.id)}
                            invalid={!formElement.config.valid && formElement.config.touched}/>
                    })
}
                    <Button invalid={!this.state.formIsValid} btnType="Success">Order</Button>
                </form>
            </div>
        );
        if (this.state.loading) 
            form = <Spinner/>
        return (
            <div>
                {form}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {its: state.items, price: state.totalPrice}
}

const mapDispatchToProps = dispatch => {
    return {
        onResetState: () => dispatch({type : actionType.RESET_STATE})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactData);
