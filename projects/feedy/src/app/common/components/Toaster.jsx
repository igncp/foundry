import React from 'react';
import R from 'ramda';
import ImmutablePropTypes from 'react-immutable-proptypes';

import AppComponent from 'components/AppComponent';

export default class Toaster extends AppComponent {
  getDefaultData() {
    return {
      messagesToShow: [],
    };
  }
  componentWillReceiveProps(newProps) {
    if (newProps.messages !== this.props.messages) {
      console.log("newProps.messages.toArray()", newProps.messages.toArray());
      console.log("newProps.messages.toJS()", newProps.messages.toJS());
      this.setData({
        messagesToShow: this.getData().get('messagesToShow').push(R.last(newProps.messages.toArray())),
      });
    }
  }
  render() {
    const data = this.getData();

    if (this.state.isVisible !== true) return null;

    return <p>Foo</p>;
  }
}

Toaster.propTypes = {
  messages:ImmutablePropTypes.list,
};

export default Toaster;