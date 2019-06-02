import {userConstants} from '../_constants';

export const user = (state = {items: [], loading: false, submitting: false}, action) => {
    switch (action.type) {
        case userConstants.CREATE_REQUEST:
            return {submitting: true};
        case userConstants.CREATE_SUCCESS:
            return {submitting: false};
        case userConstants.CREATE_FAILURE:
            return {
                error: action.error
            };

        case userConstants.UPDATE_REQUEST:
            return {submitting: true};
        case userConstants.UPDATE_SUCCESS:
            return {submitting: false};
        case userConstants.UPDATE_FAILURE:
            return {
                error: action.error
            };

        case userConstants.GET_ALL_REQUEST:
            return {
                loading: true
            };
        case userConstants.GET_ALL_SUCCESS:
            return {
                loading: false,
                items: action.result
            };
        case userConstants.GET_ALL_FAILURE:
            return {
                error: action.error
            };

        case userConstants.READ_REQUEST:
            return {submitting: true};
        case userConstants.READ_SUCCESS:
            return {
                submitting: false,
                item: action.result
            };
        case userConstants.READ_FAILURE:
            return {
                submitting: false,
                error: action.error
            };

        case userConstants.DELETE_REQUEST:
            return {deleting: true};

        case userConstants.DELETE_SUCCESS:
            return {deleting: false};
        case userConstants.DELETE_FAILURE:
            return {
                deleting: false,
                error: action.error
            };
        default:
            return state
    }
};