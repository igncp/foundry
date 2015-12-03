import React from 'react';

import MainLayout from 'layouts/Main';

class RememberPassword extends React.Component {
  render() {
    return (<MainLayout>
      <h2>Remember password</h2>
      <p>Enter your username: <input/> <input className="btn btn-info" type="button" value="Remember"/></p>
    </MainLayout>);
  }
}

module.exports = RememberPassword;