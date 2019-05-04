import {datatableConstants} from '../_constants';

const initialState = {items: [], loading: false};

export function datatable(state = initialState, action) {
    switch (action.type) {
        case datatableConstants.CREATE_REQUEST:
            return {
                ...state,
                submitting: true
            };
        case datatableConstants.CREATE_SUCCESS:
            return {
                ...state,
                items: [action.item, ...state.items],
                submitting: false
            };
        case datatableConstants.CREATE_FAILURE:
            return {
                ...state,
                submitting: false,
                error: action.error
            };

        case datatableConstants.UPDATE_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case datatableConstants.UPDATE_SUCCESS:
            return {
                ...state,
                items: state.items.map((item, index) => {
                    if (item.id !== action.item.id) {
                        // This isn't the item we care about - keep it as-is
                        return item
                    }
                    // Otherwise, this is the one we want - return an updated value
                    return {
                        ...item,
                        ...action.item
                    }
                }),
                loading: false
            };
        case datatableConstants.UPDATE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            };

        case datatableConstants.FILTER_REQUEST:
            return {
                ...state,
                loading: true
            };
        case datatableConstants.FILTER_SUCCESS:
            return {
                ...state,
                loading: false,
                items: action.results
            };
        case datatableConstants.FILTER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            };

        case datatableConstants.GETALL_REQUEST:
            return {
                ...state,
                loading: true,
                items: []
            };
        case datatableConstants.GETALL_SUCCESS:
            return {
                ...state,
                loading: false,
                items: action.items
            };
        case datatableConstants.GETALL_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            };

        case datatableConstants.TOGGLE_MODAL:
            return {
                ...state,
                modal: !state.modal,
            };

        case datatableConstants.DELETE_REQUEST:
            // add 'deleting:true' property to item being deleted
            return {
                ...state,
                loading: true
            };
        case datatableConstants.DELETE_SUCCESS:
            // remove deleted item from state
            return {
                ...state,
                loading: false,
                items: state.items.filter(item => item.id !== action.id)
            };
        case datatableConstants.DELETE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        default:
            return state
    }
}