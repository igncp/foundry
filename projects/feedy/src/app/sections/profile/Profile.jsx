import React from 'react';

import MainLayout from 'components/layouts/Main';

class Profile extends React.Component {
  render() {
    return (<MainLayout>
      Profile
    </MainLayout>);
  }
}
Profile.displayName = 'Profile';

module.exports = Profile;
