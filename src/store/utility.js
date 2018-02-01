export const updatedObject = (oldObject , updatedProperties) =>{   
    return{
        ...oldObject,
        ...updatedProperties
    }
}

export const formElementCreator = 
(type, configType, configPlaceholder, value, required, isEmail=false, valid, touched, minLenght=2) => {
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
