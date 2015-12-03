import React from 'react';
import { Link, } from 'react-router';

import AppComponent from 'components/AppComponent';
import purgeDatabase from 'helpers/purgeDatabase';

class MainLayout extends AppComponent {
  render() {
    return (<div>
      <h1><Link to="/">Feedy</Link> <small>Under construction</small></h1>
      {this.props.children}
      <footer>
        <p>This application uses the <a href="https://developer.mozilla.org/en/docs/Web/API/Window/localStorage">localStorage API</a>.
          To purge the stored Feedy values, <a href="" onClick={purgeDatabase}>click here</a>.</p>
      </footer>
    </div>);
  }
}
MainLayout.displayName = 'MainLayout';

export default MainLayout;