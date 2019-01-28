import config from 'config';
import {authHeader} from '../_helpers';
import uuid from 'uuid/v4';
import myData from '../db.json';

let users = myData.users || [];

export const userService = {
    login,
    logout,
    register,
    getAll,
    loginAsRegistered,
    getById,
    update,
    delete: _delete
};

function header_params(methodType, object = '') {
    var header = {
        method: methodType,
        headers: {'Content-Type': 'application/json', headers: authHeader()},
        credentials: 'same-origin',
    };
    if (object !== '') {
        header = Object.assign({body: JSON.stringify(object)}, header)
    }
    return header;
}

function login(email, password) {

    var header = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email: email, password: password})
    };

    return fetch(`http://web.gmpanel.net:8093/api/users/api-token-auth/`, header)
        .then(handleResponse)
        .then(user => {

            if (user.token !== '') {
                console.log('usertoken', user.token);
                let responseJson = {
                    email: email,
                    token: user.token
                };
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(responseJson));
                return user;
            }
        });
}

function loginAsRegistered(email, password) {

    var header = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email: email, password: password})
    };

    return fetch(`http://web.gmpanel.net:8093/api/users/api-token-auth/`, header)
        .then(handleResponse)
        .then(user => {

            if (user.token !== '') {

                let filteredUsers = users.filter(user => {
                    return user.email === email;
                });

                if (filteredUsers.length) {
                    localStorage.setItem('user', JSON.stringify(filteredUsers));
                    return filteredUsers[0];

                } else {
                    var emailname = email.substring(0, email.lastIndexOf("@"));
                    user.id = users.length ? Math.max(...users.map(user => user.id)) + 1 : 1;
                    user.firstname = emailname;
                    user.lastname = emailname;
                    user.username = emailname;
                    user.email = email;
                    user.password = password;

                    fetch(`${config.BackendUrl}/users/register`,
                        header_params('POST', user));
                    localStorage.setItem('user', JSON.stringify(user));
                    return user;
                }
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
        header_params('POST', user)).then(handleResponse);
}

function update(user) {
    return fetch(`${config.BackendUrl}/users/${user.id}`, header_params('PUT', user)).then(handleResponse);
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

            var error;
            if (response.url.endsWith('/api/users/api-token-auth/')) {
                error = (data && data.non_field_errors[0]) || response.statusText;
            } else {
                error = (data && data.message) || response.statusText;
            }
            return Promise.reject(error);
        }
        return data;
    });
}