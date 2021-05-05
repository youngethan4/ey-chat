import { combineReducers } from 'redux';
import authReducer from './auth-reducer';
import groupReducer from './group-reducer';

const rootReducer = combineReducers({
  auth: authReducer,
  groups: groupReducer,
});

export default rootReducer;
