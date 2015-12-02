import Immutable from 'immutable';

import * as displayActions from '../actions/display';

export default function counter(state, action) {
  switch (action.type) {
    case displayActions.TOAST:
      return state.toastMessages.push(action.payload);
    default:
      return Immutable.fromJS({
        toastMessages: [],
      });
  }
}
