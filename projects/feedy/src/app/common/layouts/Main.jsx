import React from 'react';
import { Link, } from 'react-router';
import toastr from 'toastr/toastr';

import AppComponent from 'components/AppComponent';
import AuthNav from './partials/AuthNav';
import AnonymousNav from './partials/AnonymousNav';

import purgeDatabase from 'helpers/purgeDatabase';
import history from 'helpers/history';

import * as appStoreModule from 'store/app';

class MainLayout extends AppComponent {
  purgeDatabase(e) {
    e.preventDefault();
    purgeDatabase();
    toastr.info('Database purged');
    history.replaceState(null, '/');
  }
  render() {
    const appState = appStoreModule.getState();

    return (<div className="col-sm-10 col-sm-offset-1">
      <h1><Link to="/">Feedy</Link> <small>under construction</small></h1>
      {appState.user.get('type') === 'auth' ?
        <AuthNav/> :
        <AnonymousNav/>
      }
      {this.props.children}
      <footer style={styles.footer}>
        <p>This application uses the <a href="https://developer.mozilla.org/en/docs/Web/API/Window/localStorage">localStorage API</a>.
          This means that the data you enter will only be available on your browser.
          To purge the stored Feedy values, <a href="" onClick={e => this.purgeDatabase(e)}>click here</a>.</p>
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
};