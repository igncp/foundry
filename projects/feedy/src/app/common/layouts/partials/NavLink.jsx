import {PropTypes, } from 'react';
import { Link, } from 'react-router';

import history from 'helpers/history';

const NavLink = (props)=> {
  const pathname = history.getPathname();
  return (
  <Link className={"btn btn-default" + (pathname === props.to ? ' active' : '')}
    style={styles.link} to={props.to}
  >{props.text}</Link>)
};

NavLink.propTypes = {
  text: PropTypes.string,
  to: PropTypes.string,
};

export default NavLink;

const styles = {
  link: {
    margin: '0 10px',
  },
};