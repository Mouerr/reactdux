import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { leaves } from './leave.reducer';
import { users } from './user.reducer';
import { alert } from './alert.reducer';

const rootReducer = combineReducers({
  authentication,
  leaves,
  users,
  alert
});

export default rootReducer;