import { leaveConstants } from '../_constants';
import { leaveService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const leaveActions = {
    create,
    getAll,
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
                    history.push('/leaves');
                    dispatch(alertActions.success('Request successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(leave) { return { type: leaveConstants.CREATE_LEAVE_REQUEST, leave } }
    function success(leave) { return { type: leaveConstants.CREATE_LEAVE_SUCCESS, leave } }
    function failure(error) { return { type: leaveConstants.CREATE_LEAVE_FAILURE, error } }
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

    function request() { return { type: leaveConstants.GETALL_LEAVE_REQUEST } }
    function success(leaves) { return { type: leaveConstants.GETALL_LEAVE_SUCCESS, leaves } }
    function failure(error) { return { type: leaveConstants.GETALL_LEAVE_FAILURE, error } }
}

function getByUserid(userid) {
    return dispatch => {
        dispatch(request(userid));

        leaveService.getByUserid(userid)
            .then(
                leaves => dispatch(success(leaves)),
                error => dispatch(failure(id,error.toString()))
            );
    };

    function request(userid) { return { type: leaveConstants.GETUSERID_LEAVE_REQUEST, userid } }
    function success(leaves) { return { type: leaveConstants.GETALL_LEAVE_SUCCESS, leaves, userid } }
    function failure(error) { return { type: leaveConstants.GETALL_LEAVE_FAILURE, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        leaveService.delete(id)
            .then(
                leave => dispatch(success(id)),
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: leaveConstants.DELETE_LEAVE_REQUEST, id } }
    function success(id) { return { type: leaveConstants.DELETE_LEAVE_SUCCESS, id } }
    function failure(id, error) { return { type: leaveConstants.DELETE_LEAVE_FAILURE, id, error } }
}