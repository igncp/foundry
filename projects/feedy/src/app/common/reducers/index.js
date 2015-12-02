import { combineReducers, } from 'redux';
import user from './user';
import display from './display';

const rootReducer = combineReducers({
  user,
  display,
});

export default rootReducer;