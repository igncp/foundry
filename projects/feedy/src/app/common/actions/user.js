export const LOGIN_USER = 'login';
export const SIGNUP_START = 'start_signup';
export const SIGNUP_END = 'end_signup';

export function login(user) {
  return {
    type: LOGIN_USER,
    payload: user,
  };
}

export function signupStart(user) {
  return {
    type: SIGNUP_START,
    payload: user,
  };
}

export function signupEnd(user) {
  return {
    type: SIGNUP_END,
    payload: user,
  };
}