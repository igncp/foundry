import { PropTypes } from 'react';

import getRestProps from 'helpers/pure/getRestProps';

export default (className) => {
  const Base = (props) => {
    return (<div className={className} {...getRestProps(Base, props)}>
      {props.children}
    </div>);
  };

  Base.propTypes = {
    children: PropTypes.any,
  };

  return Base;
};
