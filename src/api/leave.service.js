import config from 'config';
import {authHeader} from '../_helpers';

export const leaveService = {
    create,
    getAll,
    getById,
    getByUserid,
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

function getAll() {
    return fetch(`${config.BackendUrl}/leaves`, header_params('GET')).then(handleResponse);
}

function getById(id) {
    return fetch(`${config.BackendUrl}/leaves/${id}`, header_params('GET')).then(handleResponse);
}

function getByUserid(userid) {
    return fetch(`${config.BackendUrl}/users/${userid}/leaves`, header_params('GET')).then(handleResponse);
}

function create(leave) {
    return fetch(`${config.BackendUrl}/leave/create`, header_params('POST',leave)).then(handleResponse);
}

function update(leave) {
    return fetch(`${config.BackendUrl}/leaves/${leave.id}`, header_params('PUT',leave)).then(handleResponse);
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return fetch(`${config.BackendUrl}/leaves/${id}`, header_params('DELETE')).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                //logout();
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}