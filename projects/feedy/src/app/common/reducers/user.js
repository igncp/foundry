import Immutable from 'immutable';

import * as userActions from '../actions/user';

export default function counter(state, action) {
  switch (action.type) {
    case userActions.LOGIN_USER:
      return action.payload;
    case userActions.SIGNUP_START:
      return state.set('type', 'pending');
    case userActions.SIGNUP_END:
      return state.set('type', 'anonymous');
    default:
      return Immutable.fromJS({
        type: 'anonymous',
      });
  }
}