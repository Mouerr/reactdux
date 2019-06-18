import {handleResponse, headerParams} from "../_helpers/utility";

const apiUrl = process.env.REACT_APP_API_URL;
export class Register {

    register = (obj) => {
        return fetch(`${apiUrl}/users`, headerParams('POST', obj)).then(handleResponse);
    };
}