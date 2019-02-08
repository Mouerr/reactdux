import { userConstants } from '../_constants';
import { userService } from '../api';
import { alertActions } from './';
import { history } from '../_helpers';

export const userActions = {
    login,
    logout,
    create,
    update,
    getAll,
    getById,
    delete: _delete
};

function login(email, password) {
    return dispatch => {
        dispatch(request({ email }));

        userService.loginAsRegistered(email, password)
            .then(
                user => {
                    dispatch(success(user));
                    history.push('/user/list');
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout() {
    userService.logout();
    return { type: userConstants.LOGOUT };
}

function create(user) {
    return dispatch => {
        dispatch(request(user));

        userService.create(user)
            .then(
                user => { 
                    dispatch(success());
                    history.push('/user/list');
                    dispatch(alertActions.success('User successfully Created'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.CREATE_REQUEST, user } }
    function success(user) { return { type: userConstants.CREATE_SUCCESS, user } }
    function failure(error) { return { type: userConstants.CREATE_FAILURE, error } }
}

function update(user) {
    return dispatch => {
        dispatch(request(user));

        userService.update(user)
            .then(
                user => {
                    dispatch(success());
                    //history.push('/user/list');
                    dispatch(alertActions.success('User successfully Updated'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.UPDATE_REQUEST, user } }
    function success(user) { return { type: userConstants.UPDATE_SUCCESS, user } }
    function failure(error) { return { type: userConstants.UPDATE_FAILURE, error } }
}

function getAll() {
    return dispatch => {
        dispatch(request());

        userService.getAll()
            .then(
                users => dispatch(success(users)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: userConstants.GETALL_REQUEST } }
    function success(users) { return { type: userConstants.GETALL_SUCCESS, users } }
    function failure(error) { return { type: userConstants.GETALL_FAILURE, error } }
}

function getById(userid) {
    return dispatch => {
        dispatch(request(userid));

        userService.getById(userid)
            .then(
                user => dispatch(success(user)),
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                });
    };

    function request(userid) { return { type: userConstants.GETBYID_REQUEST, userid } }
    function success(user) { return { type: userConstants.GETBYID_SUCCESS, user } }
    function failure(error) { return { type: userConstants.GETBYID_FAILURE, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        userService.delete(id)
            .then(
                user => dispatch(success(id)),
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: userConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: userConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: userConstants.DELETE_FAILURE, id, error } }
}