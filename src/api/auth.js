import {handleResponse, headerParams} from "../_helpers/utility";

const apiUrl = process.env.REACT_APP_API_URL;
export class Auth {
    login = (email, password) => {
        return fetch(`${apiUrl}/users/authenticate?username=${email}&password=${password}`,
            headerParams('GET'))
            .then(handleResponse)
            .then(user => {
                if (user.length) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    const expirationDate = new Date(new Date().getTime() + user[0].expirationTime * 1000);
                    localStorage.setItem('user', JSON.stringify(user[0]));
                    localStorage.setItem('userId', user[0].id);
                    localStorage.setItem('groupId', user[0].groupId);
                    localStorage.setItem('token', user[0].token);
                    localStorage.setItem('expirationDate', expirationDate);
                    return user[0];
                }
            });
    };

    /*loginRealApi = (email, password) => {

        const header = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email: email, password: password})
        };

        return fetch(`http://test.com`, header)
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
                    }
                }
            });
    };*/

    logout = () => {
        // remove user from local storage to log user out
        localStorage.clear();
    };
}