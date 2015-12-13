import { PropTypes } from 'react';

import AppComponent from 'components/AppComponent';
import Label from 'components/form/Label';
import Row from 'components/bootstrap-grid/Row';

import getGUId from 'helpers/getGUId';
import getRestProps from 'helpers/pure/getRestProps';

export default (InputComponent) => {
  class InputWithLabel extends AppComponent {
    render() {
      this.compId = this.props.id || this.compId || `textish-input-${getGUId()}`;

      return (
        <Row style={styles.comp}>
          <Label forId={this.compId} text={this.props.text}/><br/>
          <InputComponent
            className="col-xs-12"
            id={this.compId}
            parentStyle={styles.input}
            placeholder={this.props.text}
            {...getRestProps(this)}
          />
        </Row>
      );
    }
  }
  InputWithLabel.propTypes = {
    id: PropTypes.string,
    text: PropTypes.string,
  };

  return InputWithLabel;
};

const styles = {
  comp: {
    marginBottom: 10,
  },
  input: {
    padding: '4px 10px',
  },
};
