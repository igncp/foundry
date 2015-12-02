import { fromJS, } from 'immutable';
import db from 'server/helpers/database';

export default (initialRoutes)=> {
  let newRoutes = initialRoutes.mergeIn(['post',], {
    user: (params)=> {
      const savedUsers = db.query(['users', ]);
      const user = fromJS({
        ...params.toJS(),
        type: 'auth',
      });
      
      if (savedUsers) {
        savedUsers.forEach((savedUser)=> {
          if (savedUser.get('username') === user.get('username')) {
            throw new Error('The user already exists');
          }
        });
      }
      
      const newSavedUsers = (savedUsers) ? savedUsers.push(params) : fromJS([params,]);

      db.persist(['users',], newSavedUsers);

      return user;
    },
  });

  return newRoutes;
};