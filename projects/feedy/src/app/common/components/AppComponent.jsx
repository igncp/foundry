import React from 'react';
import Immutable from 'immutable';

/**
 * Default App component with common functionality helpers.
 * It has this morphology to implement ImmutableJS as the state.
 * React expects a plain object as the state, so it is wrapped in 
 * the `data` property.
 *
 * this.data is created because this.setState is not synchronous (it uses batching)
 */
export default class AppComponent extends React.Component {
  constructor(props) {
    super(props);

    const defaultData = this.getDefaultData ? this.getDefaultData() : {};
    const initData = Immutable.fromJS(defaultData);

    this._data = initData;

    this.state = {
      data: initData,
    };
  }
  setData(newRawData) {
    const data = this._data;
    const newData = data ? data.merge(newRawData) : Immutable.fromJS(newData);
    
    this._data = newData;

    this.setState({
      data: newData,
    });
  }
  getData() {
    return this._data;
  }
}
