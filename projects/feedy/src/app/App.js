import AppComponent from 'components/AppComponent';
import Router from 'components/Router';
import Toaster from 'components/Toaster';

import React from 'react';

import * as appStoreModule from 'store/app';

appStoreModule.create();

class App extends AppComponent {
  componentDidMount() {
    this.unsubscribeFromAppStore = appStoreModule.get().subscribe(()=> {
      const appState = appStoreModule.getState();

      this.setData({
        display: appState.display,
      });
    });
  }
  componentWillUnmount() {
    this.unsubscribeFromAppStore();
  }
  render() {
    const data = this.state.data;
    const display = data.get('display');

    return (<div>
      <Toaster messages={display && display.get('toastMessages')}/>
      <Router/>
    </div>);
  }
}

export default App;