import { fromJS } from 'immutable';

import composeWithUserApi from './user';

let routes = fromJS({
  put: {},
  get: {},
  post: {},
});

routes = composeWithUserApi(routes);

export default routes;
