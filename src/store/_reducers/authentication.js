import { authenticationConstants } from '../_constants';

let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { loggedIn: true, user } : {};

export function authentication(state = initialState, action) {
  switch (action.type) {
    case authenticationConstants.LOGIN_REQUEST:
      return {
        loggingIn: true,
        user: action.user //email
      };
    case authenticationConstants.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.user //user object
      };
    case authenticationConstants.LOGIN_FAILURE:
      return {
        loggedIn: false,
      };
    case authenticationConstants.LOGOUT:
      return {};
    default:
      return state
  }
}