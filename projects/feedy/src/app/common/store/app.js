import * as Redux from 'redux';
import rootReducer from '../reducers';

let store;

export const create = () => {
  store = Redux.createStore(rootReducer);
};

export const get = ()=> store;

export const getState = ()=> store.getState();