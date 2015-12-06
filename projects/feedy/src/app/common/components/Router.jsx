import { Router, } from 'react-router';

import createRoute from 'helpers/createRoute';
import history from 'helpers/history';

const AppRouter = ()=> {
  return (
  <Router history={history}>
    {createRoute('/', 'index/Index')}
    {createRoute('/signup', 'auth/signup/Signup')}
    {createRoute('/remember-password', 'auth/remember-password/RememberPassword')}
    {createRoute('/log-out', 'auth/logout/Logout')}
  </Router>);
};
AppRouter.displayName = 'AppRouter';

export default AppRouter;