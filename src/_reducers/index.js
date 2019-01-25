import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { creationleaves } from './creationleaves.reducer';
import { useridleaves } from './useridleaves.reducer';
import { leaves } from './leaves.reducer';
import { users } from './users.reducer';
import { alert } from './alert.reducer';

const rootReducer = combineReducers({
  authentication,
  registration,
  creationleaves,
  useridleaves,
  leaves,
  users,
  alert
});

export default rootReducer;