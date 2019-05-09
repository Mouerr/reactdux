import {datatableConstants} from '../_constants';
import {updateObject} from '../../_helpers/utility';

const initialState = {items: [], loading: false};

export function datatable(state = initialState, action) {
    switch (action.type) {

        case datatableConstants.GETALL_REQUEST:
            return updateObject(state, {loading: true});
        case datatableConstants.GETALL_SUCCESS:
            return updateObject(state, {loading: false, items: action.items});
        case datatableConstants.GETALL_FAILURE:
            return updateObject(state, {error: action.error, loading: false});

        case datatableConstants.CREATE_REQUEST:
            return updateObject(state, {submitting: true});
        case datatableConstants.CREATE_SUCCESS:
            return updateObject(state, {items: [action.item, ...state.items], submitting: false});
        case datatableConstants.CREATE_FAILURE:
            return updateObject(state, {error: action.error, submitting: false});

        case datatableConstants.UPDATE_REQUEST:
            return updateObject(state, {loading: true});
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
            return updateObject(state, {error: action.error, loading: false});

        case datatableConstants.DELETE_REQUEST:
            return updateObject(state, {loading: true});
        case datatableConstants.DELETE_SUCCESS:
            return updateObject(state, {items: state.items.filter(item => item.id !== action.id), loading: false});
        case datatableConstants.DELETE_FAILURE:
            return updateObject(state, {error: action.error, loading: false});

        case datatableConstants.FILTER_REQUEST:
            return updateObject(state, {loading: true});
        case datatableConstants.FILTER_SUCCESS:
            return updateObject(state, {loading: false, items: action.items});
        case datatableConstants.FILTER_FAILURE:
            return updateObject(state, {error: action.error, loading: false});

        case datatableConstants.TOGGLE_MODAL:
            return updateObject(state, {modal: !state.modal});

        default:
            return state
    }
}