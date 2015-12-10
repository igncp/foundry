import Nav from './Nav';
import NavLink from './NavLink';

const AuthNav = () => {
  return (<Nav>
    <NavLink text="Feed" to="/"/>
    <NavLink text="Search" to="/search"/>
    <NavLink text="Profile" to="/profile"/>
    <NavLink text="Log out" to="/log-out"/>
  </Nav>);
};

export default AuthNav;
