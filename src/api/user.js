import {CRUD} from "./CRUD";
import {handleResponse, headerParams} from "../_helpers/utility";

export class User extends CRUD {
    /*constructor(name,apiUrl) {
        super(name, apiUrl);
    }*/

    getByUserId = (userId) => {
        return fetch(`${this.apiUrl}/users/${userId}/${this.name}`, headerParams('GET')).then(handleResponse);
    };

    getByGroupId = (groupId) => {
        return fetch(`${this.apiUrl}/groups/${groupId}/${this.name}`, headerParams('GET')).then(handleResponse);
    };
}