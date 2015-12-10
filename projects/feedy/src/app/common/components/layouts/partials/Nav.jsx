import { PropTypes } from 'react';

const Nav = (props) => {
  return (<nav style={styles.comp}>{props.children}</nav>);
};

Nav.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element),
};

export default Nav;

const styles = {
  comp: {
    borderBottom: '1px dashed #ccc',
    margin: '10px 0 20px',
    marginBottom: 20,
    paddingBottom: 20,
  },
};
