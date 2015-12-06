import React from 'react';
import R from 'ramda';

import AppComponent from 'components/AppComponent';
import Label from 'components/form/Label';

import getGUId from 'helpers/getGUId';

const getInputProps = props => R.omit(R.keys(TextishInput.propTypes), props);

class TextishInput extends AppComponent {
  render() {
    const inputProps = getInputProps(this.props);
    this.compId = this.props.id || this.compId || 'textish-input-' + getGUId();

    return (
      <div style={styles.comp}>
        <Label forId={this.compId} text={this.props.text}/><br/>
        <input
          id={this.compId}
          placeholder={this.props.text}
          {...inputProps}
        />
      </div>
    );
  }
}

TextishInput.propTypes = {
  id: React.PropTypes.string,
  text: React.PropTypes.string,
};

export default TextishInput;

const styles = {
  comp: {
    marginBottom: 10,
  },
};