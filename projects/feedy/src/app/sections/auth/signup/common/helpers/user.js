import toastr from 'toastr/toastr';

import { signupStart, signupEnd } from 'actions/user';
import * as userApi from 'helpers/api/user';
import history from 'helpers/history';

export const signupUser = (user) => {
  signupStart();
  userApi.signupUser(user).then((user) => {
    signupEnd(user);
    if (user) {
      toastr.info('Signup successful');
      history.replaceState(null, '/');
    }
  });
};
