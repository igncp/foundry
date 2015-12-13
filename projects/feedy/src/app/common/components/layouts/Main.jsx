import { Link } from 'react-router';

import AppComponent from 'components/AppComponent';
import AuthNav from './partials/AuthNav';
import AnonymousNav from './partials/AnonymousNav';
import Row from 'components/bootstrap-grid/Row';

import { purgeReloading } from 'helpers/purgePersistedData';
import history from 'helpers/history';
import { isTabletOrBigger } from 'helpers/responsive';

import * as appStoreModule from 'store/app';

class MainLayout extends AppComponent {
  purgePersistedData(e) {
    e.preventDefault();
    purgeReloading();
    history.replaceState(null, '/');
  }
  render() {
    const appState = appStoreModule.getState();

    return (<div className="col-xs-12 col-sm-10 col-sm-offset-1">
      <h1 style={styles.title}><Link to="/">Feedy</Link> <small>under construction</small></h1>
      {appState.user.get('type') === 'auth' ?
        <AuthNav/> :
        <AnonymousNav/>
      }
      <Row>{this.props.children}</Row>
      <footer style={styles.footer}>
        <p>This application uses the
         <a href="https://developer.mozilla.org/en/docs/Web/API/Window/localStorage">
          {' localStorage API'}
        </a>.
          This means that the data you enter will only be available on your browser.
          To purge the stored Feedy values,
           <a href="" onClick={e => this.purgePersistedData(e)}> click here</a>.
          {isTabletOrBigger() && " Don't forget to check this app from a mobile :)"}
        </p>
      </footer>
    </div>);
  }
}
MainLayout.displayName = 'MainLayout';

export default MainLayout;

const styles = {
  footer: {
    marginTop: 50,
    textAlign: 'center',
  },
  title: {
    paddingTop: 20,
  },
};
