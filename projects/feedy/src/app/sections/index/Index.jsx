import React from 'react';

import * as appStoreModule from 'store/app';

import Anonymous from './sections/anonymous/Anonymous';
import Authenticated from './sections/authenticated/Authenticated';
import purgeDatabase from 'helpers/purgeDatabase';

class Index extends React.Component {
  render() {
    const appState = appStoreModule.getState();

    return (<div>
      <h1>Feedy <small>Under construction</small></h1>
      {appState.user.get('type') === 'authenticated' ? 
        <Authenticated/> :
        <Anonymous/>}
      <footer>
        <p>this application uses LocalStorage. To purge the stored Feedy values, <a href="" onClick={purgeDatabase}>click here</a>.</p>
      </footer>
    </div>);
  }
}
Index.displayName = 'Index';

module.exports = Index;