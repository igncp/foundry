import { PropTypes } from 'react';
import { connect } from 'react-redux';

import AppComponent from 'components/AppComponent';
import updatedWhenResize from 'components/updatedWhenResize';
import Router from 'components/Router';
import Mask from 'components/mask/Mask';

import server from 'server/entry';
import { getUserByOnlyUsername } from 'helpers/api/user';
import { purgeDataFromOlderVersions } from 'helpers/purgePersistedData';
import { login } from 'actions/user';
import { mask, unmask } from 'actions/display';
import * as appStoreModule from 'store/app';

require('toastr/build/toastr.min.css');
require('./app.scss');

appStoreModule.create();

class App extends AppComponent {
  constructor(props) {
    super(props);

    purgeDataFromOlderVersions(props.version);
    this.bootstrap();
  }
  bootstrap() {
    const cookiesUsername = server.cookies.get('lastUsername');

    if (cookiesUsername) {
      this.handleCookiesUsernameCase(cookiesUsername);
    } else {
      this.setDataBeforeMount({
        hasBootstraped: true,
      });
    }
  }
  handleCookiesUsernameCase(cookiesUsername) {
    mask('Loading user data...');
    getUserByOnlyUsername(cookiesUsername).then((user) => {
      login(user);
      unmask();
      this.setData({
        hasBootstraped: true,
      });
    }).catch((error) => {
      console.warn("Feedy error while bootstraping -> ", error);
      unmask();
      this.setData({
        hasBootstraped: true,
      });
    });
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

App.propTypes = {
  version: PropTypes.string,
};

function mapStateToProps(state) {
  return {
    appState: state,
  };
}


export default connect(
  mapStateToProps
)(updatedWhenResize(App));
