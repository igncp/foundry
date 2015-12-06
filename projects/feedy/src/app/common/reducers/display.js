import Immutable from 'immutable';

import * as displayActions from '../actions/display';

const initialState = Immutable.fromJS({
  isMaskVisible: false,
  maskMessage: null,
});

export default function counter(state = initialState, action) {
  switch (action.type) {
    case displayActions.MASK_ON:
      return state.merge({
        isMaskVisible: true,
        maskMessage: action.payload,
      });
    case displayActions.MASK_OFF:
      return state.merge({
        isMaskVisible: false,
        maskMessage: null,
      });
    default:
      return state;
  }
}
