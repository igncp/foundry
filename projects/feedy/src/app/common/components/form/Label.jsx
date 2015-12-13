import { PropTypes } from 'react';

const Label = (props) => {
  return (<label htmlFor={props.forId} style={styles.label}>{props.text}</label>);
};

Label.propTypes = {
  forId: PropTypes.string,
  text: PropTypes.string,
};

export default Label;

const styles = {
  label: {
    color: '#808080',
    fontWeight: 'normal',
    margin: 0,
  },
};
