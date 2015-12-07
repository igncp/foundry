import { fromJS, } from 'immutable';
import ls from 'server/helpers/localStorage';

const error = message => {
  throw new Error(message);
};

export default (initialRoutes)=> {
  let newRoutes = initialRoutes.mergeIn(['get',], {
    user: (params)=> {
      const savedUsers = ls.query(['users', ]);
      let matchingUsers;

      if (!savedUsers) error('There are no users created');

      if (params.byId) {

      } else {
        matchingUsers = savedUsers.filter((savedUser)=> savedUser.get('username') === params.username);
        // remember password case
        if (!params.onlyUsername) {
          matchingUsers = matchingUsers.filter((user)=> user.get('password') === params.password);
        }
      }

      if (matchingUsers.size === 0) error('No matches');

      return matchingUsers.first();
    },
    'user/last': ()=> {
      return ls.query(['lastUser',]);
    },
  }).mergeIn(['post',], {
    user: (params)=> {
      const savedUsers = ls.query(['users', ]);
      const user = fromJS({
        ...params.toJS(),
        type: 'auth',
      });

      if (savedUsers) {
        savedUsers.forEach((savedUser)=> {
          if (savedUser.get('username') === user.get('username')) {
            error('The user already exists');
          }
        });
      }

      const newSavedUsers = (savedUsers) ? savedUsers.push(params) : fromJS([params,]);

      ls.persist(['users',], newSavedUsers);

      return user;
    },
    'user/last': (username)=> {
      ls.persist(['lastUser',], username);
    },
  });

  return newRoutes;
};