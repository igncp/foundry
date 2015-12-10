import Nav from './Nav';
import NavLink from './NavLink';

const AnonymousNav = () => {
  return (<Nav>
    <NavLink text="Home" to="/"/>
    <NavLink text="Sign Up" to="/signup"/>
    <NavLink text="Remember Password" to="/remember-password"/>
  </Nav>);
};

export default AnonymousNav;
