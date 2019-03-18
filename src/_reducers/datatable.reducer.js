import {datatableConstants} from '../_constants';

export function datatable(state = {items:[], loading: false}, action) {
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
            return {error: action.error};

        case datatableConstants.UPDATE_REQUEST:
            return {
                ...state,
                submitting: true,
            };
        case datatableConstants.UPDATE_SUCCESS:
            return {
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
                submitting: false
            };
        case datatableConstants.UPDATE_FAILURE:
            return {error: action.error};

        case datatableConstants.FILTER_REQUEST:
            return {
                ...state,
                submitting: true
            };
        case datatableConstants.FILTER_SUCCESS:
            return {
                items: action.results
            };
        case datatableConstants.FILTER_FAILURE:
            return {error: action.error};

        case datatableConstants.GETALL_REQUEST:
            return {
                loading: true,
                items: []
            };
        case datatableConstants.GETALL_SUCCESS:
            return {
                loading: false,
                items: action.items
            };
        case datatableConstants.GETALL_FAILURE:
            return {
                error: action.error
            };

        case datatableConstants.TOGGLE_MODAL:
            return {
                ...state,
                modal: !state.modal,
                //unmountOnClose: true
            };

        case datatableConstants.DELETE_REQUEST:
            // add 'deleting:true' property to item being deleted
            return {
                ...state,
                items: state.items.map(item =>
                    item.id === action.id
                        ? {...item, deleting: true}
                        : item
                )
            };
        case datatableConstants.DELETE_SUCCESS:
            // remove deleted item from state
            return {
                items: state.items.filter(item => item.id !== action.id)
            };
        case datatableConstants.DELETE_FAILURE:
            // remove 'deleting:true' property and add 'deleteError:[error]' property to item
            return {
                ...state,
                items: state.items.map(item => {
                    if (item.id === action.id) {
                        // make copy of item without 'deleting:true' property
                        const {deleting, ...itemCopy} = item;
                        // return copy of item with 'deleteError:[error]' property
                        return {...itemCopy, deleteError: action.error};
                    }

                    return item;
                })
            };
        default:
            return state
    }
}