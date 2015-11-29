import { createHashHistory, } from 'history';
import { Router, } from 'react-router';
import createRoute from 'helpers/createRoute';

const history = createHashHistory({
  queryKey: false,
});


const AppRouter = ()=> {
  return (
  <Router history={history}>
    {createRoute('/', 'index/Index')}
    {createRoute('/signup', 'auth/signup/Signup')}
    {createRoute('/remember-password', 'auth/remember-password/RememberPassword')}
  </Router>);
};
AppRouter.displayName = 'AppRouter';

export default AppRouter;