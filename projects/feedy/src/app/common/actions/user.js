/**
 * There are two patterns. One to set the user type to pending when signup
 * with two actions (start and end),
 * and manage this state externally for the login so there is only one action
 */

import bind from 'helpers/bindActionToStore';

import server from 'server/entry';

export const LOGIN = 'login';
export const LOGOUT = 'logout';
export const SIGNUP_START = 'start_signup';
export const SIGNUP_END = 'end_signup';

export function login(user) {
  server.cookies.set('lastUsername', user.get('username'));

  return bind({
    type: LOGIN,
    payload: user,
  });
}

export function logout() {
  server.cookies.set('lastUsername', null);

  return bind({
    type: LOGOUT,
    payload: null,
  });
}

export function signupStart(user) {
  return bind({
    type: SIGNUP_START,
    payload: user,
  });
}

export function signupEnd(user) {
  server.cookies.set('lastUsername', user.get('username'));

  return bind({
    type: SIGNUP_END,
    payload: user,
  });
}
