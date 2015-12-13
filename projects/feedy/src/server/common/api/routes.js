import { fromJS } from 'immutable';

import composeWithUserApi from './user';
import composeWithMessageApi from './message';

let routes = fromJS({
  put: {},
  get: {},
  post: {},
});

routes = composeWithUserApi(routes);
routes = composeWithMessageApi(routes);

export default routes;
