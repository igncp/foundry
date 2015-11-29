import { signupStart, signupEnd, } from 'actions/user';
import * as userApi from 'api/user';
import * as appStoreModule from 'store/app';

export const signupUser = (user)=> {
  const store = appStoreModule.get();

  store.dispatch(signupStart());
  userApi.signupUser(user).then((user)=> {
    store.dispatch(signupEnd(user));
  });
};