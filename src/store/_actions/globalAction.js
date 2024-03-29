import {alertActions} from './index';
import {history} from '../../_helpers';
import {jsUcFirst} from "../../_helpers/utility";

const create = (service, obj) => {

    const request = (obj) => {
        return {type: service.constant.CREATE_REQUEST, obj}
    };
    const success = (result) => {
        return {type: service.constant.CREATE_SUCCESS, result}
    };
    const failure = (error) => {
        return {type: service.constant.CREATE_FAILURE, error}
    };

    return dispatch => {
        dispatch(request(obj));

        service.api.create(obj)
            .then(
                result => {
                    dispatch(success(result));
                    history.push(`/${service.objName}/list`);
                    dispatch(alertActions.success(`${jsUcFirst(service.objName)} successfully Created`));
                },
                error => {
                    dispatch(failure(String(error)));
                    dispatch(alertActions.error(String(error)));
                }
            );
    };
};

const read = (service, objId) => {

    const request = (objId) => {
        return {type: service.constant.READ_REQUEST, objId}
    };
    const success = (result) => {
        return {type: service.constant.READ_SUCCESS, result}
    };
    const failure = (error) => {
        return {type: service.constant.READ_FAILURE, error}
    };

    return dispatch => {
        dispatch(request(objId));

        service.api.read(objId)
            .then(
                result => dispatch(success(result)),
                error => {
                    dispatch(failure(String(error)));
                    dispatch(alertActions.error(String(error)));
                });
    };
};

const getAll = (service) => {

    const request = () => {
        return {type: service.constant.GET_ALL_REQUEST}
    };
    const success = (result) => {
        return {type: service.constant.GET_ALL_SUCCESS, result}
    };
    const failure = (error) => {
        return {type: service.constant.GET_ALL_FAILURE, error}
    };

    return dispatch => {
        dispatch(request());

        service.api.getAll()
            .then(
                result => dispatch(success(result)),
                error => dispatch(failure(String(error)))
            );
    };
};

const update = (service, obj) => {

    const request = (obj) => {
        return {type: service.constant.UPDATE_REQUEST, obj}
    };
    const success = (result) => {
        return {type: service.constant.UPDATE_SUCCESS, result}
    };
    const failure = (error) => {
        return {type: service.constant.UPDATE_FAILURE, error}
    };
    return dispatch => {
        dispatch(request(obj));

        service.api.update(obj)
            .then(
                result => {
                    dispatch(success(result));
                    history.push(`/${service.objName}/list`);
                    dispatch(alertActions.success(`${jsUcFirst(service.objName)} successfully Updated`));
                },
                error => {
                    dispatch(failure(String(error)));
                    dispatch(alertActions.error(String(error)));
                }
            );
    };
};

// prefixed const name with underscore because delete is a reserved word in javascript
const _delete = (service, id) => {

    const request = (id) => {
        return {type: service.constant.DELETE_REQUEST, id}
    };
    const success = (id) => {
        return {type: service.constant.DELETE_SUCCESS, id}
    };
    const failure = (id, error) => {
        return {type: service.constant.DELETE_FAILURE, id, error}
    };

    return dispatch => {
        dispatch(request(id));

        service.api.delete(id)
            .then(
                result => {
                    dispatch(success(id));
                    dispatch(alertActions.success(`${jsUcFirst(service.objName)} successfully Deleted`));
                },
                error => {
                    dispatch(failure(id, String(error)));
                    dispatch(alertActions.error(String(error)));
                }
            );
    };
};

const getByUserId = (service, objId) => {

    const request = (objId) => {
        return {type: service.constant.GET_ALL_REQUEST, objId}
    };
    const success = (result) => {
        return {type: service.constant.GET_ALL_SUCCESS, result, objId}
    };
    const failure = (error) => {
        return {type: service.constant.GET_ALL_FAILURE, error}
    };

    return dispatch => {
        dispatch(request(objId));

        service.api.getByUserId(objId)
            .then(
                result => dispatch(success(result)),
                error => dispatch(failure(String(error)))
            );
    };
};

export const globalActions = {
    create,
    update,
    getAll,
    read,
    getByUserId,
    delete: _delete
};