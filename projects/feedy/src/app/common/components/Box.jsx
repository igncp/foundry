import { PropTypes } from 'react';

import AppComponent from 'components/AppComponent';
import Third from 'components/bootstrap-grid/Third';

import mouseOverProps from 'helpers/mouseOverProps';

class Box extends AppComponent {
  render() {
    const data = this.state.data;
    const isMouseEnter = data.get('isMouseEnter');

    return (
      <Third
        style={{
          ...styles.comp,
          ...(isMouseEnter ? styles.compHover : {}),
          ...this.props.parentStyle,
        }}
        {...mouseOverProps(this)}
      >
        {this.props.children}
      </Third>
    );
  }
}

Box.propTypes = {
  children: PropTypes.any.isRequired,
  parentStyle: PropTypes.object,
};

export default Box;

const styles = {
  comp: {
    boxShadow: '.5px .5px 2px 1px rgba(0,0,100,.15)',
    marginBottom: 20,
    padding: '1.5em',
    transition: 'box-shadow 0.5s linear',
  },
  compHover: {
    boxShadow: '.5px .5px 4px 1px rgba(0,0,100,.15)',
  },
};
