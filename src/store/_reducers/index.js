import { combineReducers } from 'redux';

import { authentication } from './authentication';
import { leave } from './leave';
import { user } from './user';
import { datatable } from './datatable';
import { alert } from './alert';

const appReducer = combineReducers({
  authentication,
  leave,
  user,
  datatable,
  alert
});

// we've personalized the root reducer to clear all the store when logout.
const rootReducer = (state, action) => {
  if (action.type === 'USERS_LOGOUT') {
    state = undefined
  }

  return appReducer(state, action)
};

export default rootReducer;