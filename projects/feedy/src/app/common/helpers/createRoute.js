import { Route, } from 'react-router';

export default (path, sectionComp) => {
  return (
  <Route
    component={require('app/sections/' + sectionComp)}
    path={path}
  />);
};