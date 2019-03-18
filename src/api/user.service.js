import {authHeader} from '../_helpers';

const apiurl = process.env.REACT_APP_API_URL;

export const userService = {
    login,
    logout,
    create,
    getAll,
    loginAsRegistered,
    getByDataTableFilter,
    getById,
    update,
    delete: _delete
};

function header_params(methodType, object = '') {
    let header = {
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

    return fetch(apiurl+`/users/authenticate?username=${email}&password=${password}`,
        header_params('GET'))
        .then(handleResponse)
        .then(user => {
            if (user.length) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user[0]));
                return user;
            }
        });
}

function loginAsRegistered(email, password) {

    const header = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email: email, password: password})
    };

    return fetch(`http://web.gmpanel.net:8093/api/users/api-token-auth/`, header)
        .then(handleResponse)
        .then(response => {
            if (response.token !== '') {
                const users = JSON.parse(localStorage.getItem('stored_users'));

                let filteredUsers = users.filter(user => {
                    return user.email === email || user.username === email;
                });

                if (filteredUsers.length) {
                    localStorage.setItem('user', JSON.stringify(filteredUsers[0]));
                    return filteredUsers[0];

                } else {
                    let apiuser = response.user;
                    const emailname = apiuser.username.substring(0, apiuser.username.lastIndexOf("@"));
                    apiuser.firstname = emailname;
                    apiuser.lastname = emailname;
                    apiuser.email = apiuser.username;
                    apiuser.password = password;

                    return fetch(apiurl+`/user/create`,
                        header_params('POST', apiuser)).then(handleResponse).then(user => {
                        localStorage.setItem('user', JSON.stringify(user));
                        return user;
                    });
                }
            }
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
    localStorage.removeItem('storedusers');
}

function getAll() {
    return fetch(apiurl+`/users?_limit=10`, header_params('GET')).then(handleResponse).then(users => {
        localStorage.setItem('stored_users', JSON.stringify(users));
        return users;
    });
}

function getById(id) {
    return fetch(apiurl+`/users/${id}`, header_params('GET')).then(handleResponse);
}

function getByDataTableFilter(params_filters) {
    return fetch(apiurl+`/users${params_filters}`, header_params('GET')).then(handleResponse);
}

function create(user) {
    return fetch(apiurl+`/user/create`,header_params('POST', user)).then(handleResponse);
}

function update(user) {
    return fetch(apiurl+`/users/${user.id}`, header_params('PUT', user)).then(handleResponse);
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return fetch(apiurl+`/users/${id}`, header_params('DELETE')).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                window.location.reload(true);
            }

            let error;
            if (response.url.endsWith('/api/users/api-token-auth/')) {
                error = (data && data.non_field_errors[0]) || response.statusText;
            } else {
                error = (data && data.message) || response.statusText;
            }
            return Promise.reject(error);
        }
        if (response.url.match(new RegExp(/\/users\/authenticate(\?|&)([^=]+)=([^&]+)/))) {
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