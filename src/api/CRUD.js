import {handleResponse, headerParams} from "../_helpers/utility";

export class CRUD {
    constructor(name) {
        this.name = name;
        this.apiUrl = process.env.REACT_APP_API_URL;
    }

    getAll = () => {
        return fetch(`${this.apiUrl}/${this.name}?_limit=10`, headerParams('GET')).then(handleResponse);
    };

    create = (obj) => {
        console.log('new creation');
        return fetch(`${this.apiUrl}/${this.name}/create`, headerParams('POST', obj)).then(handleResponse);
    };

    read = (id) => {
        return fetch(`${this.apiUrl}/${this.name}/${id}`, headerParams('GET')).then(handleResponse);
    };

    update = (obj) => {
        return fetch(`${this.apiUrl}/${this.name}/${obj.id}`, headerParams('PUT', obj)).then(handleResponse);
    };

    getByDataTableFilter = (params_filters) => {
        return fetch(`${this.apiUrl}/${this.name}${params_filters}`, headerParams('GET')).then(handleResponse);
    };

    delete = (id) => {
        return fetch(`${this.apiUrl}/${this.name}/${id}`, headerParams('DELETE')).then(handleResponse);
    };

}