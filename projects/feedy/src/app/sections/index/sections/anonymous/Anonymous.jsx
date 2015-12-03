import React from 'react';
import { Link, } from 'react-router';

class Index extends React.Component {
  render() {
    // const store = appStore.get();

    return (<div>
      <p>Enter your credentials</p>
      <div>
        <p>Username: <input/></p>
        <p>Password: <input type="password"/></p>
        <p><input className="btn btn-default" type="button" value="Enter"/></p>
      </div>
      <p><Link to="signup">Sign up</Link></p>
      <p><Link to="remember-password">Remember password</Link></p>
    </div>);
  }
}

module.exports = Index;