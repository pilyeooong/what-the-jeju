import { combineReducers } from 'redux';

import place from './place';
import user from './user';

const rootReducer = combineReducers({
  place,
  user,
})

export default rootReducer;