import { leaveConstants } from '../_constants';

export function useridleaves(state = {}, action) {
  switch (action.type) {
    case leaveConstants.GETUSERID_LEAVE_REQUEST:
      return {
        id: action.userid,
        loading: true
      };
    case leaveConstants.GETUSERID_LEAVE_SUCCESS:
      return {
        items: action.leaves
      };
    case leaveConstants.GETUSERID_LEAVE_FAILURE:
      return {
        error: action.error
      };
    default:
      return state
  }
}