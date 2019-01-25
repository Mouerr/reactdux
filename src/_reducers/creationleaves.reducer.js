import { leaveConstants } from '../_constants';

export function creationleaves(state = {}, action) {
  switch (action.type) {
    case leaveConstants.CREATE_LEAVE_REQUEST:
      return { submitting: true };
    case leaveConstants.CREATE_LEAVE_SUCCESS:
      return {};
    case leaveConstants.CREATE_LEAVE_FAILURE:
      return {};
    default:
      return state
  }
}