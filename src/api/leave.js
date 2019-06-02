import {handleResponse, headerParams} from '../_helpers/utility';

const apiurl = process.env.REACT_APP_API_URL;

const getAll = () => {
    return fetch(apiurl + `/leaves?_limit=10`, headerParams('GET')).then(handleResponse);
};

const read = (id) => {
    return fetch(apiurl + `/leaves/${id}`, headerParams('GET')).then(handleResponse);
};

const getByUserId = (userid) => {
    return fetch(apiurl + `/users/${userid}/leaves`, headerParams('GET')).then(handleResponse);
};

const getByDataTableFilter = (params_filters) => {
    return fetch(apiurl + `/leaves${params_filters}`, headerParams('GET')).then(handleResponse);
};

const create = (leave) => {
    return fetch(apiurl + `/leave/create`, headerParams('POST', leave)).then(handleResponse);
};

const update = (leave) => {
    return fetch(apiurl + `/leaves/${leave.id}`, headerParams('PUT', leave)).then(handleResponse);
};

// prefixed function name with underscore because delete is a reserved word in javascript
const _delete = (id) => {
    return fetch(apiurl + `/leaves/${id}`, headerParams('DELETE')).then(handleResponse);
};

export const leaveService = {
    create,
    getAll,
    getByDataTableFilter,
    read,
    getByUserId,
    update,
    delete: _delete
};