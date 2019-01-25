import config from 'config';
import {authHeader} from '../_helpers';
import uuid from 'uuid/v4';

export const userService = {
    login,
    logout,
    register,
    getAll,
    getById,
    update,
    delete: _delete
};

function header_params(methodType, object = '') {
    var header =  {
        method: methodType,
        headers: {'Content-Type': 'application/json', headers: authHeader()},
        credentials: 'same-origin',
    };
    if (object !== ''){
        header = Object.assign({body: JSON.stringify(object)}, header)
    }
    return header;
}

function login(username, password) {
    return fetch(`${config.BackendUrl}/users/authenticate?username=${username}&password=${password}`,
        header_params('GET'))
        .then(handleResponse)
        .then(user => {
            if (user.length) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
                return user;
            }
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function getAll() {
    return fetch(`${config.BackendUrl}/users`, header_params('GET')).then(handleResponse);
}

function getById(id) {
    return fetch(`${config.BackendUrl}/users/${id}`, header_params('GET')).then(handleResponse);
}

function register(user) {
    user.id = uuid();
    return fetch(`${config.BackendUrl}/users/register`,
        header_params('POST',user)).then(handleResponse);
}

function update(user) {
    return fetch(`${config.BackendUrl}/users/${user.id}`, header_params('PUT',user)).then(handleResponse);
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return fetch(`${config.BackendUrl}/users/${id}`, header_params('DELETE')).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        if (response.url.match(new RegExp(/\/users\/authenticate(\?|\&)([^=]+)\=([^&]+)/))) {
            if (data.length) {
                return data;
            } else {
                const error = 'Username or password is incorrect';
                return Promise.reject(error);
            }
        } else {
            return data;
        }
    });
}