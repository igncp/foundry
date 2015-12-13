import defaultCall from './defaultCall';

export const signupUser = user => defaultCall('post', 'user', user);

export const getUserByOnlyUsername = username => defaultCall('get', 'user', {
  username: username,
  onlyUsername: true,
});

export const getUserByCredentials = credentials => defaultCall('get', 'user', credentials);
