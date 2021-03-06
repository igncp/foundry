import { Component } from 'react';

import * as appStoreModule from 'store/app';

import Anonymous from './sections/anonymous/Anonymous';
import Authenticated from './sections/authenticated/Authenticated';
import MainLayout from 'components/layouts/Main';

class Index extends Component {
  render() {
    const appState = appStoreModule.getState();

    return (<MainLayout>
      {appState.user.get('type') === 'auth' ?
        <Authenticated/> :
        <Anonymous/>}
    </MainLayout>);
  }
}
Index.displayName = 'Index';

module.exports = Index;
