import { PropTypes } from 'react';

import AppComponent from 'components/AppComponent';
import inputWithLabel from 'components/form/inputWithLabel';

import getRestProps from 'helpers/pure/getRestProps';


class TextishInput extends AppComponent {
  render() {
    return (
    <input
      style={this.props.parentStyle}
      {...getRestProps(this)}
    />);
  }
}

TextishInput.propTypes = {
  parentStyle: PropTypes.object,
};

export default inputWithLabel(TextishInput);
