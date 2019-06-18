import { combineReducers } from 'redux';

import { authentication } from './authentication';
import { leave } from './leave';
import { user } from './user';
import { datatable } from './datatable';
import { alert } from './alert';
import {registration} from "./registration";

const appReducer = combineReducers({
  authentication,
  registration,
  leave,
  user,
  datatable,
  alert
});

// we've personalized the root reducer to clear all the store when logout.
const rootReducer = (state, action) => {
  if (action.type === 'USER_LOGOUT') {
    state = undefined
  }

  return appReducer(state, action)
};

export default rootReducer;