import React from 'react';

const Label = (props) => {
  return (<label htmlFor={props.forId} style={styles.label}>{props.text}</label>);
};

Label.propTypes = {
  forId: React.PropTypes.string,
  text: React.PropTypes.string,
};

export default Label;

const styles = {
  label: {
    color: '#808080',
    fontWeight: 'normal',
    margin: 0,
  },
};
