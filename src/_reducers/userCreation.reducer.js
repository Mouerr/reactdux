import { userConstants } from '../_constants';

export function userCreation(state = {}, action) {
  switch (action.type) {
    case userConstants.CREATE_REQUEST:
      return { creating: true };
    case userConstants.CREATE_SUCCESS:
      return {};
    case userConstants.CREATE_FAILURE:
      return {};
    default:
      return state
  }
}