import React, {Component} from 'react';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';

class Auth extends Component {

    authFormHandler = (type, configType, configPlaceholder, value, required, isEmail, valid, touched, minLenght) => {
        return {
            elementType: type,
            elementConfig: {
                type: configType,
                placeholder: configPlaceholder
            },
            value: value,
            validation: {
                required: required,
                isEmail: isEmail,
                minLenght: minLenght
            },
            valid: valid,
            touched: touched
        };
    }

    state = {
        controls: {
            email: this.authFormHandler('input', 'email', 'Email', '', true, true, false, false, 5),
            password: this.authFormHandler('input', 'password', 'Password', '', true, false, false, false, 6)
        }
    }

    checkValidity = (rules, value) => {
        let isValid = true;
        if (rules.required) 
            isValid = value.trim() !== '' && isValid;
        if (rules.isEmail) {
            var re = /\S+@\S+\.\S+/;
            return re.test(value) && isValid;
        }
        if(rules.minLenght){
            isValid = value.length > rules.minLenght && isValid;
        }

        return isValid;
    }

    inputChangeHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(this.state.controls[controlName].validation, event.target.value),
                touched: true
            }
        }
        this.setState({controls: updatedControls})
    }

    render() {
        let formElementArray = [];
        for (let key in this.state.controls) {
            formElementArray.push({id: key, config: this.state.controls[key]})
        }

        const form = formElementArray.map(formElement => {
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

        return (
            <div>
                <form action="" className="contact">
                    {form}
                    <Button btnType="Success">SUBMIT</Button>
                </form>
            </div>
        );
    }
}

export default Auth;