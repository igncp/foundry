import { PropTypes } from 'react';

require('./Mask.scss');

const Mask =(props) =>  {
  const compStyle = styles.comp;
  return (
    <div style={{ ...compStyle, ...(props.isVisible ? styles.visibleComp : styles.hiddenComp) }}>
      <div style={styles.text}>{props.message}<br/><div className="three-quarters-loader"/></div>
    </div>
  );
};

Mask.propTypes = {
  isVisible: PropTypes.bool,
  message: PropTypes.string,
};

export default Mask;

const styles = {
  comp: {
    backgroundColor: 'rgba(200, 200, 200, 0.2)',
    height: '100%',
    position: 'absolute',
    width: '100%',
    zIndex: 100,
  },
  visibleComp: {
    display: 'table',
  },
  hiddenComp: {
    display: 'none',
  },
  text: {
    display: 'table-cell',
    textAlign: 'center',
    verticalAlign: 'middle',
  },
};
