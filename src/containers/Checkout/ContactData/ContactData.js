import React, {Component} from 'react';
import {connect} from 'react-redux';
import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-order';
import spinner from '../../../components/UI/Spinner/Spinner';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import action from '../../../store/actions/index';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import {formElementCreator ,checkValidity } from '../../../store/utility';

class ContactData extends Component {
   
    state = {
        orderForm: {
            name: formElementCreator('input', 'text', 'Your Name', '', true,false, false, false, 4),
            email: formElementCreator('input', 'email', 'Email', '', true, true, false, false),
            street: formElementCreator('input', 'text', 'Street', '', true, false, false),
            country: formElementCreator('input', 'text', 'Country', '', true, false, false),
            zipCode: formElementCreator('input', 'text', 'Zip Code', '', true, false, false),
            //  Comment : formElementCreator('textarea' ,'text', 'Comment','' ),
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
        formIsValid: false
    }   

    orderHandler = (event) => {
        event.preventDefault();
        const formData = {};
        for (let key in this.state.orderForm) {
            formData[key] = this.state.orderForm[key].value;
        }
        const order = {
            items: this.props.its,
            price: (+ this.props.price).toFixed(2),
            orderData: formData,
            userId: this.props.userId
        }
        this
            .props
            .onPurchaseCloth(order, this.props.token);
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
        updatedFormElement.valid = checkValidity(updatedFormElement.validation, event.target.value);
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
        if (this.props.loading) 
            form = <Spinner/>
        return (
            <div>
                {form}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        its: state.clt.items,
        price: state.clt.totalPrice,
        erorr: state.purch.error,
        loading: state.purch.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onPurchaseCloth: (orders, token) => dispatch(action.purchseCloth(orders, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));
