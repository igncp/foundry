import React from 'react';
import { connect } from 'react-redux';

import AppComponent from 'components/AppComponent';
import Router from 'components/Router';
import Mask from 'components/mask/Mask';

import server from 'server/entry';
import { getUserByOnlyUsername } from 'helpers/api/user';
import { login } from 'actions/user';
import { mask, unmask } from 'actions/display';
import * as appStoreModule from 'store/app';

require('toastr/build/toastr.min.css');
require('./app.scss');

appStoreModule.create();

class App extends AppComponent {
  constructor(props) {
    super(props);

    const cookiesUsername = server.cookies.get('lastUsername');

    if (cookiesUsername) {
      mask('Loading user data...');
      getUserByOnlyUsername(cookiesUsername).then((user) => {
        login(user);
        unmask();
        this.setData({
          hasBootstraped: true,
        });
      }).catch((error) => {
        console.log("error", error);
        unmask();
        this.setData({
          hasBootstraped: true,
        });
      });
    } else {
      this.setDataBeforeMount({
        hasBootstraped: true,
      });
    }
  }
  getDefaultData() {
    return {
      hasBootstraped: false,
    };
  }
  render() {
    const data = this.state.data;
    const storeState = appStoreModule.getState();
    const display = storeState.display;

    return (<div>
      <Mask isVisible={display.get('isMaskVisible')} message={display.get('maskMessage')}/>
      {data.get('hasBootstraped') && <Router/>}
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
