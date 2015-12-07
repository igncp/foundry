import server from 'server/entry';
import toastr from 'toastr/toastr';

const defaultCall = (callType, query, params)=> {
  return server[callType](query, params)
    .then(res=> res.data)
    .catch(res=> {
      toastr.error(res.error);
    });
};

export const signupUser = user=> defaultCall('post', 'user', user);

export const getUserByOnlyUsername = username=> defaultCall('get', 'user', {
    username: username,
    onlyUsername: true,
  });

export const getUserByCredentials = credentials=> defaultCall('get', 'user', credentials);
