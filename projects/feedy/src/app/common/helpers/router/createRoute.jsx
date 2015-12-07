import { Route, } from 'react-router';

import getOnEnterHandler from 'helpers/router/getOnEnterHandler';

export default (path, sectionComp, opts) => {
  return (
  <Route
    component={require('app/sections/' + sectionComp)}
    onEnter={getOnEnterHandler(opts)}
    path={path}
  />);
};