import { combineReducers } from 'redux';
import authReducer from './auth-reducer';
import groupReducer from './group-reducer';
import messageReducer from './message-reducer';

const rootReducer = combineReducers({
  auth: authReducer,
  groups: groupReducer,
  messages: messageReducer,
});

export default rootReducer;
