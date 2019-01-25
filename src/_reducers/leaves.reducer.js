import { leaveConstants } from '../_constants';

export function leaves(state = {}, action) {
  switch (action.type) {
    case leaveConstants.GETALL_LEAVE_REQUEST:
      return {
        loading: true
      };
    case leaveConstants.GETALL_LEAVE_SUCCESS:
      return {
        items: action.leaves
      };
    case leaveConstants.GETALL_LEAVE_FAILURE:
      return { 
        error: action.error
      };
    case leaveConstants.DELETE_LEAVE_REQUEST:
      // add 'deleting:true' property to leave being deleted
      return {
        ...state,
        items: state.items.map(leave =>
          leave.id === action.id
            ? { ...leave, deleting: true }
            : leave
        )
      };
    case leaveConstants.DELETE_LEAVE_SUCCESS:
      // remove deleted leave from state
      return {
        items: state.items.filter(leave => leave.id !== action.id)
      };
    case leaveConstants.DELETE_LEAVE_FAILURE:
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