import { Component } from 'react';

import MainLayout from 'components/layouts/Main';

class Profile extends Component {
  render() {
    return (<MainLayout>
      Profile
    </MainLayout>);
  }
}
Profile.displayName = 'Profile';

module.exports = Profile;
