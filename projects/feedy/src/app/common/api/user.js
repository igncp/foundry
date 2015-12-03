import server from 'server/entry';
import { toastError, } from 'actions/display';

export const signupUser = (user)=> {
  return server.post('user', user)
    .then(res => res.data)
    .catch(res => toastError({
      message: res.error,
    }));
};