import { Router } from 'react-router';

import history from 'helpers/history';
import createRoute from 'helpers/router/createRoute';

const AppRouter = () => {
  return (
  <Router history={history}>
    {createRoute('/', 'index/Index', [])}
    {createRoute('/signup', 'auth/signup/Signup', ['onlyAnonym'])}
    {createRoute('/remember-password', 'auth/remember-password/RememberPassword', ['onlyAnonym'])}
    {createRoute('/log-out', 'auth/logout/Logout', ['onlyAuth'])}
    {createRoute('/profile', 'profile/Profile', ['onlyAuth'])}
    {createRoute('/search', 'search/Search', ['onlyAuth'])}
  </Router>);
};
AppRouter.displayName = 'AppRouter';

export default AppRouter;
