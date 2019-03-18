import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { leaves } from './leave.reducer';
import { users } from './user.reducer';
import { datatable } from './datatable.reducer';
import { alert } from './alert.reducer';

const rootReducer = combineReducers({
  authentication,
  leaves,
  users,
  datatable,
  alert
});

export default rootReducer;