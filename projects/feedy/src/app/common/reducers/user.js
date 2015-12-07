import Immutable from 'immutable';

import * as userActions from '../actions/user';

const initialState = Immutable.fromJS({
  type: 'anonymous',
});

export default (state = initialState, action)=> {
  const getUserWithType = ()=> action.payload ? action.payload.set('type', 'auth') : state.set('type', 'anonymous');

  switch (action.type) {
    case userActions.LOGOUT:
      return initialState;
    case userActions.LOGIN:
      return getUserWithType();
    case userActions.SIGNUP_START:
      return state.set('type', 'pending');
    case userActions.SIGNUP_END:
      return getUserWithType();
    default:
      return state;
  }
}
