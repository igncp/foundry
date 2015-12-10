import toastr from 'toastr/toastr';

import AppComponent from 'components/AppComponent';
import MainLayout from 'components/layouts/Main';

import { logout } from 'actions/user';
import history from 'helpers/history';

class Logout extends AppComponent {
  componentDidMount() {
    logout();
    toastr.clear();
    toastr.info('Logout successful');
    history.replaceState(null, '/');
  }
  render() {
    return (<MainLayout />);
  }
}

module.exports = Logout;
