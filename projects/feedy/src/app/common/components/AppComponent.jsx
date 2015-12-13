import { Component } from 'react';
import { any, compose, isEmpty } from 'ramda';
import Immutable from 'immutable';

/**
 * Default App component with common functionality helpers.
 * It has this morphology to implement ImmutableJS as the state.
 * React expects a plain object as the state, so it is wrapped in
 * the `data` property.
 *
 * this._data is created because this.setState is not synchronous (it uses batching)
 */
export default class AppComponent extends Component {
  constructor(props) {
    super(props);

    const defaultData = this.getDefaultData ? this.getDefaultData() : {};
    const initData = Immutable.fromJS(defaultData);

    this._data = initData;

    this.state = {
      data: initData,
    };
  }
  _setData(newRawData) {
    const data = this._data;
    const newData = data ? data.merge(newRawData) : Immutable.fromJS(newData);

    this._data = newData;
  }
  setDataBeforeMount(newRawData) {
    this._setData(newRawData);
    /*eslint-disable */
    this.state.data = this._data;
    /*eslint-enable */
  }
  setData(newRawData) {
    this._setData(newRawData);

    this.setState({
      data: this._data,
    });
  }
  getData() {
    return this._data;
  }
  dIOC(stateKey) { // defaultInputOnChange
    return (e) => this.setData({ [stateKey]: e.target.value });
  }
  isAnyOfDataEmpty(inputs) {
    return any(
      compose(isEmpty, input => this.state.data.get(input))
    )(inputs);
  }
}
