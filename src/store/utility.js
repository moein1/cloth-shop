export const updatedObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    }
}

export const formElementCreator = (type, configType, configPlaceholder, value, required, isEmail = false, valid, touched, minLenght = 2) => {
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

export const checkValidity = (rules, value) => {
    let isValid = true;
    if (rules.required) 
        isValid = value.trim() !== '' && isValid;
    if (rules.isEmail) {
        var re = /\S+@\S+\.\S+/;
        return re.test(value) && isValid;
    }
    if (rules.minLenght) {
        isValid = value.length >= rules.minLenght && isValid;
    }

    return isValid;
}
