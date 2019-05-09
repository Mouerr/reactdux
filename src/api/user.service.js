import {handleResponse, headerParams} from '../_helpers/utility';

const apiurl = process.env.REACT_APP_API_URL;

const login = (email, password) => {
    return fetch(apiurl + `/users/authenticate?username=${email}&password=${password}`,
        headerParams('GET'))
        .then(handleResponse)
        .then(user => {
            if (user.length) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                const expirationDate = new Date(new Date().getTime() + user[0].expirationTime * 1000);
                localStorage.setItem('user', JSON.stringify(user[0]));
                localStorage.setItem('userId', user[0].id);
                localStorage.setItem('token', user[0].token);
                localStorage.setItem('expirationDate', expirationDate);
                return user[0];
            }
        });
};

const loginAsRegistered = (email, password) => {

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

                    return fetch(apiurl + `/user/create`,
                        headerParams('POST', apiuser)).then(handleResponse).then(user => {
                        localStorage.setItem('user', JSON.stringify(user));
                        return user;
                    });
                }
            }
        });
};

const logout = () => {
    // remove user from local storage to log user out
    localStorage.clear();
};

const getAll = () => {
    return fetch(apiurl + `/users?_limit=10`, headerParams('GET')).then(handleResponse).then(users => {
        return users;
    });
};

const getById = (id) => {
    return fetch(apiurl + `/users/${id}`, headerParams('GET')).then(handleResponse);
};

const getByDataTableFilter = (params_filters) => {
    return fetch(apiurl + `/users${params_filters}`, headerParams('GET')).then(handleResponse);
};

const create = (user) => {
    return fetch(apiurl + `/user/create`, headerParams('POST', user)).then(handleResponse);
};

const update = (user) => {
    return fetch(apiurl + `/users/${user.id}`, headerParams('PUT', user)).then(handleResponse);
};

// prefixed function name with underscore because delete is a reserved word in javascript
const _delete = (id) => {
    return fetch(apiurl + `/users/${id}`, headerParams('DELETE')).then(handleResponse);
};

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