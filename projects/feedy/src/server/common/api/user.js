import { fromJS } from 'immutable';

import ls from 'helpers/localStorage';
import error from 'helpers/error';

const errorIfUserExists = (savedUsers, user) => {
  if (savedUsers) savedUsers.forEach((savedUser) => {
    if (savedUser.get('username') === user.get('username')) {
      error('The user already exists');
    }
  });
};

const signupUser = (user) => {
  ls.persistAsList(['users'], user, {
    beforeSave: savedUsers => errorIfUserExists(savedUsers, user),
  });
};

const filterUsers = (userParams, savedUsers) => {
  let filteredUsers;
  if (!userParams.byId) {
    filteredUsers = savedUsers.filter((savedUser) => savedUser.get('username')
      === userParams.username);
    // remember password case
    if (!userParams.onlyUsername) {
      filteredUsers = filteredUsers
        .filter((user) => user.get('password') === userParams.password);
    }
  }
  return filteredUsers;
};

export default (initialRoutes) => initialRoutes.mergeIn(['get'], {
  user: (userParams) => {
    const savedUsers = ls.query(['users']);

    if (!savedUsers) error('There are no users created');

    const matchingUsers = filterUsers(userParams, savedUsers);

    if (matchingUsers.size === 0) error('No matches');

    return matchingUsers.first();
  },
  'user/last': () => {
    return ls.query(['lastUser']);
  },
}).mergeIn(['post'], {
  user: (userParams) => {
    const user = fromJS({
      ...userParams.toJS(),
      type: 'auth',
    });

    signupUser(user);

    return user;
  },
  'user/last': (username) => {
    ls.persist(['lastUser'], username);
  },
});
