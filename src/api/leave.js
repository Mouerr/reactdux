import {CRUD} from "./CRUD";
import {handleResponse, headerParams} from "../_helpers/utility";

export class Leave extends CRUD {
    /*constructor(name,apiUrl) {
        super(name, apiUrl);
    }*/

    getByUserId = (userId) => {
        return fetch(`${this.apiUrl}/users/${userId}/${this.name}`, headerParams('GET')).then(handleResponse);
    };
}