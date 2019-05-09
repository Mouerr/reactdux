import {history} from './history';
import {authHeader} from "./auth-header";

export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};


export const headerParams = (methodType, object = '') =>{
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