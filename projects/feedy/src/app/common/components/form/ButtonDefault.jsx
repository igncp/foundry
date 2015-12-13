import { PropTypes } from 'react';

import getRestProps from 'helpers/pure/getRestProps';

/**
 * An input (and not a link tag) so it can be disabled
 */
const ButtonDefault = (props) => {
  return (
    <input
      className={`btn btn-default ${props.className || ''}`}
      type="button"
      {...getRestProps(ButtonDefault, props)}
    />
  );
};

ButtonDefault.propTypes = {
  className: PropTypes.string,
};

export default ButtonDefault;
