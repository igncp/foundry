import React from 'react';
import { connect, } from 'react-redux';

import AppComponent from 'components/AppComponent';
import Router from 'components/Router';
import Mask from 'components/mask/Mask';

import * as appStoreModule from 'store/app';

require('toastr/build/toastr.min.css');
require('./app.scss');

appStoreModule.create();

class App extends AppComponent {
  render() {
    const storeState = appStoreModule.getState();
    const display = storeState.display;

    return (<div>
      <Mask isVisible={display.get('isMaskVisible')} message={display.get('maskMessage')}/>
      <Router/>
    </div>);
  }
}

function mapStateToProps(state) {
  return {
    appState: state,
  };
}


export default connect(
  mapStateToProps
)(App);