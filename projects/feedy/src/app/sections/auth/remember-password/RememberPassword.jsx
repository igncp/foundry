import React from 'react';
import { Link, } from 'react-router';

class RememberPassword extends React.Component {
  render() {
    return (<div>
      <p>remember password</p>
      <p><Link to="/">index</Link></p>
    </div>);
  }
}

module.exports = RememberPassword;