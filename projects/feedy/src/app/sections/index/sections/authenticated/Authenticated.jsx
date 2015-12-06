import React from 'react';

import AppComponent from 'components/AppComponent';

class Authenticated extends AppComponent {
  render() {
    return (<div>
      <p>Authenticated content</p>
    </div>);
  }
}

module.exports = Authenticated;