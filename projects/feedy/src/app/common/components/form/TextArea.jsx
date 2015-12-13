import { PropTypes } from 'react';

import AppComponent from 'components/AppComponent';
import inputWithLabel from 'components/form/inputWithLabel';

import getRestProps from 'helpers/pure/getRestProps';

class TextArea extends AppComponent {
  render() {
    return (
      <textarea
        rows="4"
        style={{ ...this.props.parentStyle, ...styles.comp }}
        value={this.props.value}
        {...getRestProps(this)}
      />
    );
  }
}

TextArea.propTypes = {
  parentStyle: PropTypes.object,
  value: PropTypes.string,
};

export default inputWithLabel(TextArea);

const styles = {
  comp: {
    resize: 'none',
  },
};
