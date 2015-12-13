import { PropTypes } from 'react';

import { s } from 'helpers/responsive';

const Nav = (props) => {
  return (<nav style={s(styles.comp)}>{props.children}</nav>);
};

Nav.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element),
};

export default Nav;

const styles = {
  comp: {
    mobile: {
      borderBottom: '1px dashed #ccc',
      margin: '10px 0 20px',
      marginBottom: 20,
      paddingBottom: 20,
      textAlign: 'center',
    },
    tablet: {
      textAlign: 'left',
    },
  },
};
