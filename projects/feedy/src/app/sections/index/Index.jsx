import React from 'react';

import * as appStoreModule from 'store/app';

import Anonymous from './sections/anonymous/Anonymous';
import Authenticated from './sections/authenticated/Authenticated';

class Index extends React.Component {
  render() {
    const appState = appStoreModule.getState();

    return (<div>
      <h1>Feedy <small>Under construction</small></h1>
      {appState.user.get('type') === 'authenticated' ? 
        <Authenticated/> :
        <Anonymous/>}
    </div>);
  }
}
Index.displayName = 'Index';

module.exports = Index;