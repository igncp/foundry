import server from 'server/entry';

export const signupUser = (user)=> {
  return server.post('user', user);
};