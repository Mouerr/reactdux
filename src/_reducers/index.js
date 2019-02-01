import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { userCreation } from './userCreation.reducer';
import { leaveCreation } from './leaveCreation.reducer';
import { leaves } from './leaves.reducer';
import { users } from './users.reducer';
import { alert } from './alert.reducer';

const rootReducer = combineReducers({
  authentication,
  userCreation,
  leaveCreation,
  leaves,
  users,
  alert
});

export default rootReducer;