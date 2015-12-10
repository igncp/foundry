import { render } from 'react-dom';
import { Provider } from 'react-redux';

import App from 'app/App';

import * as appStoreModule from 'app/common/store/app';

const store = appStoreModule.create();

render(<Provider store={store}>
  <App/>
</Provider>, document.getElementById('main'));
