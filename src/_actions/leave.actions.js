import {leaveConstants} from '../_constants';
import {leaveService} from '../api';
import { alertActions } from './';
import { history } from '../_helpers';

export const leaveActions = {
    create,
    update,
    getAll,
    getById,
    getByUserid,
    delete: _delete
};

function create(leave) {
    return dispatch => {
        dispatch(request(leave));

        leaveService.create(leave)
            .then(
                leave => {
                    dispatch(success());
                    history.push('/leave/list');
                    dispatch(alertActions.success('Leave successfully created'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(leave) { return { type: leaveConstants.CREATE_REQUEST, leave } }
    function success(leave) { return { type: leaveConstants.CREATE_SUCCESS, leave } }
    function failure(error) { return { type: leaveConstants.CREATE_FAILURE, error } }
}

function update(leave) {
    return dispatch => {
        dispatch(request(leave));

        leaveService.update(leave)
            .then(
                leave => {
                    dispatch(success());
                    //history.push('/leave/list');
                    dispatch(alertActions.success('Leave successfully Updated'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(leave) { return { type: leaveConstants.UPDATE_REQUEST, leave } }
    function success(leave) { return { type: leaveConstants.UPDATE_SUCCESS, leave } }
    function failure(error) { return { type: leaveConstants.UPDATE_FAILURE, error } }
}

function getAll() {
    return dispatch => {
        dispatch(request());

        leaveService.getAll()
            .then(
                leaves => dispatch(success(leaves)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: leaveConstants.GETALL_REQUEST } }
    function success(leaves) { return { type: leaveConstants.GETALL_SUCCESS, leaves } }
    function failure(error) { return { type: leaveConstants.GETALL_FAILURE, error } }
}

function getById(leaveid) {
    return dispatch => {
        dispatch(request(leaveid));

        leaveService.getById(leaveid)
            .then(
                leave => dispatch(success(leave)),
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                });
    };

    function request(leaveid) { return { type: leaveConstants.GETBYID_REQUEST, leaveid } }
    function success(leave) { return { type: leaveConstants.GETBYID_SUCCESS, leave } }
    function failure(error) { return { type: leaveConstants.GETBYID_FAILURE, error } }
}

function getByUserid(userid) {
    return dispatch => {
        dispatch(request(userid));

        leaveService.getByUserid(userid)
            .then(
                leaves => dispatch(success(leaves)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request(userid) { return { type: leaveConstants.GETALL_REQUEST, userid } }
    function success(leaves) { return { type: leaveConstants.GETALL_SUCCESS, leaves, userid } }
    function failure(error) { return { type: leaveConstants.GETALL_FAILURE, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        leaveService.delete(id)
            .then(
                leave => {
                    dispatch(success(id));
                    dispatch(alertActions.success('Leave successfully Deleted'));
                },
                error => {
                    dispatch(failure(id, error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(id) { return { type: leaveConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: leaveConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: leaveConstants.DELETE_FAILURE, id, error } }
}