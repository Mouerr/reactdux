import {history} from './history';
import {authHeader} from "./auth-header";
import {checkFormValidity} from "../forms/fValidator";

export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};

export const headerParams = (methodType, object = '') => {
    let header = {
        method: methodType,
        headers: {'Content-Type': 'application/json', Accept: 'application/json', ...authHeader()},
        credentials: 'same-origin',
    };
    header = object ? Object.assign({}, {body: JSON.stringify(object)}, header) : header;
    return header;
};

export const handleResponse = response => {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                history.push('/logout');
            }
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        if (response.url.match(new RegExp(/\/users\/authenticate(\?|&)([^=]+)=([^&]+)/))) {
            if (!data.length) {
                const error = 'Username or password is incorrect';
                return Promise.reject(error);
            }
        }
        return data;
    });
};

export const jsUcFirst = string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

export const populateFormObject = (eventValue, formObject, inputIdentifier, handlerType = 'Change') => {
    let response = {};
    let value = '';
    if (handlerType === 'Inject') {
        value = eventValue;
    } else if (typeof eventValue.type === 'undefined') {
        if (typeof eventValue.length === 'undefined') {
            value = eventValue.value;
        } else {
            let arr = [];
            eventValue.map(res => arr.push(res.value));
            value = arr;
        }
    } else {
        value = eventValue.target.value;
    }

    const checkValidity = checkFormValidity(value, formObject[inputIdentifier].validation);
    const updatedFormElement = updateObject(formObject[inputIdentifier], {
        value: value,
        valid: checkValidity.isValid,
        errorMessage: checkValidity.errorMessage,
        touched: true
    });
    const updatedForm = updateObject(formObject, {
        [inputIdentifier]: updatedFormElement
    });

    let formIsValid = true;
    for (let inputIdentifier in updatedForm) {
        formIsValid = updatedForm[inputIdentifier].valid && formIsValid;
    }
    response['updatedForm'] = updatedForm;
    response['formIsValid'] = formIsValid;
    return response;
};


export const isEmpty = (value) =>
    typeof value === 'undefined' ||
    value === null ||
    value === '' ||
    (Array.isArray(value) && value.length === 0);