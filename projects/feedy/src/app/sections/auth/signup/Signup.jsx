import Immutable from  'immutable';
import R from 'ramda';

import AppComponent from 'components/AppComponent';
import MainLayout from 'components/layouts/Main';
import TextishInput from 'components/form/TextishInput';
import Box from 'components/Box';

import { signupUser } from 'helpers/user';
import getEmptyStrPropsObj from 'helpers/pure/getEmptyStrPropsObj';
import * as appStoreModule from 'store/app';

const textInputs = ['username', 'password', 'passwordC'];
const emptyInputsObj = getEmptyStrPropsObj(textInputs);

class Signup extends AppComponent {
  getDefaultData() {
    const appState = appStoreModule.getState();

    return {
      ...emptyInputsObj,
      user: appState.user,
    };
  }
  componentDidMount() {
    this.unsubscribeFromAppStore = appStoreModule.get().subscribe(() => {
      const appState = appStoreModule.getState();

      this.setData({
        user: appState.user,
      });
    });
  }
  componentWillUnmount() {
    this.unsubscribeFromAppStore();
  }
  handleButtonClick() {
    signupUser(Immutable.fromJS({
      username: this.state.data.get('username'),
      password: this.state.data.get('password'),
    }));

    this.setData(emptyInputsObj);
  }
  isFormValid() {
    const data = this.state.data;

    const isAnyInputEmpty = R.any(
      R.compose(R.isEmpty, input => data.get(input))
    )(textInputs);
    const passwordsMatch = data.get('password') === data.get('passwordC');

    return !isAnyInputEmpty && passwordsMatch;
  }
  render() {
    const data = this.state.data;
    const user = data.get('user');

    return (<MainLayout>
      <h2>Signup</h2>
      <Box>
        <div>
          <TextishInput
            onChange={event => this.setData(data.set('username', event.target.value))}
            text="Username"
            value={data.get('username')}
          />
        </div>
        <div>
          <TextishInput
            onChange={event => this.setData(data.set('password', event.target.value))}
            text="Password"
            type="password"
            value={data.get('password')}
          />
        </div>
        <div>
          <TextishInput
            onChange={event => this.setData(data.set('passwordC', event.target.value))}
            text="Password Confirmation"
            type="password"
            value={data.get('passwordC')}
          />
          {data.get('passwordC') && data.get('passwordC') !== data.get('password') &&
            <p>Passwords do not match</p>
          }
        </div>
        <p>
          {user.get('type') !== 'pending' ?
            <input
              className="btn btn-default"
              disabled={!this.isFormValid()}
              onClick={() => this.handleButtonClick()}
              type="button"
              value="Enter"
            /> : user.get('type') === 'pending' ?
            <span>Pending...</span> : null}
        </p>
      </Box>
    </MainLayout>);
  }
}

module.exports = Signup;
