import { fromJS } from 'immutable';
import ls from 'server/helpers/localStorage';

const error = message => {
  throw new Error(message);
};

const errorIfUserExists = (savedUsers, userPlainObj) => {
  savedUsers.forEach((savedUser) => {
    if (savedUser.get('username') === userPlainObj.get('username')) {
      error('The user already exists');
    }
  });
};

const signupUser = (savedUsers, userPlainObj, userParams) => {
  if (savedUsers) errorIfUserExists(savedUsers, userPlainObj);

  const newSavedUsers = (savedUsers) ? savedUsers.push(userParams) : fromJS([userParams]);

  ls.persist(['users'], newSavedUsers);
};

const filterUsers = (userParams, savedUsers) => {
  let filteredUsers;
  if (!userParams.byId) {
    filteredUsers = savedUsers.filter((savedUser) => savedUser
      .get('username') === userParams.username);
    // remember password case
    if (!userParams.onlyUsername) {
      filteredUsers = filteredUsers
        .filter((user) => user.get('password') === userParams.password);
    }
  }
  return filteredUsers;
};

const getMatchingUsers = (userParams, savedUsers) => {
  if (!savedUsers) error('There are no users created');

  const matchingUsers = filterUsers(userParams, savedUsers);

  if (matchingUsers.size === 0) error('No matches');

  return matchingUsers;
};

export default (initialRoutes) => {
  const newRoutes = initialRoutes.mergeIn(['get'], {
    user: (userParams) => {
      const savedUsers = ls.query(['users']);
      const matchingUsers = getMatchingUsers(userParams, savedUsers);

      return matchingUsers.first();
    },
    'user/last': () => {
      return ls.query(['lastUser']);
    },
  }).mergeIn(['post'], {
    user: (userParams) => {
      const savedUsers = ls.query(['users']);
      const userPlainObj = fromJS({
        ...userParams.toJS(),
        type: 'auth',
      });

      signupUser(savedUsers, userPlainObj, userParams);

      return userPlainObj;
    },
    'user/last': (username) => {
      ls.persist(['lastUser'], username);
    },
  });

  return newRoutes;
};
