import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

import AppComponent from 'components/AppComponent';

export default class Toaster extends AppComponent {
  componentWillReceiveProps(newProps) {
    if (newProps.messages !== this.props.messages) {
      console.log("Should show toaster messages here");
    }
  }
  render() {
    if (this.state.isVisible !== true) return null;

    return <p>Foo</p>;
  }
}

Toaster.propTypes = {
  messages:ImmutablePropTypes.list,
};

export default Toaster;