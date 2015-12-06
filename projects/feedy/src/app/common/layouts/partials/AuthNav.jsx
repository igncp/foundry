import Nav from './Nav';
import NavLink from './NavLink';

const AuthNav = (props)=> {
  return (<Nav>
    <NavLink text="Log out" to="/log-out"/>
  </Nav>);
};

export default AuthNav;