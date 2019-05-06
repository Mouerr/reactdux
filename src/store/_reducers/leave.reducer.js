import { leaveConstants } from '../_constants';

export function leaves(state = {items: [],loading: false}, action) {
  switch (action.type) {
    case leaveConstants.CREATE_REQUEST:
      return { submitting: true };
    case leaveConstants.CREATE_SUCCESS:
      return {};
    case leaveConstants.CREATE_FAILURE:
      return {};
    case leaveConstants.UPDATE_REQUEST:
      return { submitting: true };
    case leaveConstants.UPDATE_SUCCESS:
      return {};
    case leaveConstants.UPDATE_FAILURE:
      return {};
    case leaveConstants.GETALL_REQUEST:
      return {
        loading: true
      };
    case leaveConstants.GETALL_SUCCESS:
      return {
        loading: false,
        items: action.leaves
      };
    case leaveConstants.GETALL_FAILURE:
      return { 
        error: action.error
      };
    case leaveConstants.GETBYID_REQUEST:
      return {
        loading: true,
        leave: action.leave
      };
    case leaveConstants.GETBYID_SUCCESS:
      return {
        loading: false,
        item: action.leave
      };
    case leaveConstants.GETBYID_FAILURE:
      return {
        error: action.error
      };
    case leaveConstants.DELETE_REQUEST:
      // add 'deleting:true' property to leave being deleted
      return {
        ...state,
        items: state.items.map(leave =>
          leave.id === action.id
            ? { ...leave, deleting: true }
            : leave
        )
      };
    case leaveConstants.DELETE_SUCCESS:
      // remove deleted leave from state
      return {
        items: state.items.filter(leave => leave.id !== action.id)
      };
    case leaveConstants.DELETE_FAILURE:
      // remove 'deleting:true' property and add 'deleteError:[error]' property to leave 
      return {
        ...state,
        items: state.items.map(leave => {
          if (leave.id === action.id) {
            // make copy of leave without 'deleting:true' property
            const { deleting, ...leaveCopy } = leave;
            // return copy of leave with 'deleteError:[error]' property
            return { ...leaveCopy, deleteError: action.error };
          }

          return leave;
        })
      };
    default:
      return state
  }
}