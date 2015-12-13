require('es6-promise').polyfill();
import React from 'react';

import { render } from 'react-dom';
import { Provider } from 'react-redux';

import App from 'app/App';

import * as appStoreModule from 'app/common/store/app';

const store = appStoreModule.create();

const version = require('../package.json').version;

render(<Provider store={store}>
  <App version={version}/>
</Provider>, document.getElementById('main'));
