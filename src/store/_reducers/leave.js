import {leaveConstants} from '../_constants';

export const leave = (state = {items: [], loading: false, submitting: false}, action) => {
    switch (action.type) {
        case leaveConstants.CREATE_REQUEST:
            return {submitting: true};
        case leaveConstants.CREATE_SUCCESS:
            return {submitting: false};
        case leaveConstants.CREATE_FAILURE:
            return {
                error: action.error
            };

        case leaveConstants.UPDATE_REQUEST:
            return {submitting: true};
        case leaveConstants.UPDATE_SUCCESS:
            return {submitting: false};
        case leaveConstants.UPDATE_FAILURE:
            return {
                error: action.error
            };

        case leaveConstants.GET_ALL_REQUEST:
            return {
                loading: true
            };
        case leaveConstants.GET_ALL_SUCCESS:
            return {
                loading: false,
                items: action.result
            };
        case leaveConstants.GET_ALL_FAILURE:
            return {
                error: action.error
            };

        case leaveConstants.READ_REQUEST:
            return {submitting: true};
        case leaveConstants.READ_SUCCESS:
            return {
                submitting: false,
                item: action.result
            };
        case leaveConstants.READ_FAILURE:
            return {
                submitting: false,
                error: action.error
            };

        case leaveConstants.DELETE_REQUEST:
            return {deleting: true};
        case leaveConstants.DELETE_SUCCESS:
            return {deleting: false};
        case leaveConstants.DELETE_FAILURE:
            return {
                deleting: false,
                error: action.error
            };
        default:
            return state
    }
};